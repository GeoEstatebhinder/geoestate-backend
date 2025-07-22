import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between">
      <Link to="/" className="text-xl font-bold text-blue-600">GeoEstate</Link>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/add-property" className="text-gray-700 hover:text-blue-600">Add Property</Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
        <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
