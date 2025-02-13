import { Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import {motion} from 'motion/react'

const App = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}

    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </motion.div>
  )
}

export default App
