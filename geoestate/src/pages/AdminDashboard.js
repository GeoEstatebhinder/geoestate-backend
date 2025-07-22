import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/properties', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperties(res.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/upload?id=${id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property._id} className="border p-4 rounded shadow">
            <img
              src={property.image}
              alt={property.title}
              className="h-48 w-full object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{property.title}</h2>
            <p>{property.city} • ₹{property.price}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(property._id)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(property._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
