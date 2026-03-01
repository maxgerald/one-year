# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

ONE YEAR is a static web application (vanilla HTML/CSS/JS) that visualizes purchasing power changes over time. There is no build system, no package manager, no backend, and no database. The main entry point is `index.html`.

### Running the application

Serve the project root with any static file server:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080/index.html` in a browser. Other HTML files (`ONE_YEAR_IMPACT_APP.html`, `ONE_YEAR_EXTENDED_APP.html`, `wealth-timeline.html`, etc.) are standalone prototypes that can be accessed at their respective paths.

### Linting, testing, and building

There are no configured linters, automated tests, or build steps. The project is self-contained HTML files with embedded CSS and JavaScript. Validation is done by opening the files in a browser and visually inspecting.

### Data files

Static JSON data files (`ONE_YEAR_EXTENDED_DATA.json`, `ONE_YEAR_COMPLETE_DATA.json`, `ONE_YEAR_HISTORICAL_PRICES.json`) are loaded by the HTML files at runtime. See `DEVELOPER_LOG.md` for data update procedures.

### Planned migration

`Tasks.md` outlines a planned migration to React + Vite + Tailwind. This has not been started. If/when it is, update this section with the new dev workflow.
