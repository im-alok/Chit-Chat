import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { AuthReducer, RootReducer } from "slicetypes/index";
import Button from "../../common/Button";
import { LogOutHandler } from "../../../Services/Operations/authOperations";

const ProfileLinks = [
  {title: "Profile",to: "/profile",},
  {title: "Settings",to: "/settings",},
  {title: "Chat Page",to: "/chatapp",},
  {title: "Say, Hi to Alok!",to: "/convo",},
];

const ProfileModal = ({ openModal }: any) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  
  const navigate: NavigateFunction = useNavigate();
  const { token }: AuthReducer = useSelector((state: RootReducer) => state.auth);
  const dispatch = useDispatch();
  
  function closeModalHandler(e: any) {
    if (e.target === modalRef?.current) openModal(false);
  }
  const LoginButtonClicked = () => {
    navigate("/login")
    openModal(false)
  }

  function signOutHandler(){
    // @ts-ignore
    dispatch(LogOutHandler(navigate,dispatch))
  }

  return (
    <div
      ref={modalRef}
      onClick={(e: any) => closeModalHandler(e)}
      className="absolute inset-0 z-[100] w-screen overflow-hidden"
    >
      <motion.div
        initial={{ x: 250 }}
        animate={{ x: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.8,
          ease: "backOut",
        }}
        className="absolute top-1/5 right-1/20 z-[1000] h-[230px] w-[200px] border-2 bg-yellow-900 shadow-[0px_5px_1000px_-5px] shadow-gray-700"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-100 z-10"></div>
        <div className="items-col flex flex-col items-center justify-center gap-3 text-white z-[1000] relative">
          <div className="font-dm-sans flex flex-col gap-3 border-b-2 border-b-gray-400 p-5 text-center">
            {ProfileLinks?.map((link) => (
              <Link key={link.title} to={link.to}
                onClick={() => openModal(false)}
              >
                {link.title}
              </Link>
            ))}
          </div>

          {
            !token && (
              <Button onClick={LoginButtonClicked}>Login</Button>
            )
          }
          {/* //logout button */}
          {
            token && (
              <Button onClick={signOutHandler}>Signout</Button>
            )
          }


        </div>
      </motion.div>
    </div>
  );
};

export default ProfileModal;
