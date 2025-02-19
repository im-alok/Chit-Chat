import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { CHATS } from '../apis'
import { setUserChats } from "../../StateManagement/Slices/chatSlice";


export const createChat =async(chatName:string, friendId:string[], dispatch:any)=>{
    const toastId = toast.loading('Creating chats with user...');
    try {
        const response = await apiConnector(CHATS.CREATE_CHAT,"POST",{
            chatName:chatName,
            friendsId:friendId,

        },null,null);
        console.log(response)

        if(!response?.data?.success){
            toast.error(response?.data?.message)
            return
        }
        toast.success('chat created successfully');
        dispatch(setUserChats(response?.data?.details))
    } catch (error:any) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }finally{
        toast.remove(toastId);
    }
}


export const getUserChat = async(dispatch:any)=>{
    try {
        const response = await apiConnector(CHATS.GET_USER_CHATS,"POST",null,null,null);

        if(!response?.data?.success){
            toast.error(response?.data?.message);
            throw new Error(response?.data?.message);
        }
        dispatch(setUserChats(response?.data?.details));
    } catch (error) {
        console.log(error);
    }
}

