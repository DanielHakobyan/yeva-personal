import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

const EssayDetail = () => {
  const { id } = useParams();
  const [essay, setEssay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/essays/${id}`)
      .then(res => {
        setEssay(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setEssay({
          title: 'The Architect of Reality',
          category: 'Philosophical',
          createdAt: new Date().toISOString(),
          content: 'This is a long essay content. In a real app, this would be markdown.\n\nBut for now, it is just a placeholder paragraph to show how it looks. We can add multiple paragraphs.\n\nAnd it will flow nicely.'
        });
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!essay) return <div className="min-h-screen flex items-center justify-center">Essay not found.</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto px-6 py-12"
    >
      <Link to="/essays" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-all mb-12">
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
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-12 leading-tight">
          {essay.title}
        </h1>
        
        <div className="prose dark:prose-invert prose-lg max-w-none font-serif opacity-90">
          {/* For simplicity we use whitespace-pre-wrap, ideally a markdown renderer here */}
          <div className="whitespace-pre-wrap leading-relaxed">
            {essay.content}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EssayDetail;
