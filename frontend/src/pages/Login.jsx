import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      
      const decoded = jwtDecode(data.token);
localStorage.setItem('token', data.token);

// 👇 Add role-based redirection
switch (decoded.role) {
  case 'admin':
    navigate('/admin-panel');
    break;
  case 'shop':
    navigate('/shop-dashboard');
    break;
  default:
    navigate('/dashboard');
}

    } else {
      setMessage(data.message || 'Login failed');
    }
  } catch (err) {
    setLoading(false);
    setMessage('Server error. Please try again later.');
  }
};

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-4">
      <div className="w-full max-w-md bg-white shadow-md p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold text-[#355070] mb-6 text-center">Login to RationGuard</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#355070]"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#355070]"
              placeholder="••••••••"
            />
          </div>

          <button
  type="submit"
  disabled={loading}
  className="w-full bg-[#355070] hover:bg-[#EAAC8B] transition text-white py-2 rounded-md font-semibold"
>
  {loading ? 'Logging in...' : 'Login'}
</button>

        </form>

        {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{' '}
          <a href="/signup" className="text-[#355070] font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
