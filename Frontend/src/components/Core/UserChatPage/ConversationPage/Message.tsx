import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { timeFormatter } from "../../../../utils/dateAndTimeFormatter";

const Message = ({ messages }: any) => {
  const { userId } = useParams();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom of the specific div when messages change
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages]);

  return (
    <div className="h-full">
      <div
      ref={containerRef} 
      className="flex flex-col gap-3 w-full max-h-[450px] overflow-y-auto  scrollbar-hidden"
    >
      {messages.map((message: any, index: number) => (
        <div
          key={index}
          className={`flex ${
            message.senderId === userId ? "justify-start" : "justify-end"
          } gap-1`}
        >
          <div
            className={`text-richBlack-700 p-1 px-3 rounded-xl overflow-hidden break-words max-w-[70%] 
              ${message.senderId === userId ? "bg-lime-200 text-richBlack-900" : "bg-green-700 text-white"} border-1 border-yellow-500`}
          >
            {message?.message}
          </div>
          <p className="text-[7px] text-lime-100 self-end">
            {timeFormatter(message.createdAt)}
          </p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Message;
