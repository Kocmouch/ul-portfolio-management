## Portfolio Management · Course Hub

Interactive web app to support a university-level Portfolio Management course.  
It bundles theory, tools, and calculators into one clean interface so students can both **learn the formulas** and **test them on real numbers**.

### Features

- **Dashboard**

  - High‑level overview and quick entry point into learning resources and tools.

- **Docs**

  - Short, focused explanations of key concepts from portfolio theory and performance measurement.
  - Split into:
    - **Notes** (lecture‑aligned, e.g. _Lecture 1 Notes: Risk and Return_)
    - **Book chapters** (chapter/problem‑set oriented summaries, currently covering _Chapter 5_ through _Chapter 8_ and more to come)
  - Written to match the structure of a PM course (returns, risk, diversification, CAPM, performance attribution, etc.).

- **Tools**

  - Miscellaneous helpers that complement the course (e.g. input converters, date pickers, small utilities).
  - **Visualization**: interactive chart selector with several types (returns/cumulative, regression, scatter, line, bar, histogram). Calculators import helpers from `src/lib/chartUtils` when they need to display data‑driven charts.

- **Calculators**

  The core of the application is a growing collection of calculators organised by topic.  Each one is rendered as a collapsible card with an info modal containing the formula (LaTeX via KaTeX), description and usage notes.  Many calculators also include preview charts where appropriate.

  **Built‑in calculators (current list):**

  - **Returns & averages**: HPR, Expected Return, ROI, Arithmetic & Geometric Average, Effective Annual Rate (EAR), Real Return
  - **Risk & correlation**: Variance, Portfolio Risk, Two‑Asset Variance, Covariance, Correlation, Beta
  - **Capital‑market models**: CAPM Expected Return, Capital Market Line (CML), Fama‑French
  - **Performance measures**: Sharpe, Treynor, Jensen’s Alpha, M², Time‑Weighted Return (TWR), Money‑Weighted Return (MWR/IRR)
  - **Portfolio tools**: Weights from market values, Allocation Helper (e.g. 60/40, 70/20/10), Utility function calculator
  - **Regression & statistics**: Simple regression calculator with scatter‑plot previews

  New calculators are added as the course evolves; check `src/components/calculators` for the most up‑to‑date list.

Each calculator behaves consistently:

- Only a title bar is shown by default.
- Clicking expands the card to reveal inputs and results.
- An **“i” info icon** opens a modal containing:
  - Plain‑English description,
  - LaTeX formula rendered via KaTeX,
  - Interpretation and usage notes.

### Tech Stack

- **Runtime / Tooling**: [Bun](https://bun.com) — scripts, dev server, bundler and test runner
- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS (with `bun-plugin-tailwind` and `tw-animate-css` helpers)
- **UI Components**: Inspired by [shadcn/ui](https://ui.shadcn.com) – cards, inputs, buttons, modals, etc.
- **Charts**: Chart.js via `react-chartjs-2`
- **Markdown & math**: `react-markdown` + `remark-math`/`rehype-katex` for LaTeX in docs

### Getting Started

1. Install dependencies:

   ```bash
   bun install
   ```

2. Start the development server and open the app in your browser:

   ```bash
   bun dev
   # usually available at http://localhost:3000
   ```

3. When you're ready to produce a build:

   ```bash
   bun build
   ```

   or run the bundle directly in production mode:

   ```bash
   bun start
   ```

4. Run the automated test suite (setup uses `happy-dom` to mock the DOM):

   ```bash
   bun test
   ```

   Test configuration lives in `test/setup-dom.ts` and some examples can be found under `src/components
`.

### Project Structure (simplified)

- `src/index.ts` – entry point that starts the Bun server
- `src/App.tsx` – client‑side router (Dashboard, Docs, Tools, Calculators)
- `src/pages/` – top‑level page components
- `src/components/calculators/` – individual calculator components and configuration
- `src/components/ui/` – shared UI primitives (buttons, cards, inputs,…)
- `src/lib/` – utility functions used across the app (parsing, chart helpers, auth, cookies)
- `test/` – test setup and any future unit/component tests

### Purpose & Audience

This project is primarily intended for:

- **Students** of Portfolio Management or Investments courses looking to practice formulas and experiment with numbers in a browser.
- **Lecturers** who need a lightweight, offline‑capable companion for lecture demonstrations and problem sets.

> ⚠️ This is an educational tool only. It does not provide investment advice and is not suitable for real trading.
