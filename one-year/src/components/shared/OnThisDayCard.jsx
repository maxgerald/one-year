/**
 * OnThisDayCard - Daily "On this day" social media card with PNG export
 */
import { useRef, useState } from 'react';
import { getIncomeForYear, getItemPriceForYear } from '../../utils/dataAccess';
import { formatMonths, formatYears, formatCurrency } from '../../utils/formatters';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function OnThisDayCard() {
  const cardRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [month, setMonth] = useState(3);
  const [day, setDay] = useState(15);
  const [year, setYear] = useState(1950);

  const income = getIncomeForYear(year).amount;
  const homePrice = getItemPriceForYear('medianHome', year).price ?? 0;
  const fraction = income > 0 ? homePrice / income : 0;
  const homeStr = fraction >= 1 ? formatYears(fraction) : formatMonths(fraction);

  const dateStr = `${MONTHS[month - 1]} ${day}, ${year}`;
  const caption = `On ${dateStr}, a house cost ${homeStr} of a worker's salary. Median income: ${formatCurrency(income)}.`;

  const captureImage = async () => {
    if (!cardRef.current) return null;
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(cardRef.current, { scale: 2 });
    return canvas.toDataURL('image/png');
  };

  const handleDownload = async () => {
    setBusy(true);
    try {
      const dataUrl = await captureImage();
      if (dataUrl) {
        const link = document.createElement('a');
        link.download = `one-year-${year}-${month}-${day}.png`;
        link.href = dataUrl;
        link.click();
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between font-bold text-primary"
      >
        On This Day — Create social card
        <span>{open ? '−' : '+'}</span>
      </button>
      {!open && <p className="mt-1 text-sm text-slate-600">Daily branded cards for social media. PNG export.</p>}
      {open && (
        <>
      <p className="mb-4 mt-4 text-sm text-slate-600">Generate a branded card for social media.</p>
      <div className="mb-4 flex flex-wrap gap-3">
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="rounded border px-2 py-1">
          {MONTHS.map((m, i) => (
            <option key={m} value={i + 1}>{m}</option>
          ))}
        </select>
        <input type="number" min={1} max={31} value={day} onChange={(e) => setDay(Number(e.target.value))} className="w-16 rounded border px-2 py-1" />
        <select value={year} onChange={(e) => setYear(Number(e.target.value))} className="rounded border px-2 py-1">
          {Array.from({ length: 2025 - 1913 + 1 }, (_, i) => 1913 + i).reverse().map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <div
        ref={cardRef}
        className="flex w-[400px] flex-col rounded-xl bg-white p-6 shadow-lg ring-1 ring-slate-200"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="text-center text-2xl font-black text-primary">ONE YEAR</div>
        <p className="mt-4 text-center text-lg font-semibold text-primary">On {dateStr}</p>
        <p className="mt-2 text-center text-primary">{caption}</p>
        <p className="mt-4 text-center text-xs text-slate-500">OneYear.work</p>
      </div>
      <button
        onClick={handleDownload}
        disabled={busy}
        className="mt-4 rounded-lg bg-accent px-4 py-2 font-semibold text-white hover:bg-accent-dark"
      >
        {busy ? 'Generating...' : 'Download PNG'}
      </button>
        </>
      )}
    </div>
  );
}

export default OnThisDayCard;
