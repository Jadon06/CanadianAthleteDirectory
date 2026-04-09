import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import Home from "./pages/home"
import Sign_up from "./pages/sign_up"
import Login from "./pages/login.tsx"
import Verify from "./pages/verify.tsx"
import Feed from "./pages/feed.tsx"
import Profile from "./pages/profile.tsx"
import VerifyCreateAndLogin from "./pages/verifyAndCreate.tsx"
import Messages from "./pages/messages.tsx"
import SearchResults from "./pages/search_results.tsx"
import Notifications from "./pages/notifications.tsx"
import Analytics from "./pages/analytics.tsx"
import Connections from "./pages/connections.tsx"
import { navigateToOwnDashboard } from './utils/dashboardRoute'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "react-datepicker/dist/react-datepicker.css";

import "./App.css"

function DashboardLegacyRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    void navigateToOwnDashboard(navigate)
  }, [navigate])

  return null
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<Sign_up />} />
      <Route path="/login/" element={<Login />} />
      <Route path="/verify/" element={<Verify />}/>
      <Route path="/feed/" element={<Feed />}/>
      <Route path="/dashboard" element={<DashboardLegacyRedirect />}/>
      <Route path="/dashboard/" element={<DashboardLegacyRedirect />}/>
      <Route path="/dashboard/:username" element={<Profile />}/>
      <Route path="/verifyandcreate/:token" element={<VerifyCreateAndLogin />}/>
      <Route path="/messages/" element={<Messages />}/>
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/connections" element={<Connections />} />
    </Routes>
  )
}

export default App
