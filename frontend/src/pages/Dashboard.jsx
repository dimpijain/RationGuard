import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


export default function Dashboard() {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('Loading...');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      setMessage('You must be logged in to view this page.');
      setTimeout(() => navigate('/'), 1500);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      console.log(decoded)
      setData({
        name: decoded.name,
        email: decoded.email,
        userId: decoded.id,
        role: decoded.role,

      });
      

      setMessage('');
    } catch (err) {
      setMessage('Invalid token. Redirecting to login...');
      localStorage.removeItem('token');
      setTimeout(() => navigate('/'), 1500);
    }

    //Optional: Call protected API as well (if needed later)
    // fetch('http://localhost:5000/api/protected/dashboard', {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then(async (res) => {
    //     if (res.status === 401 || res.status === 403) {
    //       setMessage('Unauthorized. Redirecting to login...');
    //       localStorage.removeItem('token');
    //       setTimeout(() => navigate('/login'), 1500);
    //       return;
    //     }
    //     const responseData = await res.json();
    //     if (!res.ok) {
    //       setMessage(responseData.message || 'Failed to fetch data');
    //     }
    //   })
      // .catch(() => setMessage('Network error. Please try again.'));
  }, [navigate]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] px-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-md text-center">
        <h2 className="text-3xl font-bold text-[#355070] mb-6">Dashboard</h2>

        {message && (
          <p className="text-red-600 text-lg font-semibold mb-4">{message}</p>
        )}

        {data && (
          <>
            <p className="text-lg mb-2">
              🎉 Welcome back, <strong>{data.name}</strong>!
            </p>
            <p className="text-gray-700">Email: <strong>{data.email}</strong></p>
            <p className="text-sm mt-4 text-gray-500">User ID: {data.userId}</p>
            <p className="text-gray-700">Role: <strong>{data.role}</strong></p>

            <button
              onClick={handleLogout}
              className="mt-8 bg-[#355070] hover:bg-[#EAAC8B] text-white py-2 px-6 rounded-md font-semibold transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}


