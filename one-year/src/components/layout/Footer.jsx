/**
 * Footer - About, Data Sources, Methodology. Navy bg, white text.
 */
import { SOURCES_BY_CATEGORY } from '../../data/sources';

function Footer() {
  return (
    <footer className="bg-primary px-4 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-3">
          <div>
            <h3 className="mb-2 font-semibold">About</h3>
            <p className="text-sm text-white/80">
              1Y = one median worker&apos;s annual salary. We use it to show how purchasing power
              changed from 1913 to 2025.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Data Sources</h3>
            <div className="space-y-2 text-sm text-white/80">
              {SOURCES_BY_CATEGORY.map((cat) => (
                <div key={cat.title}>
                  <p className="font-medium text-white/90">{cat.title}</p>
                  <ul className="ml-2 space-y-0.5">
                    {cat.sources.slice(0, 3).map((s) => (
                      <li key={s.url}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Methodology</h3>
            <p className="text-sm text-white/80">
              <a
                href="#"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('openMethodology'));
                }}
              >
                Methodology
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/20 pt-8">
          <button
            onClick={() => window.print()}
            className="no-print rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
          >
            Print / Save as PDF
          </button>
          <img loading="lazy"
            src="/logos/INVERSE_LOGO.png"
            alt="ONE YEAR"
            className="h-10 w-10 rounded-full object-contain"
            onError={(e) => (e.target.style.display = 'none')}
          />
          <p className="text-xs text-white/60">© {new Date().getFullYear()} ONE YEAR</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
