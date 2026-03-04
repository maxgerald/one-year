/**
 * ONE YEAR - Data access utilities
 * Reads from oneYearData.json and provides typed accessors with interpolation.
 */

import oneYearData from '../data/oneYearData.json';
import { interpolateValue } from './interpolate.js';
import { getSourceForItem } from '../data/sources.js';

const HOURS_PER_YEAR = 2080;

function getFlattenedIncomeData(preferHousehold = false) {
  const raw = oneYearData?.incomeData?.data;
  if (!raw) return {};

  const result = {};
  for (const [yearStr, entry] of Object.entries(raw)) {
    const y = Number(yearStr);
    if (Number.isNaN(y) || !entry) continue;
    const amount = preferHousehold
      ? (entry.household ?? entry.individual_ft_est ?? entry.avg_annual)
      : (entry.individual_ft_est ?? entry.household ?? entry.avg_annual);
    if (amount != null && typeof amount === 'number') result[y] = amount;
  }
  return result;
}

/**
 * Gets income for a given year with interpolation.
 * @param {number} year - Target year
 * @param {{ type?: 'median'|'minimum'|'household' }} opts - Income type. Default: median (individual_ft_est)
 * @returns {{ amount: number, type: string, source?: string }} Income info, or { amount: 0, type: 'none' } if unavailable
 */
export function getIncomeForYear(year, opts = {}) {
  const { type: incomeType = 'median' } = opts;

  if (incomeType === 'minimum') {
    const amount = getMinimumWageForYear(year);
    if (amount == null) return { amount: 0, type: 'none', source: null };
    return {
      amount,
      type: 'minimum',
      source: oneYearData?.minimumWage?.source,
      sourceUrl: 'https://www.dol.gov/agencies/whd/minimum-wage/history',
    };
  }

  const flat = getFlattenedIncomeData(incomeType === 'household');
  const amount = interpolateValue(flat, year);
  if (amount == null) return { amount: 0, type: 'none' };

  const raw = oneYearData?.incomeData?.data;
  const exact = raw?.[String(year)];
  let type = 'interpolated';
  if (exact) {
    if (incomeType === 'household' && exact.household != null) type = 'household';
    else if (exact.individual_ft_est != null) type = 'individual_ft_est';
    else if (exact.household != null) type = 'household';
    else if (exact.avg_annual != null) type = 'avg_annual';
  }

  const source = oneYearData?.incomeData?.sources?.[0];
  const sourceUrl = 'https://www.census.gov/library/publications/2025/demo/p60-286.html';

  return {
    amount,
    type,
    source,
    sourceUrl: type !== 'none' ? sourceUrl : null,
  };
}

/**
 * Gets item price for a given year. Handles monthly items (rent) by annualizing.
 * @param {string} itemKey - Item key (e.g. "medianHome", "monthlyRent")
 * @param {number} year - Target year
 * @returns {{ price: number|null, source?: string, hasData: boolean }}
 */
export function getItemPriceForYear(itemKey, year) {
  const item = oneYearData?.items?.[itemKey];
  if (!item) return { price: null, hasData: false };

  let dataPoints = item.prices;
  const isMonthly = itemKey === 'monthlyRent' && item.annualRent;
  if (isMonthly && item.annualRent) {
    dataPoints = item.annualRent;
  } else if (isMonthly && item.prices) {
    dataPoints = Object.fromEntries(
      Object.entries(item.prices).map(([y, v]) => [y, (v ?? 0) * 12])
    );
  }

  const price = interpolateValue(dataPoints, year);
  const source = item.sources?.[0];
  const refSource = getSourceForItem(itemKey);

  return {
    price: price ?? null,
    source: refSource?.label ?? source,
    sourceUrl: refSource?.url ?? null,
    hasData: price != null,
  };
}

/**
 * Returns all items as array with key, name, icon, category.
 * @returns {Array<{ key: string, name: string, icon: string, category: string }>}
 */
export function getAllItems() {
  const items = oneYearData?.items;
  if (!items) return [];

  return Object.entries(items).map(([key, item]) => ({
    key,
    name: item.name ?? key,
    icon: item.icon ?? '📊',
    category: item.category ?? 'Other',
  }));
}

import { YEAR_CONTEXTS } from '../data/yearContexts.js';

/**
 * Gets historical context for a year. Checks yearContexts first, then depressionEraContext.
 * @param {number} year - Target year
 * @returns {string|null} Context string or null
 */
export function getContextForYear(year) {
  const y = String(year);
  if (YEAR_CONTEXTS[y]) return YEAR_CONTEXTS[y];

  const dep = oneYearData?.depressionEraContext;
  if (dep?.unemployment?.[y] != null) {
    const u = dep.unemployment[y];
    return dep.keyInsight ?? `Unemployment: ${u}% in ${year}.`;
  }
  if (year >= 1929 && year <= 1940 && dep?.keyInsight) {
    return dep.keyInsight;
  }
  return null;
}

/**
 * Returns billionaire wealth data.
 * @returns {Object} billionaireWealth section
 */
export function getBillionaireData() {
  return oneYearData?.billionaireWealth ?? { data: {} };
}

/**
 * Returns CEO pay ratio data as array of { year, ratio }.
 * @returns {Array<{ year: number, ratio: number }>}
 */
export function getCeoPayRatioData() {
  const data = oneYearData?.ceoPayRatio?.data;
  if (!data) return [];

  return Object.entries(data)
    .map(([y, v]) => ({
      year: Number(y),
      ratio: v?.ratio ?? v,
    }))
    .filter((d) => !Number.isNaN(d.year) && d.ratio != null)
    .sort((a, b) => a.year - b.year);
}

/**
 * Returns key statistics section.
 * @returns {Object} keyStatistics
 */
export function getKeyStatistics() {
  return oneYearData?.keyStatistics ?? { summary: [], bottomLine: '' };
}

/**
 * Gets annual minimum wage for a year (nominal * 2080 hours). Pre-1938 returns null.
 * @param {number} year - Target year
 * @returns {number|null} Annual minimum wage in dollars, or null
 */
export function getMinimumWageForYear(year) {
  const data = oneYearData?.minimumWage?.data;
  if (!data) return null;

  const flat = {};
  for (const [y, entry] of Object.entries(data)) {
    const nominal = entry?.nominal ?? entry;
    if (typeof nominal === 'number') flat[Number(y)] = nominal * HOURS_PER_YEAR;
  }

  if (year < 1938) return null;
  return interpolateValue(flat, year);
}

/** Family-of-4 annual grocery estimate: eggs×20 + milk×52 + bread×104 + groundBeef×100 */
const GROCERY_MULTIPLIERS = { eggs: 20, milk: 52, bread: 104, groundBeef: 100 };

/**
 * Gets estimated annual groceries for family of 4.
 * @param {number} year - Target year
 * @returns {number|null} Estimated annual cost in dollars
 */
export function getAnnualGroceriesForYear(year) {
  let total = 0;
  for (const [key, mult] of Object.entries(GROCERY_MULTIPLIERS)) {
    const { price } = getItemPriceForYear(key, year);
    if (price != null) total += price * mult;
  }
  return total > 0 ? total : null;
}

/**
 * Gets 4-year college total for a year (for American Dream bundle).
 * @param {number} year - Target year
 * @returns {number|null} Four-year total cost
 */
export function getCollegeFourYearTotalForYear(year) {
  const item = oneYearData?.items?.collegeTuition;
  if (!item?.fourYearTotal) return null;
  return interpolateValue(item.fourYearTotal, year);
}
