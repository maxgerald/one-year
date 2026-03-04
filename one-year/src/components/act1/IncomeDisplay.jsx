/**
 * IncomeDisplay - Shows 1Y = $XX,XXX with tooltip
 */
import AnimatedNumber from '../shared/AnimatedNumber';
import SourceCitation from '../shared/SourceCitation';
import Tooltip from '../shared/Tooltip';
import { formatCurrency } from '../../utils/formatters';

function IncomeDisplay({ income, year, type, source }) {
  const isPre1947 = year < 1947;

  return (
    <div>
      <div className="flex items-baseline gap-2">
        <Tooltip content="One Year (1Y) = one median worker's annual salary. We use it to compare costs across decades.">
          <span className="cursor-help font-semibold text-primary underline decoration-dotted">1Y</span>
        </Tooltip>
        <span className="text-slate-600">=</span>
        <AnimatedNumber
          value={income?.amount}
          format={(v) => formatCurrency(v)}
          className="font-semibold text-primary"
        />
      </div>
      <p className="mt-1 text-sm text-slate-600">
        {type === 'individual_ft_est' && 'Median Worker Earnings'}
        {type === 'household' && 'Median Household Income (combined)'}
        {type === 'minimum' && 'Federal Minimum Wage (annual)'}
        {type === 'avg_annual' && 'Estimated (pre-1947)'}
        {type === 'interpolated' && 'Median Worker Earnings'}
      </p>
      {isPre1947 && (
        <p className="mt-1 text-xs text-accent">Pre-1947: estimated from manufacturing wages.</p>
      )}
      {source && <SourceCitation source={source} url={income?.sourceUrl} className="mt-1 block" />}
      <button
          onClick={() => window.dispatchEvent(new CustomEvent('openMethodology'))}
          className="mt-2 text-sm text-accent hover:underline"
        >
          How is this calculated?
        </button>
    </div>
  );
}

export default IncomeDisplay;
