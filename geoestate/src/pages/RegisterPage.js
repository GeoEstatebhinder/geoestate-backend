import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', formData);
      alert('User registered!');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto mt-10 p-4 shadow rounded bg-white space-y-4">
      <h2 className="text-xl font-semibold">Register</h2>
      <input name="username" type="text" placeholder="Username" onChange={handleChange} required className="border p-2 w-full" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="border p-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
};

export default RegisterPage;
