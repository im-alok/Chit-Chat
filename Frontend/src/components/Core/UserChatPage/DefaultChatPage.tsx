import React from "react";
import { FaGithub } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const DefaultChatPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-richBlack-900 text-lime-white font-doto flex h-full w-full flex-col items-center justify-center rounded-md text-3xl">
      Welcome to Connect Chat!!
      <p className="flex gap-2">
        Take your time and Star us on GitHub
        <a href="https://github.com/im-alok/Chit-Chat" target="_blank">
          <FaGithub />
        </a>
      </p>
    </div>
  );
};

export default DefaultChatPage;
