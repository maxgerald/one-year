/**
 * BillionaireCard - Single billionaire wealth in worker-years
 */
function BillionaireCard({ name, wealth, workerYears, year, isHistorical }) {
  const lifetimes = Math.round(workerYears / 40);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="text-sm text-white/70">{name}</div>
      {isHistorical && <div className="text-xs text-white/50">{year}</div>}
      <div className="mt-2 text-2xl font-black text-accent">
        {(workerYears / 1_000_000).toFixed(1)}M years
      </div>
      <p className="mt-2 text-sm text-white/80">
        That&apos;s {lifetimes.toLocaleString()} people working their entire 40-year careers.
      </p>
    </div>
  );
}

export default BillionaireCard;
