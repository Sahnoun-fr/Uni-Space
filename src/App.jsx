import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Home.jsx";
import About from "./pages/About";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Dashboard from "./pages/DashboardFinal.jsx";
import InteractiveMaps from "./pages/InteractiveMaps";
import Settings from "./pages/Settings";
import Profile from "./pages/ProfileNew.jsx";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interactive-maps" element={<InteractiveMaps />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/history" element={<History />} />
        
        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;