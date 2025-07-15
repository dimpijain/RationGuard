import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('Loading...');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to view this page.');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setMessage('');
    } catch (err) {
      setMessage('Invalid token. Please login again.');
      localStorage.removeItem('token');
      setTimeout(() => navigate('/login'), 1500);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold text-[#355070] mb-4">Welcome to RationGuard</h1>

        {message && (
          <p className="text-red-500 font-semibold">{message}</p>
        )}

        {user && (
          <>
            <p className="text-lg text-gray-700 mb-2">👋 Hello, <strong>{user.name}</strong></p>
            <p className="text-sm text-gray-500 mb-4">📧 {user.email} | 🧩 Role: {user.role}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <button
                onClick={() => alert("Report Ration Issue clicked")}
                className="bg-[#6D597A] text-white px-6 py-3 rounded-lg shadow hover:bg-[#EAAC8B] transition"
              >
                📝 Report Ration Issue
              </button>
              <button
                onClick={() => alert("View Your Reports clicked")}
                className="bg-[#6D597A] text-white px-6 py-3 rounded-lg shadow hover:bg-[#EAAC8B] transition"
              >
                📄 View Your Reports
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="mt-8 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
