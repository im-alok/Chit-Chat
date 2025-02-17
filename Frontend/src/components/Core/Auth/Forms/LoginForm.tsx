import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../../../Services/Operations/authOperations";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [showPasswod, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <form
        onSubmit={handleSubmit(async(data: any) => {
          const response = await UserLogin(data,navigate,dispatch);
        })}
        className="flex flex-col gap-5 text-lime-100"
      >
        <label className="label-style flex flex-col gap-2">
          <div className="font-arcuata flex gap-2 text-base">
            Email
            <span className="text-red-700">*</span>
            {errors.email && (
              <p className="font-doto text-sm font-semibold text-red-700">
                required
              </p>
            )}
          </div>

          <input
            placeholder="Enter your email address"
            type="email"
            className="w-fit rounded-sm border-1 border-b-2 border-gray-700 border-b-black px-2 py-2 text-lg focus:outline-0"
            {...register("email", { required: true })}
          />
        </label>

        <label className="flex items-end gap-2">
          <div className="relative">
            <div className="font-arcuata flex gap-2 text-base">
              Password
              <span className="text-red-700">*</span>
              {errors.password && (
                <p className="font-doto text-xs font-semibold text-red-700">
                  {errors.password.message as string}
                </p>
              )}
            </div>
            <input
              placeholder="type your password"
              type={showPasswod ? "text" : "password"}
              className="w-fit rounded-sm border-1 border-b-2 border-gray-700 border-b-black px-2 py-2 text-lg focus:outline-0"
              {...register("password", {
                required:{
                  value:true,
                  message:'required'
                },
                minLength:{
                  value:8,
                  message:'password should be >=8'
                }
              })}
            />
          </div>

          <span className="relative bottom-3 cursor-pointer text-2xl font-bold">
            {showPasswod ? (
              <GoEye onClick={() => setShowPassword(false)} />
            ) : (
              <GoEyeClosed onClick={() => setShowPassword(true)} />
            )}
          </span>
        </label>

        <button
          className="font-doto cursor-pointer bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 px-2 py-1 text-sm font-extrabold text-black shadow-[0px_0px_5px_1px] shadow-amber-400 transition-all duration-200 active:scale-95"
          type="submit"
        >
          login
        </button>
      </form>
      <Link className="text-xs text-lime-300 italic" to={"/signup"}>
        Not register? Register here.{" "}
      </Link>
    </div>
  );
};

export default LoginForm;
