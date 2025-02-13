//create chat
import { Response, Request } from "express";
import { Res } from "../utils/response/response-status";
import { prisma } from "../utils/prisma-client";
import zod from "zod";

export const createChat = async (req: Request, res: Response) => {
    const schema = zod.array(zod.string());
    try {

        const userId = req.body.userId;
        let {friendsId,chatName}:{friendsId:string[], chatName:string} = req.body

        if(!schema?.safeParse(friendsId).success)
            return Res(res,{message:'send the userIs in correct format', data:null},400)

        const chatDetails = <Chat>{}
        chatDetails.chatName = chatName
        chatDetails.latestMessage = null

        if(friendsId.length === 1){
            chatDetails.isGroupChat = false
            chatDetails.groupAdminId = null
        }else{
            chatDetails.isGroupChat = true
            chatDetails.groupAdminId = userId
        }
        friendsId.push(userId);

        
        const response =await prisma.$transaction(async(prisma)=>{
            const newChat = await prisma.chat.create({
                data:chatDetails
            })
            
            //members of chat
            const chatMembers:{chatId:string,memberId:string}[] = friendsId?.map((id)=>({
                chatId:newChat.id,
                memberId:id
            }))
    
            //now chat is created add the member to the chat
            const chatInfo = await prisma.chatMember.createMany({
                data:chatMembers
            })

            return chatInfo
        });

        console.log(response)

        return Res(res,{message:'start conversation',data:null},200)



    } catch (error) {
        console.log(error);
        return Res(res, { message: 'something went wrong', data: null }, 500);
    }
}

export const getChatDetails = async(req:Request, res:Response)=>{
    try {

        const chatSchema = zod.string();
        const {chatId} = req.body;
        if(!chatSchema.safeParse(chatId).success){
            return Res(res,{message:'chatId is undefined',data:null},500);
        }

        const chatDetails = await prisma.chat.findUnique({
            include:{
                message:true
            }
            ,where:{
                id:chatId
            }
        })
        if(!chatDetails)
            return Res(res,{message:'chatDetails not found',data:null},400);
        
        return Res(res,{message:'chat details fetched successfully',data:chatDetails},200);

    } catch (error) {
        console.log(error);
        return Res(res,{message:'something went wrong',data:null},500);
    }
}

export const getUserAllChat = async(req:Request,res:Response)=>{
    const userChatSchema = zod.string();

    try {
        const userId = req.body.userId;
        if(!userChatSchema.safeParse(userId).success)
            return Res(res,{message:'user is not found',data:null},400);
        const userChatDetails = await prisma.chatMember.findMany({
            where:{
                memberId:userId
            }
        })
        if(!userChatDetails)
            return Res(res,{message:'error in fetching the user chat Details',data:null},400);

        return Res(res,{message:'User Chat fetched successfully',data:userChatDetails},200);

    } catch (error) {
        return Res(res,{message:'something went wrong', data:null},500)
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