# ONE YEAR - Developer Log

**Version:** 1.0  
**Last Updated:** 2026-01-20  
**Status:** Active Development

---

## 📋 Purpose

This document tracks the technical evolution of the ONE YEAR webapp, including:
- Changelog of code changes and logic updates
- Roadmap of planned features and tasks
- Data maintenance procedures
- Technical decisions and rationale

---

## 🗺️ Roadmap

### **Phase 1: Impact & Input** (Completed)
- [x] Initialize DEVELOPER_LOG.md
- [x] High-impact Hero Hook (House price comparison: 1970 vs 2025)
- [x] Act 1 Input Form (Salary, Debt, Price Overrides)
- [x] Math engine for personalized 1Y unit recalculations

### **Phase 2: The Personalized Life-Bar** (Completed)
- [x] Logic to recalculate fractions based on user input
- [x] Debt visualization (how many months/years of work are owed to the past)

### **Phase 3: The Full Story** (Completed)
- [x] Act 2 side-by-side generational comparison
- [x] Act 3 Billionaire Stack visualization

### **Phase 4: Polish & Optimization**
- [ ] Mobile responsiveness testing
- [ ] Performance optimization
- [ ] Accessibility audit (WCAG AA)
- [ ] Cross-browser testing

---

## 📝 Changelog

### **2026-01-20 - Data Source Expansion + Update Hook**
- Added new affordability sources (BLS ECI, CPI shelter, BEA PCE, FHFA HPI, Case-Shiller, NAR HAI, SCF, MIT Living Wage, Child Care Aware, KFF health benefits)
- Added ADP Pay Insights + Paychex Employment Watch as recurring signals
- Added monthly update hook script (`scripts/monthly_update.ps1`) to log source updates

### **2026-01-18 - Outline Consolidation**
- Merged duplicate outline files into a single canonical document
- `PROJECT_OUTLINE_v2.md` is now the source of truth
- Removed `PROJECT_OUTLINE.md` to avoid confusion

### **2026-01-18 - Story Spine + Shareable Cards**
- Added **Start Here** narrative with 3-step flow (Feel → Explore → Share)
- Built shareable card generator with:
  - Default summary (1975 vs 2025)
  - Custom comparison (item + years)
  - American Dream bundle (home + 2 college + car + childcare)
- Unified hero copy to median worker pay and 1975 baseline
- Consolidated Myth Busters into Context view for clearer storytelling

### **2026-01-06 - Standardized Comparison Year & Enhanced Minimum Wage Section**
- **Standardized default comparison year to 1975** (50 years ago from 2025) across entire app
  - Changed hero stat from "1970" to "1975" with updated house price (3.8 years vs 2.4 years)
  - Updated all "vs 1970" comparisons to "vs 1975" throughout Purchasing Power view
  - Reasoning: 1975 is more meaningful to Millennials thinking about their parents (Gen X/early Boomers), and is an even 50-year span
- **Enhanced Minimum Wage Purchasing Power section** in Wealth Gap view:
  - Added category switcher dropdown (Groceries, Rent, Home, Car, College)
  - Replaced dollar-only display with mathematical equivalences:
    - Annual expenses: Shows fraction/percentage that minimum wage covers (e.g., "covers 150% of annual rent" or "covers 85% of groceries")
    - One-time purchases: Shows years of work needed (e.g., "needs 12.3 years of work" for a house)
  - Side-by-side 1975 vs 2025 comparison cards
- **Technical implementation:**
  - Added `updateMinWageComparison()` function with interpolation for missing 1975 data points
  - Updated all comparison base calculations from 1970 to 1975
  - Maintained individual worker income focus (not household)

### **2025-01-04 - Initial Implementation Complete**
- Created DEVELOPER_LOG.md
- Established roadmap structure
- Defined task categories
- **Built index.html** - Main deployment file with:
  - Hero Hook: Visual comparison of 1975 vs 2025 house prices (3.8 years vs 6.5 years)
  - Purchasing Power view: Year slider with item comparisons (vs 1975 baseline)
  - Wealth Gap view: CEO-to-worker ratios, Minimum Wage Purchasing Power, Billionaire comparisons
  - Myth Busters view: Data-driven responses to common talking points
- Implemented data interpolation for year-by-year calculations
- Created responsive navigation with three main views

---

## 🔧 Data Maintenance

### **Updating ONE_YEAR_COMPLETE_DATA.json**

1. **Income Data Updates:**
   - Source: BLS Q3 reports (quarterly), Census ASEC (annual)
   - Update path: `incomeData.medianWorker.data[YEAR]`
   - Format: `"YEAR": { "value": AMOUNT, "household": AMOUNT }`

2. **Price Data Updates:**
   - Source: Varies by category (see `sources` section in JSON)
   - Update path: `items.ITEM_NAME.data[YEAR]`
   - Format: `"YEAR": { "price": AMOUNT, "yearsOfWork": CALCULATED }`

3. **Billionaire Wealth Updates:**
   - Source: Bloomberg Billionaires Index (real-time)
   - Update path: `wealthConcentration.billionaires[NAME]`
   - Recalculate `yearsOfWork` using current median income

### **Data Validation Checklist**
- [ ] All prices in nominal dollars (not inflation-adjusted)
- [ ] Years of work calculated as: `price ÷ annualIncome`
- [ ] Source URLs verified and accessible
- [ ] Confidence levels assigned (high/medium/low)
- [ ] Historical gaps documented in notes

---

## 🏗️ Technical Architecture

### **Current Stack**
- **Frontend:** Vanilla HTML/CSS/JavaScript (transitioning to React)
- **Data:** Static JSON files (`ONE_YEAR_COMPLETE_DATA.json`)
- **Styling:** Custom CSS with Inter font family
- **Deployment:** GitHub Pages (planned)

### **Key Components** (in index.html)
1. **Hero Hook:** Landing page impact visualization (1975 vs 2025 comparison)
2. **Purchasing Power View:** Year slider with item comparisons (baseline: 1975)
3. **Wealth Gap View:** CEO-to-worker ratios, Minimum Wage Purchasing Power, Billionaire comparisons
4. **Myth Busters View:** Data-driven responses to common talking points
5. **Math Engine:** Interpolates data and calculates years of work across years
6. **Minimum Wage Comparison:** Category-switchable 1975 vs 2025 purchasing power analysis

---

## 🐛 Known Issues

_None yet - log issues here as they're discovered_

---

## 💡 Technical Decisions

### **Why Vanilla JS Initially?**
- Faster iteration for MVP
- No build step required
- Easier for non-coders to understand/modify
- Can migrate to React later if needed

### **Why Static JSON?**
- Version control friendly
- No database required
- Fast loading
- Easy to audit and verify

---

## 📚 Resources

- **Data Sources:** See `ONE_YEAR_COMPLETE_DATA.json` → `sources` section
- **Brand Guidelines:** `BRANDING_GUIDELINES.md`
- **Project Outline:** `PROJECT_OUTLINE_v2.md`

---

*This is a living document. Update as development progresses.*
