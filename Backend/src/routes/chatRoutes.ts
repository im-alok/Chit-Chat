import express from 'express'
import { Auth } from '../MiddleWares/auth';
import { chatUserDetails, createChat, getChatDetails, getUserAllChat } from '../controllers/chat';
import { sendMessage } from '../controllers/Message';

const router = express.Router();

//@ts-ignore
router.post('/createchats',Auth,createChat);
//@ts-ignore
router.post('/getuserchats',Auth,getUserAllChat);

//@ts-ignore
router.get('/getchatdetails',Auth,getChatDetails)

//@ts-ignore
router.get('/chatuserdetails',Auth,chatUserDetails);

//@ts-ignore 
router.post('/sendmessage',Auth,sendMessage);


export default router;
