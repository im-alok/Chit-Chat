import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { motion } from "motion/react";
import Login from "./components/Core/Auth/Login";
import Register from "./components/Core/Auth/Register";
import OTP from "./components/Core/Auth/OTP";
import UserChatPage from "./pages/UserChatPage";
import AppBar from "./components/Core/LandingPage/AppBar";
import ConversationPage from "./pages/ConversationPage";
import DefaultChatPage from "./components/Core/UserChatPage/DefaultChatPage";

const App = () => {
  return (
    <motion.div className="w-screen h-screen bg-cover bg-black bg-no-repeat overflow-hidden">
      <AppBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/chatapp" element={<UserChatPage />}>
          <Route index element={<DefaultChatPage />}/>
          <Route path="/chatapp/:id" element={<ConversationPage />}/>
          
        </Route>
      </Routes>
    </motion.div>
  );
};

export default App;
