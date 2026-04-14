'use client';

import { useState, useEffect, useCallback } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system' | 'auto';
export type ResolvedTheme = 'light' | 'dark';

export const useTheme = () => {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark');

  const getSystemTheme = (): ResolvedTheme => {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const getTimeBasedTheme = (): ResolvedTheme => {
    const hour = new Date().getHours();
    // Light between 8:00 and 20:00, Dark otherwise
    return (hour >= 8 && hour < 20) ? 'light' : 'dark';
  };

  const resolveTheme = useCallback((currentMode: ThemeMode): ResolvedTheme => {
    switch (currentMode) {
      case 'light': return 'light';
      case 'dark': return 'dark';
      case 'system': return getSystemTheme();
      case 'auto': return getTimeBasedTheme();
      default: return 'dark';
    }
  }, []);

  // Initialize from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('abdfn-theme-mode') as ThemeMode;
    if (saved) {
      setMode(saved);
      const resolved = resolveTheme(saved);
      setResolvedTheme(resolved);
      document.documentElement.setAttribute('data-theme', resolved);
    } else {
      setMode('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [resolveTheme]);

  // Apply changes
  useEffect(() => {
    const resolved = resolveTheme(mode);
    setResolvedTheme(resolved);
    document.documentElement.setAttribute('data-theme', resolved);
    localStorage.setItem('abdfn-theme-mode', mode);

    // Listeners for dynamic changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (mode === 'system') {
        const r = getSystemTheme();
        setResolvedTheme(r);
        document.documentElement.setAttribute('data-theme', r);
      }
    };

    // For 'auto' mode, we check periodically (every minute)
    const interval = setInterval(() => {
      if (mode === 'auto') {
        const r = getTimeBasedTheme();
        if (r !== resolvedTheme) {
          setResolvedTheme(r);
          document.documentElement.setAttribute('data-theme', r);
        }
      }
    }, 60000);

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange);
      clearInterval(interval);
    };
  }, [mode, resolvedTheme, resolveTheme]);

  return { mode, resolvedTheme, setMode };
};
