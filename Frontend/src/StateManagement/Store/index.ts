import {combineReducers} from '@reduxjs/toolkit'
import authSlice from '../Slices/authSlice'
import chatSlice from '../Slices/chatSlice'

const rootReducer = combineReducers({
    auth:authSlice,
    chat:chatSlice
})

export default rootReducer