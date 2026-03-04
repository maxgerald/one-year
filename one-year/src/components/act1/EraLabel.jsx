/**
 * EraLabel - Badge with era name for a year. Tooltip with era description.
 */
import Tooltip from '../shared/Tooltip';

const ERA_MAP = [
  [1913, 1919, 'WWI', 'World War I. Federal Reserve founded 1913. Wages rose during the war.'],
  [1920, 1929, 'Roaring 20s', 'Economic boom. Model T made cars affordable. Stock market peaked before the crash.'],
  [1930, 1939, 'Depression', 'Unemployment hit 25% in 1933. Bank failures. Wages fell faster than prices.'],
  [1940, 1945, 'WWII', 'War economy. Wages rose. GI Bill would make college free for veterans.'],
  [1946, 1960, 'Post-War Boom', 'Peak affordability. Single income could support a family. FHA loans democratized homeownership.'],
  [1961, 1980, 'Stagflation', 'Oil crises, inflation. 1979 is when productivity and wages began to diverge.'],
  [1981, 2000, 'Reagan-Dotcom', 'CEO pay ratio exploded from 58:1 to 380:1. College costs accelerated.'],
  [2001, 2007, 'Housing Bubble', 'Home prices inflated. The bubble would burst in 2008.'],
  [2008, 2012, 'Great Recession', 'Financial crisis. Home prices crashed. Recovery was K-shaped.'],
  [2013, 2019, 'Recovery', 'Home prices recovered faster than wages. Student debt crossed $1 trillion.'],
  [2020, 2025, 'Pandemic', 'Stimulus boosted bottom earners temporarily. Gains reversed by 2025.'],
];

function EraLabel({ year }) {
  const y = Number(year);
  const entry = ERA_MAP.find(([lo, hi]) => y >= lo && y <= hi);
  const era = entry?.[2] ?? '';
  const description = entry?.[3] ?? '';

  if (!era) return null;

  return (
    <Tooltip content={description}>
      <span className="inline-block cursor-help rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        {era}
      </span>
    </Tooltip>
  );
}

export default EraLabel;
