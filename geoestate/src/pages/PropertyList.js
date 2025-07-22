import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/properties')
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  const filtered = properties.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

    const matchCity = cityFilter ? p.city.toLowerCase() === cityFilter.toLowerCase() : true;
    const matchMin = minPrice ? p.price >= parseInt(minPrice) : true;
    const matchMax = maxPrice ? p.price <= parseInt(maxPrice) : true;

    return matchSearch && matchCity && matchMin && matchMax;
  });

  const handleContact = (property) => {
    setSelectedProperty(property);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">🛍️ Explore Properties</h1>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by title or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        />
        <input
          type="text"
          placeholder="Filter by city"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/5"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/5"
        />
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((property) => (
          <div key={property._id} className="border rounded shadow p-4">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <p className="text-gray-600">{property.city}</p>
            <p className="text-green-700 font-bold mb-2">₹ {property.price.toLocaleString()}</p>
            <Link to={`/property/${property._id}`} className="text-blue-600 underline">
              View Details
            </Link>
            <button
              onClick={() => handleContact(property)}
              className="mt-2 block bg-green-600 text-white px-3 py-1 rounded"
            >
              Contact Seller
            </button>
          </div>
        ))}
      </div>

      {/* Contact Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-2">Contact Seller</h2>
            <p className="text-sm mb-4">
              📞 <strong>{selectedProperty.contact}</strong>
            </p>
            <textarea
              rows="4"
              className="w-full border p-2 rounded mb-2"
              placeholder="Your message to the seller..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`✅ Message sent to seller: ${message}`);
                  closeModal();
                }}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyList;
