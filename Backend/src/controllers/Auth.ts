import { Response,Request } from "express";
import bcrypt from 'bcrypt';
import { Res } from "../utils/response/response-status";
import { prisma } from "../utils/prisma-client";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
import otpGenerator from 'otp-generator'
import { registerZod,OTPZod,signInZod } from "../utils/Zod";

const signIn =async(req:Request,res:Response)=>{
    try {
        if(!process.env.JWT_SECRET)
            throw new Error('JWT secret not found');

        const payload = req.body.payload
        const validate = OTPZod.safeParse(payload);
        if(!validate.success)
            throw new Error("wrong credentials");

        const {email, password} =payload
        //check if user data exists or not
        const userDetails = await prisma.user.findUnique({
            where:{
                email:email
            }
        })

        if(!userDetails)
            return Res(res,{message:'user does not exist, kindly register first',data:null},404);
        if(await bcrypt.compare(password,userDetails.password)){
            //generate the jwt token and send the data to the user
            const payload = {
                id:userDetails.id,
                email:userDetails.email,
            }


            const jsonwebtoken = jwt.sign(payload,process.env.JWT_SECRET!,{expiresIn:'1h'});
            const options ={
                expiresIn : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("jsonwebtoken" , jsonwebtoken ,options).status(200).json({
                success:true,
                message:"cookie send successFully",
                jsonwebtoken,
            })

            return res.status(200).json({
                success:true,
                message:'user logged in successfully',
                jsonwebtoken
            })

        }
        return Res(res,{message:'password does not match',data:null},404)


    } catch (error) {
        console.log(error);
        return Res(res,{message:'Something went wrong', data:null},500);
    }
}

const sendOTP = async(req:Request,res:Response)=>{
    try {
        const payload = req.body.payload;
        const validate = OTPZod.safeParse(payload);

        if(!validate.success)
            return Res(res,{message:'kindly enter correct email', data:null},400)

        const {email} = payload

        //check if use already exist or not
        const userDetails = await prisma.user.findFirst({
            where:{
                email:email
            }
        })

        if(userDetails)
            return Res(res,{message:'email already registered', data:null},201)

        const OTP = otpGenerator.generate(4,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })

        const otpDetails = await prisma.oTP.create({
            data:{
                email:email,
                OTP:OTP
            }
        })

        return Res(res,{message:"Otp Send Successfully",data:null},200);    


    } catch (error) {
        console.log("error from send OTP field", error)
        Res(res,{message:'something went wrong',data:null},500);
    }
}


const registerUser = async(req:Request, res:Response)=>{
    try {
        const userDetails = req.body.payload;
        const validate = registerZod.safeParse(userDetails);
        if(!validate){
            return Res(res,{message:"Some of the details is Incorrect", data:null},400)
        }

        let {firstName, lastName, email, password, OTP} = userDetails;

        email = email.toLowerCase();

        const existUser = await prisma.user.findFirst({
            where:{
                email:email
            }
        })

        if(existUser)
            return Res(res,{message:'User already registered', data:null},400);

        //get the Otp from the data base
        const OTPDetails = await prisma.oTP.findMany({
            take:1,
            where:{
                email:email
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        if(!OTPDetails)
            return Res(res,{message:"no Otp founded", data:null},400)
        
        //OTP expiration is to be checked

        if(OTPDetails[0].OTP !== OTP)
            return Res(res,{message:"Otp not matched", data:null},400);

        //hash the password
        const hashPassword = await bcrypt.hash(password,10);
        const registerPayLoad = {
            firstName,
            lastName,
            email,
            password:hashPassword,
        }

        await prisma.user.create({
            data:registerPayLoad
        })

        return Res(res,{message:'user Registered Successfully, Kindly Login', data:null},200);

    } catch (error) {
        console.log(error)
        return Res(res,{message:'Something went wrong', data:null},500)
    }
}