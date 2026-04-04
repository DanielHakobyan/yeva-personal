import React from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const AdminOverview = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <Link to="/admin/projects" className="glass-card p-10 flex flex-col items-center justify-center min-h-[200px] hover:border-accent transition-colors">
      <h3 className="text-2xl font-display font-bold mb-2">Manage Projects</h3>
      <p className="opacity-60 text-sm">Add, edit or delete portfolio items</p>
    </Link>
    <Link to="/admin/essays" className="glass-card p-10 flex flex-col items-center justify-center min-h-[200px] hover:border-accent transition-colors">
      <h3 className="text-2xl font-display font-bold mb-2">Manage Essays</h3>
      <p className="opacity-60 text-sm">Write and publish new thoughts</p>
    </Link>
  </div>
);

// Placeholder components for management
const ManageProjects = () => <div className="glass-card p-8"><h2>Projects Management (Placeholder)</h2><p className="opacity-60 mt-4">In a complete build, list projects here with Create/Edit/Delete actions.</p></div>;
const ManageEssays = () => <div className="glass-card p-8"><h2>Essays Management (Placeholder)</h2><p className="opacity-60 mt-4">In a complete build, list essays here with Create/Edit/Delete actions and Rich Text Editor.</p></div>;

const AdminDashboard = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-6 py-12"
    >
      <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
        <h1 className="text-4xl font-display font-bold">Control Center</h1>
        <div className="flex items-center gap-6">
          <span className="opacity-60 text-sm">Welcome, {user.username}</span>
          <button 
            onClick={handleLogout}
            className="text-xs uppercase tracking-widest px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
      
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="/projects" element={<ManageProjects />} />
        <Route path="/essays" element={<ManageEssays />} />
      </Routes>
    </motion.div>
  );
};

export default AdminDashboard;
