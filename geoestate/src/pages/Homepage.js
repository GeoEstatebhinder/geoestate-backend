import React from "react";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">GeoEstate</h1>
        <nav className="space-x-4">
          <a href="#" className="text-gray-600 hover:text-blue-600">Buy</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Sell</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Login</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-100 text-center py-20 px-4">
        <h2 className="text-4xl font-bold text-blue-800 mb-4">Find your dream home in Punjab 🏡</h2>
        <p className="text-gray-700 text-lg mb-6">Search real estate listings in Ludhiana, Chandigarh, Jalandhar & more</p>
        <input
          type="text"
          placeholder="Search by city or area..."
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </section>

      {/* Featured Properties Placeholder */}
      <section className="py-12 px-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Featured Listings</h3>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {/* Listings will be loaded here */}
          <div className="border rounded-lg p-4 bg-white shadow">Listing 1</div>
          <div className="border rounded-lg p-4 bg-white shadow">Listing 2</div>
          <div className="border rounded-lg p-4 bg-white shadow">Listing 3</div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
