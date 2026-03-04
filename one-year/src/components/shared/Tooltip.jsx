/**
 * Tooltip - Hover/focus tooltip with dark bg, white text
 */
import { useState, useRef, useEffect } from 'react';

function Tooltip({ content, children, position = 'top' }) {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    trigger.addEventListener('mouseenter', show);
    trigger.addEventListener('mouseleave', hide);
    trigger.addEventListener('focus', show);
    trigger.addEventListener('blur', hide);

    return () => {
      trigger.removeEventListener('mouseenter', show);
      trigger.removeEventListener('mouseleave', hide);
      trigger.removeEventListener('focus', show);
      trigger.removeEventListener('blur', hide);
    };
  }, []);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <span className="relative inline-block" ref={triggerRef}>
      {children}
      {visible && content && (
        <span
          ref={tooltipRef}
          role="tooltip"
          className={`absolute z-50 max-w-[250px] rounded bg-gray-800 px-3 py-2 text-sm text-white transition-opacity duration-150 ${positionClasses[position] ?? positionClasses.top}`}
        >
          {content}
        </span>
      )}
    </span>
  );
}

export default Tooltip;
