import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();


export const sendMail = async(email:string,title:string,body:string)=>{
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.HOST,
            auth:{
                user:process.env.NODEMAILER_USER,
                pass:process.env.NODEMAILER_PASSWORD
            }
        })


        let info = await transporter.sendMail({
            from: 'Connect & Chat || Connect with world',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })

    } catch (error:any) {
        console.log(error)
        
    }
}