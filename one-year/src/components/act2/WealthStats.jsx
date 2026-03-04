/**
 * WealthStats - Key inequality stat cards
 */
import { getKeyStatistics, getCeoPayRatioData } from '../../utils/dataAccess';
import CountUpOnScroll from '../shared/CountUpOnScroll';
import SourceCitation from '../shared/SourceCitation';
import { REFERENCE_SOURCES } from '../../data/sources';

function WealthStats() {
  const stats = getKeyStatistics();
  const ceoData = getCeoPayRatioData();
  const latestRatio = ceoData[ceoData.length - 1]?.ratio;

  const cards = [
    { value: '32%', label: 'Top 1% share of wealth (2025)', source: REFERENCE_SOURCES.cnbcKShaped.label, sourceUrl: REFERENCE_SOURCES.cnbcKShaped.url, countUp: 32, format: (v) => `${Math.round(v)}%` },
    { value: '2.5%', label: 'Bottom 50% share of wealth', source: REFERENCE_SOURCES.cnbcKShaped.label, sourceUrl: REFERENCE_SOURCES.cnbcKShaped.url, countUp: 2.5, format: (v) => `${v.toFixed(1)}%` },
    { value: `${latestRatio ?? 281}:1`, label: 'CEO-to-worker pay ratio', source: REFERENCE_SOURCES.epi.label, sourceUrl: REFERENCE_SOURCES.epi.url, countUp: latestRatio ?? 281, format: (v) => `${Math.round(v)}:1` },
    { value: '53%', label: 'Home price increase since 2019', source: REFERENCE_SOURCES.nahb.label, sourceUrl: REFERENCE_SOURCES.nahb.url, countUp: 53, format: (v) => `${Math.round(v)}%` },
    { value: '40', label: 'Median first-time buyer age', source: REFERENCE_SOURCES.nahb.label, sourceUrl: REFERENCE_SOURCES.nahb.url, countUp: 40, format: (v) => String(Math.round(v)) },
  ];

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold text-white">Key Statistics</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className="text-3xl font-black text-accent">
              {c.countUp != null ? (
                <CountUpOnScroll value={c.countUp} format={c.format} className="inline" />
              ) : (
                c.value
              )}
            </div>
            <p className="mt-2 text-sm text-white/90">{c.label}</p>
            <p className="mt-1 text-xs text-white/60">
              <SourceCitation source={c.source} url={c.sourceUrl} className="text-white/60 hover:text-white/80" />
            </p>
          </div>
        ))}
      </div>
      {stats?.bottomLine && (
        <p className="mt-6 italic text-white/80">{stats.bottomLine}</p>
      )}
    </div>
  );
}

export default WealthStats;
