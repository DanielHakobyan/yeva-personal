import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL =
  import.meta.env.VITE_LOGO_URL ||
  'https://raw.githubusercontent.com/DanielHakobyan/yeva-personal/master/logo_no_bg.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Essays', path: '/essays' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? 'bg-white/80 dark:bg-black/70 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        <NavLink
          to="/"
          className={`flex items-center justify-center shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 dark:focus-visible:ring-offset-dark ${
            scrolled ? 'p-0' : ''
          }`}
          aria-label="Home"
        >
          <motion.div
            layout
            className={`flex items-center justify-center rounded-md ${
              scrolled
                ? ''
                : 'p-0 bg-white/28 dark:bg-white/25 backdrop-blur-lg'
            }`}
            animate={
              scrolled
                ? { scale: 1 }
                : {
                    scale: [1, 1.01, 1],
                    boxShadow: [
                      '0 4px 16px rgba(0,0,0,0.08)',
                      '0 6px 22px rgba(0,0,0,0.06)',
                      '0 4px 16px rgba(0,0,0,0.08)',
                    ],
                  }
            }
            transition={{
              layout: { type: 'spring', stiffness: 320, damping: 30 },
              ...(scrolled
                ? { duration: 0.35 }
                : {
                    scale: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
                    boxShadow: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
                  }),
            }}
          >
            <motion.span
              className="inline-flex origin-center [filter:drop-shadow(0_0_22px_rgba(255,255,255,0.8))_drop-shadow(0_2px_12px_rgba(0,0,0,0.45))]"
              initial={{ opacity: 0, scale: 0.72, rotate: -10 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: scrolled ? 0 : [0, -4, 0],
                rotate: 0,
              }}
              transition={{
                opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                scale: { type: 'spring', stiffness: 260, damping: 20, delay: 0.06 },
                y: scrolled
                  ? { type: 'spring', stiffness: 300, damping: 28 }
                  : { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
                rotate: { type: 'spring', stiffness: 200, damping: 15, delay: 0.1 },
              }}
              whileHover={{
                scale: 1.09,
                rotate: [0, -5, 5, 0],
                transition: { type: 'spring', stiffness: 380, damping: 14 },
              }}
              whileTap={{ scale: 0.9 }}
            >
              <img
                src={LOGO_URL}
                alt="YEVA"
                className={`h-[5rem] w-auto sm:h-[5.5rem] md:h-24 lg:h-[6.25rem] max-w-[min(70vw,320px)] object-contain object-center ${
                  scrolled && theme === 'dark' ? 'brightness-0 invert' : ''
                }`}
                draggable={false}
                loading="eager"
              />
            </motion.span>
          </motion.div>
        </NavLink>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `text-sm tracking-wide transition-colors hover:text-accent relative ${isActive ? 'text-accent font-medium' : 'opacity-70 hover:opacity-100'}`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon size={18} />
                </motion.div>
              ) : (
                <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full">
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <nav className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `text-lg ${isActive ? 'text-accent font-medium' : 'opacity-80'}`}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
