import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntro } from '../contexts/IntroContext';
import { Volume2, VolumeX } from 'lucide-react';

const TITLE = 'Quod Tango Muto';
const TITLE_ENTER_DELAY_MS = 280;
const TYPE_MS = 150;
const TITLE_HOLD_MS = 980;
const TITLE_EXIT_MS = 0.7;
/** Sound / skip appear after the title has fully left */
const CONTROLS_AFTER_TITLE_MS = 220;
const PRELOADER_BG = '#dcd2c2';
const INTRO_SLICE_SECONDS = 7.5;
const INTRO_PLAYBACK_RATE = 2.25;

/**
 * Direct file URL (not the github.com/.../blob/... page).
 * Override with VITE_BACKGROUND_VIDEO_URL in .env if you move hosts or branch.
 */
const BACKGROUND_VIDEO_URL =
  import.meta.env.VITE_BACKGROUND_VIDEO_URL ||
  'https://raw.githubusercontent.com/DanielHakobyan/yeva-personal/master/background-video.mp4';

const VideoBackground = () => {
  const videoRef = useRef(null);
  const location = useLocation();
  const { setIntroComplete } = useIntro();

  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [settled, setSettled] = useState(() => location.pathname !== '/');
  const [controlsVisible, setControlsVisible] = useState(false);
  const [titleText, setTitleText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [showTitleBlock, setShowTitleBlock] = useState(true);
  const [canPlayVideo, setCanPlayVideo] = useState(() => location.pathname !== '/');

  const onHomeIntro = location.pathname === '/' && !settled;

  useEffect(() => {
    if (location.pathname !== '/') {
      setSettled(true);
      videoRef.current?.pause();
    }
  }, [location.pathname]);

  /** Typewriter → hold → exit; then reveal sound / skip */
  useEffect(() => {
    if (location.pathname !== '/' || settled) {
      return undefined;
    }

    setTitleText('');
    setTypingComplete(false);
    setShowTitleBlock(true);
    setControlsVisible(false);
    setCanPlayVideo(false);

    const timers = [];
    let cancelled = false;

    const chain = () => {
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          let i = 0;
          const step = () => {
            if (cancelled) return;
            if (i < TITLE.length) {
              i += 1;
              setTitleText(TITLE.slice(0, i));
              timers.push(window.setTimeout(step, TYPE_MS));
            } else {
              setTypingComplete(true);
              timers.push(
                window.setTimeout(() => {
                  if (cancelled) return;
                  setShowTitleBlock(false);
                }, TITLE_HOLD_MS)
              );
            }
          };
          step();
        }, TITLE_ENTER_DELAY_MS)
      );
    };

    chain();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [location.pathname, settled]);

  const onTitleExitComplete = useCallback(() => {
    setCanPlayVideo(true);
    window.setTimeout(() => setControlsVisible(true), CONTROLS_AFTER_TITLE_MS);
  }, []);

  const playIntroSlice = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;

    try {
      v.playbackRate = INTRO_PLAYBACK_RATE;
      if (Number.isFinite(v.duration) && v.duration > 0) {
        v.currentTime = Math.max(0, v.duration - INTRO_SLICE_SECONDS);
      }
      v.play().catch(() => {});
    } catch {
      // ignore
    }
  }, []);

  /** Only the home intro should call play(); other routes keep the paused last frame. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (location.pathname === '/' && !settled && canPlayVideo) {
      playIntroSlice();
    }
  }, [location.pathname, settled, canPlayVideo, playIntroSlice]);

  const finishIntro = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      if (Number.isFinite(v.duration) && v.duration > 0) {
        v.currentTime = Math.max(0, v.duration - 0.05);
      }
      v.pause();
    }
    setShowTitleBlock(false);
    setCanPlayVideo(true);
    setControlsVisible(true);
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

  const overlaySettled = 'rgba(255,255,255,0.28)';
  const overlayIntro = 'rgba(0,0,0,0.12)';

  return (
    <>
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black">
        <motion.video
          ref={videoRef}
          src={BACKGROUND_VIDEO_URL}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2"
          muted={isMuted}
          playsInline
          preload="auto"
          onLoadedMetadata={() => {
            // Ensure the slice is applied even if metadata arrives after preloader.
            if (location.pathname === '/' && !settled && canPlayVideo) {
              playIntroSlice();
            }
          }}
          onEnded={handleVideoEnd}
          animate={{
            filter: settled ? 'blur(8px)' : 'blur(0px)',
            opacity: settled ? 0.65 : showTitleBlock ? 0 : 1,
          }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundColor: settled ? overlaySettled : showTitleBlock ? PRELOADER_BG : overlayIntro,
          }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </div>

      {onHomeIntro && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none">
          <AnimatePresence onExitComplete={onTitleExitComplete}>
            {showTitleBlock && (
              <motion.div
                key="intro-title"
                className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 sm:px-8"
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: typingComplete ? [1, 1.012, 1] : 1,
                }}
                exit={{
                  opacity: 0,
                  y: -28,
                  scale: 1.05,
                  filter: 'blur(20px)',
                  transition: { duration: TITLE_EXIT_MS, ease: [0.22, 1, 0.36, 1] },
                }}
                transition={{
                  opacity: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                  y: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                  scale: typingComplete
                    ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <div className="relative max-w-[min(92vw,56rem)]">
                  <p
                    className="relative font-typewriter text-center font-normal text-[#38382b] leading-[1.06] tracking-[0.06em] sm:tracking-[0.1em] md:tracking-[0.12em] text-[clamp(1.15rem,4.8vw,1.95rem)] sm:text-4xl md:text-5xl lg:text-6xl px-2"
                    aria-live="polite"
                  >
                    {Array.from(titleText).map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.2,
                          ease: 'linear',
                        }}
                        className="inline-block text-[#38382b] [will-change:transform,opacity]"
                      >
                        {char === ' ' ? '\u00a0' : char}
                      </motion.span>
                    ))}
                    {!typingComplete && titleText.length > 0 && (
                      <motion.span
                        className="inline-block align-middle ml-0.5 h-[0.75em] w-[2px] sm:w-[3px] rounded-full bg-[#38382b] translate-y-[-0.05em]"
                        aria-hidden
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="pointer-events-auto absolute left-1/2 -translate-x-1/2 bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))]"
            initial={false}
            animate={{
              opacity: controlsVisible ? 1 : 0,
              y: controlsVisible ? 0 : 10,
            }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Enable sound' : 'Mute sound'}
              className="touch-manipulation h-10 w-10 rounded-full flex items-center justify-center border border-white/30 bg-black/30 backdrop-blur-md text-white hover:bg-black/40 active:scale-[0.97] transition-all"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default VideoBackground;
