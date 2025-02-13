import zod from 'zod';


export const registerZod = zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    email:zod.string().email(),
    password:zod.string().min(8),
    OTP:zod.string().length(4)
})


export const OTPZod = zod.object({
    email:zod.string().email()
})

export const signInZod = zod.object({
    email:zod.string().email(),
    password:zod.string().min(8)
})