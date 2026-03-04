/**
 * CountUpOnScroll - Number animates from 0 to value when scrolled into view
 */
import { useScrollReveal } from '../../hooks/useScrollReveal';
import AnimatedNumber from './AnimatedNumber';

function CountUpOnScroll({ value, format = (v) => String(Math.round(v)), duration = 800, className = '' }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <span ref={ref} className={className}>
      <AnimatedNumber
        value={isVisible ? value : 0}
        format={format}
        duration={duration}
      />
    </span>
  );
}

export default CountUpOnScroll;
