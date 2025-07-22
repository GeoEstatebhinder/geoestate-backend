import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="max-w-6xl mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
