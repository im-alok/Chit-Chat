import{ useEffect, useState } from "react";
import { FaPhone, FaVideo } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import SendMessage from "../components/Core/UserChatPage/ConversationPage/SendMessage";
import Message from "../components/Core/UserChatPage/ConversationPage/Message";
import { getChatDetails, getChatUserDetails } from "../Services/Operations/chatOperations";
import Loading from "../components/common/Loading";


const ConversationPage = () => {
  const [userData,setUserData] = useState<UserDetails | null>(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState([]);

  const { chatId } = useParams();
  const {userId} = useParams();
  useEffect(() => {
    //fetching data from api
    async function getUsers(){
      const response = await getChatUserDetails(userId!);
      setUserData(response);
      // console.log(response);
    }

    async function getChat(){
      const response = await getChatDetails(chatId!);
      // console.log(response);
      setMessage(response?.message);
    }
    
    getChat()
    getUsers()

  }, [chatId,userId]);
  

  return (
    <div className="bg-richBlack-900 h-full w-full rounded-md">
      {
        (!userData)?(<Loading />):""
      }
      <div className="bg-grid max-h-full min-h-full grid-rows-[60px_1fr_60px] w-full">
        <div className="bg-richBlack-800 grid w-full grid-cols-2 rounded-t-md p-3">
          <div className="flex gap-5 cursor-pointer"
          onClick={()=>navigate(`/userprofile/${userData?.id}`)}
          >
            <div className="">
              <img
                src={userData?.profilePic!}
                alt="user logo"
                className="object-fit rounded-full"
                width={40}
                height={40}
              />
            </div>
            <div className="font-doto flex flex-col gap-0 text-lime-100">
              <p>{userData?.firstName} {userData?.lastName}</p>
              {/* <p className="text-xs">{userData?.active}</p> */}
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
              <p className="font-doto left-1/2 absolute inset-0 top-5 hidden -translate-1/2 text-sm transition-all duration-1000 group-hover:block">
                call
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-270px)] p-5 scrollbar-hidden w-full min-h-[calc(100vh-270px)]">
          <Message messages={message}/>
          
        </div>

        <div className="rounded-b-md p-1 w-full">
          <SendMessage />
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;



interface UserDetails{
  id?:string,
  firstName?:string,
  lastName?:string,
  password?:string,
  email?:string,
  profilePic?:string,
  createdAt?:string,
  updateAt?:string | null
  otp?:string
}