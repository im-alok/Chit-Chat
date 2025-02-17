import express,{Response,Request} from "express";
import { logoutHandler, registerUser, sendOTP, signIn } from "../controllers/Auth";
import { Auth } from "../MiddleWares/auth";

const router = express.Router();

//@ts-ignore
router.post('/register',registerUser)
//@ts-ignore
router.post('/sendotp',sendOTP)
//@ts-ignore
router.post("/login",signIn)
//@ts-ignore
router.post('/logout',Auth,logoutHandler);
//@ts-ignore


export default router
