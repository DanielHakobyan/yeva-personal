import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center px-4 sm:px-6 safe-pb">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-6 sm:p-10 w-full max-w-md rounded-xl sm:rounded-2xl"
      >
        <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6 sm:mb-8 text-center tracking-tight">Access Control</h2>
        {error && <div className="bg-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm uppercase tracking-widest opacity-60 mb-2">Username</label>
            <input 
              type="text" 
              autoComplete="username"
              className="w-full text-base bg-white/5 border border-white/10 rounded-lg px-4 py-3.5 min-h-[48px] focus:outline-none focus:border-accent transition-colors"
              value={username} 
              onChange={e => setUsername(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm uppercase tracking-widest opacity-60 mb-2">Password</label>
            <input 
              type="password" 
              autoComplete="current-password"
              className="w-full text-base bg-white/5 border border-white/10 rounded-lg px-4 py-3.5 min-h-[48px] focus:outline-none focus:border-accent transition-colors"
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit" className="touch-manipulation w-full min-h-[48px] bg-accent hover:bg-accent/90 active:scale-[0.99] text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-accent/20">
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
