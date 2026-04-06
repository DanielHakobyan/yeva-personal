import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { api } from '../api/client';

const Categories = ['All', 'Personal', 'Philosophical', 'Political'];

const Essays = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    api
      .get('/api/essays')
      .then((res) => {
        setEssays(res.data);
        setFetchError('');
      })
      .catch((err) => {
        console.error(err);
        setFetchError('Could not load essays. Is the API running?');
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredEssays = activeCategory === 'All' 
    ? essays 
    : essays.filter(essay => essay.category === activeCategory);

  const getPreview = (content = '') => {
    const text = String(content).replace(/\s+/g, ' ').trim();
    if (!text) return '';
    return text.length > 180 ? `${text.slice(0, 180)}…` : text;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full min-w-0"
    >
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-8 sm:mb-12 tracking-tight">Writing</h1>
      
      {/* Category Tabs */}
      <div className="flex gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {Categories.map(category => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`relative shrink-0 snap-start min-h-[44px] px-5 sm:px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-colors touch-manipulation ${
              activeCategory === category 
                ? 'text-[#38382b]' 
                : 'text-[#38382b]/70 hover:text-[#38382b]'
            }`}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="pill"
                className="absolute inset-0 bg-white/60 rounded-full z-0 border border-white/40"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      {/* Essay List */}
      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <p>Loading essays...</p>
          ) : fetchError ? (
            <p className="text-center text-red-400/90 py-8">{fetchError}</p>
          ) : filteredEssays.map((essay, index) => (
            <motion.div
              layout
              key={essay._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link to={`/essays/${essay._id}`} className="block group glass-card p-5 sm:p-8 rounded-xl sm:rounded-2xl active:opacity-90 touch-manipulation">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-accent">
                    {essay.category}
                  </span>
                  <span className="text-sm opacity-50">
                    {new Date(essay.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold group-hover:text-accent transition-colors leading-snug break-words">
                  {essay.title}
                </h2>
                {essay.content && (
                  <p className="mt-4 opacity-75 leading-relaxed line-clamp-3">
                    {getPreview(essay.content)}
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {!loading && !fetchError && filteredEssays.length === 0 && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center opacity-50 py-12"
          >
            No essays found in this category.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default Essays;
