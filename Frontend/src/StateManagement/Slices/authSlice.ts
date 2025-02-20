import {createSlice} from '@reduxjs/toolkit';
import { AuthReducer } from 'slicetypes/index';
import {jwtDecode, JwtPayload} from 'jwt-decode';

//decoding the token to check if token is valid or not if not login again
const checkLoggedInOrNot = (token:string | null)=>{
    // console.log(token)
    try {
        const decode = jwtDecode<JwtPayload>(token!)
        // console.log(decode);
        const expTime = new Date(decode?.exp! * 1000);
        const currTime = new Date();
        if(expTime > currTime)
            return token;
        else{
            localStorage.removeItem('token');
            return null;
        }
            
    } catch (error) {
        console.log(error)
    }
}

async function getUserId(token:string | null){
    try {
        const decode = jwtDecode<JwtPayload>(token!)
        return decode.id;
            
    } catch (error) {
        console.log(error)
    }
}

const initial:AuthReducer = {
    token: localStorage.getItem('token') ? checkLoggedInOrNot(localStorage.getItem('token')) : null,
    loading:false,
    userRegistrationDetails:null,
    myId:await getUserId(localStorage.getItem('token'))

}


const authSlice = createSlice({
    name:'auth',
    initialState:initial,
    reducers:{
        setToken(state,value){
            state.token = value.payload
        },
        setLoading(state,value){
            state.token = value.payload
        },
        setUserRegistrationDetails(state,value){
            state.userRegistrationDetails = value.payload
        },
        setMyId(state,value){
            state.myId = value.payload
        }
    }
})

export const {setLoading,setToken,setUserRegistrationDetails} = authSlice.actions
export default authSlice.reducer;
