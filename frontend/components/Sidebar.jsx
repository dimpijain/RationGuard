import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { Menu, X } from 'lucide-react'; // Optional icons, install lucide-react if needed

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name);
      } catch {
        setUserName('');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Close sidebar on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <>
      {/* Hamburger icon */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 text-[#355070] focus:outline-none lg:hidden"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#355070] text-white p-6 shadow-lg z-40 transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:block`}
      >
        <h2 className="text-2xl font-bold mb-8">RationGuard</h2>
        <nav className="flex flex-col gap-4 text-lg font-medium">
          <Link to="/dashboard" className="hover:text-[#EAAC8B]">Dashboard</Link>
          <Link to="/report-issue" className="hover:text-[#EAAC8B]">Report Issue</Link>
          <Link to="/my-reports" className="hover:text-[#EAAC8B]">My Reports</Link>
        </nav>

        <div className="mt-auto pt-10 text-sm text-white">
          <p className="mb-4">👋 Hello, {userName}</p>
          <button
            onClick={handleLogout}
            className="bg-[#EAAC8B] text-[#355070] px-4 py-2 rounded-md font-semibold hover:bg-[#F4ACB7]"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Padding for content shift on large screens */}
      <div className="lg:ml-64" />
    </>
  );
}
