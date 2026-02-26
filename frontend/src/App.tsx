import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Sign_up from "./pages/sign_up"
import Sign_in from "./pages/sign_in"

import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<Sign_up />} />
      <Route path="/sign-in" element={<Sign_in />} />
    </Routes>
  )
}

export default App
