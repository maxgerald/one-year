/**
 * Header - Logo, wordmark, tagline. Sticky with shadow on scroll.
 */
import { useState, useEffect } from 'react';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-gradient-to-b from-primary to-primary-light px-4 py-4 transition-shadow md:py-5 ${scrolled ? 'shadow-lg' : ''}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 md:gap-6">
        {!logoError ? (
          <img
            src="/logos/INVERSE_LOGO.png"
            alt="ONE YEAR"
            className="h-14 w-14 flex-shrink-0 rounded-full object-contain md:h-[72px] md:w-[72px]"
            onError={() => setLogoError(true)}
          />
        ) : (
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white text-primary md:h-[72px] md:w-[72px]">
            <span className="text-xl font-black md:text-2xl">1Y</span>
          </div>
        )}
        <div className="min-w-0 flex-1 text-center">
          <h1 className="text-2xl font-black tracking-tight text-white md:text-3xl">ONE YEAR</h1>
          <p className="text-sm text-white/90 md:text-base">What does your year really buy?</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
