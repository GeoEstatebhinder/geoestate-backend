import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => setProperty(data));
  }, [id]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-96 object-cover rounded mb-4"
      />
      <p className="text-lg mb-1">📍 {property.city}</p>
      <p className="text-green-600 font-bold text-xl mb-3">₹ {property.price.toLocaleString()}</p>
      <p className="mb-4">{property.description}</p>

      {!showContact ? (
        <button
          onClick={() => setShowContact(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          📞 Contact Seller
        </button>
      ) : (
        <div className="bg-gray-100 p-4 rounded mt-2">
          <p><strong>Phone:</strong> {property.contact}</p>
          <p><strong>Email:</strong> {property.email || "Not Provided"}</p>
        </div>
      )}
    </div>
  );
}

export default PropertyDetail;
