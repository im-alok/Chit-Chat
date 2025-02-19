import express from 'express'
import { Auth } from '../MiddleWares/auth';
import { createChat, getUserAllChat } from '../controllers/chat';

const router = express.Router();

//@ts-ignore
router.post('/createchats',Auth,createChat);
//@ts-ignore
router.post('/getuserchats',Auth,getUserAllChat);


export default router;
