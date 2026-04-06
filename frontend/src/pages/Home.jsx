import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-center items-center px-4 sm:px-6 text-center max-w-full"
    >
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-accent mb-6"
      >
        Hello, I am Yeva
      </motion.p>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-[clamp(1.85rem,7vw,2.6rem)] sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight sm:tracking-tighter mb-6 sm:mb-8 leading-[1.08] sm:leading-tight break-words px-1"
      >
        A Personal <br />
        <span className="opacity-80">Website</span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="max-w-xl text-base sm:text-lg md:text-xl opacity-70 mb-8 sm:mb-12 font-light px-2 leading-relaxed"
      >
        Explore my essays, thoughts, and small fragments of inspiration.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <Link 
          to="/essays" 
          className="inline-flex items-center justify-center min-h-[48px] min-w-[200px] sm:min-w-0 touch-manipulation relative overflow-hidden group px-8 py-3.5 sm:py-4 rounded-full border border-dark/20 hover:border-transparent active:scale-[0.98] transition-all duration-300"
        >
          <span className="absolute inset-0 w-full h-full bg-accent group-hover:scale-105 transition-transform duration-500 ease-out z-0 opacity-0 group-hover:opacity-100 rounded-full" />
          <span className="relative z-10 uppercase tracking-widest text-sm font-medium group-hover:text-white transition-colors duration-300">
            Read Essays
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Home;
