# ONE YEAR - Product Requirements Document

**Version:** 3.0
**Last Updated:** February 2026
**Status:** Active Development - Phase 1 MVP

---

## Product Summary

ONE YEAR is an interactive web application that reframes economic discussions using a unit of measurement: **1Y (One Year) = one median worker's annual salary.** Instead of showing prices in dollars (which are meaningless across decades due to inflation), we show costs as fractions of a year's labor. This makes purchasing power changes visceral and personal.

**Core insight:** A house cost 2.3 years of median household income in 1950. It costs 4.9 years in 2025. College went from 0.5 months to 15.4 months. These numbers don't lie, and they bypass every partisan argument about "kids these days."

**Target URL:** OneYear.work
**Primary audience:** Adults 25-45 who feel economically squeezed but lack the data to articulate why.

---

## Technical Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | React 18+ with Vite | Fast dev, hot reload, modern tooling |
| Styling | Tailwind CSS | Utility-first, rapid iteration, responsive |
| Charts | Recharts | React-native, composable, clean defaults |
| Icons | Lucide React | Lightweight, consistent icon set |
| Data | Static JSON (committed to repo) | Single source of truth, no backend needed |
| Fonts | Inter (Google Fonts) | Project brand font |
| Deployment | GitHub Pages or Vercel | Free, simple, fast |

---

## Data Architecture

### Source of Truth
All data lives in `src/data/oneYearData.json` (migrated from `ONE_YEAR_EXTENDED_DATA.json`).

### Data Shape (abbreviated)

```json
{
  "metadata": { "version": "3.0", "dataRange": "1913-2025" },
  "incomeData": {
    "data": {
      "1950": { "household": 3319, "individual_ft_est": 2500 },
      "2025": { "household": 83730, "individual_ft_est": 63128 }
    }
  },
  "items": {
    "medianHome": {
      "name": "Median Home",
      "category": "Housing",
      "icon": "🏠",
      "prices": { "1950": 7354, "2025": 412300 }
    },
    "collegeTuition": { ... },
    "newCar": { ... },
    "monthlyRent": { ... },
    "eggs": { ... },
    "milk": { ... },
    "bread": { ... },
    "gasoline": { ... },
    "movieTicket": { ... },
    "groundBeef": { ... },
    "postageStamp": { ... }
  },
  "minimumWage": { ... },
  "ceoPayRatio": { ... },
  "billionaireWealth": { ... }
}
```

### Key Data Rules
- Years with missing data: interpolate linearly between known data points
- Income metric default: `individual_ft_est` when available, fall back to `household`
- Pre-1947 income: use `avg_annual` field (manufacturing/nonfarm averages)
- All 1Y calculations: `itemPrice / annualIncome` = fraction of one year
- Monthly items (rent, groceries): annualize first, then divide by income

---

## Brand & Design Spec

### Colors (CSS custom properties)

```css
--color-primary: #1a3a52;       /* Deep Navy - headers, text, primary UI */
--color-accent: #e67e22;        /* Burnt Orange - CTAs, highlights, emphasis */
--color-slate: #546e7a;         /* Slate Gray - secondary text, borders */
--color-bg: #f5f5f5;            /* Off-White - page background */
--color-bg-dark: #1a3a52;       /* Navy - dark sections (Act 2) */
--color-green: #7cb342;         /* Warm Green - "affordable" indicators */
--color-red: #d32f2f;           /* Deep Red - "unaffordable" indicators */
```

### Typography
- Font family: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
- Body minimum: 16px
- Headings: Inter Bold/Black (700/900)
- Numbers/data: Inter SemiBold (600), tabular-nums

### Logo
Four PNG logo variants exist in `/public/logos/`:
- `PRIMARY_LOGO.png` - Navy circle, white "1Y" (light backgrounds)
- `INVERSE_LOGO.png` - White circle, navy "1Y" (dark backgrounds)
- `MONOCHROME_LOGO.png` - For general use
- `BLACK_WHITE_LOGO.png` - Print/B&W

Logo renders as a 48-72px circle in the header. Never stretch, rotate, or add effects.

### Voice & Tone
- Educational, not preachy. "Let's look at the numbers" not "Wake up sheeple"
- Data-driven but emotionally resonant
- Direct address: "your salary," "your year"
- No partisan language. No jargon without explanation.
- Short sentences preferred (15-20 words)

---

## Application Structure

### Two-Act Architecture

The app has a deliberate narrative arc. Act 1 builds trust through personal, relatable purchasing power data. Act 2 contextualizes that data within wealth concentration. Users can navigate freely, but the default flow is Act 1 first.

### Act 1: "What Does Your Year Buy?" (Primary Experience)

**Purpose:** Show how many months/years of labor it takes to buy common things, across time.

**Layout (top to bottom):**

1. **Header** - Logo (circle badge), "ONE YEAR" wordmark, tagline: "What does your year really buy?"

2. **Hero Stat** - Large, animated display of the currently selected year. Shows: year, median income for that year, and a hook stat like "A house cost X.X years of your labor."

3. **Year Selector** - A horizontal slider (range input) spanning 1913-2025. Snaps to years that have data. Displays the selected year prominently. Below the slider: decade labels (1920s, 1930s, etc.) as quick-jump buttons.

4. **Income Display** - Shows the income metric for the selected year. Defaults to "Median Worker Earnings." Toggle to switch to "Minimum Wage" (Phase 2) or "Household Income" (Phase 2).

5. **Item Cards Grid** - Responsive grid (2 columns mobile, 3-4 columns desktop). Each card shows:
   - Item icon + name (e.g., 🏠 Median Home)
   - Price in dollars for that year
   - **Fraction bar**: a horizontal bar showing cost as a fraction of 1Y, colored green-to-red based on affordability
   - **Months label**: "X.X months of your year" or "X.X years of your labor"
   - Small source citation

   **Items to display (ordered by category):**
   - Housing: Median Home, Monthly Rent (annualized)
   - Transportation: New Car, Annual Gas
   - Food: Dozen Eggs, Gallon of Milk, Loaf of Bread, Ground Beef (per lb)
   - Education: 4-Year College Tuition (state, in-state)
   - Other: Movie Ticket, Postage Stamp

6. **Year Context Card** - Below the grid, a card with 1-2 sentences of historical context for the selected year (e.g., "1933: The Great Depression. Unemployment hit 25%. A house cost 3.1 years of income, worse than today's ratio."). Data sourced from `depressionEraContext` and `generationalDebunkers` in the JSON.

7. **Transition to Act 2** - A full-width banner: "Your purchasing power shrank. But the economy grew. Productivity tripled. So where did the money go?" with a CTA button to Act 2.

### Act 2: "Where Did It Go?" (Wealth Concentration)

**Purpose:** Show the flip side. Worker productivity grew but wages stagnated. The gains went to the top.

**Layout:**

1. **Section Header** - Dark navy background. "Where did your year go?"

2. **CEO Pay Ratio Timeline** - A line chart (Recharts) showing the CEO-to-worker pay ratio over time. Key data points: 20:1 in 1965, 58:1 in 1989, 344:1 in 2023. Interactive tooltips.

3. **Billionaire Wealth Cards** - Cards showing select billionaires and their wealth expressed in median worker years:
   - Elon Musk: ~7.6 million years
   - Jeff Bezos: ~3.0 million years
   - Historical comparison: Rockefeller in 1913 = 1.4 million years
   - Visual: "If you worked every day since [year], you'd still need [X] more lifetimes."

4. **Productivity vs. Wages Chart** - A dual-line chart showing productivity growth vs. wage growth diverging after ~1979. (Data from EPI or similar, to be added in Phase 2 if not in current JSON.)

5. **Key Statistics Cards** - Pull from `keyStatistics` in the JSON. Cards like "Top 1% own more wealth than the bottom 90%."

6. **Footer** - Sources, methodology link, social sharing buttons, ONE YEAR logo.

---

## Component Architecture

```
src/
├── App.jsx                    # Root: routing between Act 1, Act 2
├── main.jsx                   # Vite entry point
├── index.css                  # Tailwind directives + CSS custom properties
├── data/
│   └── oneYearData.json       # THE single data source
├── hooks/
│   ├── useYearData.js         # Hook: returns income + item prices for a given year
│   └── useOneYearCalc.js      # Hook: calculates 1Y fractions, months, affordability
├── components/
│   ├── layout/
│   │   ├── Header.jsx         # Logo, wordmark, tagline
│   │   ├── Footer.jsx         # Sources, social links
│   │   └── SectionDivider.jsx # Transition banner between acts
│   ├── act1/
│   │   ├── HeroStat.jsx       # Big animated year + headline stat
│   │   ├── YearSlider.jsx     # Range slider + decade quick-jump
│   │   ├── IncomeDisplay.jsx  # Current income metric display
│   │   ├── ItemCard.jsx       # Single item: icon, price, fraction bar, months
│   │   ├── ItemGrid.jsx       # Grid container for ItemCards
│   │   ├── FractionBar.jsx    # Reusable horizontal bar (0% to 100%+)
│   │   └── YearContext.jsx    # Historical context blurb
│   ├── act2/
│   │   ├── CeoPayChart.jsx    # CEO:worker ratio line chart
│   │   ├── BillionaireCard.jsx # Single billionaire wealth card
│   │   ├── BillionaireGrid.jsx # Grid of billionaire cards
│   │   ├── WealthStats.jsx    # Key statistics cards
│   │   └── ProductivityChart.jsx # Productivity vs wages (Phase 2)
│   └── shared/
│       ├── SourceCitation.jsx # Small inline source reference
│       └── AnimatedNumber.jsx # Number that animates on change
└── utils/
    ├── interpolate.js         # Linear interpolation for missing years
    ├── formatters.js          # formatCurrency(), formatMonths(), formatYears()
    └── constants.js           # Color tokens, breakpoints, category order
```

---

## Interaction Specifications

### Year Slider Behavior
- Range: 1913 to 2025
- Default starting year: 2025 (show current reality first)
- On slide: all item cards, hero stat, and income display update in real-time
- If a year has no data for a specific item, show "No data" with muted styling
- If a year has no data at all (income), snap to nearest year with data
- Smooth transitions on number changes (use AnimatedNumber or CSS transitions)

### Fraction Bar Behavior
- Width = min(itemCost / annualIncome * 100, 200)%
- If cost < 50% of 1Y: green (#7cb342)
- If cost 50%-100% of 1Y: gradient green to orange
- If cost > 100% of 1Y (more than a full year): red (#d32f2f), bar extends past container with overflow visible
- For multi-year items (houses): show the bar at a different scale (label "years" not "months")

### Item Card Behavior
- Hover: subtle lift shadow
- For housing: show "years of labor" (e.g., "4.9 years")
- For groceries/gas: show "days of labor" or "X.X months"
- Items with prices > 1Y: red accent border on card
- Items that became dramatically more expensive: show a small delta arrow with the change

### Responsive Breakpoints
- Mobile (<640px): 1 column grid, simplified header, smaller fraction bars
- Tablet (640-1024px): 2 column grid
- Desktop (>1024px): 3-4 column grid, full header with all elements

---

## Phase 1 MVP Scope (What to Build Now)

**In scope:**
- Full Act 1 with year slider, item cards, fraction bars, hero stat
- Median individual earnings as the default (and only, for now) income metric
- All 11 items from the data file
- Year context cards for notable years
- Act 2 with CEO pay ratio chart and billionaire wealth cards
- Transition banner between acts
- Mobile responsive
- Header with logo, footer with sources

**Out of scope (Phase 2+):**
- Minimum wage toggle
- Household income toggle
- "Build Your Life" calculator
- "Your Year" personalization (enter birth year)
- Shareable card generator
- Animated transitions between years (basic CSS transitions are fine for MVP)
- Regional data
- Productivity vs. wages chart (unless data is in JSON)

---

## Acceptance Criteria (Definition of Done)

The MVP is complete when:

1. User can slide through years 1913-2025 and see all available data update in real-time
2. Each item card shows: icon, name, dollar price, fraction bar, and months/years of labor
3. Fraction bars are color-coded (green = affordable, red = unaffordable)
4. Hero stat updates with a compelling headline for each year
5. Act 2 displays CEO pay ratio chart and billionaire wealth comparison
6. The app is responsive and usable on mobile (375px width minimum)
7. All data comes from the JSON file (no hardcoded prices)
8. Inter font loads correctly
9. Brand colors match the spec (#1a3a52, #e67e22, etc.)
10. Source citations appear on hover or in a footer section
11. Page loads in under 3 seconds on a standard connection
12. No console errors in production build

---

## Data Source Citations

Every number in this app is sourced. Primary authorities:

| Data | Source | Access |
|------|--------|--------|
| Median income (1947+) | Census Bureau CPS ASEC | census.gov |
| Weekly earnings | BLS Current Population Survey | bls.gov |
| Home prices | FRED series MSPUS | fred.stlouisfed.org |
| Existing home sales | National Association of Realtors | nar.realtor |
| Rent | Apartment List National Rent Report | apartmentlist.com |
| College costs | College Board Trends in College Pricing | collegeboard.org |
| Food costs | USDA Official Food Plans | fns.usda.gov |
| Consumer prices (eggs, milk, etc.) | BLS Average Price Data | bls.gov |
| Billionaire wealth | Bloomberg Billionaires Index | bloomberg.com |
| Pre-1940 wages | NBER, BLS Bulletin No. 604 | nber.org |
| Pre-1940 housing | Grebler, Blank & Winnick estimates | Academic research |
