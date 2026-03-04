/**
 * Act1 - "What Does Your Year Buy?" main experience
 */
import { useState } from 'react';
import { useOneYearCalc } from '../hooks/useOneYearCalc';
import { formatYears, formatMonths } from '../utils/formatters';

function QuickStats({ items, income, year }) {
  const byKey = (key) => items?.find((i) => i.key === key);
  const housing = useOneYearCalc(byKey('medianHome')?.price, income?.amount);
  const college = useOneYearCalc(byKey('collegeTuition')?.price, income?.amount);
  const car = useOneYearCalc(byKey('newCar')?.price, income?.amount);
  const eggs = useOneYearCalc(byKey('eggs')?.price, income?.amount);

  const stats = [
    { label: 'Housing', value: housing.fraction >= 1 ? formatYears(housing.fraction) : formatMonths(housing.fraction) },
    { label: 'College', value: college.formatted },
    { label: 'New Car', value: car.formatted },
    { label: 'Eggs', value: eggs.formatted },
  ];

  return (
    <div className="mb-8 flex flex-nowrap gap-4 overflow-x-auto pb-2 md:flex-wrap">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex min-w-[120px] flex-shrink-0 rounded-lg bg-white px-4 py-4 shadow-sm"
        >
          <span className="text-xs font-semibold text-slate-600">{s.label}</span>
          <span className="mt-1 block font-semibold text-primary">{s.value}</span>
        </div>
      ))}
    </div>
  );
}
import { useYearData } from '../hooks/useYearData';
import { DEFAULT_YEAR, MIN_YEAR, MAX_YEAR } from '../utils/constants';
import EraLabel from '../components/act1/EraLabel';
import HeroStat from '../components/act1/HeroStat';
import YearSlider from '../components/act1/YearSlider';
import IncomeDisplay from '../components/act1/IncomeDisplay';
import ItemGrid from '../components/act1/ItemGrid';
import YearContext from '../components/act1/YearContext';
import AmericanDreamPreset from '../components/act1/AmericanDreamPreset';
import YearComparison from '../components/act1/YearComparison';
import BuildYourLife from '../components/act1/BuildYourLife';
import YourYear from '../components/act1/YourYear';
import SocialShare from '../components/shared/SocialShare';
import AnimatedOnScroll from '../components/shared/AnimatedOnScroll';
import OnThisDayCard from '../components/shared/OnThisDayCard';

function Act1() {
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);
  const [incomeType, setIncomeType] = useState('median');
  const { year, income, items, context } = useYearData(selectedYear, { incomeType });

  return (
    <main id="act1" className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4">
        <EraLabel year={year} />
      </div>
      <AnimatedOnScroll>
        <div className="mb-8">
          <HeroStat year={year} income={income} items={items} />
        </div>
      </AnimatedOnScroll>
      <div className="mb-8">
        <YearSlider
          year={selectedYear}
          onChange={setSelectedYear}
          minYear={MIN_YEAR}
          maxYear={MAX_YEAR}
        />
      </div>
      <div className="mb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setIncomeType('median')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
              incomeType === 'median' ? 'bg-primary text-white' : 'bg-gray-200 text-slate-700'
            }`}
          >
            Median Worker
          </button>
          <button
            onClick={() => setIncomeType('minimum')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
              incomeType === 'minimum' ? 'bg-primary text-white' : 'bg-gray-200 text-slate-700'
            }`}
          >
            Minimum Wage
          </button>
          <button
            onClick={() => setIncomeType('household')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
              incomeType === 'household' ? 'bg-primary text-white' : 'bg-gray-200 text-slate-700'
            }`}
          >
            Household Income
          </button>
        </div>
        {incomeType === 'minimum' && year < 1938 && (
          <p className="mb-2 text-sm text-accent">No federal minimum wage before 1938.</p>
        )}
        {incomeType === 'household' && (
          <p className="mb-2 text-xs text-slate-600">Since ~1970, most households have two incomes.</p>
        )}
        <IncomeDisplay income={income} year={year} type={income?.type} source={income?.source} />
      </div>
      <QuickStats items={items} income={income} year={year} />
      <AnimatedOnScroll>
        <div className="mb-8">
          <ItemGrid items={items} income={income} year={year} />
        </div>
      </AnimatedOnScroll>
      {context && (
        <div className="mb-8">
          <YearContext year={year} context={context} />
        </div>
      )}
      <AmericanDreamPreset />
      <YearComparison />
      <BuildYourLife />
      <YourYear />
      <div className="mt-8">
        <OnThisDayCard />
      </div>
      <div className="mt-8">
        <SocialShare text="A house cost 2.3 years of salary in 1950. Today it costs 4.9 years." />
      </div>
    </main>
  );
}

export default Act1;
