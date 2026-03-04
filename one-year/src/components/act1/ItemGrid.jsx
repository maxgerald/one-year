/**
 * ItemGrid - Categorized grid of ItemCards
 */
import ItemCard from './ItemCard';
import { CATEGORY_ORDER } from '../../utils/constants';

function ItemGrid({ items, income, year }) {
  const byCategory = {};
  for (const cat of CATEGORY_ORDER) {
    byCategory[cat] = items?.filter((i) => i.category === cat) ?? [];
  }
  const other = items?.filter((i) => !CATEGORY_ORDER.includes(i.category)) ?? [];
  if (other.length) byCategory['Other'] = [...(byCategory['Other'] ?? []), ...other];

  return (
    <div className="space-y-8">
      {CATEGORY_ORDER.filter((c) => (byCategory[c]?.length ?? 0) > 0).map((category) => (
        <div key={category}>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
            {category}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {byCategory[category].map((item) => (
              <ItemCard key={item.key} item={item} income={income} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemGrid;
