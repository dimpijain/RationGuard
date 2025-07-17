import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [issueTypeFilter, setIssueTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [editForm, setEditForm] = useState({
    issueType: '',
    shopName: '',
    location: '',
    description: '',
    image: null,
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const decoded = jwtDecode(token);
    setUser(decoded);

    fetchReports(token);
  }, [navigate]);

  const fetchReports = async (token = localStorage.getItem('token')) => {
    try {
      const res = await fetch('http://localhost:5000/api/reports/mine', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setReports(data);
        setFilteredReports(data);
      } else {
        console.error(data.message || 'Failed to load reports');
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = reports;
    if (issueTypeFilter) filtered = filtered.filter(r => r.issueType === issueTypeFilter);
    if (statusFilter) filtered = filtered.filter(r => r.status === statusFilter);
    setFilteredReports(filtered);
  }, [issueTypeFilter, statusFilter, reports]);

  const openEditModal = (report) => {
    setCurrentReport(report);
    setEditForm({
      issueType: report.issueType,
      shopName: report.shopName,
      location: report.location,
      description: report.description,
      image: null,
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const submitEditReport = async () => {
    const formData = new FormData();
    formData.append('issueType', editForm.issueType);
    formData.append('shopName', editForm.shopName);
    formData.append('location', editForm.location);
    formData.append('description', editForm.description);
    if (editForm.image) formData.append('image', editForm.image);

    const response = await fetch(`http://localhost:5000/api/reports/${currentReport._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      alert('Report updated!');
      setShowEditModal(false);
      fetchReports();
    } else {
      alert(data.message || 'Failed to update');
    }
  };

  const confirmDelete = (id) => {
    setReportToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/reports/${reportToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (res.ok) {
        setReports(reports.filter(r => r._id !== reportToDelete));
        setShowDeleteConfirm(false);
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete');
      }
    } catch (err) {
      alert('Something went wrong.');
      console.error(err);
    }
  };

  return (
    <>
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <button onClick={() => navigate('/dashboard')} className="text-[#355070] font-semibold hover:underline">
          ← Go to Dashboard
        </button>
        <div className="text-[#355070] font-medium">Hello, {user?.name || 'User'}</div>
      </nav>

      <div className="min-h-screen bg-[#FAF9F6] px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#355070] mb-6">My Reported Issues</h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={issueTypeFilter}
              onChange={(e) => setIssueTypeFilter(e.target.value)}
              className="border p-2 rounded-md"
            >
              <option value="">All Issue Types</option>
              {[...new Set(reports.map(r => r.issueType))].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border p-2 rounded-md"
            >
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Reports List */}
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : filteredReports.length === 0 ? (
            <p className="text-gray-500">No reports match your filters.</p>
          ) : (
            <div className="space-y-6">
              {filteredReports.map((report) => (
                <div
                  key={report._id}
                  className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
                >
                  <h3 className="text-xl font-semibold text-[#6D597A] mb-2">{report.issueType}</h3>
                  <p className="text-gray-700 mb-1"><strong>Shop:</strong> {report.shopName}</p>
                  <p className="text-gray-700 mb-1"><strong>Location:</strong> {report.location}</p>
                  <p className="text-gray-700 mb-3"><strong>Description:</strong> {report.description}</p>
                  <p className="text-gray-500 text-sm mb-2">
                    Submitted on: {new Date(report.createdAt).toLocaleString()}
                  </p>
                  {report.imagePath && (
                    <div className="flex items-center gap-3 mt-2">
                      <img
                        src={`http://localhost:5000/uploads/${report.imagePath}`}
                        alt="Proof"
                        className="w-40 h-auto rounded border"
                      />
                      <a
                        href={`http://localhost:5000/uploads/${report.imagePath}`}
                        download
                        className="text-sm text-[#355070] underline"
                      >
                        Download
                      </a>
                    </div>
                  )}
                  <div className="flex gap-4 mt-4">
                    <button onClick={() => openEditModal(report)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => confirmDelete(report._id)} className="text-red-600 hover:underline">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg space-y-4">
            <h2 className="text-xl font-bold text-center text-[#355070]">Edit Report</h2>
            <input type="text" name="issueType" value={editForm.issueType} onChange={handleEditChange} className="w-full p-2 border rounded" placeholder="Issue Type" />
            <input type="text" name="shopName" value={editForm.shopName} onChange={handleEditChange} className="w-full p-2 border rounded" placeholder="Shop Name" />
            <input type="text" name="location" value={editForm.location} onChange={handleEditChange} className="w-full p-2 border rounded" placeholder="Location" />
            <textarea name="description" value={editForm.description} onChange={handleEditChange} className="w-full p-2 border rounded" placeholder="Description" />
            <input type="file" name="image" onChange={handleEditChange} className="w-full" />
            <div className="flex justify-end gap-4">
              <button onClick={submitEditReport} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
              <button onClick={() => setShowEditModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this report?</h3>
            <div className="flex justify-around">
              <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Yes, Delete</button>
              <button onClick={() => setShowDeleteConfirm(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
