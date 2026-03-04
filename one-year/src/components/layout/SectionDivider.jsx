/**
 * SectionDivider - Full-width navy transition banner with CTA
 */
function SectionDivider({ title, subtitle, ctaText, onCtaClick, id }) {
  return (
    <section
      id={id}
      className="border-t-4 border-accent bg-primary px-4 py-12 text-center text-white"
    >
      <h2 className="text-2xl font-black md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-white/90">{subtitle}</p>}
      {ctaText && onCtaClick && (
        <button
          onClick={onCtaClick}
          className="mt-6 rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          {ctaText}
        </button>
      )}
    </section>
  );
}

export default SectionDivider;
