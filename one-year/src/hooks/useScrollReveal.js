/**
 * useScrollReveal - Intersection Observer for scroll-triggered animations
 * @param {Object} opts - { threshold: 0.1, rootMargin: '0px' }
 * @returns {[React.RefObject, boolean]} [ref, isVisible]
 */
import { useState, useEffect, useRef } from 'react';

export function useScrollReveal(opts = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = opts;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
