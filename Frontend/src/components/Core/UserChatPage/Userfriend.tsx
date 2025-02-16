import React from "react";
import { useNavigate } from "react-router-dom";

const data = [
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
  {
    name: "Alok Ranjan",
    latestMessage: {
      message: "Click here to begin time",
      createdAt: "19/11/025",
    },
    profilepic: `https://api.dicebear.com/5.x/initials/svg?seed=AlokRanjan`,
  },
];

const Userfriend = () => {
  const navigate = useNavigate();

  return (
    <div className="font-dm-sans bg-richBlack-900 flex w-full flex-col gap-[2px]">
      {data?.map((friend, index) => (
        <div
          className="bg-richBlack-800 flex cursor-pointer items-center gap-2 rounded-md border-2 border-neutral-900 p-5 text-lime-100 inset-shadow-2xs inset-shadow-neutral-600 transition-normal duration-200 hover:scale-[101%] hover:shadow-[0px_0px_5px_1px_#171717]"
          key={index}
          onClick={() => navigate("/chatapp/sdsds")}
        >
          <div className="rounded-full border-2 border-amber-950">
            <img
              src={friend?.profilepic}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="w-full">
            <p>{friend?.name}</p>
            <div className="flex w-full justify-between gap-2 text-xs">
              <p className="italic">{friend.latestMessage.message}</p>
              <p>{friend.latestMessage.createdAt}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Userfriend;
