export const chapter09CapmMarkdown = String.raw`### Detailed Notes: Chapter 9 - The Capital Asset Pricing Model (CAPM)

---

#### **1. Overview of CAPM**
- **Purpose**: CAPM provides a framework to determine the expected return of an asset based on its systematic risk (beta).
- **Key Idea**: Investors are compensated for taking on systematic risk, not unsystematic risk, as the latter can be diversified away.
- **Formula**:
  $$
  E(R_i) = R_f + \beta_i \cdot [E(R_M) - R_f]
  $$
  Where:
  - $E(R_i)$: Expected return of asset $i$.
  - $R_f$: Risk-free rate.
  - $\beta_i$: Beta of the asset (sensitivity to market risk).
  - $E(R_M)$: Expected return of the market portfolio.
  - $[E(R_M) - R_f]$: Market risk premium.

---

#### **2. Key Concepts in CAPM**
1. **Beta ($\beta$)**:
	- Measures the sensitivity of an asset's returns to the returns of the market portfolio.
	- $\beta > 1$: Asset is more volatile than the market.
	- $\beta < 1$: Asset is less volatile than the market.
	- $\beta = 0$: Asset is uncorrelated with the market (e.g., risk-free asset).

2. **Security Market Line (SML)**:
	- A graphical representation of the CAPM.
	- Plots the relationship between expected return and beta.
	- Slope of the SML = Market risk premium ($E(R_M) - R_f$).
	- Assets above the SML are undervalued (higher return for their risk).
	- Assets below the SML are overvalued (lower return for their risk).

3. **Systematic vs. Unsystematic Risk**:
	- **Systematic Risk**: Market-wide risk that cannot be diversified away (e.g., economic recessions, interest rate changes).
	- **Unsystematic Risk**: Asset-specific risk that can be eliminated through diversification.

4. **Alpha ($\alpha$)**:
	- Measures the deviation of an asset's actual return from its expected return based on CAPM.
	- $\alpha > 0$: Asset outperformed CAPM expectations.
	- $\alpha < 0$: Asset underperformed CAPM expectations.

---

#### **3. Applications of CAPM**
1. **Portfolio Management**:
	- Helps investors construct portfolios with desired risk-return profiles.
	- Example: Combining a risk-free asset with the market portfolio to achieve a specific beta.

2. **Valuation of Securities**:
	- CAPM determines whether a security is fairly priced.
	- Example: If a stock's expected return is higher than CAPM-predicted return, it is undervalued.

3. **Capital Budgeting**:
	- CAPM is used to calculate the discount rate for evaluating investment projects.
	- Example: A project with a beta of 1.8 and market risk premium of 8% would have a required return of:
	  $$
	  E(R) = R_f + \beta \cdot [E(R_M) - R_f] = 8\% + 1.8 \cdot 8\% = 22.4\%
	  $$

4. **Performance Evaluation**:
	- CAPM provides a benchmark for evaluating fund managers.
	- Example: A fund with a beta of 1.5 and market return of 14% should achieve a return of:
	  $$
	  E(R) = R_f + \beta \cdot [E(R_M) - R_f] = 6\% + 1.5 \cdot 8\% = 18\%
	  $$
	  If the fund achieves 20%, its alpha is $20\% - 18\% = 2\%$.

---

#### **4. Problem-Solving with CAPM**
1. **Beta Calculation**:
	- Beta can be calculated using regression analysis:
	  $$
	  \beta = \frac{\text{Covariance (Asset, Market)}}{\text{Variance (Market)}}
	  $$

2. **Expected Return**:
	- Example: A stock with $\beta = 1.2$, $R_f = 5\%$, and $E(R_M) = 12\%$:
	  $$
	  E(R) = 5\% + 1.2 \cdot (12\% - 5\%) = 13.4\%
	  $$

3. **Stock Valuation**:
	- Example: A stock priced at $50, paying a $6 dividend, with $\beta = 1.2$, $R_f = 6\%$, and $E(R_M) = 16\%$:
	  - Expected price at year-end (illustrative):
		 $$
		 E(P) = \frac{D + P_1}{1 + E(R)} \quad\text{(solve for }P_1\text{ given assumptions)}
		 $$

4. **Portfolio Beta**:
	- Portfolio beta is the weighted average of individual asset betas:
	  $$
	  \beta_P = \sum (w_i \cdot \beta_i)
	  $$

---

#### **5. Challenges and Limitations of CAPM**
1. **Assumptions**:
	- CAPM assumes a frictionless market (no taxes, transaction costs, or restrictions on borrowing/lending).
	- Assumes investors have homogeneous expectations and are rational mean-variance optimizers.

2. **Empirical Issues**:
	- Beta is not always stable over time.
	- Real-world data often shows deviations from CAPM predictions (e.g., small-cap and value stocks outperform CAPM expectations).

3. **Market Portfolio**:
	- The theoretical market portfolio includes all risky assets (stocks, bonds, real estate, etc.), but in practice, proxies like stock indices are used.

4. **Zero-Beta CAPM**:
	- In cases where borrowing is restricted, the zero-beta version of CAPM applies:
	  $$
	  E(R_i) = R_{ZB} + \beta_i \cdot [E(R_M) - R_{ZB}]
	  $$
	  Where $R_{ZB}$ is the return on the zero-beta portfolio.

---

#### **6. Problem Examples**
1. **Portfolio Beta**:
	- A portfolio with 75% in the market portfolio ($\beta = 1$) and 25% in T-bills ($\beta = 0$):
	  $$
	  \beta_P = 0.75 \cdot 1 + 0.25 \cdot 0 = 0.75
	  $$

2. **Stock Pricing**:
	- A stock with $\beta = 1.2$, $R_f = 6\%$, $E(R_M) = 14\%$, and current price $50$:
	  - Expected return:
		 $$
		 E(R) = 6\% + 1.2 \cdot (14\% - 6\%) = 15.6\%
		 $$
	  - Expected price at year-end (illustrative):
		 $$
		 P_{1} = \frac{D + P_0 (1 + g)}{1 + E(R)} \quad\text{(model-dependent)}
		 $$

3. **Alpha Calculation**:
	- A stock with $\beta = 1.5$, $R_f = 5\%$, $E(R_M) = 11.5\%$, and forecast return of 13.25%:
	  - Required return:
		 $$
		 E(R) = 5\% + 1.5 \cdot (11.5\% - 5\%) = 14.75\%
		 $$
	  - Alpha:
		 $$
		 \alpha = 13.25\% - 14.75\% = -1.5\%
		 $$

---

#### **7. Key Takeaways**
- CAPM is a foundational model in finance, linking risk and return through beta.
- It provides a benchmark for asset pricing, portfolio management, and performance evaluation.
- Despite its limitations, CAPM remains widely used due to its simplicity and theoretical elegance.
`;
