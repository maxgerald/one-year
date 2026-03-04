#!/usr/bin/env node
/**
 * ONE YEAR - Data update pipeline
 * Fetches latest BLS/Census data and updates oneYearData.json.
 * Run: node scripts/data-update.js
 *
 * Data sources:
 * - BLS: https://www.bls.gov/data/
 * - Census: https://www.census.gov/data/developers/data-sets.html
 * - FRED: https://fred.stlouisfed.org/docs/api/fred/
 *
 * After updating JSON, run validation.
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, '../src/data/oneYearData.json');

function validateDataIntegrity(data) {
  const errors = [];
  const incomeData = data?.incomeData?.data;
  if (!incomeData || typeof incomeData !== 'object') {
    errors.push('incomeData.data is missing or invalid');
  } else {
    const incomeYears = Object.keys(incomeData).filter((k) => !Number.isNaN(Number(k)));
    if (incomeYears.length < 5) errors.push(`incomeData has ${incomeYears.length} years, need >= 5`);
  }
  const items = data?.items;
  if (!items || typeof items !== 'object') {
    errors.push('items is missing or invalid');
  } else {
    for (const [key, item] of Object.entries(items)) {
      const prices = item?.prices ?? item?.annualRent;
      if (!prices || typeof prices !== 'object') {
        errors.push(`Item ${key} has no prices`);
      } else {
        const points = Object.entries(prices).filter(([k, v]) => !Number.isNaN(Number(k)) && typeof v === 'number' && v >= 0);
        if (points.length < 3) errors.push(`Item ${key} has ${points.length} data points, need >= 3`);
      }
    }
  }
  return { valid: errors.length === 0, errors };
}

async function main() {
  console.log('ONE YEAR - Data update pipeline');
  const data = JSON.parse(readFileSync(DATA_PATH, 'utf8'));

  // TODO: Fetch latest data from BLS, Census, FRED APIs
  // Example: const newIncome = await fetch('https://api.bls.gov/...');
  // data.incomeData.data['2026'] = { individual_ft_est: newIncome };

  const { valid, errors } = validateDataIntegrity(data);
  if (valid) {
    console.log('Validation passed.');
  } else {
    console.error('Validation failed:', errors);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
