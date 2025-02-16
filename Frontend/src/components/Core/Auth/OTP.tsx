import React from 'react'
import OTPForm from './Forms/OTPForm'

const OTP = () => {
  return (
    <div className="w-screen h-screen bg-[url('/assets/bg-black.webp')] bg-cover flex justify-center items-center">
        <div className='text-lime-200 font-doto text-2xl sm:text-4xl font-bold flex flex-col gap-5'>
            Enter Verification code:
            {
                <OTPForm length={4}/>
            }
        </div>
    </div>
  )
}

export default OTP
