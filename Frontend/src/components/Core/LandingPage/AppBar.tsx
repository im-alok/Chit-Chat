import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import ProfileModal from "../ProfileModal/ProfileModal";

// Navigation Links Array
const NavLinks = [
  { title: "Home", to: "/" },
  { title: "About", to: "/about" },
  { title: "Github", to: "/github" },
];

const AppBar = () => {
  // State to track active navigation link
  const [link, setLink] = useState<string | null>("Home");

  // State to toggle the profile modal
  const [openProfile, setOpenProfile] = useState<boolean>(false);

  return (
    <div className="overflow-hidden shadow-[0px_0px_100px_2px] shadow-[#1e2c3b]">
      {/* Animated Navbar Container */}
      <motion.div
        initial={{ opacity: 0, scale: 5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-[60px] border-b-2 border-[#1e2c3b] bg-[url('/assets/bg-blue-gray.webp')] bg-cover"
      >
        <div className="mx-auto flex w-11/12 items-center justify-between p-2">
          {/* Animated Title */}
          <motion.h1
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ delay: 0, duration: 0.5, ease: "anticipate" }}
            className="font-doto text-lime-white cursor-pointer text-3xl font-extrabold transition-all duration-1000"
          >
            Connect Chat
          </motion.h1>

          {/* Navigation Links */}
          <ul className="text-lime-white font-dm-sans hidden gap-7 sm:flex">
            {NavLinks.map((navLink) => (
              <li
                key={navLink.title}
                className="group relative z-[100] flex w-fit p-2"
              >
                {/* Highlight indicator for active link */}
                <div
                  className={` ${link === navLink.title ? "flex" : "hidden"} absolute top-10 left-1/2 h-7 w-7 -translate-x-1/2 rotate-[45deg] bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 shadow-[0px_0px_50px_10px] shadow-amber-400 group-hover:flex`}
                ></div>

                {/* Clickable Link */}
                <Link to={navLink.to} onClick={() => setLink(navLink.title)}>
                  {navLink.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Profile Icon Toggle */}
          <div>
            {!openProfile ? (
              <GoTriangleUp
                className="cursor-pointer text-3xl text-gray-500"
                onClick={() => setOpenProfile(true)}
              />
            ) : (
              <GoTriangleDown
                className="cursor-pointer text-3xl text-gray-500"
                onClick={() => setOpenProfile(false)}
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* Profile Modal (Only renders when open) */}
      {openProfile && <ProfileModal openModal={setOpenProfile} />}
    </div>
  );
};

export default AppBar;
