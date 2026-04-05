import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Categories = ['All', 'Personal', 'Philosophical', 'Political'];

const Essays = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call to get all essays
    // Mocking for now to show structure until backend is integrated fully
    axios.get('http://localhost:5000/api/essays')
      .then(res => {
        setEssays(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        // Fallback mock data
        setEssays([
          { _id: '1', title: 'The Architect of Reality', category: 'Philosophical', createdAt: new Date().toISOString(), content: 'Thoughts on subjective reality...' },
          { _id: '2', title: 'Growing Up Digital', category: 'Personal', createdAt: new Date().toISOString(), content: 'My early days on the internet...' },
          { _id: '3', title: 'The Future of Governance', category: 'Political', createdAt: new Date().toISOString(), content: 'How AI will shape policy...' },
        ]);
      });
  }, []);

  const filteredEssays = activeCategory === 'All' 
    ? essays 
    : essays.filter(essay => essay.category === activeCategory);

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
                ? 'text-white' 
                : 'text-dark/60 dark:text-light/60 hover:text-dark dark:hover:text-light'
            }`}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="pill"
                className="absolute inset-0 bg-dark dark:bg-light rounded-full z-0"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 mix-blend-difference">{category}</span>
          </button>
        ))}
      </div>

      {/* Essay List */}
      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <p>Loading essays...</p>
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
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {!loading && filteredEssays.length === 0 && (
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
