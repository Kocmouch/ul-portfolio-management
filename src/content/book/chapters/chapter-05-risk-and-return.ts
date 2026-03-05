export const chapter05RiskAndReturnMarkdown = String.raw`### Student Notes: Chapter 5 - Learning About Return and Risk from the Historical Record

---

#### **Introduction**
- This chapter focuses on understanding **historical returns and risks** of various asset classes.
- Key concepts include:
  - The relationship between **nominal returns**, **real returns**, and **inflation**.
  - The **risk-return tradeoff** and how it is measured.
  - Using historical data to estimate expected returns and risks for future investments.

---

#### **Nominal vs. Real Returns**
- **Nominal Return ($R$):** The percentage increase in money from an investment, not adjusted for inflation.
- **Real Return ($r$):** The percentage increase in purchasing power, adjusted for inflation.
  - Formula:  
    $$ r = \frac{1 + R}{1 + i} - 1 \approx R - i $$
    - $R$: Nominal return.
    - $i$: Inflation rate.

- **Example:**  
  - If $R = 10\%$ and $i = 3\%$:  
    $$ r = 10\% - 3\% = 7\% $$

- **Fisher Equation:**  
  - Links nominal and real interest rates:  
    $$ 1 + R = (1 + r)(1 + i) $$

---

#### **Historical Returns**
- **Key Asset Classes:**
  - **Stocks:** Historically offer the highest returns but also the highest risk.
  - **Bonds:** Lower returns than stocks but less volatile.
  - **T-Bills:** Considered risk-free, with the lowest returns.
  - **Inflation:** Erodes purchasing power over time.

- **Risk Premium:**  
  - The extra return investors demand for taking on risk.  
    $$ \text{Risk Premium} = E(r_{\text{asset}}) - r_f $$
    - $E(r_{\text{asset}})$: Expected return of the risky asset.
    - $r_f$: Risk-free rate.

- **Historical Data:**  
  - Used to estimate expected returns and risks.
  - Example: Over the 1926–1995 period, large stocks had an average return of ~12%, while T-bills averaged ~4%.

---

#### **Measuring Risk**
- **Variance ($\sigma^2$):** Measures the dispersion of returns around the mean.
  - Formula:  
    $$ \sigma^2 = \sum p_i (r_i - \bar{r})^2 $$
    - $p_i$: Probability of state $i$.
    - $r_i$: Return in state $i$.
    - $\bar{r}$: Mean return.

- **Standard Deviation ($\sigma$):** Square root of variance, representing total risk.
  - Higher $\sigma$: Greater uncertainty in returns.

- **Sharpe Ratio:**  
  - Measures risk-adjusted return:  
    $$ S = \frac{E(r_p) - r_f}{\sigma_p} $$
    - $E(r_p)$: Expected return of the portfolio.
    - $\sigma_p$: Standard deviation of the portfolio.

---

#### **Using Historical Data**
- **Advantages:**
  - Provides a basis for estimating future returns and risks.
  - Helps identify long-term trends and risk premiums.

- **Disadvantages:**
  - Past performance may not predict future results.
  - Historical data may not account for structural changes in the economy or markets.

- **Example Problem:**  
  - Using historical risk premiums (1926–1995), if the risk-free rate is 6%, the expected return on the S&P 500 is:  
    $$ E(r_{\text{S&P 500}}) = 6\% + \text{Risk Premium} $$

---

#### **Holding-Period Return (HPR)**
- **Definition:** The total return earned over a specific period.
- Formula:  
  $$ HPR = \frac{\text{Ending Price} - \text{Beginning Price} + \text{Dividends}}{\text{Beginning Price}} $$

- **Example:**  
  - Beginning price = $100, Ending price = $120, Dividends = $5:  
    $$ HPR = \frac{120 - 100 + 5}{100} = 25\% $$

---

#### **Probability Distributions of Returns**
- **Expected Return ($E(r)$):** Weighted average of possible returns.  
  $$ E(r) = \sum p_i r_i $$
  - $p_i$: Probability of state $i$.
  - $r_i$: Return in state $i$.

- **Example:**  
  - Probabilities: Boom = 0.35, Normal = 0.30, Recession = 0.35.  
  - Returns: Boom = 44.5%, Normal = 14%, Recession = -16.5%.  
    $$ E(r) = (0.35)(44.5) + (0.30)(14) + (0.35)(-16.5) = 14.35\% $$

- **Standard Deviation of Returns:**  
  $$ \sigma = \sqrt{\sum p_i (r_i - \bar{r})^2} $$

---

#### **Risk and Time Horizon**
- **Annualized Standard Deviation:**  
  - For independent returns over $T$ years:  
    $$ \sigma_{\text{annualized}} = \frac{\sigma_{\text{T-year}}}{\sqrt{T}} $$

- **Implications:**
  - Longer investment horizons reduce annualized risk.
  - Example: A 2-year investment has a lower annualized standard deviation than a 1-year investment.

---

#### **Inflation and Real Interest Rates**
- **Impact of Inflation:**
  - Higher inflation reduces real returns.
  - Investors demand higher nominal rates to compensate for inflation.

- **Real Interest Rate Determinants:**
  - Business demand for capital.
  - Household savings behavior.
  - Monetary policy (e.g., Federal Reserve actions).

---

#### **Portfolio Analysis**
- **Diversification:**  
  - Reduces risk by combining assets with low or negative correlations.
  - Example: Combining stocks and bonds in a portfolio.

- **Expected Portfolio Return:**  
  $$ E(r_p) = w_1 E(r_1) + w_2 E(r_2) $$
  - $w_1, w_2$: Weights of assets in the portfolio.
  - $E(r_1), E(r_2)$: Expected returns of assets.

- **Portfolio Variance:**  
  $$ \sigma_p^2 = w_1^2 \sigma_1^2 + w_2^2 \sigma_2^2 + 2w_1w_2\rho_{1,2}\sigma_1\sigma_2 $$
  - $\rho_{1,2}$: Correlation between assets.

---

#### **Key Takeaways**
1. **Historical Data:** Provides insights into risk and return but has limitations.
2. **Risk-Return Tradeoff:** Higher returns come with higher risk.
3. **Inflation:** Erodes real returns, making nominal returns less meaningful without adjustment.
4. **Diversification:** Reduces risk and improves portfolio efficiency.
5. **Sharpe Ratio:** A critical measure of risk-adjusted performance.
`;
