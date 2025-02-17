import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { AUTH_URL } from "../apis"
import { setToken } from "../../StateManagement/Slices/authSlice";

export const UserLogin = async (payload: any,navigate:any,dispatch:any) => {
    const toastId = toast.loading('setting up...')
    // console.log(payload)
    try {
        const response = await apiConnector(AUTH_URL.LOGIN_URL, "POST", {
            payload: payload
        }, null, null);
        if (!response?.data?.success) {
            toast.error(response?.data?.message);
            throw new Error(response?.data?.message)
        }
        localStorage?.setItem("token", JSON.stringify(response?.data?.jwt));
        dispatch(setToken(response?.data?.jwt))
        navigate('/chatapp')
        toast.success('User LoggedIn sucessfully');
        toast.remove(toastId);

    } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data?.message);
        toast.remove(toastId)
    }
}


export const LogOutHandler = async (navigate:any,dispatch:any) => {
    const toastId = toast.loading('Logging out');
    try {
        const response = await apiConnector(AUTH_URL.LOGOUT, "POST", null, null, null);
        if (!response?.data?.success)
            throw new Error(response?.data?.message);
        localStorage.removeItem('token');
        dispatch(setToken(null));
        navigate('/');
        toast.remove(toastId)
        toast.success(response?.data?.message);

    } catch (error: any) {
        console.log(error)
        toast.error(error?.response?.data?.message);
    }
    return (dispatch: any) => {
        localStorage.removeItem('token');
        dispatch(setToken(false));
        toast.remove(toastId)
    }
}

export const sendOTP =async(payload:any,navigate:any)=>{
    const toastId = toast.loading('sending otp');
    try {
        const response = await apiConnector(AUTH_URL.SEND_OTP,"POST",{
            payload:payload
        },null,null)

        if(!response?.data?.success){
            toast.error(response?.data?.message);
            throw new Error(response?.data?.message);
        }
            
        toast.success(response?.data?.message);
        navigate('/otp')

    } catch (error:any) {
        console.log(error)
    }finally{
        toast.remove(toastId);
    }
}

export const RegisterUser = async(payload:any,navigate:any)=>{
    const toastId = toast.loading('registering....');
    try {
        const response = await apiConnector(AUTH_URL.REGISTER_URL,"POST",{
            payload:payload
        },null,null)
        if(!response?.data?.success){
            toast.error(response?.data?.message);
            throw new Error(response?.data?.message);
        }
            
        toast.success(response?.data?.message);
        navigate('/login')

    } catch (error:any) {
        console.log(error);
        const errorMessage = error?.response?.data?.message;
        if(error)
            toast.error(errorMessage);
    }finally{
        toast.remove(toastId);
    }
}