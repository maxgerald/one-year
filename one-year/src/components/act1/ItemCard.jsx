/**
 * ItemCard - Single item: icon, price, fraction bar, time label
 */
import { useOneYearCalc } from '../../hooks/useOneYearCalc';
import { formatCurrency } from '../../utils/formatters';
import ItemFractionBar from './ItemFractionBar';
import SourceCitation from '../shared/SourceCitation';
function ItemCard({ item, income }) {
  const { price, hasData, source, sourceUrl } = item;
  const calc = useOneYearCalc(price, income?.amount);
  const isExpensive = calc.fraction > 1;

  if (!hasData) {
    return (
      <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{item.icon}</span>
          <span className="font-semibold text-slate-600">{item.name}</span>
        </div>
        <p className="mt-2 text-sm text-slate-500">No data</p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl bg-white p-4 shadow-sm transition-all hover:-translate-y-px hover:shadow-md ${
        isExpensive ? 'border-l-4 border-red-500' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{item.icon}</span>
          <span className="font-semibold text-primary">{item.name}</span>
        </div>
        <span className="font-semibold tabular-nums text-primary">{formatCurrency(price)}</span>
      </div>
      <div className="mt-3">
        <ItemFractionBar
          fraction={calc.fraction}
          barColor={calc.barColor}
          maxDisplayFraction={Math.max(2, calc.fraction * 0.5)}
        />
      </div>
      <p className="mt-2 text-sm font-semibold text-primary">{calc.formatted}</p>
      {source && <SourceCitation source={source} url={sourceUrl} className="mt-1" />}
    </div>
  );
}

export default ItemCard;
