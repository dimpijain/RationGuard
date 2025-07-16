import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

export default function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

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

  return (
    <nav className="bg-[#355070] text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-6 font-semibold">
        <Link to="/dashboard" className="hover:text-[#EAAC8B] transition">
          Dashboard
        </Link>
        <Link to="/report-issue" className="hover:text-[#EAAC8B] transition">
          Report Issue
        </Link>
        <Link to="/my-reports" className="hover:text-[#EAAC8B] transition">
          My Reports
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {userName && <span className="font-medium">Hello, {userName}</span>}
        <button
          onClick={handleLogout}
          className="bg-[#EAAC8B] text-[#355070] px-4 py-1 rounded-md font-medium hover:bg-[#F4ACB7] transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
