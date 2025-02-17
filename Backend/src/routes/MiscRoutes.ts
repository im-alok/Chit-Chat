import express from 'express'
import { searchUser } from '../controllers/Misc';
import { Auth } from '../MiddleWares/auth';

const router = express.Router();

//@ts-ignore
router.get('/getusers',Auth,searchUser);


export default router