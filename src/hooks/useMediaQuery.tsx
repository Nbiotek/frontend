'use client';

import { useState, useLayoutEffect, useEffect } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useIsomorphicLayoutEffect(() => {
    const media: MediaQueryList = window.matchMedia(query);

    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    media.addEventListener('change', listener);

    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}
