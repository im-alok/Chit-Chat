import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserChat } from "../../../Services/Operations/chatOperations";
import Loading from "../../common/Loading";


const Userfriend = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userChats } = useSelector((state: any) => state.chat);

  useEffect(() => {
    const fetchData = async () => {
      await getUserChat(dispatch);
    };

    fetchData();
  }, []);

  if(userChats.length <=0){
    return (<div className="max-h-full min-h-full font-dm-sans bg-richBlack-900 flex w-full flex-col gap-[2px] rounded-md justify-center items-center"><Loading /></div>)
  }

  return (
    <div className="max-h-full min-h-full font-dm-sans bg-richBlack-900 flex w-full flex-col gap-[2px] rounded-md">
      {userChats?.map((chat: any, index: any) => (
        <div
          className="bg-richBlack-800 flex cursor-pointer items-center gap-2 rounded-md border-2 border-neutral-900 p-5 text-lime-100 inset-shadow-2xs inset-shadow-neutral-600 transition-normal duration-200 hover:scale-[101%] hover:shadow-[0px_0px_5px_1px_#171717]"
          key={index}
          onClick={() => navigate(`/chatapp/${chat?.chatId}`)}
        >
          <div className="rounded-full border-2 border-amber-950">
            <img
              src={chat?.Chat?.members[0]?.User?.profilePic}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="w-full">
            <p>{chat?.Chat?.members[0]?.User?.firstName} {chat?.Chat?.members[0]?.User?.lastName}</p>
            <div className="flex w-full justify-between gap-2 text-xs">
              {
                chat?.LatestMessage?.createdAt ? (<p>{chat?.LatestMessage?.message}</p>) :(<p className="italic text-xs">click here start conversation.</p>)
              }
              {
                chat?.LatestMessage?.createdAt ? (<p>{chat?.LatestMessage?.createdAt}</p>) :("")
              }

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Userfriend;
