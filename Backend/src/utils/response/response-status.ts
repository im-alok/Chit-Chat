import { Response } from "express"

export const Res = (res:Response,{message,data}:any,statusCode:number)=>{
    return res.status(statusCode).json({
        success:statusCode === 200 ? true : false,
        message:message,
        details:data ? data : null
    })
}