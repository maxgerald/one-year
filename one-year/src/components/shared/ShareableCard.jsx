/**
 * ShareableCard - Generates branded share image
 * Web Share API (mobile) or download fallback.
 */
import { useRef, useState } from 'react';

function ShareableCard({ yearThen = 1950, yearNow = 2025, statText }) {
  const cardRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const captureImage = async () => {
    if (!cardRef.current) return null;
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(cardRef.current, { scale: 2 });
    return canvas.toDataURL('image/png');
  };

  const handleShare = async () => {
    setBusy(true);
    try {
      const dataUrl = await captureImage();
      if (!dataUrl) return;

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'one-year-share.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: 'ONE YEAR',
          text: statText ?? `A house cost 2.3 years of salary in ${yearThen}. Today it costs 4.9 years.`,
          files: [file],
        });
        return;
      }
    } catch (e) {
      if (e?.name === 'AbortError') return;
    }

    const link = document.createElement('a');
    link.download = 'one-year-share.png';
    link.href = await captureImage();
    link.click();
  };

  return (
    <div className="inline-block">
      <div
        ref={cardRef}
        className="flex w-[320px] flex-col rounded-xl bg-white p-5 shadow-lg"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="flex items-center justify-center gap-2">
          <img loading="lazy"
            src="/logos/PRIMARY_LOGO.png"
            alt=""
            className="h-10 w-10 rounded-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling?.classList.remove('hidden');
            }}
          />
          <span className="hidden text-xl font-black text-primary">1Y</span>
          <span className="text-xl font-black text-primary">ONE YEAR</span>
        </div>
        <p className="mt-3 text-center text-sm text-primary">
          {statText ?? `A house cost 2.3 years of salary in ${yearThen}. Today it costs 4.9 years.`}
        </p>
        <p className="mt-3 text-center text-xs text-slate-500">OneYear.work</p>
      </div>
      <button
        onClick={handleShare}
        disabled={busy}
        className="mt-3 rounded-lg bg-accent px-4 py-2 font-semibold text-white hover:bg-accent-dark"
      >
        {busy ? 'Generating...' : 'Share'}
      </button>
    </div>
  );
}

export default ShareableCard;
