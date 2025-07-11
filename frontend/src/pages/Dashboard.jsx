import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState('Loading...');
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setMsg('You must be logged in to view this page.');
      return;
    }

    fetch('http://localhost:5000/api/protected/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message && data.userId) {
          setData(data);
        } else {
          setMsg(data.message || 'Failed to fetch data');
        }
      })
      .catch(() => setMsg('Error fetching data'));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-[#355070] mb-4">Dashboard</h2>
        {data ? (
          <p className="text-md">Hello user! 🎉<br />Your user ID: <strong>{data.userId}</strong></p>
        ) : (
          <p className="text-red-600">{msg}</p>
        )}
      </div>
    </div>
  );
}
