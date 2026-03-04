/**
 * Embed - Lightweight embeddable widget for blogs
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { getIncomeForYear, getItemPriceForYear } from './utils/dataAccess';
import { formatMonths, formatYears } from './utils/formatters';
import { MIN_YEAR, MAX_YEAR } from './utils/constants';
import './index.css';

function Embed() {
  const [year, setYear] = useState(2025);

  const income = getIncomeForYear(year).amount;
  const homePrice = getItemPriceForYear('medianHome', year).price ?? 0;
  const fraction = income > 0 ? homePrice / income : 0;
  const homeStr = fraction >= 1 ? formatYears(fraction) : formatMonths(fraction);

  return (
    <div className="min-h-[200px] rounded-lg border border-slate-200 bg-white p-4 font-['Inter',sans-serif]">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-lg font-bold text-[#1a3a52]">ONE YEAR</span>
        <a
          href="https://oneyear.work"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#e67e22] hover:underline"
        >
          View full app →
        </a>
      </div>
      <p className="mb-2 text-sm text-slate-600">
        In {year}, a house cost <strong className="text-[#1a3a52]">{homeStr}</strong> of a worker&apos;s salary.
      </p>
      <input
        type="range"
        min={MIN_YEAR}
        max={MAX_YEAR}
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="w-full accent-[#e67e22]"
      />
      <div className="mt-1 flex justify-between text-xs text-slate-500">
        <span>{MIN_YEAR}</span>
        <span className="font-semibold text-[#1a3a52]">{year}</span>
        <span>{MAX_YEAR}</span>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Embed />
  </StrictMode>
);
