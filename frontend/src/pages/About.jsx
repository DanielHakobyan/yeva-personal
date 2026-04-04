import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -250]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-6 py-12 lg:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <motion.div style={{ y: y1 }}>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
              A blend of <br />
              <span className="italic font-normal opacity-70">art</span> & <br />
              <span className="text-accent tracking-tight">logic.</span>
            </h1>
            
            <div className="space-y-6 text-lg opacity-80 leading-relaxed max-w-lg font-light">
              <p>
                I am a developer and designer who believes that software is a medium 
                for self-expression. I weave together functional constraints with aesthetic 
                desires to build unique digital spaces.
              </p>
              <p>
                My work spans from minimalist interfaces to complex backend architectures. 
                When I'm not writing code, I'm likely reading philosophy, capturing moments 
                through a lens, or exploring the mountains.
              </p>
            </div>
            
            <div className="mt-12 flex gap-6">
              <a href="mailto:hello@example.com" className="uppercase tracking-widest text-sm text-accent hover:text-dark dark:hover:text-light transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-current">
                Get in Touch
              </a>
              <a href="#" className="uppercase tracking-widest text-sm opacity-60 hover:opacity-100 transition-opacity">
                Resume
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="order-1 lg:order-2 relative h-[60vh] lg:h-[80vh] w-full rounded-2xl overflow-hidden glass">
          <motion.img 
            style={{ y: y2, scale: 1.15 }}
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80" 
            alt="Portrait" 
            className="w-full h-[120%] object-cover object-center origin-top"
          />
          <div className="absolute inset-0 bg-black/10 dark:bg-white/5 mix-blend-overlay"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
