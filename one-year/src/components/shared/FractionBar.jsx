/**
 * FractionBar - Horizontal bar showing cost as fraction of 1Y
 * Green for affordable, red for unaffordable. Overflow indicator when > max.
 */
function FractionBar({
  fraction = 0,
  maxDisplayFraction = 2.0,
  color,
  height = 'h-2',
  animated = true,
  showOverflowIndicator = true,
}) {
  const displayFraction = Math.min(fraction, maxDisplayFraction);
  const widthPercent = Math.min((displayFraction / maxDisplayFraction) * 100, 100);
  const isOverflow = fraction > maxDisplayFraction && showOverflowIndicator;

  return (
    <div
      className={`relative overflow-visible rounded-full bg-gray-200 ${height}`}
      role="progressbar"
      aria-valuenow={fraction}
      aria-valuemin={0}
      aria-valuemax={maxDisplayFraction}
      aria-label={`Cost is ${(fraction * 100).toFixed(0)}% of one year's income`}
    >
      <div
        className={`rounded-full ${animated ? 'transition-all duration-500 ease-out' : ''}`}
        style={{
          width: `${widthPercent}%`,
          backgroundColor: color ?? 'var(--color-slate)',
        }}
      />
      {isOverflow && (
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 animate-pulse text-xs font-bold text-red-600"
          aria-hidden
        >
          &gt;
        </span>
      )}
    </div>
  );
}

export default FractionBar;
