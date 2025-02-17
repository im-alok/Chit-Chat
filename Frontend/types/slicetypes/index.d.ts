export interface RootReducer{
    auth:AuthReducer
}

interface AuthReducer{
    token?: string | null,
    loading?:boolean,
    userRegistrationDetails?:UserDetails | null
}

interface UserDetails{
    firstName?:string,
    lastName?:string,
    password?:string,
    email?:string,
    otp?:string
}