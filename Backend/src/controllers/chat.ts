//create chat
import { Response, Request } from "express";
import { Res } from "../utils/response/response-status";
import { prisma } from "../utils/prisma-client";
import zod from "zod";

export const createChat = async (req: Request, res: Response) => {
    const schema = zod.array(zod.string());
    try {

        const userId = req.body.userId;
        let { friendsId, chatName }: { friendsId: string[], chatName: string } = req.body
        console.log(friendsId)

        if (!schema?.safeParse(friendsId).success)
            return Res(res, { message: 'send the userIds in correct format', data: null }, 400)

        //check if chat exist or not
        const existingChat = await prisma.chat.findFirst({
            where: {
                isGroupChat: false,
                AND: [
                    { members: { some: { memberId: userId } } },
                    { members: { some: { memberId: friendsId[0] } } }
                ]
            },
        });

        if(existingChat)
            return Res(res,{message:'chat already exist', data:null},409);

        const chatDetails = <Chat>{}
        chatDetails.chatName = chatName
        chatDetails.latestMessage = null

        if (friendsId.length === 1) {
            chatDetails.isGroupChat = false
            chatDetails.groupAdminId = null
        } else {
            chatDetails.isGroupChat = true
            chatDetails.groupAdminId = userId
        }
        friendsId.push(userId);

        const response = await prisma.$transaction(async (prisma) => {
            const newChat = await prisma.chat.create({
                data: chatDetails
            })

            //members of chat
            const chatMembers: { chatId: string, memberId: string }[] = friendsId?.map((id) => ({
                chatId: newChat.id,
                memberId: id
            }))

            //now chat is created add the member to the chat
            const chatInfo = await prisma.chatMember.createMany({
                data: chatMembers
            })

            return chatInfo
        });

        console.log(response)
        //getting all user chat Details
        const userChatDetails = await prisma.chatMember.findMany({
            where: {
                memberId: userId
            },
            include: {
                Chat: {
                    include: {
                        members: {
                            include: {
                                User: {
                                    omit: {
                                        password: true
                                    }
                                }
                            }
                        },
                        LatestMessage: true
                    }
                }
            },
            orderBy: {
                Chat: {
                    createdAt: "desc"
                }
            }
        })

        return Res(res, { message: 'start conversation', data: userChatDetails }, 200)



    } catch (error) {
        console.log(error);
        return Res(res, { message: 'something went wrong', data: null }, 500);
    }
}

export const getChatDetails = async (req: Request, res: Response) => {
    try {

        const chatSchema = zod.string();
        const { chatId } = req.body;
        if (!chatSchema.safeParse(chatId).success) {
            return Res(res, { message: 'chatId is undefined', data: null }, 500);
        }

        const chatDetails = await prisma.chat.findUnique({
            include: {
                message: true
            }
            , where: {
                id: chatId
            }
        })
        if (!chatDetails)
            return Res(res, { message: 'chatDetails not found', data: null }, 400);

        return Res(res, { message: 'chat details fetched successfully', data: chatDetails }, 200);

    } catch (error) {
        console.log(error);
        return Res(res, { message: 'something went wrong', data: null }, 500);
    }
}

export const getUserAllChat = async (req: Request, res: Response) => {
    const userChatSchema = zod.string();

    try {
        const userId = req.body.userId;
        if (!userChatSchema.safeParse(userId).success)
            return Res(res, { message: 'user is not found', data: null }, 400);

        //checking for userId
        const userdetails = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!userdetails)
            return Res(res, { message: "No user details found for given id", data: null }, 400);

        const userChatDetails = await prisma.chatMember.findMany({
            where: {
                memberId: userId
            },
            include: {
                Chat: {
                    include: {
                        members: {
                            include: {
                                User: {
                                    omit: {
                                        password: true
                                    }
                                }
                            }
                        },
                        LatestMessage: true
                    }
                }
            },
            orderBy: {
                Chat: {
                    createdAt: "desc"
                }
            }
        })

        return Res(res, { message: 'User Chat fetched successfully', data: userChatDetails }, 200);

    } catch (error) {
        return Res(res, { message: 'something went wrong', data: null }, 500)
    }
}


export interface Chat {
    id?: string
    chatName: string
    isGroupChat: boolean
    groupAdminId: string | null
    latestMessage: string | null
    chatMembers?: string[]
}