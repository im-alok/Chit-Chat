import express, { Request,Response } from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRoutes from './routes/UserRoutes'

//creating instance of express app
const app = express();
const PORT = 8080



//middeleWare
require('dotenv').config();
app.use(cookieParser());
app.use(cors({
    origin:'*',
    credentials:true
}))



//api end points
app.use('/api/v1/user', userRoutes)
// app.use('/api/v1/conversation', chatRoutes);


app.get('/',(req:Request,res:Response)=>{
    res.status(200).json({
        success:true,
        message:"server is responding successfully"
    })
})

app.listen(PORT,()=>{
    console.log(`server is listening on the port ${PORT}`)
})
