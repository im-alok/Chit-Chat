//create chat
import { Response, Request } from "express";
import { Res } from "../utils/response/response-status";
import { prisma } from "../utils/prisma-client";
import zod, { unknown } from "zod";

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
        const chatId = req.query.chatId as unknown as string
        if (!chatSchema.safeParse(chatId).success) {
            return Res(res, { message: 'chatId is undefined', data: null }, 500);
        }

        const chatDetails = await prisma.chat.findUnique({
            where: {
                id: chatId
            },
            include: {
                message: {
                    include:{
                        User:{
                            omit:{
                                password:true
                            }
                        }
                    },
                    orderBy:{
                        createdAt:"asc"
                    }
                }
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
            return Res(res, { message: 'User is not found', data: null }, 400);

        // Check if user exists
        const userdetails = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!userdetails)
            return Res(res, { message: "No user details found for given id", data: null }, 400);

        // Fetching chat details
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
                                    select: {
                                        id: true,
                                        firstName: true,
                                        lastName: true,
                                        profilePic: true
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
        });

        // Filter members to exclude the current user
        const filteredChatDetails = userChatDetails.map(chat => ({
            ...chat,
            Chat: {
                ...chat.Chat,
                members: chat.Chat.members.filter((member: any) => member.User.id !== userId)
            }
        }));

        return Res(res, { message: 'User Chat fetched successfully', data: filteredChatDetails }, 200);

    } catch (error) {
        console.log(error);
        return Res(res, { message: 'Something went wrong', data: null }, 500);
    }
}

export const chatUserDetails=async(req:Request, res:Response)=>{
    const schema = zod.string();
    try {
        const userId = req.query.userId as unknown as string
        if(!schema.safeParse(userId).success)
            return Res(res,{message:"please sendn correct user id", data:null},400);

        const userDetails = await prisma.user.findUnique({
            where:{
                id:userId
            },
            omit:{
                password:true
            }
        })

        return Res(res,{message:'Data fetched successfully', data:userDetails},200);
    } catch (error) {
        console.log(error)
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