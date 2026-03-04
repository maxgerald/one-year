/**
 * YearSlider - Range input with decade quick-jump buttons
 */
import { useCallback, useRef } from 'react';
import { MIN_YEAR, MAX_YEAR } from '../../utils/constants';

const DECADES = [1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

function YearSlider({ year, onChange, minYear = MIN_YEAR, maxYear = MAX_YEAR }) {
  const rafRef = useRef(null);

  const debouncedOnChange = useCallback(
    (val) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        onChange(Number(val));
        rafRef.current = null;
      });
    },
    [onChange]
  );

  const currentDecade = Math.floor(year / 10) * 10;

  return (
    <div>
      <input
        type="range"
        min={minYear}
        max={maxYear}
        value={year}
        onChange={(e) => debouncedOnChange(e.target.value)}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-primary"
        style={{
          background: `linear-gradient(to right, #1a3a52 0%, #1a3a52 ${((year - minYear) / (maxYear - minYear)) * 100}%, #e5e7eb ${((year - minYear) / (maxYear - minYear)) * 100}%, #e5e7eb 100%)`,
        }}
        aria-label="Select year"
        aria-valuemin={minYear}
        aria-valuemax={maxYear}
        aria-valuenow={year}
      />
      <div className="mt-2 flex flex-nowrap gap-2 overflow-x-auto pb-2">
        {DECADES.filter((d) => d >= minYear && d <= maxYear).map((decade) => (
          <button
            key={decade}
            onClick={() => onChange(decade)}
            className={`flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              currentDecade === decade ? 'bg-primary text-white' : 'bg-gray-200 text-slate-700 hover:bg-gray-300'
            }`}
          >
            {decade}s
          </button>
        ))}
      </div>
    </div>
  );
}

export default YearSlider;
