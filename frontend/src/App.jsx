import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Essays from './pages/Essays';
import EssayDetail from './pages/EssayDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import VideoBackground from './components/VideoBackground';
import { IntroProvider, useIntro } from './contexts/IntroContext';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/essays" element={<Essays />} />
        <Route path="/essays/:id" element={<EssayDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>
  );
};

function AppShell() {
  const { blockSiteChrome } = useIntro();

  return (
    <div className="min-h-screen font-sans bg-light dark:bg-dark text-[#38382b] dark:text-light transition-colors duration-500 relative">
      <VideoBackground />
      <motion.div
        className="relative z-10 flex flex-col min-h-screen"
        initial={false}
        animate={{
          opacity: blockSiteChrome ? 0 : 1,
        }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: blockSiteChrome ? 'none' : 'auto' }}
      >
        <Navbar />
        <main className="flex-grow w-full min-w-0 pt-24 sm:pt-28 pb-10 sm:pb-14 safe-px safe-pb">
          <AnimatedRoutes />
        </main>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <IntroProvider>
            <AppShell />
          </IntroProvider>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
