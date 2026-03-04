/**
 * ProductivityWagesChart - Productivity vs wages (SVG, no recharts)
 */
const EPI_APPROX = [
  { year: 1948, productivity: 100, wages: 100 },
  { year: 1979, productivity: 150, wages: 150 },
  { year: 1990, productivity: 165, wages: 155 },
  { year: 2000, productivity: 195, wages: 165 },
  { year: 2010, productivity: 220, wages: 170 },
  { year: 2024, productivity: 230, wages: 189 },
];

function ProductivityWagesChart() {
  const data = EPI_APPROX;
  const width = 600;
  const height = 280;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxVal = 250;

  const xScale = (year) => {
    const min = data[0].year;
    const max = data[data.length - 1].year;
    return padding.left + ((year - min) / (max - min)) * chartWidth;
  };
  const yScale = (v) => padding.top + chartHeight - (v / maxVal) * chartHeight;

  const prodPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(d.year)} ${yScale(d.productivity)}`).join(' ');
  const wagePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(d.year)} ${yScale(d.wages)}`).join(' ');

  return (
    <div className="min-h-[300px] md:min-h-[350px]">
      <h3 className="mb-4 text-xl font-bold text-white">Productivity vs. Wages</h3>
      <p className="mb-4 text-sm text-white/80">Indexed to 100 in 1948. 1979 is where they diverged.</p>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[300px]">
          <path d={prodPath} fill="none" stroke="#7cb342" strokeWidth={2} />
          <path d={wagePath} fill="none" stroke="#e67e22" strokeWidth={2} />
          <line
            x1={xScale(1979)}
            y1={padding.top}
            x2={xScale(1979)}
            y2={padding.top + chartHeight}
            stroke="#e67e22"
            strokeDasharray="4 4"
          />
          {data.map((d) => (
            <text key={d.year} x={xScale(d.year)} y={height - 8} fill="#fff" fontSize={12} textAnchor="middle">
              {d.year}
            </text>
          ))}
          <text x={xScale(1979)} y={padding.top - 5} fill="#e67e22" fontSize={10} textAnchor="middle">
            1979
          </text>
        </svg>
      </div>
      <p className="mt-2 text-xs text-accent">1979: This is where it changed.</p>
      <p className="mt-1 text-xs text-white/50">
        <a href="https://fortune.com/2026/02/23/record-gap-corporate-profits-worker-pay-gdp-share-wealth-inequality-betrayal-social-instability/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white/70 underline">
          Fortune: Corporate profits vs worker pay
        </a>
      </p>
    </div>
  );
}

export default ProductivityWagesChart;
