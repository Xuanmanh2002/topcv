import React from 'react';
import Navbar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import { AuthProvider } from './components/auth/AuthProvider';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProfileJob from './components/job/ProfileJob';
import Job from './components/job/Job';
import CvManager from './components/application/CvManager';
import Employer from './components/employer/Employer';
import "./App.css";
import "./index.css";
import "./assets/auth/auth.css";
import "./assets/job/profileJob.css"
import "./assets/cv/cv.css"
import "./assets/cv/myCv.css"
import "./assets/employer/employer.css"
import "./assets/employer/company.css"
import "./assets/profile.css"
import "./assets/employer/listEmployer.css"
import "./assets/category/listCategory.css"
import "./assets/employer/slideEmployer.css"
import "./assets/job/jobSearch.css"
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import MyCv from './components/application/MyCv';
import Company from './components/employer/Company';
import Profile from './components/profile/Profile';
import JobNew from './components/job/JobNew';
import JobCategory from './components/job/JobCategory';
import JobLocation from './components/job/JobLocation';
import JobLocationCategory from './components/job/JobLocationCategory';
import JobSearch from './components/job/JobSearch';

const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/dang-nhap" || location.pathname === "/dang-ky"; 

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/viec-lam/:jobId" element={<ProfileJob />} />
        <Route path='/viec-lam' element={<Job/>} />
        <Route path='/quan-ly-cv' element={<CvManager/>} />
        <Route path='/cong-ty' element={<Employer />} />
        <Route path='/cv-cua-toi' element={<MyCv />} />
        <Route path='/cong-ty/:companyName' element={<Company />} />
        <Route path='/cai-dat-thong-tin-ca-nhan' element={<Profile />}/>
        <Route path='/tim-viec-lam-moi-nhat' element={<JobNew />}/>
        <Route path='/tim-viec-lam-dua-vao/:keyword' element={<JobSearch />}/>
        <Route path='/tim-viec-lam/:categoryId' element={<JobCategory />}/>
        <Route path='/tim-viec-lam-tai/:addressId' element={<JobLocation />}/>
        <Route path='/tim-viec-lam/:categoryId-tai/:addressId' element={<JobLocationCategory/>}/>
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
