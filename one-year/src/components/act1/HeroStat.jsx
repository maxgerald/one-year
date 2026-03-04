/**
 * HeroStat - Large year display with income and housing headline
 */
import AnimatedNumber from '../shared/AnimatedNumber';
import SourceCitation from '../shared/SourceCitation';
import Tooltip from '../shared/Tooltip';
import { formatCurrency } from '../../utils/formatters';
import { useOneYearCalc } from '../../hooks/useOneYearCalc';
import { REFERENCE_SOURCES } from '../../data/sources';

function HeroStat({ year, income, items }) {
  const housingItem = items?.find((i) => i.category === 'Housing' && i.hasData) ?? items?.find((i) => i.hasData);
  const { formatted } = useOneYearCalc(housingItem?.price, income?.amount);
  const itemName = housingItem?.category === 'Housing' ? 'A house' : housingItem?.name ?? 'A house';

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
      <div className="text-6xl font-black text-primary md:text-7xl">{year}</div>
      <div className="mt-2">
        <span className="text-slate-600">1Y = </span>
        <AnimatedNumber
          value={income?.amount}
          format={(v) => formatCurrency(v)}
          className="font-semibold text-primary"
        />
      </div>
      <p className="mt-4 text-lg text-primary">
        <Tooltip content="75% of U.S. homes are unaffordable to the typical household. Income needed: ~$113K; median household earns ~$80K (Bankrate, 2025).">
          <span className="cursor-help border-b border-dotted border-slate-400">
            {itemName} cost <span className="font-semibold">{formatted}</span> of your labor.
          </span>
        </Tooltip>
      </p>
      <p className="mt-2 text-xs text-slate-500">
        <SourceCitation source={REFERENCE_SOURCES.bankrate.label} url={REFERENCE_SOURCES.bankrate.url} />
      </p>
    </div>
  );
}

export default HeroStat;
