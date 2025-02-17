import {Request,Response} from 'express'
import { prisma } from '../utils/prisma-client';
import { Res } from '../utils/response/response-status';

export const searchUser = async(req:Request,res:Response)=>{
    try {
        const id = req.body.userId;
        const searchParams = req.query.searchParams as unknown as string
        if(!searchParams)
            return Res(res,{message:"params not found",data:null}, 401);
        const allUser = await prisma.user.findMany({
            where:{
                AND:[
                    {
                        OR:[
                            {
                                email:{contains:searchParams}
                            },
                            {
                                firstName:{contains:searchParams}
                            },
                            {
                                lastName:{contains:searchParams}
                            }
                        ]
                    },
                    {
                        NOT:{
                            id:id
                        }
                    }
                ]
            },
            omit:{
                password:true
            }
        })
        return Res(res,{message:"Users fetched Successfully",data:allUser},200)
    } catch (error) {
        console.log(error);
        return Res(res,{message:'something went wrong',data:null},500)
    }
}