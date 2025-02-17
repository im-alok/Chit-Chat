import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { MISC } from "../apis"


export const searchUser = async(searchParams:string)=>{

    try {
        const response = await apiConnector(MISC.GET_ALL_USER,"GET",null,null,{
            searchParams:searchParams
        })
        if(!response?.data?.success){
            toast.error(response?.data?.message);
            throw new Error("something went wrong")
        }

        return response?.data?.details
    } catch (error) {
        console.log(error)
    }

}