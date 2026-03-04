/**
 * ItemFractionBar - FractionBar with scale markers at 3mo, 6mo, 1yr
 */
import FractionBar from '../shared/FractionBar';

function ItemFractionBar({ fraction, barColor, maxDisplayFraction = 2 }) {
  const markers = [
    { pos: 0.25, label: '3mo' },
    { pos: 0.5, label: '6mo' },
    { pos: 1, label: '1yr' },
  ];

  return (
    <div className="relative">
      <FractionBar
        fraction={fraction}
        maxDisplayFraction={maxDisplayFraction}
        color={barColor}
        animated
        showOverflowIndicator
      />
      <div className="relative mt-1 flex justify-between text-[10px] text-slate-500">
        {markers.map((m) => (
          <span
            key={m.label}
            className="absolute"
            style={{ left: `${(m.pos / maxDisplayFraction) * 100}%`, transform: 'translateX(-50%)' }}
          >
            {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ItemFractionBar;
