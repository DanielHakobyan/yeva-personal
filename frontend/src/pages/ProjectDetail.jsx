import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, fetch from backend. Here is the mock if backend fails.
    axios.get(`http://localhost:5000/api/projects/${id}`)
      .then(res => {
        setProject(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setProject({
          title: 'Neon Nights',
          description: 'A cyberpunk visual novel that explores the boundaries between human consciousness and artificial intelligence. Built with WebGL, Framer Motion, and React.',
          images: [
            'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1600&q=80',
            'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?w=1600&q=80'
          ],
          links: [{ label: 'Live Site', url: '#' }]
        });
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found.</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full min-w-0"
    >
      <Link to="/portfolio" className="inline-flex items-center gap-2 min-h-[44px] text-sm uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-accent transition-all mb-8 sm:mb-12 touch-manipulation">
        <ArrowLeft size={16} /> Back to Studio
      </Link>
      
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8 min-w-0">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold break-words"
          >
            {project.title}
          </motion.h1>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg opacity-80 font-light leading-relaxed whitespace-pre-wrap break-words"
          >
            {project.description}
          </motion.div>
          
          {project.links && project.links.length > 0 && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-3"
            >
              <h3 className="text-xs uppercase tracking-widest opacity-50 mb-2">Links</h3>
              {project.links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 group text-accent hover:text-dark dark:hover:text-light transition-colors w-fit">
                  {link.label} <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              ))}
            </motion.div>
          )}
        </div>
        
        <div className="lg:col-span-8 space-y-8 sm:space-y-12 min-w-0">
          {project.images && project.images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="rounded-xl overflow-hidden glass shadow-2xl"
            >
              <img src={img.startsWith('http') ? img : `http://localhost:5000${img}`} alt={`${project.title} screenshot ${index + 1}`} className="w-full max-w-full h-auto object-contain" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
