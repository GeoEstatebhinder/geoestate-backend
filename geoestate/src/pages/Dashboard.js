import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Dashboard</h1>
      <p className="text-gray-600 mb-4">Manage your property listings below:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Placeholder listings */}
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold text-lg">3BHK Apartment</h2>
          <p>₹45,00,000 • Jalandhar</p>
          <div className="flex gap-2 mt-2">
            <button className="bg-yellow-400 px-3 py-1 rounded text-sm">Edit</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
