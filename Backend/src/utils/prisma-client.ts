import { PrismaClient } from "@prisma/client";
import { sendMail } from "../config/nodemailer";


let globalForPrisma = global as unknown as {prisma:PrismaClient}

export const prisma = globalForPrisma.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma


prisma?.$use(async(params,next)=>{
    const result = await next(params);
    if(params.action === "create"){
        if(params.model === 'OTP' && result.email){
            sendMail(result.email,"OTP for the user",result.otp)
        }
    }
    return result;
})