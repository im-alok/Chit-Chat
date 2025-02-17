import{ useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RegisterUser, sendOTP } from "../../../../Services/Operations/authOperations";
import { useNavigate } from "react-router-dom";
import { RiResetRightFill } from "react-icons/ri";

const OTPForm = ({ length }: { length: number }) => {
  const [input, setInput] = useState<string[]>(new Array(length).fill(""));
  const [otp,setOtp] = useState<String>("");
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(false);
  const { userRegistrationDetails } = useSelector((state: any) => state.auth)

  const inputRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRef?.current[0]?.focus();
  }, []);

  const changeHandler = (e: any, index: number) => {
    const value = e.target.value;

    if (isNaN(value)) {
      return;
    }
    const newInputValues = [...input];
    newInputValues[index] = value.substring(value.length - 1);
    setInput(newInputValues);

    const otp = newInputValues.join("");

    if (otp.length === length) {
      setActiveButton(true);
      setOtp(otp)
    }
    if (value && index < length - 1 && inputRef?.current[index + 1])
      inputRef?.current[index + 1].focus();
  };

  const keyDownHandler = (e: any, index: any) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      !input[index] &&
      inputRef?.current[index - 1]
    )
      inputRef?.current[index - 1].focus();

    if (e.key == "Backspace") setActiveButton(false);
  };

  const clickHandler = (index: number) => {
    inputRef?.current[index].setSelectionRange(1, 1);
  };

  async function onClickHandler(e:any){
    const data = {...userRegistrationDetails, OTP:otp};
    await RegisterUser(data,navigate)
  }
  async function sendOtpAgain(){
    await sendOTP({email:userRegistrationDetails.email},navigate)
  }

  return (
    <div className="flex flex-col  gap-3">
      <div className="flex flex-col items-center justify-center gap-10">
        
        <div className="flex gap-7">
          {input?.map((value, index) => (
            <input
              key={index}
              ref={(input) => {
                !input ? "" : (inputRef.current[index] = input);
              }}
              value={value}
              onChange={(e: any) => changeHandler(e, index)}
              onKeyDown={(e: any) => keyDownHandler(e, index)}
              onClick={() => clickHandler(index)}
              className="h-16 w-16 rounded-full border-2 border-white text-center text-4xl text-amber-50 focus:border-amber-300 focus:outline-none"
            />
          ))}
        </div>

        <button
          className={`font-arcuata bg-gradient-to-r px-20 py-2 text-lg shadow-[0px_0px_5px_1px] shadow-amber-400 focus:outline-0 ${activeButton ? "cursor-pointer from-amber-200 via-amber-400 to-amber-500 text-black active:scale-95" : "cursor-not-allowed text-white"}`}
          type="submit"
          disabled={!activeButton}
          onClick={(e:any)=>onClickHandler(e)}
        >
          Verify Email
        </button>
      </div>
      <div className="flex items-center justify-center text-sm gap-1 cursor-pointer"
      onClick={()=>sendOtpAgain()}
      >
        <RiResetRightFill />
        resend
      </div>
    </div>
  );
};

export default OTPForm;
