import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api/client';
import { ArrowLeft } from 'lucide-react';

const EssayDetail = () => {
  const { id } = useParams();
  const [essay, setEssay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setNotFound(false);
    setEssay(null);
    setLoading(true);
    api
      .get(`/api/essays/${id}`)
      .then((res) => {
        setEssay(res.data);
      })
      .catch((err) => {
        console.error(err);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (notFound || !essay) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
        <p className="opacity-80 mb-6">Essay not found.</p>
        <Link to="/essays" className="text-accent hover:underline">
          Back to Writings
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full min-w-0"
    >
      <Link to="/essays" className="inline-flex items-center gap-2 min-h-[44px] text-sm uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-all mb-8 sm:mb-12 touch-manipulation">
        <ArrowLeft size={16} /> Back to Writings
      </Link>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-6">
          <span className="text-xs font-bold tracking-widest uppercase text-accent bg-accent/10 px-3 py-1 rounded-full">
            {essay.category}
          </span>
          <span className="text-sm opacity-50">
            {new Date(essay.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 sm:mb-12 leading-tight break-words">
          {essay.title}
        </h1>
        
        <div className="prose dark:prose-invert prose-sm sm:prose-lg max-w-none font-serif opacity-90">
          {/* For simplicity we use whitespace-pre-wrap, ideally a markdown renderer here */}
          <div className="whitespace-pre-wrap leading-relaxed text-base sm:text-lg">
            {essay.content}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EssayDetail;
