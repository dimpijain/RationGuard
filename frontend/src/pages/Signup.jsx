import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role:'',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      console.log(form);
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success('Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        toast.error(data.message || 'Signup failed');
      }
    } catch (err) {
      setLoading(false);
      toast.error('Server error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-4">
      <div className="w-full max-w-md bg-white shadow-md p-8 rounded-2xl">
        <h2 className="text-2xl font-semibold text-[#355070] mb-6 text-center">Create an Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#355070]"
              placeholder="Your full name"
            />
          </div>

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
          <div className="mb-4">
  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
    Select Role
  </label>
  <select
    id="role"
    name="role"
    value={form.role}
    onChange={handleChange}
    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
    required
  >
    <option value="">-- Select Role --</option>
    <option value="citizen">Citizen</option>
    <option value="shop">Shop</option>
    <option value="admin">Admin</option>
  </select>
</div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? 'bg-[#9CA3AF] cursor-not-allowed' : 'bg-[#355070] hover:bg-[#EAAC8B]'
            } transition text-white py-2 rounded-md font-semibold`}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-[#355070] font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
