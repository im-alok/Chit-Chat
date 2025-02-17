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