
import { Request, Response } from "express"
import { Res } from "../utils/response/response-status";
import { prisma } from "../utils/prisma-client";

export const sendMessage = async(req:Request, res:Response)=>{
    try {
        const userId = req.body.userId;
        const {senderId,chatId,message} = req.body
        if(!userId || senderId)
            return Res(res,{message:'details not found',data:null},400);
        if(!message)
            return Res(res,{message:"can't send empt message",data:null},400);

        //create message
        const createMessage = prisma.message.create({
            data:{
                senderId:userId,
                chatId:chatId,
                message:message
            }
        })

        //update the latest message of chat
        const addToChatLatestMessage =  prisma.chat.update({
            where:{
                id:chatId
            },
            data:{
                latestMessage:(await createMessage).id
            }
        })
        await prisma.$transaction([createMessage,addToChatLatestMessage])
        return Res(res,{message:'message send successfully',data:null},200);

    } catch (error) {
        console.log(error + 'from getAllMessage Block');
        Res(res,{message:'something went wrong',data:null},500);
    }
}