import { PrismaClient } from "@prisma/client";
import { sendMail } from "../config/nodemailer";


let globalForPrisma = global as unknown as {prisma:PrismaClient}

export const prisma = globalForPrisma.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma


prisma?.$use(async(params,next)=>{
    
    const result = await next(params); //next will execute the query
    if(params.action === "create"){
        if(params.model === 'OTP' && result.email){
            await sendMail(result.email,"OTP for the user",result.OTP)
        }
    }
    return result;
})