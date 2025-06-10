import { useEffect, useRef, useState, useCallback } from 'react';

export const useInView = <T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.1 },
  triggerOnce: boolean = true
) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  const handleRefInView = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else {
          setInView(false);
        }
      });
    },
    [triggerOnce]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleRefInView, options);
    const refEl = ref.current;

    if (refEl) {
      observer.observe(refEl);
    }

    return () => {
      if (refEl) {
        observer.unobserve(refEl);
      }
    };
  }, [handleRefInView, options]);

  return { ref, inView };
};
