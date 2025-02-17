import React from "react";
import HighLightedText from "./HighLightedText";
import { motion } from "motion/react";
import WoodenBackground from "./Wooden-Background";
import LoginForm from "../Core/Auth/Forms/LoginForm";
import RegisterForm from "../Core/Auth/Forms/RegisterForm";
const Template = ({ Title, formType }: { Title: string; formType: string }) => {
  return (
    <div>
      <WoodenBackground>
        <div className="mx-auto flex h-screen w-screen max-w-8/12 items-center justify-center">
          <motion.div
            initial={{ y: -15 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1, duration: 1, ease: "anticipate" }}
            className="flex h-fit w-fit flex-col items-center justify-center gap-10 rounded-2xl bg-[url('/assets/bg-black.webp')] bg-cover p-7 inset-shadow-2xs shadow-2xl shadow-black inset-shadow-amber-200 sm:flex-row"
          >
            <motion.div
              initial={{ filter: "blur(20px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={{ delay: 0.1, duration: 1.5, ease: "circIn" }}
              className=""
            >
              <HighLightedText customclasses="sm:text-4xl text-xl">
                {Title}
              </HighLightedText>
            </motion.div>

            <div className="flex-1">
              {formType === "login" ? <LoginForm /> : <RegisterForm />}
            </div>
          </motion.div>
        </div>
      </WoodenBackground>
    </div>
  );
};

export default Template;
