import React from "react";
import OTPForm from "./Forms/OTPForm";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OTP = () => {

  const { userRegistrationDetails } = useSelector((state: any) => state.auth)
  if(!userRegistrationDetails)
    return <Navigate to={'/signup'} />

  console.log(userRegistrationDetails)

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[url('/assets/bg-black.webp')] bg-cover">
      <div className="font-doto flex flex-col gap-5 text-2xl font-bold text-lime-200 sm:text-4xl">
        Enter Verification code:
        {<OTPForm length={4} />}
      </div>
    </div>
  );
};

export default OTP;
