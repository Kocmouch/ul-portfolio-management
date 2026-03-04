import type { ReactNode } from 'react';

import { AllocationHelper } from './AllocationHelper';
import { BetaCalculator } from './BetaCalculator';
import { CAPMCalculator } from './CAPMCalculator';
import { CMLCalculator } from './CMLCalculator';
import { ExpectedReturnCalculator } from './ExpectedReturnCalculator';
import { HPRCalculator } from './HPRCalculator';
import { JensenAlphaCalculator } from './JensenAlphaCalculator';
import { MWRCalculator } from './MWRCalculator';
import { MSquaredCalculator } from './MSquaredCalculator';
import { PortfolioRiskCalculator } from './PortfolioRiskCalculator';
import { PortfolioWeightsCalculator } from './PortfolioWeightsCalculator';
import { ROICalculator } from './ROICalculator';
import { SharpeRatioCalculator } from './SharpeRatioCalculator';
import { TreynorCalculator } from './TreynorCalculator';
import { TWRCalculator } from './TWRCalculator';
import { TwoAssetVarianceCalculator } from './TwoAssetVarianceCalculator';

export type CalculatorCategory = 'return' | 'risk' | 'performance' | 'optimization';

export interface CalculatorMeta {
  id: string;
  title: string;
  category: CalculatorCategory;
  /** Short one-line subtitle shown under the title (optional). */
  subtitle?: string;
  /** Plain English description for the info modal. */
  description: string;
  /** LaTeX string for the main formula, rendered via BlockMath. */
  formulaLatex: string;
  /** Optional extra LaTeX (e.g. clarifying notes). */
  extraLatex?: string;
  /** React component for the actual calculator body (inputs, button, results). */
  component: () => ReactNode;
}

export const calculatorsConfig: CalculatorMeta[] = [
  {
    id: 'hpr',
    title: 'Holding Period Return (HPR)',
    category: 'return',
    subtitle: 'Total return over a single investment period.',
    description:
      'Holding Period Return (HPR) measures the total percentage gain or loss on an investment over a specific period, including price change and any cash distributions such as dividends.',
    formulaLatex: 'HPR = \\dfrac{V_{\\text{end}} - V_{\\text{begin}} + D}{V_{\\text{begin}}}',
    component: HPRCalculator,
  },
  {
    id: 'expected-return',
    title: 'Portfolio Expected Return',
    category: 'return',
    subtitle: 'Weighted average of asset returns.',
    description:
      'The expected return of a portfolio is the weighted average of the expected returns of its individual assets, using portfolio weights as the weights.',
    formulaLatex: 'R_p = \\sum_{i=1}^n w_i r_i',
    component: ExpectedReturnCalculator,
  },
  {
    id: 'roi',
    title: 'Return on Investment (ROI)',
    category: 'return',
    subtitle: 'Simple percentage gain or loss.',
    description:
      'Return on Investment (ROI) is a simple percentage measure of gain or loss relative to the initial amount invested, optionally adjusted for net contributions.',
    formulaLatex: '\\text{ROI} = \\dfrac{V_{\\text{end}} - V_{\\text{begin}} - C}{V_{\\text{begin}}}',
    component: ROICalculator,
  },
  {
    id: 'portfolio-risk',
    title: 'Portfolio Risk (Approx.)',
    category: 'risk',
    subtitle: 'Volatility from variances and average correlation.',
    description:
      'This calculator approximates total portfolio volatility by combining individual asset variances with a single average pairwise correlation across all assets.',
    formulaLatex: '\\sigma_p^2 = \\sum_{i=1}^n w_i^2\\,\\sigma_i^2 + 2 \\sum_{i<j} w_i w_j\\,\\sigma_i \\sigma_j\\,\\rho_{ij}',
    extraLatex: '\\text{(using a single average correlation }\\bar{\\rho}\\text{ across assets)}',
    component: PortfolioRiskCalculator,
  },
  {
    id: 'two-asset-variance',
    title: 'Two-Asset Portfolio Variance',
    category: 'risk',
    subtitle: 'Exact variance for a 2-asset portfolio.',
    description:
      'For a two-asset portfolio, variance combines each asset variance with their correlation. This formula shows how diversification and correlation affect risk.',
    formulaLatex: '\\sigma_p^2 = w_1^2\\,\\sigma_1^2 + w_2^2\\,\\sigma_2^2 + 2 w_1 w_2\\,\\sigma_1 \\sigma_2\\,\\rho_{12}',
    component: TwoAssetVarianceCalculator,
  },
  {
    id: 'beta',
    title: 'Beta (Systematic Risk)',
    category: 'risk',
    subtitle: 'Sensitivity of asset to market moves.',
    description:
      'Beta measures the sensitivity of an asset or portfolio to movements in the overall market. A beta above 1 means the asset tends to move more than the market; below 1 means it tends to move less.',
    formulaLatex: '\\beta = \\dfrac{\\text{Cov}(R_i, R_m)}{\\text{Var}(R_m)}',
    component: BetaCalculator,
  },
  {
    id: 'capm',
    title: 'CAPM Expected Return',
    category: 'risk',
    subtitle: 'Required return from CAPM.',
    description:
      'The Capital Asset Pricing Model (CAPM) links required expected return to risk-free rate, market risk premium, and asset beta. It gives the return investors should demand for bearing systematic risk.',
    formulaLatex: 'E(R_i) = R_f + \\beta_i \\big(E(R_m) - R_f\\big)',
    component: CAPMCalculator,
  },
  {
    id: 'sharpe',
    title: 'Sharpe Ratio',
    category: 'performance',
    subtitle: 'Excess return per unit of total risk.',
    description:
      'The Sharpe ratio measures how much excess return a portfolio delivers per unit of total volatility. Higher values indicate better risk-adjusted performance.',
    formulaLatex: 'S = \\dfrac{R_p - R_f}{\\sigma_p}',
    component: SharpeRatioCalculator,
  },
  {
    id: 'treynor',
    title: 'Treynor Ratio',
    category: 'performance',
    subtitle: 'Excess return per unit of beta risk.',
    description:
      'The Treynor ratio is similar to the Sharpe ratio but uses systematic risk (beta) instead of total volatility, making it suitable for well-diversified portfolios.',
    formulaLatex: 'T = \\dfrac{R_p - R_f}{\\beta_p}',
    component: TreynorCalculator,
  },
  {
    id: 'jensen-alpha',
    title: "Jensen's Alpha",
    category: 'performance',
    subtitle: 'Excess performance over CAPM.',
    description:
      "Jensen's alpha measures the portfolio return in excess of what CAPM would predict given its beta. A positive alpha indicates that the manager outperformed the risk-adjusted benchmark.",
    formulaLatex: '\\alpha = R_p - [R_f + \\beta_p \\big(R_m - R_f\\big)]',
    component: JensenAlphaCalculator,
  },
  {
    id: 'm-squared',
    title: 'M-Squared (M2)',
    category: 'performance',
    subtitle: 'Sharpe ratio expressed as a return.',
    description:
      'M-squared (Modigliani-Modigliani measure) converts the Sharpe ratio into a risk-adjusted return that can be directly compared to a benchmark by scaling the portfolio to benchmark volatility.',
    formulaLatex: 'M^2_p = R_f + S_p \\sigma_m',
    extraLatex: 'M^2_p - R_m \\;\\text{shows outperformance vs. the benchmark}',
    component: MSquaredCalculator,
  },
  {
    id: 'twr',
    title: 'Time-Weighted Return (TWR)',
    category: 'performance',
    subtitle: 'Performance net of cash flow timing.',
    description:
      'Time-weighted return compounds subperiod returns and removes the impact of external cash flows, making it suitable for comparing portfolio managers.',
    formulaLatex: '\\text{TWR} = \\prod_{t=1}^T (1 + R_t) - 1',
    component: TWRCalculator,
  },
  {
    id: 'mwr',
    title: 'Money-Weighted Return (IRR)',
    category: 'performance',
    subtitle: 'Internal rate of return including cash flow timing.',
    description:
      'Money-weighted return (IRR) is the discount rate that sets the present value of all cash flows, including the final value, to zero. It reflects the impact of both performance and the timing of contributions/withdrawals.',
    formulaLatex: '0 = \\sum_{t=0}^T \\dfrac{CF_t}{(1 + r)^t}',
    component: MWRCalculator,
  },
  {
    id: 'weights',
    title: 'Portfolio Weights',
    category: 'optimization',
    subtitle: 'Weights from asset market values.',
    description:
      'This calculator converts the market values of portfolio holdings into portfolio weights, useful as a starting point for optimisation or risk analysis.',
    formulaLatex: 'w_i = \\dfrac{V_i}{\\sum_{j=1}^n V_j}',
    component: PortfolioWeightsCalculator,
  },
  {
    id: 'allocation-helper',
    title: 'Allocation Strategies (60/40, 70/20/10)',
    category: 'optimization',
    subtitle: 'Quick splits for simple allocation rules.',
    description:
      'Quick helper for applying simple allocation heuristics such as 60/40 (stocks/bonds) or a 70/20/10 low/medium/high-risk split based on total portfolio value.',
    formulaLatex: '60/40: 0.6 P_{\\text{total}} \\text{in stocks, } 0.4 P_{\\text{total}} \\text{in bonds}',
    extraLatex:
      '70:20:10: 0.7 P_{\\text{total}} \\text{low risk, } 0.2 P_{\\text{total}} \\text{medium risk, } 0.1 P_{\\text{total}} \\text{high risk}',
    component: AllocationHelper,
  },
  {
    id: 'cml',
    title: 'Capital Market Line (CML)',
    category: 'optimization',
    subtitle: 'Expected return for a chosen volatility.',
    description:
      'The Capital Market Line (CML) shows the trade-off between expected return and total risk for efficient portfolios built from the market portfolio and a risk-free asset.',
    formulaLatex: 'E(R_p) = R_f + \\dfrac{E(R_m) - R_f}{\\sigma_m} \\cdot \\sigma_p',
    component: CMLCalculator,
  },
];
