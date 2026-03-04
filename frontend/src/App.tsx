import { Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Sign_up from "./pages/sign_up"
import Login from "./pages/login.tsx"
import Verify from "./pages/verify.tsx"
import Feed from "./pages/feed.tsx"
import Profile from "./pages/profile.tsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<Sign_up />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/verify" element={<Verify />}/>
      <Route path="/feed" element={<Feed />}/>
      <Route path="/profile" element={<Profile />}/>
    </Routes>
  )
}

export default App
