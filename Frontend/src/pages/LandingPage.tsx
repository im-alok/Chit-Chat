import { motion } from "motion/react";
import MainSection from "../components/Core/LandingPage/MainSection";

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className=""
    >
      <MainSection />
    </motion.div>
  );
};

export default LandingPage;
