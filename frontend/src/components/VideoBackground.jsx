import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useIntro } from '../contexts/IntroContext';
import { Volume2, VolumeX } from 'lucide-react';

const CONTROLS_DELAY_MS = 1200;

const VideoBackground = () => {
  const videoRef = useRef(null);
  const location = useLocation();
  const { theme } = useTheme();
  const { setIntroComplete } = useIntro();

  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [settled, setSettled] = useState(() => location.pathname !== '/');
  const [controlsVisible, setControlsVisible] = useState(false);

  const onHomeIntro = location.pathname === '/' && !settled;

  useEffect(() => {
    if (location.pathname !== '/') {
      setSettled(true);
      videoRef.current?.pause();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') {
      return undefined;
    }
    const t = window.setTimeout(() => setControlsVisible(true), CONTROLS_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [location.pathname]);

  /** Only the home intro should call play(); other routes keep the paused last frame. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (location.pathname === '/' && !settled) {
      v.play().catch(() => {});
    }
  }, [location.pathname, settled]);

  const finishIntro = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      if (Number.isFinite(v.duration) && v.duration > 0) {
        v.currentTime = Math.max(0, v.duration - 0.05);
      }
      v.pause();
    }
    setSettled(true);
    setIntroComplete(true);
  }, [setIntroComplete]);

  const handleVideoEnd = () => {
    if (location.pathname !== '/' || settled) return;
    finishIntro();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      if (!hasInteracted) setHasInteracted(true);
    }
  };

  const overlaySettled =
    theme === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)';
  const overlayIntro = 'rgba(0,0,0,0.12)';

  return (
    <>
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black">
        <motion.video
          ref={videoRef}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
          muted={isMuted}
          playsInline
          onEnded={handleVideoEnd}
          animate={{
            filter: settled ? 'blur(20px)' : 'blur(0px)',
            opacity: settled ? (theme === 'dark' ? 0.3 : 0.6) : 1,
          }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundColor: settled ? overlaySettled : overlayIntro,
          }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </div>

      {onHomeIntro && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <motion.div
            className="flex flex-col items-center gap-8 pointer-events-auto"
            initial={false}
            animate={{
              opacity: controlsVisible ? 1 : 0,
              y: controlsVisible ? 0 : 16,
            }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {!hasInteracted && (
              <button
                type="button"
                onClick={toggleMute}
                className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 text-white border border-white/30 hover:bg-white/30 transition-all font-display tracking-widest text-sm uppercase"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                Tap to enable sound
              </button>
            )}
            <button
              type="button"
              onClick={finishIntro}
              className="text-white/50 hover:text-white transition-colors tracking-widest text-xs uppercase"
            >
              Skip Intro
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default VideoBackground;
