import { Response, Request } from "express";
import bcrypt from 'bcrypt';
import { Res } from "../utils/response/response-status";
import { prisma } from "../utils/prisma-client";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
import otpGenerator from 'otp-generator'
import { registerZod, OTPZod, signInZod } from "../utils/Zod";


//testing Done!!
export const signIn = async (req: Request, res: Response) => {
    try {
        if (!process.env.JWT_SECRET)
            throw new Error('JWT secret not found');

        const payload = req.body.payload
        const validate = signInZod.safeParse(payload);
        if (!validate.success){
            return Res(res,{message:'some details are wrong/undefined',data:null},400)
        }

        let email = validate?.data?.email.toLowerCase();
        const password = validate?.data?.password
        //check if user data exists or not
        const userDetails = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!userDetails)
            return Res(res, { message: 'user does not exist, kindly register first', data: null }, 404);
        if (await bcrypt.compare(password, userDetails.password)) {
            //generate the jwt token and send the data to the user
            const payload = {
                id: userDetails.id,
                email: userDetails.email,
            }


            const jsonwebtoken = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
            const options = {
                httpOnly: true, // Prevents client-side JS access
                // secure: true, // Ensures it’s only sent over HTTPS
                maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
            }
            res.cookie("jsonwebtoken", jsonwebtoken, options)

            return res.status(200).json({
                success: true,
                message: 'user logged in successfully',
                jwt: jsonwebtoken
            })

        }
        return Res(res, { message: 'password does not match', data: null }, 404)


    } catch (error) {
        console.log(error);
        return Res(res, { message: 'Something went wrong', data: null }, 500);
    }
}

//testing done
export const sendOTP = async (req: Request, res: Response) => {
    try {
        const payload = req.body.payload;
        const validate = OTPZod.safeParse(payload);

        if (!validate.success)
            return Res(res, { message: 'kindly enter correct email', data: null }, 400)

        const email = validate.data.email

        //check if use already exist or not
        const userDetails = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (userDetails)
            return Res(res, { message: 'email already registered', data: null }, 201)

        const OTP = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })



        //saving OTP to the database
        const otpDetails = await prisma.oTP.create({
            data: {
                email: email,
                OTP: OTP
            }
        })

        return Res(res, { message: "Otp Send Successfully", data: null }, 200);


    } catch (error) {
        console.log("error from send OTP field", error)
        Res(res, { message: 'something went wrong', data: null }, 500);
    }
}

//done testing
export const registerUser = async (req: Request, res: Response) => {
    try {
        const userDetails = req.body.payload;
        const validate = registerZod.safeParse(userDetails);
        if (!validate.success) {
            return Res(res, { message: "Some of the details is Incorrect", data: null }, 400)
        }
        let email = validate?.data?.email!;
        const firstName = validate?.data?.firstName!;
        const lastName = validate?.data?.lastName!;
        const password = validate?.data?.password!;
        const OTP = validate?.data?.OTP!;


        email = email.toLowerCase();

        const existUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (existUser)
            return Res(res, { message: 'User already registered', data: null }, 400);

        //get the Otp from the data base
        const OTPDetails = await prisma.oTP.findMany({
            take: 1,
            where: {
                email: email
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        if (!OTPDetails)
            return Res(res, { message: "no Otp founded", data: null }, 400)

        //OTP expiration is to be checked
        const expirationTime = new Date(OTPDetails[0].createdAt)
        expirationTime.setMinutes(expirationTime.getMinutes() + 5)

        const currTime = new Date();
        if (expirationTime < currTime)
            return Res(res, { message: "OTP expired", data: null }, 400);

        if (OTPDetails[0].OTP !== OTP)
            return Res(res, { message: "Otp not matched", data: null }, 400);

        //hash the password
        const hashPassword = await bcrypt.hash(password, 10);
        const pp = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}`
        const registerPayLoad = {
            firstName,
            lastName,
            email,
            password: hashPassword,
            profilePic:pp
        }

        await prisma.user.create({
            data: registerPayLoad
        })

        return Res(res, { message: 'user Registered Successfully, Kindly Login', data: null }, 200);

    } catch (error) {
        console.log(error)
        return Res(res, { message: 'Something went wrong', data: null }, 500)
    }
}


export const logoutHandler=async(req:Request,res:Response)=>{
    try {
        res.clearCookie('jsonwebtoken');
        return res.status(200).json({
            success:true,
            message:'Logout successFully'
        })
    } catch (error) {
        console.log(error);
        Res(res,{message:'Something Happended',data:null},500)
    }
}