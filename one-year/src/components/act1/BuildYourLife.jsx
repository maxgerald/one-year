/**
 * BuildYourLife - User selects lifestyle elements, app calculates total 1Y cost across years.
 * Shows when it became impossible on one salary.
 */
import { useState, useMemo } from 'react';
import {
  getItemPriceForYear,
  getIncomeForYear,
  getAnnualGroceriesForYear,
  getCollegeFourYearTotalForYear,
} from '../../utils/dataAccess';
import { MIN_YEAR, MAX_YEAR } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';
import FractionBar from '../shared/FractionBar';

const LIFESTYLE_OPTIONS = [
  { key: 'medianHome', label: 'House', icon: '🏠', getCost: (y) => getItemPriceForYear('medianHome', y).price ?? 0 },
  { key: 'newCar', label: 'New Car', icon: '🚗', getCost: (y) => getItemPriceForYear('newCar', y).price ?? 0 },
  { key: 'college', label: 'College (1 kid, 4 years)', icon: '🎓', getCost: (y) => getCollegeFourYearTotalForYear(y) ?? 0 },
  { key: 'groceries', label: 'Groceries (family of 4)', icon: '🛒', getCost: (y) => getAnnualGroceriesForYear(y) ?? 0 },
  { key: 'monthlyRent', label: 'Rent (annual)', icon: '🏢', getCost: (y) => getItemPriceForYear('monthlyRent', y).price ?? 0 },
];

function BuildYourLife() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({ medianHome: true, newCar: true, groceries: true });

  const toggle = (key) => setSelected((s) => ({ ...s, [key]: !s[key] }));

  const { yearBecameImpossible, totalFraction2025, totalFraction1960, breakdown } = useMemo(() => {
    const active = LIFESTYLE_OPTIONS.filter((o) => selected[o.key]);
    if (active.length === 0) {
      return { yearBecameImpossible: null, totalFraction2025: 0, totalFraction1960: 0, breakdown: [] };
    }

    let firstImpossible = null;
    const samples = [];

    for (let y = MIN_YEAR; y <= MAX_YEAR; y++) {
      const income = getIncomeForYear(y).amount;
      if (income <= 0) continue;

      let total = 0;
      for (const opt of active) {
        total += opt.getCost(y);
      }
      const frac = total / income;

      if (frac > 1 && firstImpossible == null) firstImpossible = y;
      if (y === 1960 || y === 2025) samples.push({ year: y, total, income, frac });
    }

    const b2025 = samples.find((s) => s.year === 2025);
    const b1960 = samples.find((s) => s.year === 1960);

    return {
      yearBecameImpossible: firstImpossible,
      totalFraction2025: b2025?.frac ?? 0,
      totalFraction1960: b1960?.frac ?? 0,
      breakdown: active.map((opt) => ({
        ...opt,
        cost2025: opt.getCost(2025),
        cost1960: opt.getCost(1960),
      })),
    };
  }, [selected]);

  return (
    <div className="mt-8">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg border-2 border-accent px-4 py-2 font-semibold text-accent hover:bg-accent/10"
      >
        {open ? 'Hide' : 'Build'} your life calculator
      </button>
      {open && (
        <div className="mt-4 space-y-4 rounded-xl bg-white p-6 shadow-lg">
          <p className="text-sm text-slate-600">
            Select the lifestyle elements you want. We&apos;ll calculate the total cost as a fraction of one salary and show when it became impossible.
          </p>
          <div className="flex flex-wrap gap-4">
            {LIFESTYLE_OPTIONS.map((opt) => (
              <label key={opt.key} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!selected[opt.key]}
                  onChange={() => toggle(opt.key)}
                  className="h-4 w-4 rounded border-slate-300 text-accent"
                />
                <span>{opt.icon} {opt.label}</span>
              </label>
            ))}
          </div>

          {breakdown.length > 0 && (
            <>
              <div className="grid gap-4 border-t pt-4 md:grid-cols-2">
                <div>
                  <h5 className="mb-2 font-semibold text-primary">1960</h5>
                  {breakdown.map((b) => (
                    <div key={b.key} className="flex items-center justify-between gap-2 text-sm">
                      <span>{b.icon} {b.label}</span>
                      <span>{formatCurrency(b.cost1960)}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h5 className="mb-2 font-semibold text-primary">2025</h5>
                  {breakdown.map((b) => (
                    <div key={b.key} className="flex items-center justify-between gap-2 text-sm">
                      <span>{b.icon} {b.label}</span>
                      <span>{formatCurrency(b.cost2025)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Total as fraction of 1Y (2025):</span>
                  <div className="flex-1 max-w-xs">
                    <FractionBar
                      fraction={totalFraction2025}
                      color={totalFraction2025 > 1 ? '#d32f2f' : '#7cb342'}
                      maxDisplayFraction={4}
                      showOverflowIndicator
                    />
                  </div>
                  <span className="text-sm font-semibold">{totalFraction2025.toFixed(2)}</span>
                </div>
                {yearBecameImpossible != null && (
                  <p className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">
                    Your selected lifestyle became impossible on one median salary around <strong>{yearBecameImpossible}</strong>.
                  </p>
                )}
                {yearBecameImpossible == null && totalFraction2025 <= 1 && (
                  <p className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
                    Your selection still fits within one salary in 2025 ({totalFraction2025.toFixed(2)} of 1Y).
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default BuildYourLife;
