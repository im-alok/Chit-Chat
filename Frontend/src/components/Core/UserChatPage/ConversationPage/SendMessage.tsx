import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { sendMessage } from "../../../../Services/Operations/chatOperations";
import toast from "react-hot-toast";

const SendMessage = () => {
  const [message, setMessage] = useState<string>("");
  const {chatId} = useParams();

  const changeHandler = (e: any) => {
    const value = e.target.value;
    setMessage(value);
  };

  async function submitHandler(e:any){
    e.preventDefault();
    await sendMessage(message,chatId!);

    setMessage("");
  }


  return (
    <div>
      <form className="flex gap-3"
      onSubmit={(e)=>submitHandler(e)}
      >
        <input
          id="sendMessage"
          name="sendMessage"
          placeholder="Type your message"
          value={message}
          onChange={(e) => changeHandler(e)}
          className="bg-richBlack-700 font-arcuata w-full rounded-lg p-3 text-lime-50 focus:outline-0"
        />

        <button
          className="mr-2 cursor-pointer rounded-full bg-green-500 p-3 transition-all duration-150 hover:bg-green-600 active:scale-90"
          type="submit"
        >
          <div className="text-xl text-lime-50">
            <IoSend />
          </div>
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
