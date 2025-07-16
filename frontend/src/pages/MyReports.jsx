import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return navigate('/login');
      }

      try {
        const res = await fetch('http://localhost:5000/api/reports/mine', {
          headers: {
            Authorization: `Bearer ${token}`,
          

          },
        });
          console.log("Token used:", token);

        const data = await res.json();

        if (res.ok) {
          setReports(data);
        } else {
          console.error(data.message || 'Failed to load reports');
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [navigate]);

  return (
    <> <Sidebar/>
    <div className="min-h-screen bg-[#FAF9F6] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-[#355070] mb-6">My Reported Issues</h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : reports.length === 0 ? (
          <p className="text-gray-500">You haven’t reported any issues yet.</p>
        ) : (
          <div className="space-y-6">
            {reports.map((report) => (
              <div
                key={report._id}
                className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-[#6D597A] mb-2">
                  {report.issueType}
                </h3>
                <p className="text-gray-700 mb-1">
                  <strong>Shop:</strong> {report.shopName || 'Not specified'}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Location:</strong> {report.location || 'Not specified'}
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Description:</strong> {report.description}
                </p>
                <p className="text-gray-500 text-sm mb-2">
                  Submitted on: {new Date(report.createdAt).toLocaleString()}
                </p>
                {report.imagePath && (
                  <img
                    src={`http://localhost:5000/uploads/${report.imagePath}`}
                    alt="Proof"
                    className="w-64 h-auto mt-2 rounded-md border"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
