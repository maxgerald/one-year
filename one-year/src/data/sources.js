/**
 * ONE YEAR - Central source citations from REFERENCES.md
 * All URLs and labels for in-app citations. Used by SourceCitation, MethodologyModal, Footer.
 */

export const REFERENCE_SOURCES = {
  // Housing Affordability
  harvardJCHS: {
    label: 'Harvard JCHS State of the Nation\'s Housing 2025',
    url: 'https://www.jchs.harvard.edu/press-releases/new-report-highlights-unease-housing-market-amid-worsening-affordability-crisis',
  },
  bankrate: {
    label: 'Bankrate',
    url: 'https://www.bankrate.com/mortgages/american-dream-of-homeownership-turning-into-luxury/',
  },
  cbre: {
    label: 'CBRE',
    url: 'https://www.cbreim.com/insights/articles/digging-out-of-the-us-housing-affordability-crisis',
  },
  nahb: {
    label: 'NAHB',
    url: 'https://www.lbmjournal.com/industry-news/data/press-release/15817630/national-association-of-home-builders-how-affordability-challenges-are-affecting-housing-trends-in-2026',
  },
  washingtonPost: {
    label: 'Washington Post',
    url: 'https://www.washingtonpost.com/business/2026/02/27/affordability-homeownership-poll/',
  },
  cnbcHousing: {
    label: 'CNBC',
    url: 'https://www.cnbc.com/2026/02/07/housing-affordability-income-changes.html',
  },
  kutvRedfin: {
    label: 'Redfin',
    url: 'https://kutv.com/news/eye-on-your-money/half-of-americans-struggling-to-make-housing-payments',
  },
  axios: {
    label: 'Axios',
    url: 'https://www.axios.com/2026/01/19/affordable-homes-metro-income',
  },

  // Wealth Inequality
  cbsNews: {
    label: 'CBS News',
    url: 'https://www.cbsnews.com/news/us-wealth-gap-widest-in-three-decades-federal-reserve/',
  },
  cnbcKShaped: {
    label: 'CNBC',
    url: 'https://www.cnbc.com/2026/01/30/wealth-inequality-k-shaped-economy-united-states-consumer-spending-trump.html',
  },
  fortune: {
    label: 'Fortune',
    url: 'https://fortune.com/2026/02/23/record-gap-corporate-profits-worker-pay-gdp-share-wealth-inequality-betrayal-social-instability/',
  },
  epi: {
    label: 'Economic Policy Institute',
    url: 'https://www.epi.org/publication/ceo-pay-in-2022/',
  },
  fed: {
    label: 'Federal Reserve',
    url: 'https://www.federalreserve.gov/releases/z1/',
  },
  inequalityOrg: {
    label: 'Inequality.org',
    url: 'https://inequality.org/facts/wealth-inequality/',
  },
  oxfam: {
    label: 'Oxfam America',
    url: 'https://www.oxfamamerica.org/explore/issues/economic-justice/what-percent-of-the-worlds-wealth-is-controlled-by-billionaires/',
  },

  // Cost of Living & Consumer
  cnbcCPI: {
    label: 'CNBC',
    url: 'https://www.cnbc.com/2026/01/13/cpi-inflation-december-2025-breakdown.html',
  },
  npr: {
    label: 'NPR',
    url: 'https://www.npr.org/2026/01/14/nx-s1-5638908/walmart-prices-inflation-affordability-shrinkflation',
  },
  marketplace: {
    label: 'Marketplace',
    url: 'https://www.marketplace.org/story/2026/02/06/why-is-everything-so-hard-to-afford-now',
  },
  bls: {
    label: 'Bureau of Labor Statistics',
    url: 'https://www.bls.gov/data/#prices',
  },
  usda: {
    label: 'USDA Food Plans',
    url: 'https://www.fns.usda.gov/research/cnpp/usda-food-plans',
  },
  collegeBoard: {
    label: 'College Board',
    url: 'https://research.collegeboard.org/trends/college-pricing',
  },
  census: {
    label: 'Census Bureau',
    url: 'https://www.census.gov/library/publications/2025/demo/p60-286.html',
  },
  visualCapitalist: {
    label: 'Visual Capitalist',
    url: 'https://www.visualcapitalist.com/charted-median-income-by-household-size-in-the-u-s/',
  },

  // Cultural / Polling
  cnbcSentiment: {
    label: 'CNBC',
    url: 'https://www.cnbc.com/2025/11/07/consumer-sentiment-shutdown.html',
  },
  businessInsider: {
    label: 'Business Insider',
    url: 'https://www.businessinsider.com/older-than-my-parents-were-when-born-falling-behind-2026-2',
  },
};

/** Map item keys to primary reference source for citation */
export const ITEM_SOURCE_MAP = {
  medianHome: 'bankrate',
  monthlyRent: 'bankrate',
  collegeTuition: 'collegeBoard',
  newCar: 'marketplace',
  eggs: 'npr',
  milk: 'npr',
  bread: 'npr',
  groundBeef: 'npr',
  gasoline: 'bls',
};

/** Get source for an item key. Returns { label, url } or null. */
export function getSourceForItem(itemKey) {
  const refId = ITEM_SOURCE_MAP[itemKey];
  return refId ? REFERENCE_SOURCES[refId] : null;
}

/** All sources for Methodology modal and Footer, grouped */
export const SOURCES_BY_CATEGORY = [
  {
    title: 'Housing & Affordability',
    sources: [
      REFERENCE_SOURCES.harvardJCHS,
      REFERENCE_SOURCES.bankrate,
      REFERENCE_SOURCES.cbre,
      REFERENCE_SOURCES.nahb,
      REFERENCE_SOURCES.washingtonPost,
      REFERENCE_SOURCES.cnbcHousing,
      REFERENCE_SOURCES.kutvRedfin,
      REFERENCE_SOURCES.axios,
    ],
  },
  {
    title: 'Wealth & Inequality',
    sources: [
      REFERENCE_SOURCES.cbsNews,
      REFERENCE_SOURCES.cnbcKShaped,
      REFERENCE_SOURCES.fortune,
      REFERENCE_SOURCES.epi,
      REFERENCE_SOURCES.fed,
      REFERENCE_SOURCES.inequalityOrg,
      REFERENCE_SOURCES.oxfam,
    ],
  },
  {
    title: 'Cost of Living & Consumer Prices',
    sources: [
      REFERENCE_SOURCES.cnbcCPI,
      REFERENCE_SOURCES.npr,
      REFERENCE_SOURCES.marketplace,
      REFERENCE_SOURCES.bls,
      REFERENCE_SOURCES.usda,
      REFERENCE_SOURCES.collegeBoard,
      REFERENCE_SOURCES.census,
      REFERENCE_SOURCES.visualCapitalist,
    ],
  },
  {
    title: 'Cultural & Polling',
    sources: [
      REFERENCE_SOURCES.cnbcSentiment,
      REFERENCE_SOURCES.businessInsider,
    ],
  },
];
