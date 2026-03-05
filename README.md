## Portfolio Management · Course Hub

Interactive web app to support a university-level Portfolio Management course.  
It bundles theory, tools, and calculators into one clean interface so students can both **learn the formulas** and **test them on real numbers**.

### Features

- **Dashboard**

  - High-level overview and quick entry point into learning resources and tools.

- **Docs**

  - Short, focused explanations of key concepts from portfolio theory and performance measurement.
  - Split into:
    - **Notes** (lecture-aligned, e.g. _Lecture 1 Notes: Risk and Return_)
    - **Book chapters** (chapter/problem-set oriented summaries, currently covering _Chapter 5_ and _Chapter 6_)
  - Written to match the structure of a PM course (returns, risk, diversification, CAPM, performance attribution, etc.).

- **Tools**

  - Miscellaneous helpers that complement the course (e.g. input helpers, small utilities).
  - **Visualization**: interactive chart selector with several types (returns/cumulative, regression, scatter, line, bar, histogram).  Calculators can import helpers from `src/lib/chartUtils` when they need to display data-driven charts.

- **Calculators**
  - Unified UI with collapsible cards, category filters and info modals (formula + explanation).
  - A handful of tools now include viz previews – e.g. regression/correlation scatter plots, return series, and cash‑flow bars – powered by the shared `chartUtils` helpers.
  - **Return measures**
    - Holding Period Return (HPR)
    - Portfolio Expected Return (weighted average)
    - Return on Investment (ROI, with contributions)
  - **Risk measures**
    - Portfolio Risk (approximate volatility from variances + average correlation)
    - Two-Asset Portfolio Variance
    - Beta (systematic risk)
    - CAPM Expected Return
  - **Performance measures**
    - Sharpe Ratio
    - Treynor Ratio
    - Jensen’s Alpha
    - M-Squared (M²)
    - Time-Weighted Return (TWR)
    - Money-Weighted Return (IRR / MWR)
  - **Portfolio optimisation**
    - Portfolio Weights (from market values)
    - Simple Allocation Helper (60/40, 70/20/10)
    - Capital Market Line (CML)

Each calculator:

- Shows only a compact title row by default.
- Expands on click to reveal inputs and results.
- Has an **“i” info icon** opening a modal with:
  - English description,
  - LaTeX formula rendered via KaTeX,
  - Interpretation and usage notes.

### Tech Stack

- **Runtime / Tooling**: [Bun](https://bun.com) (scripts, dev server, bundler)
- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **UI Kit**: [shadcn/ui](https://ui.shadcn.com)–style components (cards, inputs, buttons, etc.)
- **Math rendering**: KaTeX (via `@matejmazur/react-katex`)

### Getting Started

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun dev
```

Then open the printed URL (typically `http://localhost:3000`) in your browser.

Build for production:

```bash
bun build
```

or run the production server (depending on your deployment setup):

```bash
bun start
```

### Project Structure (simplified)

- `src/App.tsx` – simple client-side router (dashboard, docs, tools, calculators)
- `src/pages/` – top-level pages (Dashboard, Docs, Tools, Calculators)
- `src/components/calculators/` – all calculator logic and shared config
- `src/components/ui/` – reusable UI primitives
- `src/lib/` – small utility functions (parsing input, auth helpers, etc.)

### Purpose & Audience

This project is primarily intended for:

- **Students** of Portfolio Management courses who want to practice calculations.
- **Lecturers** who need a lightweight, browser-based companion for exercises and live demos.

It is not a trading or investment-advice platform – all results are purely educational.
