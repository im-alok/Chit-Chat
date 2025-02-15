import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [showPasswod, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <form
        onSubmit={handleSubmit((data: any) => {
          console.log(data);
          reset();
        })}
        className="flex flex-col flex-wrap gap-5"
      >
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="label-style flex flex-col gap-2">
            <p className="font-arcuata flex gap-2 text-base">
              First Name
              <span className="text-red-700">*</span>
              {errors.firstName && (
                <p className="font-doto text-sm font-semibold text-red-700">
                  required
                </p>
              )}
            </p>

            <input
              placeholder="first name"
              type="text"
              className="w-fit rounded-sm border-1 border-b-2 border-gray-700 border-b-black px-2 py-2 text-lg focus:outline-0"
              {...register("firstName", { required: true })}
            />
          </label>

          <label className="label-style flex flex-col gap-2">
            <p className="font-arcuata flex gap-2 text-base">
              Last Name
              <span className="text-red-700">*</span>
              {errors.lastName && (
                <p className="font-doto text-sm font-semibold text-red-700">
                  required
                </p>
              )}
            </p>

            <input
              placeholder="last Name"
              type="text"
              className="w-fit rounded-sm border-1 border-b-2 border-gray-700 border-b-black px-2 py-2 text-lg focus:outline-0"
              {...register("lastName", { required: true })}
            />
          </label>
        </div>
        <label className="label-style flex flex-col gap-2">
          <p className="font-arcuata flex gap-2 text-base">
            Email
            <span className="text-red-700">*</span>
            {errors.email && (
              <p className="font-doto text-sm font-semibold text-red-700">
                required
              </p>
            )}
          </p>

          <input
            placeholder="Enter your email address"
            type="email"
            className="w-full rounded-sm border-1 border-b-2 border-gray-700 border-b-black px-2 py-2 text-lg focus:outline-0"
            {...register("email", { required: true })}
          />
        </label>

        <label className="flex items-end gap-2">
          <div className="relative w-full">
            <p className="font-arcuata flex gap-2 text-base">
              Password
              <span className="text-red-700">*</span>
              {errors.password && (
                <p className="font-doto text-sm font-semibold text-red-700">
                  required
                </p>
              )}
            </p>
            <input
              placeholder="type your password"
              type={showPasswod ? "text" : "password"}
              className="w-full rounded-sm border-1 border-b-2 border-gray-700 border-b-black px-2 py-2 text-lg focus:outline-0"
              {...register("password", { required: true })}
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
          className="font-doto w-full cursor-pointer bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 px-2 py-1 text-sm font-extrabold text-black shadow-[0px_0px_5px_1px] shadow-amber-400 transition-all duration-200 active:scale-95"
          type="submit"
        >
          login
        </button>
      </form>
      <Link className="text-xs text-blue-950 italic" to={"/login"}>
        Already register? Login here.{" "}
      </Link>
    </div>
  );
};

export default RegisterForm;
