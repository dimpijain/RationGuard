import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ShopDashboard from './pages/ShopDashboard';
import AdminPanel from './pages/AdminPanel';

import ReportIssue from './pages/ReportIssue';
import MyReports from './pages/MyReports';
function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Add more routes here as needed */}
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/admin-panel" element={<AdminPanel/>}/>
          <Route path="/shop-dashboard" element={<ShopDashboard/>}/>
          <Route path="/report" element={<ReportIssue/>}/>
          <Route path="/my-reports" element={<MyReports />} />

        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </>
    </Router>
  );
}

export default App;
