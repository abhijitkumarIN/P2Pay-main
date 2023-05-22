import { useState, useEffect } from 'react';

interface IReturnData {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useResponsive(): IReturnData {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const breakpoints = {
    xl: 1440,
    lg: 1024,
    md: 768,
    sm: 375,
    xs: 0,
  };

  const handleResize = () => setWindowSize(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    if (windowSize > breakpoints.xs && windowSize < breakpoints.md) {
      setIsMobile(true);
      setIsTablet(false);
      setIsDesktop(false);
    } else if (windowSize > breakpoints.sm && windowSize < breakpoints.lg) {
      setIsMobile(false);
      setIsTablet(true);
      setIsDesktop(false);
    } else {
      setIsMobile(false);
      setIsTablet(false);
      setIsDesktop(true);
    }
  }, [windowSize]);

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}
