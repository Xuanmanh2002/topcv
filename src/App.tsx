import React from 'react';
import Navbar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import { AuthProvider } from './components/auth/AuthProvider';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProfileJob from './components/layout/job/ProfileJob';
import "./App.css";
import "./index.css";
import "./assets/auth/auth.css";
import "./assets/job/job.css"
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/register"; 

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/job/:jobName" element={<ProfileJob />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <main>
        <Router>
          <AppContent />
        </Router>
      </main>
    </AuthProvider>
  );
};

export default App;
