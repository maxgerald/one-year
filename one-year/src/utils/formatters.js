/**
 * ONE YEAR - Formatting utilities for currency, time fractions, and display
 */

/**
 * Formats a number as currency.
 * @param {number|null|undefined} amount - Amount to format
 * @param {{ compact?: boolean, decimals?: number }} opts - compact: use "K"/"M"; decimals: decimal places
 * @returns {string} Formatted string like "$1,234" or "N/A"
 */
export function formatCurrency(amount, opts = {}) {
  if (amount == null || Number.isNaN(amount)) return 'N/A';
  const { compact = false, decimals } = opts;

  if (compact && amount >= 1000) {
    if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  }

  const hasDecimals = decimals !== undefined;
  const n = Number(amount);
  if (n >= 1000 || (hasDecimals && decimals === 0)) {
    return `$${Math.round(n).toLocaleString()}`;
  }
  const d = hasDecimals ? decimals : (n < 1 ? 2 : n < 100 ? 1 : 0);
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d })}`;
}

/**
 * Formats a fraction of a year as months or days.
 * @param {number|null|undefined} fraction - Fraction of 1Y (e.g. 0.25 = 3 months)
 * @returns {string} "X.X months" or "X days" if < 0.5 month
 */
export function formatMonths(fraction) {
  if (fraction == null || Number.isNaN(fraction)) return 'N/A';
  const months = fraction * 12;
  if (months < 0.5) {
    const days = Math.round(months * (365 / 12));
    return `${days} day${days !== 1 ? 's' : ''}`;
  }
  return `${months.toFixed(1)} months`;
}

/**
 * Formats a fraction of a year as years.
 * @param {number|null|undefined} fraction - Fraction of 1Y (e.g. 2.5 = 2.5 years)
 * @returns {string} "X.X years"
 */
export function formatYears(fraction) {
  if (fraction == null || Number.isNaN(fraction)) return 'N/A';
  return `${fraction.toFixed(1)} years`;
}

/**
 * Auto-selects days/months/years based on fraction size.
 * @param {number|null|undefined} fraction - Fraction of 1Y
 * @returns {{ value: number, unit: string, display: string }}
 */
export function formatFraction(fraction) {
  if (fraction == null || Number.isNaN(fraction)) {
    return { value: 0, unit: 'years', display: 'N/A' };
  }
  if (fraction >= 1) {
    return { value: fraction, unit: 'years', display: formatYears(fraction) };
  }
  const months = fraction * 12;
  if (months >= 1) {
    return { value: months, unit: 'months', display: formatMonths(fraction) };
  }
  const days = Math.round(months * (365 / 12));
  return { value: days, unit: 'days', display: `${days} day${days !== 1 ? 's' : ''}` };
}

/**
 * Formats income as annual amount.
 * @param {number|null|undefined} amount - Annual income
 * @returns {string} "$XX,XXX/year" or "N/A"
 */
export function formatIncome(amount) {
  if (amount == null || Number.isNaN(amount)) return 'N/A';
  return `$${Math.round(amount).toLocaleString()}/year`;
}

/**
 * Formats a ratio as "X:1".
 * @param {number|null|undefined} num - Numerator
 * @param {number|null|undefined} den - Denominator (default 1)
 * @returns {string} "X:1" or "N/A"
 */
export function formatRatio(num, den = 1) {
  if (num == null || Number.isNaN(num) || den == null || den === 0 || Number.isNaN(den)) return 'N/A';
  const ratio = num / den;
  return `${Math.round(ratio)}:1`;
}
