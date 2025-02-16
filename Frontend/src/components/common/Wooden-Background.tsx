import React from "react";
import { motion } from "motion/react";

const WoodenBackground = ({ children,customclasses }: any) => {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-[url('/assets/bg-blue-gray.webp')] bg-cover ${customclasses}`}>
      <motion.div
        initial={{
          opacity: 0,
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
        }}
        transition={{
          delay: 0.3,
          duration: 2,
          ease: "backIn",
        }}
        className="absolute z-0 h-screen w-screen bg-[url('/assets/wooden.webp')]"
      ></motion.div>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.3,
          duration: 1,
          ease: "backIn",
        }}
        className="inset-0 z-0 h-[220vh] w-[220vh] rotate-90 bg-[url('/assets/wooden.webp')]"
      ></motion.div>

      <div className="absolute inset-0 h-screen w-screen bg-gradient-to-r from-black via-transparent to-black opacity-35"></div>

      <div className="absolute inset-0">{children}</div>
    </div>
  );
};

export default WoodenBackground;
