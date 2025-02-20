
import { Request, Response } from "express"
import { Res } from "../utils/response/response-status";
import { prisma } from "../utils/prisma-client";

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;
        const { chatId, message } = req.body
        if (!userId)
            return Res(res, { message: 'details not found', data: null }, 400);
        if (!message)
            return Res(res, { message: "can't send empt message", data: null }, 400);

        // Create message and update the latest message of chat in a transaction
        await prisma.$transaction(async (tx) => {
            //create message
            const newMessage = await tx.message.create({
                data: {
                    senderId: userId,
                    chatId: chatId,
                    message: message
                }
            });

            //update the latest message of chat
            await tx.chat.update({
                where: {
                    id: chatId
                },
                data: {
                    latestMessage: newMessage.id
                }
            });
        });

        return Res(res, { message: 'message send successfully', data: null }, 200);

    } catch (error) {
        console.log(error + 'from getAllMessage Block');
        Res(res, { message: 'something went wrong', data: null }, 500);
    }
}