# ONE YEAR - Developer Log

**Version:** 1.0  
**Last Updated:** 2025-01-04  
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

### **2025-01-04 - Initial Implementation Complete**
- Created DEVELOPER_LOG.md
- Established roadmap structure
- Defined task categories
- **Built ONE_YEAR_IMPACT_APP.html** - Complete impact-first app with:
  - Hero Hook: Visual comparison of 1970 vs 2025 house prices (2.4 years vs 4.9 years)
  - Act 1: Personal calculator with salary, debt, and custom price inputs
  - Life Bar visualization showing personalized cost breakdown
  - Act 2: Generational delta comparison (user vs 1970 median worker)
  - Act 3: Billionaire wealth stack visualization
- Implemented math engine for recalculating all costs based on user's personal 1Y
- Added debt visualization as "negative years" in life bar
- Created multi-act navigation flow

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

### **Key Components**
1. **Hero Hook:** Landing page impact visualization
2. **Input Form:** User salary, debt, and price overrides
3. **Math Engine:** Recalculates all fractions based on user's 1Y
4. **Life Bar:** Visual representation of personalized costs
5. **Generational Delta:** Side-by-side comparison (user vs 1970)
6. **Billionaire Stack:** Act 3 wealth concentration visualization

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
