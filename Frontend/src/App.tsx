import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { motion } from "motion/react";
import Login from "./components/Core/Auth/Login";
import Register from "./components/Core/Auth/Register";
import OTP from "./components/Core/Auth/OTP";
import UserChatPage from "./pages/UserChatPage";
import AppBar from "./components/Core/LandingPage/AppBar";
import ConversationPage from "./pages/ConversationPage";
import DefaultChatPage from "./components/Core/UserChatPage/DefaultChatPage";
import { useSelector } from "react-redux";
import OpenRoute from "./components/Security/OpenRoute";
import PrivateRoute from "./components/Security/PrivateRoute";

const App = () => {

  const { token } = useSelector((state: any) => state.auth);
  const { userRegistrationDetails } = useSelector((state: any) => state.auth)

  return (
    <motion.div className="h-screen w-screen overflow-hidden bg-black bg-cover bg-no-repeat">
      <AppBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/signup" element={<OpenRoute><Register /></OpenRoute>} />
        <Route path="/otp" element={userRegistrationDetails ? (<OTP />):(<Navigate to={'/signup'} />)} />
        <Route path="/chatapp" element={<PrivateRoute><UserChatPage /></PrivateRoute>}>
          <Route index element={<PrivateRoute><DefaultChatPage /></PrivateRoute>} />
          <Route path="/chatapp/:userId/:chatId" element={<PrivateRoute><ConversationPage /></PrivateRoute>} />
        </Route>
      </Routes>
    </motion.div>
  );
};

export default App;
