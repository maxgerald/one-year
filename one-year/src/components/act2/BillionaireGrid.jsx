/**
 * BillionaireGrid - Grid of billionaire cards, current vs historical
 */
import { getBillionaireData } from '../../utils/dataAccess';
import BillionaireCard from './BillionaireCard';
import SourceCitation from '../shared/SourceCitation';
import { REFERENCE_SOURCES } from '../../data/sources';

function BillionaireGrid() {
  const { data } = getBillionaireData();
  const entries = Object.entries(data || {});

  const historical = entries.filter(([k]) => k.includes('1913') || k.includes('1976'));
  const current = entries.filter(([k]) => k.includes('2024'));

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold text-white">Billionaire Wealth in Years of Work</h3>
      <p className="mb-6 text-white/80">
        Top 1% held a record 32% of wealth in 2025; bottom 50% held 2.5%.
      </p>
      <p className="mb-4 text-xs text-white/60">
        <SourceCitation source={REFERENCE_SOURCES.cnbcKShaped.label} url={REFERENCE_SOURCES.cnbcKShaped.url} className="text-white/60 hover:text-white/80" />
        {' · '}
        <SourceCitation source={REFERENCE_SOURCES.cbsNews.label} url={REFERENCE_SOURCES.cbsNews.url} className="text-white/60 hover:text-white/80" />
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {current.map(([key, item]) => (
          <BillionaireCard
            key={key}
            name={item.name}
            wealth={item.wealth}
            workerYears={item.yearsOfMedianWork}
            year={item.year}
            isHistorical={false}
          />
        ))}
        {historical.map(([key, item]) => (
          <BillionaireCard
            key={key}
            name={item.name}
            wealth={item.wealth}
            workerYears={item.yearsOfMedianWork}
            year={item.year}
            isHistorical
          />
        ))}
      </div>
    </div>
  );
}

export default BillionaireGrid;
