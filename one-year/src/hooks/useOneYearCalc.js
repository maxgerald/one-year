/**
 * ONE YEAR - useOneYearCalc hook
 * Calculates 1Y fractions, affordability, and display values for an item.
 */

import { useMemo } from 'react';
import { formatMonths, formatYears } from '../utils/formatters.js';
import { COLORS } from '../utils/constants.js';

/**
 * Returns 1Y calculation results for a price and income.
 * @param {number|null} price - Item price (annualized for monthly items)
 * @param {number|null} income - Annual income
 * @param {{ isMonthly?: boolean }} opts - isMonthly: multiply price by 12 before calc
 * @returns {{ fraction: number, months: number, years: number, days: number, formatted: string, affordability: string, barWidthPercent: number, barColor: string }}
 */
export function useOneYearCalc(price, income, opts = {}) {
  const { isMonthly = false } = opts;

  return useMemo(() => {
    let p = price;
    if (isMonthly && p != null) p = p * 12;

    if (p == null || income == null || income <= 0 || Number.isNaN(p) || Number.isNaN(income)) {
      return {
        fraction: 0,
        months: 0,
        years: 0,
        days: 0,
        formatted: 'N/A',
        affordability: 'unknown',
        barWidthPercent: 0,
        barColor: COLORS.slate,
      };
    }

    const fraction = p / income;
    const months = fraction * 12;
    const years = fraction;
    const days = Math.round(months * (365 / 12));

    let formatted;
    if (fraction >= 1) {
      formatted = formatYears(fraction);
    } else {
      formatted = formatMonths(fraction);
    }

    let affordability;
    let barColor;
    if (fraction < 0.15) {
      affordability = 'affordable';
      barColor = COLORS.green;
    } else if (fraction < 0.5) {
      affordability = 'moderate';
      barColor = COLORS.orange;
    } else if (fraction <= 1) {
      affordability = 'stretch';
      barColor = COLORS.accent;
    } else {
      affordability = 'unaffordable';
      barColor = COLORS.red;
    }

    const barWidthPercent = Math.min(fraction * 100, 200);

    return {
      fraction,
      months,
      years,
      days,
      formatted,
      affordability,
      barWidthPercent,
      barColor,
    };
  }, [price, income, isMonthly]);
}
