/**
 * ONE YEAR - Linear interpolation utilities for year-based data
 * Handles missing years by interpolating between known data points.
 */

/**
 * Performs linear interpolation for a target year between known data points.
 * @param {Object} dataPoints - Object with year keys (string or number) and numeric values
 * @param {number} targetYear - The year to interpolate
 * @returns {number|null} Interpolated value, or null if out of range or invalid
 */
export function interpolateValue(dataPoints, targetYear) {
  if (!dataPoints || typeof dataPoints !== 'object') return null;

  const entries = Object.entries(dataPoints)
    .filter(([, v]) => v != null && typeof v === 'number' && !Number.isNaN(v))
    .map(([k, v]) => [Number(k), v])
    .filter(([k]) => !Number.isNaN(k))
    .sort((a, b) => a[0] - b[0]);

  if (entries.length === 0) return null;
  if (entries.length === 1) return entries[0][0] === targetYear ? entries[0][1] : null;

  const minYear = entries[0][0];
  const maxYear = entries[entries.length - 1][0];
  if (targetYear < minYear || targetYear > maxYear) return null;

  const exact = entries.find(([y]) => y === targetYear);
  if (exact) return exact[1];

  let lower = entries[0];
  let upper = entries[entries.length - 1];
  for (let i = 0; i < entries.length - 1; i++) {
    if (entries[i][0] <= targetYear && entries[i + 1][0] >= targetYear) {
      lower = entries[i];
      upper = entries[i + 1];
      break;
    }
  }

  const ratio = (targetYear - lower[0]) / (upper[0] - lower[0]);
  return lower[1] + (upper[1] - lower[1]) * ratio;
}

/**
 * Returns a sorted array of years that have data.
 * @param {Object} dataPoints - Object with year keys and values
 * @returns {number[]} Sorted array of years
 */
export function getAvailableYears(dataPoints) {
  if (!dataPoints || typeof dataPoints !== 'object') return [];

  return Object.keys(dataPoints)
    .map((k) => Number(k))
    .filter((y) => !Number.isNaN(y))
    .sort((a, b) => a - b);
}

/**
 * Returns the closest year with data to the target year.
 * @param {Object} dataPoints - Object with year keys and values
 * @param {number} targetYear - The year to find nearest for
 * @returns {number|null} Closest year with data, or null if no data
 */
export function getNearestYear(dataPoints, targetYear) {
  const years = getAvailableYears(dataPoints);
  if (years.length === 0) return null;

  let nearest = years[0];
  let minDist = Math.abs(years[0] - targetYear);
  for (const y of years) {
    const d = Math.abs(y - targetYear);
    if (d < minDist) {
      minDist = d;
      nearest = y;
    }
  }
  return nearest;
}

/**
 * Returns interpolated values for every integer year in the range.
 * @param {Object} dataPoints - Object with year keys and numeric values
 * @param {number} min - Minimum year (inclusive)
 * @param {number} max - Maximum year (inclusive)
 * @returns {Object} Object mapping each year to its interpolated value
 */
export function getAllYearsInRange(dataPoints, min, max) {
  const result = {};
  for (let y = min; y <= max; y++) {
    const v = interpolateValue(dataPoints, y);
    if (v != null) result[y] = v;
  }
  return result;
}
