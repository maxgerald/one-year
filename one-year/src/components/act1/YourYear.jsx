/**
 * YourYear - Birth year personalization
 */
import { useState } from 'react';
import { getIncomeForYear, getItemPriceForYear } from '../../utils/dataAccess';
import { formatMonths, formatYears } from '../../utils/formatters';
import ShareableCard from '../shared/ShareableCard';

function YourYear() {
  const [birthYear, setBirthYear] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setBirthYear(null);
  };

  if (!submitted || birthYear == null) {
    return (
      <div className="mt-8 rounded-xl border-2 border-accent bg-white p-6 shadow-sm">
        <h4 className="mb-4 font-bold text-primary">Your Year</h4>
        <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm text-slate-600">Birth year (1940-2010)</label>
            <input
              type="number"
              min={1940}
              max={2010}
              value={birthYear ?? ''}
              onChange={(e) => setBirthYear(Number(e.target.value) || null)}
              className="mt-1 rounded border px-3 py-2"
            />
          </div>
          <button type="submit" className="rounded-lg bg-accent px-4 py-2 font-semibold text-white">
            Compare
          </button>
        </form>
      </div>
    );
  }

  const parentYear = birthYear + 25;
  const nowYear = 2025;
  const parentIncome = getIncomeForYear(parentYear).amount;
  const nowIncome = getIncomeForYear(nowYear).amount;
  const homeParent = getItemPriceForYear('medianHome', parentYear).price;
  const homeNow = getItemPriceForYear('medianHome', nowYear).price;
  const fracParent = parentIncome > 0 ? (homeParent ?? 0) / parentIncome : 0;
  const fracNow = nowIncome > 0 ? (homeNow ?? 0) / nowIncome : 0;
  const parentStr = fracParent >= 1 ? formatYears(fracParent) : formatMonths(fracParent);
  const nowStr = fracNow >= 1 ? formatYears(fracNow) : formatMonths(fracNow);

  const statText = `Born in ${birthYear}? A house cost ${parentStr} of your parents' work. For you, it's ${nowStr}.`;

  return (
    <div className="mt-8 rounded-xl border-2 border-accent bg-white p-6 shadow-sm">
      <h4 className="mb-4 font-bold text-primary">Your Year</h4>
      <p className="text-primary">
        Born in {birthYear}? Your parents earned {parentIncome > 0 ? `$${Math.round(parentIncome).toLocaleString()}` : 'N/A'} at age 25.
      </p>
      <p className="mt-2 text-primary">
        A house cost {parentStr} of their work. For you, it&apos;s {nowStr}.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <ShareableCard
          yearThen={parentYear}
          yearNow={nowYear}
          statText={statText}
        />
        <button
          onClick={handleReset}
          className="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary"
        >
          Try another year
        </button>
      </div>
    </div>
  );
}

export default YourYear;
