/**
 * AmericanDreamPreset - 1960 vs 2025 budget breakdown
 * Classic single-income dream: house, car, groceries, 2 kids, college savings.
 */
import { useState } from 'react';
import {
  getItemPriceForYear,
  getIncomeForYear,
  getAnnualGroceriesForYear,
  getCollegeFourYearTotalForYear,
} from '../../utils/dataAccess';
import FractionBar from '../shared/FractionBar';
import SourceCitation from '../shared/SourceCitation';
import { formatCurrency } from '../../utils/formatters';
import { REFERENCE_SOURCES } from '../../data/sources';

function buildBundleRows(year, income) {
  const house = getItemPriceForYear('medianHome', year).price ?? 0;
  const car = getItemPriceForYear('newCar', year).price ?? 0;
  const groceries = getAnnualGroceriesForYear(year) ?? 0;
  const college2 = (getCollegeFourYearTotalForYear(year) ?? 0) * 2;

  const rows = [
    { key: 'house', label: 'House', cost: house },
    { key: 'car', label: 'New Car', cost: car },
    { key: 'groceries', label: 'Groceries (family of 4)', cost: groceries },
    { key: 'college', label: 'College (2 kids)', cost: college2 },
  ];

  const total = rows.reduce((s, r) => s + r.cost, 0);
  return rows.map((r) => ({
    ...r,
    fraction: income > 0 ? r.cost / income : 0,
  })).concat({
    key: '_total',
    label: 'Total',
    cost: total,
    fraction: income > 0 ? total / income : 0,
  });
}

function AmericanDreamPreset() {
  const [open, setOpen] = useState(false);

  const year1960 = 1960;
  const year2025 = 2025;
  const income60 = getIncomeForYear(year1960).amount;
  const income25 = getIncomeForYear(year2025).amount;

  const rows60 = buildBundleRows(year1960, income60);
  const rows25 = buildBundleRows(year2025, income25);

  const totalFrac60 = rows60.find((r) => r.key === '_total')?.fraction ?? 0;
  const totalFrac25 = rows25.find((r) => r.key === '_total')?.fraction ?? 0;

  return (
    <div className="mt-8">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg bg-accent px-4 py-2 font-semibold text-white hover:bg-accent-dark"
      >
        {open ? 'Hide' : 'See'} the American Dream breakdown
      </button>
      {open && (
        <div className="mt-4 space-y-4">
          <p className="text-sm text-slate-600">
            Classic single-income dream: house, car, groceries, 2 kids, college savings. Single income became impossible around 1978. Even two incomes became insufficient by the early 2000s. Median first-time buyer age is now 40 (was 29 in 1981).
          </p>
          <p className="text-xs text-slate-500">
            <SourceCitation source={REFERENCE_SOURCES.bankrate.label} url={REFERENCE_SOURCES.bankrate.url} />
            {' · '}
            <SourceCitation source={REFERENCE_SOURCES.nahb.label} url={REFERENCE_SOURCES.nahb.url} />
          </p>
          <div className="grid gap-6 rounded-xl bg-white p-6 shadow-lg md:grid-cols-2">
            <div>
              <h4 className="mb-4 font-bold text-primary">{year1960}</h4>
              <p className="mb-2 text-sm text-slate-600">1Y = {formatCurrency(income60)}</p>
              {rows60.map((r) => (
                <div key={r.key} className="mb-3 flex items-center justify-between gap-4">
                  <span className="text-sm">{r.label}</span>
                  <div className="flex-1 min-w-0">
                    <FractionBar
                      fraction={r.fraction}
                      color={r.fraction > 1 ? '#d32f2f' : '#7cb342'}
                      maxDisplayFraction={r.key === '_total' ? 2.5 : 2}
                      showOverflowIndicator={r.key === '_total'}
                    />
                  </div>
                  <span className="text-xs shrink-0">{formatCurrency(r.cost)}</span>
                </div>
              ))}
              <div className="mt-4 border-t pt-2 font-semibold">
                Total: {totalFrac60.toFixed(2)} of 1Y
                {totalFrac60 <= 1 && (
                  <span className="ml-2 text-green-600">Fits in one salary.</span>
                )}
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-bold text-primary">{year2025}</h4>
              <p className="mb-2 text-sm text-slate-600">1Y = {formatCurrency(income25)}</p>
              {rows25.map((r) => (
                <div key={r.key} className="mb-3 flex items-center justify-between gap-4">
                  <span className="text-sm">{r.label}</span>
                  <div className="flex-1 min-w-0">
                    <FractionBar
                      fraction={r.fraction}
                      color={r.fraction > 1 ? '#d32f2f' : '#7cb342'}
                      maxDisplayFraction={r.key === '_total' ? 4 : 3}
                      showOverflowIndicator
                    />
                  </div>
                  <span className="text-xs shrink-0">{formatCurrency(r.cost)}</span>
                </div>
              ))}
              <div className="mt-4 border-t pt-2 font-semibold">
                Total: {totalFrac25.toFixed(2)} of 1Y
                {totalFrac25 > 1 && (
                  <span className="ml-2 text-red-600">Mathematically impossible on one salary.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AmericanDreamPreset;
