import React from "react";
import SearchUser from "../components/Core/UserChatPage/SearchUser";
import WoodenBackground from "../components/common/Wooden-Background";
import Userfriend from "../components/Core/UserChatPage/Userfriend";
import { Outlet } from "react-router-dom";

const UserChatPage = () => {
  return (
    <div className="grid h-[calc(100vh-70px)] grid-rows-[40px_1fr] gap-1 p-1">
      <div className="flex items-center justify-center">
        <SearchUser />
      </div>
      <WoodenBackground customclasses={""}>
        <div className="m-1 grid max-h-[calc(100vh-135px)] min-h-[calc(100vh-120px)] grid-cols-1 gap-2 p-1 sm:grid-cols-[350px_1fr]">
          {/* <div className='absolute bg-gradient-to-r from-black via-transparent to-black opacity-50 inset0 w-full h-full z-0'></div> */}

          <div className="scrollbar-hidden relative z-10 max-h-[calc(100vh-135px)] items-center justify-center overflow-scroll">
            <Userfriend />
          </div>
          <div className="border-richBlack-800 z-10 hidden max-h-[calc(100vh-135px)] min-h-[calc(100vh-135px)] items-center justify-center rounded-md border-1 sm:flex">
            <Outlet />
          </div>
        </div>
      </WoodenBackground>
    </div>
  );
};

export default UserChatPage;
