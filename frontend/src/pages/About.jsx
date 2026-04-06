import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const { scrollY } = useScroll();
  const [parallax, setParallax] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setParallax(mq.matches && !reduced.matches);
    sync();
    mq.addEventListener('change', sync);
    reduced.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      reduced.removeEventListener('change', sync);
    };
  }, []);

  const y1 = useTransform(scrollY, [0, 1000], parallax ? [0, -120] : [0, 0]);
  const y2 = useTransform(scrollY, [0, 1000], parallax ? [0, -180] : [0, 0]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-center">
        <div className="order-2 lg:order-1 min-w-0">
          <motion.div style={{ y: y1 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 sm:mb-8 leading-tight">
              A blend of <br />
              <span className="italic font-normal opacity-70">art</span> & <br />
              <span className="text-accent tracking-tight">logic.</span>
            </h1>
            
            <div className="space-y-5 sm:space-y-6 text-base sm:text-lg opacity-80 leading-relaxed max-w-lg font-light">
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
            
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
              <a
                href="mailto:hello@example.com"
                className="min-h-[44px] inline-flex items-center uppercase tracking-widest text-sm text-accent hover:text-dark dark:hover:text-light transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[1px] after:bg-current touch-manipulation"
              >
                Get in Touch
              </a>
              <a
                href="#"
                className="min-h-[44px] inline-flex items-center uppercase tracking-widest text-sm opacity-60 hover:opacity-100 transition-opacity touch-manipulation"
              >
                Resume
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="order-1 lg:order-2 relative h-[42vh] min-h-[220px] sm:h-[50vh] lg:h-[80vh] w-full max-w-full rounded-xl sm:rounded-2xl overflow-hidden glass">
          <motion.img 
            style={{ y: y2, scale: parallax ? 1.12 : 1 }}
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80" 
            alt="Portrait" 
            className="w-full h-[120%] object-cover object-center origin-top"
          />
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
