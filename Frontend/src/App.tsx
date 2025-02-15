import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import { motion } from "motion/react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

const App = () => {
  return (
    <motion.div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </motion.div>
  );
};

export default App;
