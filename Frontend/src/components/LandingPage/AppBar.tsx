import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import ProfileModal from "../ProfileModal/ProfileModal";

const NavLinks = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "About",
    to: "/about",
  },
  {
    title: "Github",
    to: "/github",
  },
];

const AppBar = () => {
  const [link, setLink] = useState<String | null>("Home");
  const [openProfile, setOpenProfile] = useState<Boolean | null>(false);

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-[50px] border-b-1 border-[#1e2c3b] bg-[url('/assets/bg-blue-gray.webp')] bg-cover shadow shadow-[#1e2c3b]"
      >
        <div className="mx-auto flex w-11/12 items-center justify-between p-2">
          <motion.h1
            initial={{
              x: -300,
            }}
            animate={{
              x: 0,
            }}
            transition={{
              delay: 0,
              duration: 0.5,
              ease: "anticipate",
            }}
            className="font-doto text-lime-white cursor-pointer text-3xl font-extrabold transition-all duration-1000"
          >
            Connect Chat{" "}
          </motion.h1>

          <>
            <ul className="text-lime-white font-dm-sans hidden gap-7 sm:flex">
              {NavLinks?.map((navLink) => (
                <li className="group relative z-[100] flex w-fit p-2">
                  {/* Centered Div */}
                  <div
                    className={` ${link === navLink.title ? "flex" : "hidden"} absolute top-9 left-1/2 h-5 w-3 -translate-x-1/2 rotate-[45deg] bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 shadow-[0px_0px_50px_10px] shadow-amber-400 group-hover:flex`}
                  ></div>

                  {/* Link Text */}
                  <Link to={navLink.to} onClick={() => setLink(navLink.title)}>
                    {navLink.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
          <div>
            {!openProfile && (
              <div
                className="cursor-pointer text-3xl text-gray-500"
                onClick={() => {
                  setOpenProfile(true);
                }}
              >
                <GoTriangleUp />
              </div>
            )}
            {openProfile && (
              <div
                className="cursor-pointer text-3xl text-gray-500"
                onClick={() => {
                  setOpenProfile(false);
                }}
              >
                <GoTriangleDown />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {openProfile && <ProfileModal openModal={setOpenProfile} />}
    </div>
  );
};

export default AppBar;
