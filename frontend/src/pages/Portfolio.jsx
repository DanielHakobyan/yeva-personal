import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        // Fallback mock testing data
        setProjects([
          { _id: '1', title: 'Neon Nights', description: 'A cyberpunk visual novel.', images: ['https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80'] },
          { _id: '2', title: 'Serenity', description: 'Minimalist meditation app design.', images: ['https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80'] },
          { _id: '3', title: 'Echoes', description: 'Audio reactive webgl experience.', images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'] }
        ]);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
    >
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-8 sm:mb-16 tracking-tight">Studio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {loading ? (
          <p>Loading projects...</p>
        ) : (
          projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/portfolio/${project._id}`} className="group block rounded-2xl active:opacity-90 touch-manipulation">
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/5] mb-4 sm:mb-6">
                  {project.images && project.images[0] ? (
                    <img 
                      src={project.images[0].startsWith('http') ? project.images[0] : `http://localhost:5000${project.images[0]}`} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                      <span className="opacity-30">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 p-4 sm:p-6 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
                    <span className="text-white text-xs sm:text-sm tracking-widest uppercase font-medium">View Project</span>
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h2>
                <p className="text-sm opacity-70 line-clamp-2">{project.description}</p>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Portfolio;
