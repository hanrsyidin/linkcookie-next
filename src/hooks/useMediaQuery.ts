"use client";

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Ensure window is defined (for server-side rendering)
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia(query);
    
    // Update state if the media query match changes
    const listener = () => {
      setMatches(media.matches);
    };

    // Set the initial state
    listener();

    // Add event listener
    media.addEventListener('change', listener);

    // Cleanup on component unmount
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}