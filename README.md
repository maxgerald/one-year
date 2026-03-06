# ONE YEAR - What Does Your Year Really Buy?

An interactive web application that visualizes how purchasing power has changed over time, comparing the cost of essential goods and services to median annual earnings.

## Overview

This project helps users understand economic changes by showing how many "years of work" (1Y = one median worker's annual salary) it takes to afford various items across different decades, from 1950 to 2025. It also generates shareable graphics that summarize the impact.

## Features

- **Start Here Story**: Clear 3-step flow (Feel it → Explore it → Share it)
- **Shareable Cards**: Auto-generated summary + custom comparisons + American Dream bundle
- **Purchasing Power Calculator**: Compare costs of housing, education, healthcare, and more across decades
- **Wealth Gap Visualization**: See how CEO-to-worker pay ratios have changed over time
- **Myth Busters**: Data-driven responses to common generational talking points
- **Interactive Timeline**: Slider to explore different years and see how costs have changed

## Main Application

The primary application is the React app in `one-year/`. A standalone `index.html` is also available at the repo root.

**Live Version**: The app is hosted on GitHub Pages at: https://maxgerald.github.io/one-year/

### Deployment

The app deploys automatically via GitHub Actions when you push to `main`. To enable:

1. Go to **Settings → Pages** in this repo
2. Under "Build and deployment", set **Source** to **GitHub Actions**
3. Push to `main` (or re-run the workflow) to deploy

To run locally: `cd one-year && npm install && npm run dev`

## Data Sources

- Bureau of Labor Statistics (BLS)
- U.S. Census Bureau
- Federal Reserve Economic Data (FRED)
- Economic Policy Institute (EPI)
- Kaiser Family Foundation
- ADP Research Institute - Pay Insights
- Paychex - Small Business Employment Watch
- Bureau of Economic Analysis (BEA)
- FHFA House Price Index
- S&P CoreLogic Case-Shiller
- National Association of Realtors (NAR)
- Federal Reserve Survey of Consumer Finances (SCF)
- MIT Living Wage Calculator
- Child Care Aware of America

## Update Cadence

Key indicators are checked monthly (wage growth, housing affordability, CPI shelter, PCE, and small business signals) and logged for data refresh.

To run the monthly update hook locally:
- `powershell -File scripts/monthly_update.ps1`

## Usage

Simply open `index.html` in your web browser, or visit the [live version on GitHub Pages](https://maxgerald.github.io/one-year/). No server or installation required - it's a standalone HTML file with embedded CSS and JavaScript.

## License

This project is available for public use.
