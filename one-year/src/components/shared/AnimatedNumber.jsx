/**
 * AnimatedNumber - Smooth count animation when value changes
 * Uses requestAnimationFrame with ease-out cubic easing.
 */
import { useEffect, useRef, useState } from 'react';

function AnimatedNumber({ value, format = (v) => String(v), duration = 400, className = '' }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevRef = useRef(value);
  const frameRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (value == null || value === prevRef.current) return;

    const startVal = prevRef.current;
    const endVal = value;
    prevRef.current = value;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = startVal + (endVal - startVal) * eased;
      setDisplayValue(current);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        startRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value, duration]);

  useEffect(() => {
    if (value != null) prevRef.current = value;
  }, [value]);

  if (value == null || value === undefined) return <span className={className}>N/A</span>;

  const formatted = typeof format === 'function' ? format(displayValue) : String(displayValue);
  return <span className={className}>{formatted}</span>;
}

export default AnimatedNumber;
