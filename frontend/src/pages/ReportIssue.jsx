import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';
import './download.jpeg'
import Sidebar from '../../components/Sidebar';
export default function ReportIssue() {
  const [form, setForm] = useState({
    issueType: '',
    shopName: '',
    location: '',
    description: '',
    image: null,
  });

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to report an issue.');
      return navigate('/login');
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      toast.error('Invalid token. Redirecting...');
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Not authenticated.');
      return navigate('/login');
    }

    const formData = new FormData();
  formData.append('issueType', form.issueType);
  formData.append('shopName', form.shopName);
  formData.append('location', form.location);
  formData.append('description', form.description);
  if (form.image) {
    formData.append('image', form.image);
  }

    try {
      const res = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Issue reported successfully!');
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Submission failed.');
      }
    } catch (err) {
      toast.error('Server error.');
    }
  };

  return (
    <> 
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col">
      {/* Navbar */}
     
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-[#355070] font-semibold hover:underline"
        >
          ← Go to Dashboard
        </button>
        <div className="text-[#355070] font-medium">
          Hello, {user?.name || 'User'}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:flex-row items-stretch">
        {/* Left Form Section */}
        <div className="flex-[1.3] px-10 py-10 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#355070] mb-6">Report your Issue</h2>

          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <div>
              <label className="block font-medium mb-1">Issue Type</label>
              <select
                name="issueType"
                value={form.issueType}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded-md"
              >
                <option value="">-- Select Issue --</option>
                <option value="Shortage">Shortage</option>
                <option value="Overpricing">Overpricing</option>
                <option value="Corruption">Corruption</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Shop Name </label>
              <input
                type="text"
                name="shopName"
                value={form.shopName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="e.g., Sai Ration Store"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Location </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="e.g., Sector 15, Delhi"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Describe the issue..."
                required
              />
            </div>

            <div>
  <label className="block font-medium mb-1">Upload Proof (optional)</label>
  <div className="flex items-center space-x-4">
    <div className="relative">
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
      <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md cursor-pointer">
        Choose File
      </div>
    </div>
    <span className="text-gray-600 text-sm">
      {form.image ? form.image.name : 'No file chosen'}
    </span>
  </div>
</div>

        <div className='flex justify-center mt-6'>
            <button
              type="submit"
              className="w-40 bg-[#355070] hover:bg-[#EAAC8B] text-white font-semibold py-2 rounded-md transition "
            >
              Submit Report
            </button>
         
        </div>
         </form>
        </div>

        {/* Right Side Image */}
        <div className="hidden lg:flex flex-1 items-center justify-center bg-[#F0EEF1]">
          <img
            src="https://resize.indiatvnews.com/en/resize/oldbucket/1200_-/mainnational/IndiaTv43a995_Villagers-seek-46890.jpg"
            className="max-w-[80%] h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
     </>
  );
}
