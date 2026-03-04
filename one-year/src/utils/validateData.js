/**
 * ONE YEAR - Data validation utility
 * Checks data integrity on dev load. Logs errors with "DATA INTEGRITY:" prefix.
 */

import oneYearData from '../data/oneYearData.json';

/**
 * Validates data integrity: years parse as numbers, prices positive,
 * income has >= 5 years, each item has >= 3 data points.
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateDataIntegrity() {
  const errors = [];

  const incomeData = oneYearData?.incomeData?.data;
  if (!incomeData || typeof incomeData !== 'object') {
    errors.push('incomeData.data is missing or invalid');
  } else {
    const incomeYears = Object.keys(incomeData).filter((k) => {
      const n = Number(k);
      return !Number.isNaN(n);
    });
    if (incomeYears.length < 5) {
      errors.push(`incomeData has ${incomeYears.length} years, need >= 5`);
    }
    for (const [yearStr, entry] of Object.entries(incomeData)) {
      const y = Number(yearStr);
      if (Number.isNaN(y)) errors.push(`Invalid income year key: ${yearStr}`);
      if (entry && typeof entry === 'object') {
        const val = entry.individual_ft_est ?? entry.household ?? entry.avg_annual;
        if (val != null && (typeof val !== 'number' || val < 0)) {
          errors.push(`Invalid income value for ${yearStr}: ${val}`);
        }
      }
    }
  }

  const items = oneYearData?.items;
  if (!items || typeof items !== 'object') {
    errors.push('items is missing or invalid');
  } else {
    for (const [key, item] of Object.entries(items)) {
      const prices = item?.prices ?? item?.annualRent;
      if (!prices || typeof prices !== 'object') {
        errors.push(`Item ${key} has no prices or annualRent`);
      } else {
        const points = Object.entries(prices).filter(([k, v]) => {
          const y = Number(k);
          return !Number.isNaN(y) && v != null && typeof v === 'number' && v >= 0;
        });
        if (points.length < 3) {
          errors.push(`Item ${key} has ${points.length} valid data points, need >= 3`);
        }
        for (const [yearStr, val] of Object.entries(prices)) {
          const y = Number(yearStr);
          if (Number.isNaN(y)) errors.push(`Item ${key}: invalid year key ${yearStr}`);
          if (val != null && typeof val === 'number' && val < 0) {
            errors.push(`Item ${key} year ${yearStr}: negative price ${val}`);
          }
        }
      }
    }
  }

  const valid = errors.length === 0;
  if (import.meta.env.DEV && errors.length > 0) {
    errors.forEach((e) => console.warn('DATA INTEGRITY:', e));
  }
  return { valid, errors };
}
