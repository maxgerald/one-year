# ONE YEAR - Tasks

Each task is a self-contained unit of work. Complete them in order. After finishing a task, mark it `[x]` and proceed to the next one immediately.

**Status legend:**
- `[ ]` = Not started
- `[x]` = Complete
- `[!]` = Blocked (document why in a comment below the task)

**Installed packages log** (update as you install):
- tailwindcss, @tailwindcss/vite
- html2canvas

---

## Phase 0: Project Scaffolding

### Task 0.1: Initialize Vite + React + Tailwind project
- [x] Run `npm create vite@latest one-year -- --template react`
- [x] `cd one-year && npm install`
- [x] Install Tailwind: `npm install -D tailwindcss @tailwindcss/vite`
- [x] Configure `vite.config.js` with the Tailwind plugin
- [x] Add `@import "tailwindcss"` to `src/index.css`
- [x] Add Inter font import to `index.html`: `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet">`
- [x] Set page title in `index.html` to "ONE YEAR - What Does Your Year Really Buy?"
- [x] Add meta description: "See how many months of your salary it takes to buy a house, a car, groceries, and college from 1913 to 2025."
- [x] Add Open Graph meta tags: og:title, og:description, og:image (placeholder), og:type="website"
- [x] Add Twitter card meta tags: twitter:card="summary_large_image", twitter:title, twitter:description
- [x] Verify `npm run dev` starts without errors
- **Done when:** Dev server runs, page shows default Vite template with Tailwind working, Inter font loaded.

### Task 0.2: Set up brand tokens and base styles
- [x] In `src/index.css`, add CSS custom properties:
  ```css
  :root {
    --color-primary: #1a3a52;
    --color-primary-light: #2d4a5e;
    --color-accent: #e67e22;
    --color-accent-dark: #d35400;
    --color-slate: #546e7a;
    --color-bg: #f5f5f5;
    --color-bg-card: #ffffff;
    --color-green: #7cb342;
    --color-red: #d32f2f;
    --color-orange: #f57c00;
  }
  ```
- [x] Set body font-family, background, text color, line-height 1.6
- [x] Add `font-feature-settings: 'tnum'` for tabular numbers
- [x] Extend `tailwind.config.js` with brand colors (bg-primary, text-accent, etc.)
- [x] Create `src/utils/constants.js` exporting COLORS, CATEGORY_ORDER, MIN_YEAR, MAX_YEAR, DEFAULT_YEAR
- **Done when:** Brand Tailwind classes work. Constants file ready.

### Task 0.3: Add data file and logo assets
- [x] Create `src/data/` directory, copy ONE_YEAR_EXTENDED_DATA.json to `src/data/oneYearData.json`
- [x] Create `public/logos/`, copy all four logo PNGs
- [x] Create `public/favicon.svg` (simple "1Y" in navy circle)
- [x] Add favicon link to index.html
- [x] Verify data imports correctly in App.jsx (temp console.log, then remove)
- **Done when:** Data importable. Logos at `/logos/`. Favicon visible.

### Task 0.4: Set up project directory structure
- [x] Create: `src/components/{layout,act1,act2,shared}`, `src/hooks/`, `src/utils/`, `src/pages/`
- [x] Placeholder App.jsx with centered "ONE YEAR" heading in brand styling
- **Done when:** All directories exist. App renders with correct font and colors.

---

## Phase 1: Core Data Hooks and Utilities

### Task 1.1: Create interpolation utility
- [x] Create `src/utils/interpolate.js`
- [x] `interpolateValue(dataPoints, targetYear)` - linear interpolation between known years, null if out of range
- [x] `getAvailableYears(dataPoints)` - sorted array of years with data
- [x] `getNearestYear(dataPoints, targetYear)` - closest year with data
- [x] `getAllYearsInRange(dataPoints, min, max)` - interpolated values for every integer year
- [x] Handle: empty data, single point, non-numeric values, string year keys
- **Done when:** interpolateValue({"1950": 100, "1960": 200}, 1955) === 150. Out-of-range returns null.

### Task 1.2: Create formatters utility
- [x] Create `src/utils/formatters.js`
- [x] `formatCurrency(amount, opts)` - "$X,XXX" or "$X.XX" for small, compact option for "$412K"
- [x] `formatMonths(fraction)` - "X.X months", "X days" if < 0.5 month
- [x] `formatYears(fraction)` - "X.X years"
- [x] `formatFraction(fraction)` - auto-selects days/months/years, returns `{ value, unit, display }`
- [x] `formatIncome(amount)` - "$XX,XXX/year"
- [x] `formatRatio(num, den)` - "X:1"
- [x] Handle null/undefined gracefully (return "N/A")
- **Done when:** All formatters produce correct output. Edge cases handled.

### Task 1.3: Create data access utility
- [x] Create `src/utils/dataAccess.js`
- [x] Import oneYearData.json
- [x] `getIncomeForYear(year)` - returns `{ amount, type, source }`, prefers individual_ft_est > household > avg_annual, uses interpolation
- [x] `getItemPriceForYear(itemKey, year)` - returns `{ price, source, hasData }`
- [x] `getAllItems()` - returns `[{ key, name, icon, category }]`
- [x] `getContextForYear(year)` - checks depressionEraContext, generationalDebunkers, item narratives
- [x] `getBillionaireData()`, `getCeoPayRatioData()`, `getKeyStatistics()` - return respective JSON sections
- [x] `getMinimumWageForYear(year)` - returns annual minimum wage or null
- **Done when:** All functions return correct data for test years (1913, 1950, 2025).

### Task 1.4: Create useYearData hook
- [x] Create `src/hooks/useYearData.js`
- [x] `useYearData(year)` returns `{ year, income, items[], context }` with useMemo
- [x] Items sorted by CATEGORY_ORDER, missing-data items last within category
- **Done when:** Hook returns correct data for any year 1913-2025.

### Task 1.5: Create useOneYearCalc hook
- [x] Create `src/hooks/useOneYearCalc.js`
- [x] `useOneYearCalc(price, income, { isMonthly })` returns `{ fraction, months, years, days, formatted, affordability, barWidthPercent, barColor }`
- [x] Affordability: <0.15 affordable/green, 0.15-0.50 moderate/orange, 0.50-1.0 stretch/accent, >1.0 unaffordable/red
- [x] Edge cases: null income, null price, zero values
- **Done when:** $7,354 house / $3,319 income => fraction ~2.22, "2.2 years", unaffordable.

### Task 1.6: Create data validation utility
- [x] Create `src/utils/validateData.js`
- [x] `validateDataIntegrity()` checks: all years parse as numbers, all prices positive, income data >= 5 years, every item >= 3 data points
- [x] Returns `{ valid, errors[] }`. Runs on dev load only, logs with "DATA INTEGRITY:" prefix
- **Done when:** Validates current data without errors. Would catch bad data.

---

## Phase 2: Shared Components

### Task 2.1: Create FractionBar component
- [x] `src/components/shared/FractionBar.jsx`
- [x] Props: fraction, maxDisplayFraction (default 2.0), color, height, animated, showOverflowIndicator
- [x] Container: rounded-full, bg-gray-200. Inner: rounded-full, colored, width based on fraction
- [x] Overflow: pulsing gradient + ">" indicator when > max
- [x] CSS transition: 500ms ease-out. Accessible: role="progressbar" with aria attrs
- **Done when:** Renders correctly at fraction=0.1, 0.5, 1.0, 3.0. Animates on change.

### Task 2.2: Create AnimatedNumber component
- [x] `src/components/shared/AnimatedNumber.jsx`
- [x] Props: value, format (function), duration (default 400), className
- [x] requestAnimationFrame animation with ease-out cubic easing
- [x] useRef for prev value, frame ID, start time. Cleanup on unmount.
- [x] Null/undefined renders "N/A"
- **Done when:** Smooth count animation. No memory leaks on rapid changes.

### Task 2.3: Create SourceCitation component
- [x] `src/components/shared/SourceCitation.jsx`
- [x] Props: source, url (optional), className. Small muted text. Optional link (new tab).
- **Done when:** Renders with and without URL.

### Task 2.4: Create Tooltip component
- [x] `src/components/shared/Tooltip.jsx`
- [x] Props: content, children, position (default "top")
- [x] Hover/focus triggers. Dark bg, white text, rounded, max-w-250px, arrow, z-50
- [x] 150ms fade. role="tooltip", aria-describedby.
- **Done when:** Tooltip shows on hover and keyboard focus. Positions correctly.

### Task 2.5: Create LoadingSpinner component
- [x] `src/components/shared/LoadingSpinner.jsx`
- [x] Props: size (sm/md/lg), color. CSS-only rotating border.
- **Done when:** Spins at three sizes.

### Task 2.6: Create ErrorBoundary component
- [x] `src/components/shared/ErrorBoundary.jsx`
- [x] Class component. Catches errors. Fallback: branded error message + Reload button.
- **Done when:** Wrapping a throwing component shows fallback.

---

## Phase 3: Layout Components

### Task 3.1: Create Header component
- [x] `src/components/layout/Header.jsx`
- [x] Navy gradient bg. Inverse logo (56px mobile, 72px desktop). "ONE YEAR" title. Tagline.
- [x] Sticky top-0 z-40. Subtle shadow on scroll (IntersectionObserver or scroll event).
- **Done when:** Header renders, is sticky, responsive.

### Task 3.2: Create Footer component
- [x] `src/components/layout/Footer.jsx`
- [x] Navy bg, white text. 3-col desktop/stacked mobile: About, Data Sources (linked), Methodology.
- [x] Inverse logo 40px. Copyright bar.
- **Done when:** Footer renders with all sections. Links work. Responsive.

### Task 3.3: Create SectionDivider component
- [x] `src/components/layout/SectionDivider.jsx`
- [x] Props: title, subtitle, ctaText, onCtaClick, id. Full-width navy, accent top border.
- [x] CTA button: bg-accent, hover:bg-accent-dark, rounded-lg, font-semibold.
- **Done when:** Renders as a striking section break. CTA fires onClick.

### Task 3.4: Create ScrollToTop button
- [x] `src/components/layout/ScrollToTop.jsx`
- [x] Fixed bottom-right. Shows after 500px scroll. Circular accent button with arrow.
- [x] Smooth scroll to top. Fade transition. z-30.
- **Done when:** Appears on scroll, scrolls up smoothly, disappears at top.

---

## Phase 4: Act 1 Components

### Task 4.1: Create HeroStat component
- [x] `src/components/act1/HeroStat.jsx`
- [x] Props: year, income, items. White card, rounded-2xl, shadow-lg.
- [x] Year: text-6xl/7xl font-black. Income: AnimatedNumber. Headline: median home cost in years/months.
- [x] Falls back to next item if no housing data.
- **Done when:** Shows year, income, housing headline. Animates on year change.

### Task 4.2: Create YearSlider component
- [x] `src/components/act1/YearSlider.jsx`
- [x] Props: year, onChange, minYear, maxYear. Range input with custom styling.
- [x] Track: 6px, navy. Thumb: 28px circle, accent, white border.
- [x] Decade quick-jump buttons below (horizontally scrollable on mobile).
- [x] Active decade highlighted. Debounce onChange 16ms.
- [x] Accessible: aria-label, aria-valuemin/max/now.
- **Done when:** Smooth slider 1913-2025. Decade buttons work. Custom styling applied.

### Task 4.3: Create IncomeDisplay component
- [x] `src/components/act1/IncomeDisplay.jsx`
- [x] Props: income, year, type, source. Shows "1Y = $XX,XXX" with AnimatedNumber.
- [x] Income type label. Pre-1947 estimation note. Tooltip on "1Y" explaining the concept.
- [x] SourceCitation.
- **Done when:** Correct display for 2025 and 1933. Tooltip works.

### Task 4.4: Create ItemFractionBar component
- [x] `src/components/act1/ItemFractionBar.jsx`
- [x] Wraps FractionBar. Adds scale markers at 3mo, 6mo, 1yr as thin vertical lines.
- [x] Labels below markers. Adapts maxDisplayFraction for very large items.
- **Done when:** Scale markers visible. Bar color matches affordability.

### Task 4.5: Create ItemCard component
- [x] `src/components/act1/ItemCard.jsx`
- [x] Props: item, income, year. Uses useOneYearCalc internally.
- [x] Card: white, rounded-xl, shadow-sm. Top: icon+name, dollar price. Middle: ItemFractionBar. Bottom: time label, source.
- [x] No-data state: muted card, "No data for {year}".
- [x] > 1Y: red left border. Monthly items: show monthly + annualized.
- [x] Hover: shadow-md, translateY(-1px).
- **Done when:** Full card renders. Missing data handled. Red border for expensive items.

### Task 4.6: Create ItemGrid component
- [x] `src/components/act1/ItemGrid.jsx`
- [x] Props: items, income, year. Groups by CATEGORY_ORDER.
- [x] Category headers: uppercase, text-xs, semibold, slate, divider lines.
- [x] Grid: 1col mobile, 2col sm, 3col lg, gap-4/5.
- **Done when:** All 11 items in categorized groups. Responsive grid.

### Task 4.7: Create YearContext component
- [x] `src/components/act1/YearContext.jsx`
- [x] Props: year, context. If null, render nothing.
- [x] Styled callout: bg-primary/5, border-l-4 accent, rounded-r-xl, italic text.
- **Done when:** Context shows for years with data. Hidden otherwise.

### Task 4.8: Create EraLabel component
- [x] `src/components/act1/EraLabel.jsx`
- [x] Props: year. Returns badge with era name (WWI, Roaring 20s, Depression, WWII, Post-War Boom, Stagflation, Reagan-Dotcom, Housing Bubble, Great Recession, Recovery, Pandemic).
- [x] Styled: inline-block, rounded-full, px-3 py-1, text-xs, bg-primary/10.
- **Done when:** Correct era for any year. Compact badge.

### Task 4.9: Create ComparisonBadge component
- [x] `src/components/act1/ComparisonBadge.jsx`
- [x] Props: currentFraction, referenceFraction, referenceYear.
- [x] Shows "2.1x more than in 1950" (red) or "30% cheaper" (green). Text-xs.
- [x] If no reference data, render nothing.
- **Done when:** Red for more expensive, green for cheaper. Hidden if no data.

---

## Phase 5: Act 1 Assembly

### Task 5.1: Assemble Act1 page
- [x] `src/pages/Act1.jsx`. State: selectedYear (default 2025).
- [x] Wire useYearData(selectedYear). Render: EraLabel, HeroStat, YearSlider, IncomeDisplay, ItemGrid, YearContext.
- [x] Slider onChange updates state. id="act1". max-w-6xl mx-auto container.
- **Done when:** Full Act 1 functional. Year slider updates everything.

### Task 5.2: Add quick stat summary row
- [x] Between IncomeDisplay and ItemGrid: row of 3-4 compact stat cards.
- [x] "Housing: X.X years", "College: X.X months", "New Car: X.X months", "Eggs: X days".
- [x] Horizontal scroll on mobile, flex row on desktop.
- **Done when:** Quick stats render correctly. Scrollable on mobile.

### Task 5.3: Polish Act 1 interactions
- [x] Test edges: 1913, 1933, 1950, 2000, 2025. Verify animations, fraction bars, no NaN/undefined.
- [x] Ensure rapid slider doesn't cause glitches. Decade buttons highlight correctly.
- **Done when:** Smooth, no visual bugs at any year.

### Task 5.4: Mobile layout QA for Act 1
- [x] Test 375px, 390px. Header, slider, decade buttons, cards, fraction bars all work.
- [x] No horizontal overflow. Touch targets >= 44px.
- **Done when:** Fully usable on mobile.

---

## Phase 6: Act 2 Components

### Task 6.1: Install Recharts
- [x] `npm install recharts`. Log in installed packages. Quick test, then remove.
- **Done when:** Recharts imports and renders without errors.
- Note: If recharts resolution fails (path with spaces), run `npm install` from one-year directory.

### Task 6.2: Create CeoPayChart
- [x] `src/components/act2/CeoPayChart.jsx`
- [x] AreaChart with gradient fill. Data from getCeoPayRatioData().
- [x] White text axes, accent stroke, tooltips. Title + subtitle.
- [x] Annotations at 1965 (20:1), 1989 (58:1), 2000 (344:1).
- **Done when:** Chart renders on dark bg with correct data and tooltips.

### Task 6.3: Create BillionaireCard
- [x] `src/components/act2/BillionaireCard.jsx`
- [x] Props: name, wealth, workerYears, year, isHistorical.
- [x] Glass card (bg-white/5, backdrop-blur, border-white/10). Accent number for worker-years.
- [x] Context: "That's {N} people working their entire 40-year careers."
- **Done when:** Renders for current and historical figures.

### Task 6.4: Create BillionaireGrid
- [x] `src/components/act2/BillionaireGrid.jsx`
- [x] Data from getBillionaireData(). Current vs historical sections.
- [x] Summary callout with top-line inequality stat.
- [x] Grid: 1col mobile, 2col tablet, 3col desktop.
- **Done when:** All billionaire data displayed in grid.

### Task 6.5: Create WealthStats
- [x] `src/components/act2/WealthStats.jsx`
- [x] Stat cards: large number (accent), description, source. From getKeyStatistics() + REFERENCES.md data.
- [x] Include: top 1% share, bottom 50% share, CEO ratio, home price increase, first-time buyer age.
- [x] Grid: 2col mobile, 3col desktop.
- **Done when:** Stats render as impactful number cards.

### Task 6.6: Create ProductivityWagesChart
- [x] `src/components/act2/ProductivityWagesChart.jsx`
- [x] Dual-line chart: productivity vs compensation (indexed to 100 in 1948).
- [x] Data from JSON if available, otherwise hardcode EPI approximation.
- [x] 1979 annotation: "This is where it changed."
- [x] Custom tooltip with both values.
- **Done when:** Divergence clearly visible. 1979 marked.

---

## Phase 7: Act 2 Assembly

### Task 7.1: Assemble Act2 page
- [x] `src/pages/Act2.jsx`. Dark bg (bg-primary), white text.
- [x] Header: "Where Did Your Year Go?" text-4xl/5xl font-black.
- [x] Subtitle about productivity/wages. Inverse logo.
- [x] Render: ProductivityWagesChart, CeoPayChart, BillionaireGrid, WealthStats.
- [x] space-y-16 md:space-y-24, py-16 px-4, id="act2".
- **Done when:** Full Act 2 renders as dark-themed section.

### Task 7.2: Wire App.jsx together
- [x] App: ErrorBoundary > Header > Act1 > SectionDivider > Suspense(Act2) > Footer > ScrollToTop.
- [x] Lazy-load Act2. SectionDivider CTA smooth-scrolls to act2.
- **Done when:** Full app flows Header->Act1->Transition->Act2->Footer. Lazy load works.

---

## Phase 8: Year Context Content

### Task 8.1: Write year context entries
- [x] Create `src/data/yearContexts.js` with context strings for 25+ key years (1913, 1920, 1925, 1929, 1930, 1933, 1940, 1945, 1950, 1960, 1965, 1970, 1975, 1979, 1980, 1985, 1990, 1995, 2000, 2005, 2008, 2010, 2015, 2020, 2025).
- [x] Use REFERENCES.md for accuracy. Keep tone educational, not preachy. 1-2 sentences each.
- [x] Update getContextForYear() to check yearContexts first.
- **Done when:** Context cards appear for all key years. Accurate and well-written.

### Task 8.2: Add era tooltips
- [x] Update EraLabel to include Tooltip with 1-2 sentence era description.
- **Done when:** Hovering era badge shows description.

---

## Phase 9: Income Toggle Features

### Task 9.1: Add minimum wage toggle
- [x] Add state to Act1: incomeType ("median" | "minimum" | "household").
- [x] Toggle buttons near IncomeDisplay.
- [x] "Minimum Wage": uses minimumWage data from JSON, recalculates all items.
- [x] Shows dramatic contrast (house = 27+ years on minimum wage).
- [x] Pre-1938: "No federal minimum wage before 1938."
- **Done when:** Toggle works. All cards recalculate. Contrast is clear.

### Task 9.2: Add household income toggle
- [x] Third option: "Household Income" using household data.
- [x] Label: "Median Household Income (combined)".
- [x] Note: "Since ~1970, most households have two incomes."
- **Done when:** Three-way toggle works correctly.

---

## Phase 10: The American Dream Comparison

### Task 10.1: Create AmericanDreamPreset component
- [x] `src/components/act1/AmericanDreamPreset.jsx`
- [x] Budget breakdown for classic single-income dream: house, car, groceries, 2 kids, college savings.
- [x] Two-column comparison: 1960 vs 2025.
- [x] Each line: item name, cost as fraction of 1Y, fraction bar.
- [x] Total row: sum of all items. If > 1.0: red "Mathematically impossible on one salary."
- [x] Timeline: when it broke (1978 for single income, when even two became insufficient).
- [x] Collapsible, triggered by "See the American Dream breakdown" button below ItemGrid.
- [x] **Done when:** Comparison renders correctly. Budget math verified. Shows impossibility clearly.

---

## Phase 11: Year Comparison Mode

### Task 11.1: Create YearComparison component
- [x] `src/components/act1/YearComparison.jsx`
- [x] Two year selectors (dropdowns or sliders).
- [x] Side-by-side item cards with deltas: "Housing: 2.1x more expensive in 2025 vs 1960."
- [x] Compact table or paired-card layout.
- [x] Toggle: "Compare two years" near year slider.
- [x] **Done when:** Two years selected, items shown side by side with deltas.

---

## Phase 12: "Your Year" Personalization

### Task 12.1: Create YourYear component
- [x] `src/components/act1/YourYear.jsx`
- [x] Input: birth year (1940-2010). On submit:
  - "Born in {year}? Your parents earned ${income}."
  - "A house cost {X} months of their work. For you, it's {Y} months."
- [x] Uses birth year +25 as parents' comparison year.
- [x] Special card with accent border. Collapsible.
- [x] **Done when:** Personalized comparison renders with correct data.

### Task 12.2: Create shareable card generator
- [x] `src/components/shared/ShareableCard.jsx`
- [x] Install html2canvas: `npm install html2canvas`
- [x] Generates branded image: logo, year comparison, 2-3 stats, watermark.
- [x] "Share" button: Web Share API (mobile) or download fallback.
- [x] **Done when:** Share generates image. Download works.

---

## Phase 13: Methodology & About

### Task 13.1: Create Methodology modal
- [x] `src/components/shared/MethodologyModal.jsx`
- [x] Content: what 1Y is, why median not average, gross salary caveat, data sources, interpolation note.
- [x] Centered overlay, max-w-2xl, scrollable. Close: X button, click-outside, Escape key.
- [x] Focus trap. aria-modal.
- [x] **Done when:** Modal accessible and informative.

### Task 13.2: Link methodology from multiple locations
- [x] IncomeDisplay: "How is this calculated?" link.
- [x] Footer: "Methodology" link.
- **Done when:** Methodology accessible from key touchpoints.

---

## Phase 14: Social & SEO

### Task 14.1: Create social sharing buttons
- [x] `src/components/shared/SocialShare.jsx`
- [x] Props: url, text. Buttons: Twitter/X, Facebook, LinkedIn, Copy Link.
- [x] Copy Link shows "Copied!" feedback. Lucide icons.
- [x] Dark variant for Act 2.
- [x] **Done when:** All share buttons work.

### Task 14.2: Add sharing to key locations
- [x] Bottom of Act 1, bottom of Act 2, YourYear result.
- [x] Default text: "A house cost 2.3 years of salary in 1950. Today it costs 4.9 years."
- [x] **Done when:** Share buttons in strategic locations.

### Task 14.3: Enhance SEO
- [x] JSON-LD structured data in index.html (WebApplication schema).
- [x] Canonical URL tag. Verify all OG/Twitter tags.
- **Done when:** SEO tags valid.

---

## Phase 15: Polish & QA

### Task 15.1: Responsive QA (all breakpoints)
- [x] Test: 375, 390, 414, 768, 1024, 1280, 1440, 1920px.
- [x] Verify: no overflow, readable text, 44px touch targets, charts usable, modals fit.
- [x] **Done when:** Good at all breakpoints.

### Task 15.2: Performance optimization
- [x] Check bundle size. Verify Recharts tree-shaking and Act 2 lazy load.
- [x] loading="lazy" on images. useMemo on expensive calcs.
- [x] No unnecessary re-renders during slider use.
- [x] Target: Lighthouse performance > 85.
- [x] **Done when:** Build optimized. Lighthouse target met.

### Task 15.3: Accessibility audit
- [x] Alt text on images. Aria on slider. WCAG AA color contrast.
- [x] Tab navigation works. Focus styles visible. Modal focus trap.
- [x] Charts have aria-labels or text summaries.
- [x] **Done when:** No critical WCAG AA violations.

### Task 15.4: Content accuracy review
- [x] Verify data for 2025, 1950, 1933 against JSON and PRD.
- [x] Verify billionaire and CEO ratio data.
- [x] Check all source citations. Check UI copy for typos.
- [x] No TODO/FIXME comments. No console.logs.
- [x] **Done when:** All data verified. No placeholder content.

### Task 15.5: Cross-browser smoke test
- [x] Chrome, Firefox, Safari (if available), mobile Safari.
- [x] Slider, charts, animations, modals all work.
- [x] **Done when:** Works in Chrome and Firefox. Safari issues documented.

---

## Phase 16: Deployment

### Task 16.1: Configure deployment
- [x] Set vite.config.js base for GitHub Pages if needed.
- [x] Add deploy script to package.json.
- [x] Or: add vercel.json.
- [x] `npm run build` produces correct dist/.
- [x] **Done when:** Deployable build exists.

### Task 16.2: Create README.md
- [x] Name, description, screenshot placeholder. "What is 1Y?" section.
- [x] Tech stack. Getting started (clone, install, dev, build). Data sources. License.
- [x] **Done when:** Clear, professional README.

### Task 16.3: Final verification
- [x] `npm run build` succeeds. `npx vite preview` works.
- [x] Full walkthrough: Act 1 slider, toggles, Act 2 charts, share, methodology, footer.
- [x] Fonts, images, links all load.
- [x] **Done when:** Production build matches dev. App ready for deployment.

---

## Future Tasks (Post-MVP)

### F1: "Build Your Life" calculator
- [x] User selects lifestyle elements. App calculates total 1Y cost across years. Shows when it became impossible.

### F2: Regional data
- [!] Metro-area housing/rent data. Dropdown selector. (Blocked: requires metro-area data source; current JSON has national data only.)

### F3: Animated scroll reveals
- [x] Intersection Observer entrance animations. Number count-ups on scroll.

### F4: Social media calendar templates
- [x] Daily "On this day" cards. Brand template designs. PNG export.

### F5: International versions
- [!] UK, Canada, EU. Localized income/prices/currency. (Blocked: requires international data sources.)

### F6: PDF/print export
- [x] Download current year data as PDF. Print stylesheet.

### F7: Embed widget
- [x] Lightweight embeddable version for blogs. iframe or web component.

### F8: Data update pipeline
- [x] Script to fetch latest BLS/Census data and update JSON.
- [x] Automated validation after data refresh.

---

## Notes for the Agent

- Stub unbuilt components when referencing them (div with name + TODO). Fill in at that task.
- JSON is source of truth. Adapt code to actual data structure.
- Log installed packages at top of this file.
- Phases are sequential. Don't skip.
- "Fix all issues" means actually test and fix. Don't just check it off.
- Prefer "good enough" over perfection. Polish tasks exist later.
- Commit format: `feat(act1): add year slider` or `fix(data): handle missing rent data`.
- Reference @PRD.md for architecture, @REFERENCES.md for copy context, @.cursorrules for standards.
