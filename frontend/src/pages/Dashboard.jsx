import React, { useEffect, useState } from 'react';
import {
  ClipboardDocumentListIcon,
  CheckBadgeIcon,
  ArrowRightOnRectangleIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
      setResolvedCount(data.filter((r) => r.status === 'resolved').length);
    } catch (err) {
      console.error('Error fetching reports:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', onClick: () => navigate('/dashboard') },
    { label: 'Report Issue', onClick: () => navigate('/report') },
    { label: 'My Reports', onClick: () => navigate('/my-reports') },
  ];

  const stats = [
    {
      name: 'Reports Issued',
      value: issuedCount,
      icon: ClipboardDocumentListIcon,
      color: 'text-[#6D597A]',
    },
    {
      name: 'Reports Resolved',
      value: resolvedCount,
      icon: CheckBadgeIcon,
      color: 'text-[#B56576]',
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#FAF9F6] text-[#355070] font-sans">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-white shadow-lg transition-all duration-300
          ${sidebarCollapsed ? 'w-20' : 'w-64'}`}
        style={{ minHeight: '100vh' }}
      >
        {/* Logo and toggle */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-[#355070] leading-none">
                RationGuard
              </span>
              <span className="text-lg font-semibold text-[#B56576] mt-1">Hi, {userName}</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="text-[#355070] hover:text-[#EAAC8B] transition"
          >
            {sidebarCollapsed ? (
              <ChevronDoubleRightIcon className="w-6 h-6" />
            ) : (
              <ChevronDoubleLeftIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-8 space-y-8 px-4">
          {navItems.map(({ label, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className="flex items-center gap-4 px-3 py-3 rounded-md text-[#355070] font-medium hover:bg-[#EAAC8B] hover:text-white transition"
            >
              {!sidebarCollapsed ? label : label.charAt(0)}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto p-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-[#B56576] text-lg font-semibold hover:bg-[#B56576] hover:text-white transition"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-8 text-[#355070]">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white p-8 rounded-xl shadow flex items-center gap-6 hover:shadow-2xl transition"
            >
              <stat.icon className={`w-12 h-12 ${stat.color}`} />
              <div>
                <div className="text-4xl font-bold text-[#355070]">{stat.value}</div>
                <div className="text-lg text-[#6D597A]">{stat.name}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
