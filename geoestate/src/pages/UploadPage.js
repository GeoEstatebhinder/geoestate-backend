import React, { useState } from 'react';
import axios from 'axios';

const UploadPage = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    image: ''
  });
  const [file, setFile] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'your_upload_preset');
    const res = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', data);
    return res.data.secure_url;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const imageUrl = await handleImageUpload();
    const payload = { ...form, image: imageUrl };

    axios.post('http://localhost:5000/api/properties', payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => alert('Listing uploaded!'))
    .catch(err => console.error(err));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl mb-4 font-semibold">Upload New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} className="w-full p-2 border" />
        <input type="text" name="price" placeholder="Price" onChange={handleChange} className="w-full p-2 border" />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} className="w-full p-2 border" />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border"></textarea>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Upload</button>
      </form>
    </div>
  );
};

export default UploadPage;
