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
import { CovarianceCalculator } from './CovarianceCalculator';
import { CorrelationCalculator } from './CorrelationCalculator';
import { RegressionCalculator } from './RegressionCalculator';
import { FamaFrenchCalculator } from './FamaFrenchCalculator';
import { ArithmeticAverageCalculator } from './ArithmeticAverageCalculator';
import { GeometricAverageCalculator } from './GeometricAverageCalculator';
import { EARCalculator } from './EARCalculator';
import { VarianceCalculator } from './VarianceCalculator';
import { UtilityCalculator } from './UtilityCalculator';
import { RealReturnCalculator } from './RealReturnCalculator';
import { RiskPremiumCalculator } from './RiskPremiumCalculator';

export type CalculatorCategory = 'return' | 'risk' | 'performance' | 'optimization';

export interface CalculatorMeta {
  id: string;
  title: string;
  category: CalculatorCategory;
  /** Optional lecture id this calculator was mentioned in (e.g. 'lecture-1') */
  lecture?: string;
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
    lecture: 'lecture-1',
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
    lecture: 'lecture-1',
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
    lecture: 'lecture-1',
    component: MWRCalculator,
  },
  {
    id: 'portfolio-risk',
    title: 'Portfolio Risk (Approx.)',
    lecture: 'lecture-2',
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
    lecture: 'lecture-2',
    category: 'risk',
    subtitle: 'Exact variance for a 2-asset portfolio.',
    description:
      'For a two-asset portfolio, variance combines each asset variance with their correlation. This formula shows how diversification and correlation affect risk.',
    formulaLatex: '\\sigma_p^2 = w_1^2\\,\\sigma_1^2 + w_2^2\\,\\sigma_2^2 + 2 w_1 w_2\\,\\sigma_1 \\sigma_2\\,\\rho_{12}',
    component: TwoAssetVarianceCalculator,
  },
  {
    id: 'covariance',
    title: 'Covariance (sample)',
    lecture: 'lecture-2',
    category: 'risk',
    subtitle: 'Covariance between two return series.',
    description: 'Sample covariance estimates co-movement between two series; useful for portfolio variance calculations.',
    formulaLatex: '\\text{Cov}(X,Y) = \\\dfrac{\sum (X_i - E(X))(Y_i - E(Y))}{N-1}',
    component: CovarianceCalculator,
  },
  {
    id: 'correlation',
    title: 'Correlation Coefficient',
    lecture: 'lecture-2',
    category: 'risk',
    subtitle: 'Pearson correlation between two series.',
    description: 'Correlation standardizes covariance and ranges from -1 to 1, indicating the strength and direction of linear relationships.',
    formulaLatex: '\\rho_{X,Y} = \\\dfrac{\\text{Cov}(X,Y)}{\\sigma_X \\sigma_Y}',
    component: CorrelationCalculator,
  },
  {
    id: 'regression',
    title: 'Simple Linear Regression',
    lecture: 'lecture-2',
    category: 'risk',
    subtitle: 'Estimate slope and intercept with OLS.',
    description: 'Compute OLS slope and intercept for Y ~ a + b X using sample covariance/variance.',
    formulaLatex: '\\hat{b} = \\\dfrac{\\text{Cov}(X,Y)}{\\text{Var}(X)}, \\\; \\hat{a} = E(Y) - \\hat{b} E(X)',
    component: RegressionCalculator,
  },
  {
    id: 'beta',
    title: 'Beta (Systematic Risk)',
    category: 'risk',
    subtitle: 'Sensitivity of asset to market moves.',
    description:
      'Beta measures the sensitivity of an asset or portfolio to movements in the overall market. A beta above 1 means the asset tends to move more than the market; below 1 means it tends to move less.',
    formulaLatex: '\\beta = \\dfrac{\\text{Cov}(R_i, R_m)}{\\text{Var}(R_m)}',
    lecture: 'lecture-3',
    component: BetaCalculator,
  },
  {
    id: 'capm',
    title: 'CAPM Expected Return',
    lecture: 'lecture-3',
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
    lecture: 'lecture-3',
    component: JensenAlphaCalculator,
  },
  {
    id: 'fama-french',
    title: 'Fama-French 3-Factor Expected Return',
    lecture: 'lecture-3',
    category: 'risk',
    subtitle: 'Expected return from market, SMB and HML exposures.',
    description: 'Simple Fama-French model: expected return equals risk-free rate plus factor exposures times factor premiums.',
    formulaLatex: 'E(R) = R_f + \beta_M (R_M - R_f) + \beta_{SMB} SMB + \beta_{HML} HML',
    component: FamaFrenchCalculator,
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
    lecture: 'lecture-1',
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
    lecture: 'lecture-2',
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
    lecture: 'lecture-1',
    category: 'optimization',
    subtitle: 'Expected return for a chosen volatility.',
    description:
      'The Capital Market Line (CML) shows the trade-off between expected return and total risk for efficient portfolios built from the market portfolio and a risk-free asset.',
    formulaLatex: 'E(R_p) = R_f + \\dfrac{E(R_m) - R_f}{\\sigma_m} \\cdot \\sigma_p',
    component: CMLCalculator,
  },
    {
      id: 'arithmetic-average',
      title: 'Arithmetic Average Return',
      category: 'return',
      subtitle: 'Simple average of period returns.',
      description: 'Arithmetic average is the unweighted mean of periodic returns; useful for short-term forecasts but ignores compounding.',
      formulaLatex: '\\bar{r} = \\dfrac{1}{n} \\sum_{t=1}^n r_t',
      component: ArithmeticAverageCalculator,
      lecture: 'lecture-1',
    },
    {
      id: 'geometric-average',
      title: 'Geometric Average Return',
      category: 'return',
      subtitle: 'Compounding-aware average (time-weighted).',
      description: 'Geometric average accounts for compounding and is the true average growth rate over time.',
        formulaLatex: 'r_g = \\left( \\prod_{t=1}^n (1 + r_t) \\right)^{1/n} - 1',
      component: GeometricAverageCalculator,
      lecture: 'lecture-1',
    },
    {
      id: 'ear',
      title: 'Effective Annual Rate (EAR)',
      category: 'return',
      subtitle: 'Converts APR and compounding frequency to effective annual rate.',
      description: 'EAR shows the annualized interest rate accounting for compounding within the year.',
        formulaLatex: 'r_{eff} = \\left(1 + \\dfrac{APR}{n} \\right)^n - 1',
      component: EARCalculator,
      lecture: 'lecture-1',
    },
    {
      id: 'scenario-variance',
      title: 'Scenario Expected Value & Variance',
      category: 'risk',
      subtitle: 'Compute E(r), variance and standard deviation from states.',
      description: 'Given discrete states with probabilities and returns, compute the expected return, variance and standard deviation.',
        formulaLatex: '\\sigma^2 = \\sum_s p(s) [r(s) - E(r)]^2',
      component: VarianceCalculator,
      lecture: 'lecture-1',
    },
    {
      id: 'utility',
      title: 'Mean-Variance Utility',
      category: 'risk',
      subtitle: 'Investor utility under mean-variance preferences.',
      description: 'Utility for a risk-averse investor using a quadratic approximation: U = E(r) - 1/2 A \sigma^2.',
        formulaLatex: 'U = E(r) - \\tfrac{1}{2} A \\sigma^2',
      component: UtilityCalculator,
      lecture: 'lecture-1',
    },
    {
      id: 'real-return',
      title: 'Real Return (inflation adjusted)',
      category: 'return',
      subtitle: 'Convert nominal returns to real returns using inflation.',
      description: 'Computes the exact and approximate real return adjusted for inflation.',
        formulaLatex: '1 + r = \\dfrac{1 + R}{1 + i}',
      component: RealReturnCalculator,
      lecture: 'lecture-1',
    },
    {
      id: 'risk-premium',
      title: 'Risk Premium',
      category: 'return',
      subtitle: 'Excess return over the risk-free rate.',
      description: 'Risk premium is the expected return minus the risk-free rate.',
      formulaLatex: 'RP = E(R) - R_f',
      component: RiskPremiumCalculator,
      lecture: 'lecture-1',
    },
];
