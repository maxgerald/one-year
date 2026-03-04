/**
 * CeoPayChart - CEO-to-worker ratio (SVG implementation, no recharts)
 */
import { getCeoPayRatioData } from '../../utils/dataAccess';

function CeoPayChart() {
  const data = getCeoPayRatioData();
  if (!data.length) return null;

  const maxRatio = Math.max(...data.map((d) => d.ratio));
  const minY = 0;
  const width = 600;
  const height = 280;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const xScale = (year) => {
    const min = data[0].year;
    const max = data[data.length - 1].year;
    return padding.left + ((year - min) / (max - min)) * chartWidth;
  };
  const yScale = (ratio) => padding.top + chartHeight - (ratio / maxRatio) * chartHeight;

  const pathD = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(d.year)} ${yScale(d.ratio)}`)
    .join(' ');
  const areaD = `${pathD} L ${xScale(data[data.length - 1].year)} ${padding.top + chartHeight} L ${xScale(data[0].year)} ${padding.top + chartHeight} Z`;

  return (
    <div className="min-h-[300px] md:min-h-[350px]">
      <h3 className="mb-4 text-xl font-bold text-white">CEO-to-Worker Pay Ratio</h3>
      <p className="mb-4 text-sm text-white/80">1965: 21:1. 1989: 61:1. 2000: 380:1.</p>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[300px]">
          <defs>
            <linearGradient id="ceoGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e67e22" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#e67e22" stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#ceoGrad)" />
          <path d={pathD} fill="none" stroke="#e67e22" strokeWidth={2} />
          {data.filter((_, i) => i % 2 === 0).map((d) => (
            <g key={d.year}>
              <line
                x1={xScale(d.year)}
                y1={padding.top + chartHeight}
                x2={xScale(d.year)}
                y2={padding.top}
                stroke="rgba(255,255,255,0.2)"
                strokeDasharray="4 4"
              />
              <text x={xScale(d.year)} y={height - 8} fill="#fff" fontSize={12} textAnchor="middle">
                {d.year}
              </text>
            </g>
          ))}
          <text x={padding.left - 10} y={padding.top + chartHeight / 2} fill="#fff" fontSize={12} textAnchor="middle" transform={`rotate(-90, ${padding.left - 10}, ${padding.top + chartHeight / 2})`}>
            Ratio
          </text>
        </svg>
      </div>
      <p className="mt-2 text-xs text-white/50">
        <a href="https://www.epi.org/publication/ceo-pay-in-2022/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white/70 underline">
          Economic Policy Institute
        </a>
      </p>
    </div>
  );
}

export default CeoPayChart;
