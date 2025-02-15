import React from "react";
import AppBar from "./LandingPage/AppBar";
import MainSection from "./LandingPage/MainSection";
import { motion } from "motion/react";

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen min-w-screen overflow-hidden bg-black"
    >
      <AppBar />
      <MainSection />
    </motion.div>
  );
};

export default LandingPage;
