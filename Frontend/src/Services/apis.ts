export const Base_URL = process.env.REACT_APP_BASE_URL

export const AUTH_URL ={
    "LOGIN_URL" : Base_URL + '/user/login',
    "REGISTER_URL" : Base_URL + '/user/register',
    "SEND_OTP" : Base_URL + '/user/sendotp',
    "LOGOUT" : Base_URL + '/user/logout'
}


export const MISC = {
    "GET_ALL_USER" : Base_URL +"/find/getusers"
}


export const CHATS = {
    "CREATE_CHAT" : Base_URL + "/chats/createchats",
    "GET_USER_CHATS" : Base_URL + "/chats/getuserchats",
    "GET_CHAT_DETAILS": Base_URL + "/chats/getchatdetails",
    "GET_CHAT_USER_DETAILS" : Base_URL + "/chats/chatuserdetails",
    "SEND_MESSAGE" : Base_URL + '/chats/sendmessage'
}