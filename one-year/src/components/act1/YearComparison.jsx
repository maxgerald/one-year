/**
 * YearComparison - Side-by-side comparison of two years
 */
import { useState } from 'react';
import { getItemPriceForYear, getIncomeForYear } from '../../utils/dataAccess';
import { MIN_YEAR, MAX_YEAR } from '../../utils/constants';
import { getAllItems } from '../../utils/dataAccess';

function YearComparison() {
  const [yearA, setYearA] = useState(1960);
  const [yearB, setYearB] = useState(2025);
  const [open, setOpen] = useState(false);

  const items = getAllItems();
  const incomeA = getIncomeForYear(yearA).amount;
  const incomeB = getIncomeForYear(yearB).amount;

  const rows = items.map((item) => {
    const { price: pA } = getItemPriceForYear(item.key, yearA);
    const { price: pB } = getItemPriceForYear(item.key, yearB);
    const fracA = incomeA > 0 ? (pA ?? 0) / incomeA : 0;
    const fracB = incomeB > 0 ? (pB ?? 0) / incomeB : 0;
    const ratio = fracA > 0 ? fracB / fracA : 0;
    return { ...item, fracA, fracB, ratio };
  });

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary"
      >
        {open ? 'Hide' : 'Compare'} two years
      </button>
      {open && (
        <div className="mt-4 space-y-4 rounded-xl bg-white p-6 shadow-lg">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-xs text-slate-600">Year A</label>
              <select
                value={yearA}
                onChange={(e) => setYearA(Number(e.target.value))}
                className="ml-2 rounded border px-2 py-1"
              >
                {Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => MIN_YEAR + i).map(
                  (y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-600">Year B</label>
              <select
                value={yearB}
                onChange={(e) => setYearB(Number(e.target.value))}
                className="ml-2 rounded border px-2 py-1"
              >
                {Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => MIN_YEAR + i).map(
                  (y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            {rows.filter((r) => r.fracA > 0 || r.fracB > 0).map((r) => (
              <div key={r.key} className="flex items-center justify-between rounded bg-gray-50 p-2">
                <span className="font-medium">{r.name}</span>
                <span className="text-sm">
                  {r.ratio > 1 ? (
                    <span className="text-red-600">
                      {r.ratio.toFixed(1)}x more in {yearB} vs {yearA}
                    </span>
                  ) : r.ratio < 1 ? (
                    <span className="text-green-600">
                      {((1 - r.ratio) * 100).toFixed(0)}% cheaper in {yearB}
                    </span>
                  ) : (
                    'Same'
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default YearComparison;
