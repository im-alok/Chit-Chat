import { Request, Response } from "express"
import jsonwebtoken from 'jsonwebtoken'
import { Res } from "../utils/response/response-status"

export const Auth =async (req:Request, res:Response, next:any)=>{
    try {
        const token = req.cookies.jsonwebtoken || req.body.token
        if(!token)
            return Res(res,{message:'Token not found',data:null},400)
        
        // verify the token
        try {
            if(!process.env.JWT_SECRET){
                console.log('Env variable is not found')
                return
            }
            const decode =jsonwebtoken.verify(token,process.env.JWT_SECRET)
            if(!decode)
                throw new Error('Token Expired try login again')
            // console.log(decode);
            // @ts-ignore
            req.body.userId = decode?.id;

            next();

        } catch (error) {
            return Res(res,{message:'token is invalid',data:null},401)
        }

    } catch (error) {
        console.log(error);
        return Res(res,{message:'Something went Wrong',data:null},500)
    }
}