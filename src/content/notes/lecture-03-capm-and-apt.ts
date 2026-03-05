export const lecture03CapmAndAptMarkdown = String.raw`### Detailed Notes: Lecture 3 - CAPM and APT

---

1. **Demand for Shares**

Simple Economy Setup:
- Imagine an economy with one riskless asset and two risky assets.
- Investors allocate their funds between these assets to maximize returns while managing risk.
- The Capital Allocation Line (CAL) represents the risk-return tradeoff for portfolios combining the risk-free asset and risky assets.

Equilibrium:
- In equilibrium, supply equals demand for shares.
- Example: If a company issues 10,000 shares at a price of $36.5, investors will demand exactly 10,000 shares at that price.

---

2. **Capital Asset Pricing Model (CAPM)**

Introduction:
- Developed by William Sharpe (Nobel Prize, 1990), with contributions from Lintner and Mossin.
- CAPM derives the required rate of return for any risky asset.

Assumptions of CAPM:
- Investors cannot affect prices through individual trades.
- All investors plan for one identical holding period.
- Unlimited risk-free borrowing and lending opportunities exist.
- No transaction costs, taxes, or inflation.
- Investors are rational mean-variance optimizers (construct efficient portfolios).
- Investors have homogeneous expectations.
- Assets are infinitely divisible.
- Capital markets are in equilibrium.

The "M" Portfolio:
- Portfolio M is the most attractive portfolio of risky assets.
- It includes all risky assets, weighted by their market capitalizations.
- Investors combine Portfolio M with the risk-free asset to achieve their desired risk-return profile along the Capital Market Line (CML).

Simplified Derivation of CAPM:
- Since company-specific risk can be diversified away, investors are compensated only for systematic risk.
- The risk premium of an asset is proportional to its beta:
	$$ E(R_i) = R_f + \beta_i [E(R_M) - R_f] $$
	Where:
	- $E(R_i)$: Expected return of asset $i$.
	- $R_f$: Risk-free rate.
	- $\beta_i$: Asset’s sensitivity to market risk.
	- $E(R_M)$: Expected return of the market.

Security Market Line (SML):
- The SML plots the relationship between an asset's beta and its expected return.
- The slope of the SML is the market risk premium: $E(R_M)-R_f$.

---

3. **Applications of CAPM**

Portfolio Selection:
- Low-beta securities are suitable for risk-averse investors.
- High-beta securities are suitable for risk-tolerant investors.
- Investors can adjust their portfolios based on market conditions (e.g., low-beta stocks during recessions, high-beta stocks during booms).

Identifying Mispriced Shares:
- Properly Valued: Lies on the SML.
- Undervalued: Lies above the SML (higher return for its risk).
- Overvalued: Lies below the SML (lower return for its risk).

Measuring Portfolio Performance:
- CAPM provides a benchmark for evaluating fund managers.
- Example: If a fund has a beta of 1.7, $R_f=8\%$, and market risk premium = $9\%$, the expected return is:
	$$ E(R_j) = 8\% + 1.7 \times 9\% = 23.3\% $$
	If the fund achieves a return higher than 23.3\%, the manager has added value.

Calculating the Required Rate of Return for Projects:
- CAPM can be used to determine the discount rate for evaluating investment projects.
- Example: If a company’s beta increases due to a new project, the higher beta should be used to calculate the discount rate.

Testing Market Efficiency:
- CAPM provides a benchmark for determining normal returns.
- Any return exceeding the CAPM-predicted return is considered an abnormal return.

---

4. **Technical Problems with CAPM**

Measuring Beta:
- The frequency of data (daily, weekly, monthly) affects beta estimation.
- Different institutions use different methods (e.g., Value Line: 260 weekly observations; Merrill Lynch: 60 monthly observations).

Stability of Beta:
- Beta is not stable over time for individual securities but is more stable for diversified portfolios.

Ex Ante vs. Ex Post Testing:
- CAPM is based on ex ante (expected) returns, but empirical tests use ex post (historical) data.

Benchmark Error:
- The market portfolio in CAPM is theoretical and unobtainable.
- Real-world proxies (e.g., stock indices) do not include all risky assets (e.g., real estate, human capital).

Unrealistic Assumptions:
- Assumptions like no taxes, no transaction costs, and borrowing at the risk-free rate are not realistic.

---

5. **Empirical Evidence on CAPM**

- Early studies (e.g., Black et al., 1972; Fama and MacBeth, 1973) supported CAPM, showing beta influences returns.
- However, post-1965 data shows inconsistencies: high-beta and low-beta portfolios often yield similar returns and the SML slope is flatter than predicted.

---

6. **Arbitrage Pricing Theory (APT)**

Introduction:
- Developed by Stephen Ross (1976).
- Focuses on the absence of arbitrage rather than optimal portfolios.

Arbitrage Opportunity:
- Arbitrage occurs when an investor can construct a costless portfolio that generates profits due to mispricing.
- Example: Short-sell overvalued assets and buy undervalued assets simultaneously.

APT vs. CAPM:
- APT applies to well-diversified portfolios, while CAPM applies to individual stocks.
- APT allows for multiple factors affecting returns, whereas CAPM uses a single factor (market risk).

Multifactor Models:
- APT generalizes to include multiple factors (e.g., GDP growth, inflation, interest rates).
- Example: Expected return = Risk-free rate + Risk premiums for each factor.

---

7. **Fama and French Three-Factor Model**

Improvement on CAPM:
- Adds two factors to the market risk premium:
	- SMB (Small Minus Big): Return difference between small-cap and large-cap stocks.
	- HML (High Minus Low): Return difference between high book-to-market and low book-to-market stocks.

Regression Example:
- Stock returns are regressed on the three factors to estimate sensitivities (betas).

---

8. **CAPM vs. APT**

Strengths of CAPM:
- Simplicity and strong theoretical foundation.
- Applicable to individual stocks.

Strengths of APT:
- Fewer restrictive assumptions.
- Explains more variation in returns through multiple factors.

Weaknesses:
- CAPM relies on unrealistic assumptions and a theoretical market portfolio.
- APT does not specify which factors to use, requiring statistical techniques or ad hoc selection.

---

**Key Takeaways**
- CAPM provides a framework for understanding the relationship between risk and return, but its assumptions and empirical validity are debated.
- APT offers a more flexible, multifactor approach but lacks the theoretical elegance of CAPM.
- Both models have practical applications in portfolio management, performance evaluation, and investment decision-making.
`;
