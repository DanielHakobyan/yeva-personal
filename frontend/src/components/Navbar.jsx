import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL =
  import.meta.env.VITE_LOGO_URL ||
  'https://raw.githubusercontent.com/DanielHakobyan/yeva-personal/master/logo_no_bg.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Essays', path: '/essays' },
    { name: 'Y Studio', href: 'https://www.y.studio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out safe-px ${
        scrolled
          ? 'bg-[#dcd2c2]/90 backdrop-blur-md shadow-lg pb-3 pt-[calc(0.5rem+env(safe-area-inset-top,0px))]'
          : 'bg-[#dcd2c2]/70 backdrop-blur-sm pb-4 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] sm:pb-6 sm:pt-[calc(1rem+env(safe-area-inset-top,0px))]'
      } text-[#38382b]`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-3 min-w-0">
        <NavLink
          to="/"
          className="flex items-center justify-center shrink-0 focus-visible:outline-none"
          aria-label="Home"
        >
          <motion.div
            layout
            className="flex items-center justify-center"
            animate={scrolled ? { scale: 1 } : { scale: [1, 1.01, 1] }}
            transition={{
              layout: { type: 'spring', stiffness: 320, damping: 30 },
              ...(scrolled
                ? { duration: 0.35 }
                : {
                    scale: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
                  }),
            }}
          >
            <motion.span
              className="inline-flex origin-center"
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
                className={`h-12 w-auto sm:h-14 md:h-20 lg:h-[5.25rem] max-w-[min(52vw,240px)] sm:max-w-[min(64vw,300px)] lg:max-w-[320px] object-contain object-center ${
                  ''
                }`}
                draggable={false}
                loading="eager"
              />
            </motion.span>
          </motion.div>
        </NavLink>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) =>
            link.href ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-base tracking-wide transition-colors hover:text-accent opacity-80 hover:opacity-100 inline-flex items-center"
              >
                {link.name}
              </a>
            ) : (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-base tracking-wide transition-colors hover:text-accent relative ${
                    isActive ? 'text-accent font-medium' : 'opacity-80 hover:opacity-100'
                  }`
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
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            )
          )}
        </nav>

        <div className="md:hidden flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="touch-target inline-flex items-center justify-center rounded-full hover:bg-black/5 active:opacity-80"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
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
            className="md:hidden glass border-t border-white/10 overflow-hidden safe-pb"
          >
            <nav className="flex flex-col py-2" aria-label="Mobile">
              {navLinks.map((link) =>
                link.href ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[48px] flex items-center text-lg px-4 active:bg-black/5 rounded-lg opacity-90"
                  >
                    {link.name}
                  </a>
                ) : (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `min-h-[48px] flex items-center text-lg px-4 active:bg-black/5 rounded-lg ${
                        isActive ? 'text-accent font-semibold' : 'opacity-90'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
