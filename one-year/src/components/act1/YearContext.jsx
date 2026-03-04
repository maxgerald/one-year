/**
 * YearContext - Historical context callout for selected year
 */
function YearContext({ year, context }) {
  if (!context) return null;

  return (
    <div className="rounded-r-xl border-l-4 border-accent bg-primary/5 p-4 italic text-slate-700">
      {context}
    </div>
  );
}

export default YearContext;
