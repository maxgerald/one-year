/**
 * MethodologyModal - What 1Y is, data sources, interpolation
 */
import { useEffect, useRef } from 'react';
import { SOURCES_BY_CATEGORY } from '../../data/sources';

function MethodologyModal({ open, onClose }) {
  const containerRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    if (open) {
      document.addEventListener('keydown', handleEscape);
      closeBtnRef.current?.focus();
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !containerRef.current) return;
    const el = containerRef.current;
    const focusables = el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    el.addEventListener('keydown', trap);
    return () => el.removeEventListener('keydown', trap);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="methodology-title"
    >
      <div
        ref={containerRef}
        className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <h2 id="methodology-title" className="text-xl font-bold text-primary">
            Methodology
          </h2>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="text-slate-600 hover:text-primary"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="mt-4 space-y-4 text-slate-700">
          <p>
            <strong>What is 1Y?</strong> One Year (1Y) = one median worker&apos;s annual salary. We
            use it to compare costs across decades because dollar amounts are meaningless across
            time.
          </p>
          <p>
            <strong>Why median, not average?</strong> The average is skewed by top earners. Median
            represents the typical worker.
          </p>
          <p>
            <strong>Gross salary:</strong> All figures use gross (pre-tax) income. Take-home pay is
            lower.
          </p>
          <p>
            <strong>Data sources:</strong> Census Bureau, BLS, Federal Reserve, NBER. Key references:
          </p>
          <div className="space-y-3 text-sm">
            {SOURCES_BY_CATEGORY.map((cat) => (
              <div key={cat.title}>
                <p className="font-semibold text-slate-800">{cat.title}</p>
                <ul className="ml-4 list-disc space-y-0.5">
                  {cat.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p>
            <strong>Interpolation:</strong> For years between data points, we interpolate linearly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MethodologyModal;
