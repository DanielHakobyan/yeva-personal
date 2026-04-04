import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-[80vh] flex flex-col justify-center items-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-accent mb-6"
      >
        A Digital Space
      </motion.p>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-8 leading-tight"
      >
        Cinematic <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-800 dark:from-gray-300 dark:to-white">
          Portfolio & Essays
        </span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="max-w-xl text-lg md:text-xl opacity-70 mb-12 font-light"
      >
        Welcome to my mind. Explore the intersection of design, code, philosophy, and personal thought.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <a 
          href="/portfolio" 
          className="inline-block relative overflow-hidden group px-8 py-4 rounded-full border border-dark/20 dark:border-white/20 hover:border-transparent transition-all duration-300"
        >
          <span className="absolute inset-0 w-full h-full bg-accent group-hover:scale-105 transition-transform duration-500 ease-out z-0 opacity-0 group-hover:opacity-100 round-full"></span>
          <span className="relative z-10 uppercase tracking-widest text-sm font-medium group-hover:text-white transition-colors duration-300">
            Enter Studio
          </span>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Home;
