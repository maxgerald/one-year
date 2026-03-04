/**
 * Act2 - "Where Did It Go?" wealth concentration section
 */
import CeoPayChart from '../components/act2/CeoPayChart';
import BillionaireGrid from '../components/act2/BillionaireGrid';
import WealthStats from '../components/act2/WealthStats';
import ProductivityWagesChart from '../components/act2/ProductivityWagesChart';
import SocialShare from '../components/shared/SocialShare';
import AnimatedOnScroll from '../components/shared/AnimatedOnScroll';

function Act2() {
  return (
    <section id="act2" className="space-y-16 bg-primary px-4 py-16 text-white md:space-y-24 md:py-24">
      <div className="mx-auto max-w-6xl">
        <AnimatedOnScroll>
          <h2 className="text-4xl font-black md:text-5xl">Where Did Your Year Go?</h2>
          <p className="mt-4 text-lg text-white/90">
            Worker productivity grew. Wages stagnated. Corporate profits as a share of GDP nearly doubled since 1982 while worker compensation fell. The gains went to the top.
          </p>
        </AnimatedOnScroll>
        <div className="mt-12 space-y-16 md:space-y-24">
          <AnimatedOnScroll><ProductivityWagesChart /></AnimatedOnScroll>
          <AnimatedOnScroll><CeoPayChart /></AnimatedOnScroll>
          <AnimatedOnScroll><BillionaireGrid /></AnimatedOnScroll>
          <AnimatedOnScroll><WealthStats /></AnimatedOnScroll>
          <div className="pt-8">
            <SocialShare dark text="A house cost 2.3 years of salary in 1950. Today it costs 4.9 years." />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Act2;
