import React from "react";

const SellerDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Welcome, Seller 🏠</h2>

      <button className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        + Post New Property
      </button>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Listings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">📦 Listing 1</div>
          <div className="bg-white p-4 rounded-lg shadow">📦 Listing 2</div>
        </div>
      </section>
    </div>
  );
};

export default SellerDashboard;
