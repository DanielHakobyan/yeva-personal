import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const IntroContext = createContext(null);

export function IntroProvider({ children }) {
  const { pathname } = useLocation();
  const isPrerender =
    typeof window !== 'undefined' &&
    window.__PRERENDER_INJECTED &&
    window.__PRERENDER_INJECTED.prerender;

  const [introComplete, setIntroComplete] = useState(() => pathname !== '/' || isPrerender);

  useEffect(() => {
    if (pathname !== '/' || isPrerender) {
      setIntroComplete(true);
    }
  }, [pathname, isPrerender]);

  const blockSiteChrome = pathname === '/' && !introComplete;

  const value = useMemo(
    () => ({
      blockSiteChrome,
      setIntroComplete,
    }),
    [blockSiteChrome]
  );

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro() {
  const ctx = useContext(IntroContext);
  if (!ctx) {
    throw new Error('useIntro must be used within IntroProvider');
  }
  return ctx;
}
