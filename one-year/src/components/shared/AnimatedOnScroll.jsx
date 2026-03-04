/**
 * AnimatedOnScroll - Wraps children, animates when scrolled into view
 */
import { useScrollReveal } from '../../hooks/useScrollReveal';

function AnimatedOnScroll({ children, className = '', animation = 'fade-up' }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  const animClasses = {
    'fade-up': isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
    fade: isVisible ? 'opacity-100' : 'opacity-0',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${animClasses[animation] ?? animClasses['fade-up']} ${className}`}
    >
      {children}
    </div>
  );
}

export default AnimatedOnScroll;
