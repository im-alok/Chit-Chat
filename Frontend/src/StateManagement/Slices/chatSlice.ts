import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading:false,
    userChats:[]
}

const chatSlice = createSlice({
    name:"chat",
    initialState:initialState,
    reducers:{
        setLoading(state,value){
            state.loading = value.payload
        },
        setUserChats(state,value){
            state.userChats = value.payload
        }
    }
})


export const {setLoading, setUserChats} = chatSlice.actions

export default chatSlice.reducer;