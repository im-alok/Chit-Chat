import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";

const ProfileLinks = [
  {
    title: "Profile",
    to: "/profile",
  },
  {
    title: "Settings",
    to: "/settings",
  },
  {
    title: "Chat Page",
    to: "/chatapp",
  },
  {
    title: "Say, Hi to Alok!",
    to: "/convo",
  },
];

const ProfileModal = ({ openModal }: any) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  function closeModalHandler(e: any) {
    if (e.target === modalRef?.current) openModal(false);
  }

  const navigate = useNavigate();

  return (
    <div
      ref={modalRef}
      onClick={(e: any) => closeModalHandler(e)}
      className="absolute inset-0 z-[1000] w-screen overflow-hidden"
    >
      <motion.div
        initial={{ x: 250 }}
        animate={{ x: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.8,
          ease: "backOut",
        }}
        className="absolute top-1/5 right-1/20 z-[100] h-[230px] w-[200px] border-2 bg-[url('assets/bg-blue-gray.webp')] shadow-[0px_5px_1000px_-5px] shadow-gray-700 backdrop-opacity-100"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80"></div>
        <div className="items-col z-[1000] flex flex-col items-center justify-center gap-3 text-white backdrop-opacity-100">
          <div className="font-dm-sans flex flex-col gap-3 border-b-2 border-b-gray-400 p-5 text-center">
            {ProfileLinks?.map((link) => (
              <Link key={link.title} to={link.to}>
                {link.title}
              </Link>
            ))}
          </div>

          <button
            onClick={() => navigate("/login")}
            className="font-doto animate-pulse cursor-pointer bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 px-2 py-1 text-sm font-extrabold text-black shadow-[0px_0px_5px_1px] shadow-amber-400 transition-all duration-1000"
          >
            Login
          </button>

          {/* //logout button */}
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileModal;
