import React, { useEffect, useState } from 'react';
import {
  ClipboardDocumentListIcon,
  CheckBadgeIcon,
  ClockIcon,
  DocumentArrowDownIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [issuedCount, setIssuedCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [userName, setUserName] = useState('User');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const decoded = JSON.parse(atob(token.split('.')[1]));
    setUserName(decoded.name);

    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/reports', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setIssuedCount(data.length);
      setResolvedCount(data.filter((report) => report.status === 'resolved').length);
    } catch (err) {
      console.error('Error fetching reports:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const stats = [
    {
      name: 'Reports Issued',
      value: issuedCount,
      icon: ClipboardDocumentListIcon,
      color: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      name: 'Reports Resolved',
      value: resolvedCount,
      icon: CheckBadgeIcon,
      color: 'text-green-600 dark:text-green-400',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 dark:bg-[#171e2a]">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white dark:bg-[#1b2230] p-6 shadow-lg">
        <div className="text-2xl font-bold text-[#355070] dark:text-white mb-10">RationGuard</div>
        <nav className="space-y-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 w-full text-left font-medium text-[#355070] dark:text-white"
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => navigate('/report')}
            className="flex items-center gap-2 w-full text-left font-medium text-[#355070] dark:text-white"
          >
            📝 Report Issue
          </button>
          <button
            onClick={() => navigate('/my-reports')}
            className="flex items-center gap-2 w-full text-left font-medium text-[#355070] dark:text-white"
          >
            📝 Reports
          </button>
        </nav>
        <div className="mt-auto pt-10">
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Hello, {userName}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:underline text-sm"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-[#355070] dark:text-white mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white dark:bg-[#232d3b] p-6 rounded-xl shadow flex items-center gap-4 hover:shadow-2xl transition"
            >
              <stat.icon className={`w-10 h-10 ${stat.color}`} />
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-300">{stat.name}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
