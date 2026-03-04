/**
 * ComparisonBadge - "2.1x more than in 1950" or "30% cheaper"
 */
function ComparisonBadge({ currentFraction, referenceFraction, referenceYear }) {
  if (referenceFraction == null || referenceFraction <= 0) return null;

  const ratio = currentFraction / referenceFraction;
  const isMoreExpensive = ratio > 1;

  if (isMoreExpensive) {
    const mult = (ratio - 1) * 100;
    const display = ratio >= 2 ? `${ratio.toFixed(1)}x more` : `${Math.round(mult)}% more`;
    return (
      <span className="text-xs font-medium text-red-600">
        {display} than in {referenceYear}
      </span>
    );
  }

  const pct = (1 - ratio) * 100;
  return (
    <span className="text-xs font-medium text-green-600">
      {Math.round(pct)}% cheaper than in {referenceYear}
    </span>
  );
}

export default ComparisonBadge;
