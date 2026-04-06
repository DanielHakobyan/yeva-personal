import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 w-full min-w-0"
    >
      <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-6">
        Contact
      </h1>
      <div className="glass-card p-6 sm:p-8 rounded-2xl">
        <p className="opacity-80 leading-relaxed">
          For collaborations, press, or private notes:
        </p>
        <a
          className="inline-flex mt-5 text-sm uppercase tracking-widest text-accent hover:opacity-80 transition-opacity"
          href="mailto:hello@example.com"
        >
          hello@example.com
        </a>
      </div>
    </motion.div>
  );
}

