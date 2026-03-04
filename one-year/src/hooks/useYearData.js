/**
 * ONE YEAR - useYearData hook
 * Returns income, items, and context for a given year with memoization.
 */

import { useMemo } from 'react';
import {
  getIncomeForYear,
  getItemPriceForYear,
  getAllItems,
  getContextForYear,
} from '../utils/dataAccess.js';
import { CATEGORY_ORDER } from '../utils/constants.js';

/**
 * Returns year data: income, items (sorted by category, missing-data last), and context.
 * @param {number} year - Target year (1913-2025)
 * @param {{ incomeType?: 'median'|'minimum'|'household' }} opts - Income metric. Default: median
 * @returns {{ year: number, income: Object, items: Array, context: string|null }}
 */
export function useYearData(year, opts = {}) {
  const { incomeType = 'median' } = opts;

  return useMemo(() => {
    const y = Number(year);
    const income = getIncomeForYear(y, { type: incomeType });
    const allItems = getAllItems();

    const itemsWithData = allItems.map((item) => {
      const { price, hasData, source, sourceUrl } = getItemPriceForYear(item.key, y);
      return {
        ...item,
        price,
        hasData,
        source,
        sourceUrl,
      };
    });

    const categoryIndex = (cat) => {
      const i = CATEGORY_ORDER.indexOf(cat);
      return i >= 0 ? i : CATEGORY_ORDER.length;
    };

    itemsWithData.sort((a, b) => {
      const catA = categoryIndex(a.category);
      const catB = categoryIndex(b.category);
      if (catA !== catB) return catA - catB;
      return (b.hasData ? 1 : 0) - (a.hasData ? 1 : 0);
    });

    const context = getContextForYear(y);

    return {
      year: y,
      income,
      items: itemsWithData,
      context,
    };
  }, [year, incomeType]);
}
