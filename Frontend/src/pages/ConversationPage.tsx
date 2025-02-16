import React, { useEffect } from "react";
import { FaPhone, FaVideo } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import SendMessage from "../components/Core/UserChatPage/ConversationPage/SendMessage";
import Message from "../components/Core/UserChatPage/ConversationPage/Message";

const userData = {
  name: "Alok Ranjan",
  latestMessage: {
    message: "Click here to begin time",
    createdAt: "19/11/025",
  },
  profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  active: "online",
};

const ConversationPage = () => {
  const { id } = useParams();
  useEffect(() => {
    //fetching data from api
  }, [id]);

  return (
    <div className="bg-richBlack-900 h-full w-full rounded-md">
      <div className="bg- grid max-h-full min-h-full grid-rows-[60px_1fr_60px]">
        <div className="bg-richBlack-800 grid w-full grid-cols-2 rounded-t-md p-3">
          <div className="flex gap-5">
            <div className="cursor-pointer">
              <img
                src={userData?.profilepic}
                alt="user logo"
                className="object-fit rounded-full"
                width={40}
                height={40}
              />
            </div>
            <div className="font-doto flex flex-col gap-0 text-lime-100">
              <p>{userData?.name}</p>
              <p className="text-xs">{userData?.active}</p>
            </div>
          </div>
          <div className="mr-5 flex flex-row-reverse items-center gap-10 text-xl text-lime-100">
            <div className="group relative cursor-pointer">
              <FaVideo />
              <p className="font-doto absolute inset-0 top-5 left-1/2 hidden -translate-1/2 text-sm group-hover:block">
                video
              </p>
            </div>
            <div className="group relative cursor-pointer">
              <FaPhone className="" />
              <p className="font-doto eft-1/2 absolute inset-0 top-5 hidden -translate-1/2 text-sm transition-all duration-1000 group-hover:block">
                call
              </p>
            </div>
          </div>
        </div>
        <div>
          <Message />
        </div>
        <div className="rounded-b-md p-1">
          <SendMessage />
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
