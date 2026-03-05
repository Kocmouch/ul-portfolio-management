export const chapter08IndexModelsMarkdown = String.raw`# Chapter 8: Index Models, Risk Decomposition, and Alpha

These notes focus on the implementation of index models to simplify portfolio construction, the decomposition of risk, and the active pursuit of "alpha." The single-index model reduces the inputs required for optimization and separates macro forecasting from micro security analysis.

## 1. The Single-Index Model

The single-index model is a simplified version of the Markowitz procedure. It classifies sources of uncertainty into two categories: systematic (macroeconomic) factors and firm-specific (microeconomic) factors.

- **Broad Market Index:** The model assumes the macro factor can be represented by a broad index of stock returns (e.g., S&P 500).
- **Reduced Inputs:** The model drastically reduces the number of estimates (expected returns, variances, covariances) required for portfolio optimization compared to the full Markowitz procedure.
- **Specialization of Labor:** It enables a division of labor by separating macro forecasting from firm-level security analysis.

## 2. Regression and the Security Characteristic Line (SCL)

The index model is estimated by regressing excess returns of a stock on excess returns of the market index.

**SCL Equation:**
$$
R_i = \alpha_i + \beta_i R_M + e_i
$$

Where $R_i$ is the excess return of the stock, $R_M$ is the excess return of the market, and $e_i$ is the residual.

- **Beta ($\beta$):** Sensitivity of the stock to market movements (slope of the SCL).
- **Alpha ($\alpha$):** Intercept, representing the stock's expected excess return when the market's excess return is zero.
- **Total vs. Excess Returns:** Using total returns gives an intercept equal to $\alpha + r_f(1-\beta)$.

## 3. Risk Decomposition in Index Models

In the single-index model, total variance is decomposed into systematic and firm-specific components.

- **Systematic Risk:** $\beta^2 \sigma_M^2$ — risk attributable to market movements.
- **Firm-Specific Risk:** $\mathrm{Var}(e_i)$ — residual variance that can be reduced via diversification.
- **Covariance Simplification:** For assets $i$ and $j$,
$$
\mathrm{Cov}(r_i, r_j) = \beta_i \beta_j \sigma_M^2
$$
- **Correlation and $R^2$:** The $R^2$ of the regression indicates the fraction of return variability explained by the market.

## 4. Active Portfolio Management and "Alpha"

Active managers seek alpha — a nonmarket return premium — by deviating from passive indexing.

- **Active Portfolio Construction:** Securities are weighted in the active portfolio roughly in proportion to their information ratios.
- **Alpha Transport:** Managers separate alpha search from market exposure, using tracking portfolios to hedge unwanted market risk and isolate the alpha signal.
- **Long–Short Strategies:** Often used to capture alpha while neutralizing market exposure via diversified tracking funds.

## 5. Beta Evolution and Adjustment

Beta tends to drift toward 1.0 over time. Practitioners use forecasting rules (adjusted betas) and additional financial variables to improve beta forecasts.

## 6. Comparison of Risk Measures (Summary)

| Measure | Type of Risk Measured | Application |
|---|---:|---|
| Standard Deviation | Total risk | Measures overall volatility of an asset |
| Beta | Systematic risk | Measures sensitivity to broad market movements |
| Residual SD | Nonsystematic risk | Measures firm-specific volatility |

---

If you want, I can generate a compact comparison table of systematic vs unsystematic risk with the concrete examples from the problem sets.
`;
