import React from "react";

const BuyerDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Welcome, Buyer 👋</h2>

      <section className="mb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Saved Properties</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">🏡 Property 1</div>
          <div className="bg-white p-4 rounded-lg shadow">🏡 Property 2</div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">New Listings in Your Area</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">🆕 Listing 1</div>
          <div className="bg-white p-4 rounded-lg shadow">🆕 Listing 2</div>
        </div>
      </section>
    </div>
  );
};

export default BuyerDashboard;
