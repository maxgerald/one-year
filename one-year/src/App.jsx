import { lazy, Suspense, useState, useEffect } from 'react';
import ErrorBoundary from './components/shared/ErrorBoundary';
import Header from './components/layout/Header';
import Act1 from './pages/Act1';
import SectionDivider from './components/layout/SectionDivider';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import LoadingSpinner from './components/shared/LoadingSpinner';
import MethodologyModal from './components/shared/MethodologyModal';

const Act2 = lazy(() => import('./pages/Act2'));

function App() {
  const [methodologyOpen, setMethodologyOpen] = useState(false);

  useEffect(() => {
    const handler = () => setMethodologyOpen(true);
    window.addEventListener('openMethodology', handler);
    return () => window.removeEventListener('openMethodology', handler);
  }, []);

  const scrollToAct2 = () => {
    document.getElementById('act2')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-bg">
        <Header />
        <Act1 />
        <SectionDivider
          title="Your purchasing power shrank. But the economy grew."
          subtitle="Productivity tripled. So where did the money go?"
          ctaText="See where it went"
          onCtaClick={scrollToAct2}
          id="transition"
        />
        <Suspense
          fallback={
            <div className="flex min-h-[400px] items-center justify-center bg-primary">
              <LoadingSpinner size="lg" color="border-white" />
            </div>
          }
        >
          <Act2 />
        </Suspense>
        <Footer />
        <ScrollToTop />
        <MethodologyModal
          open={methodologyOpen}
          onClose={() => setMethodologyOpen(false)}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
