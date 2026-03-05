export const chapter07OptimalRiskyPortfoliosMarkdown = String.raw`### Detailed Notes: Chapter 7 - Optimal Risky Portfolios

---

#### **Key Concepts in Chapter 7**
1. **Efficient Frontier**:
	- The efficient frontier represents the set of portfolios that maximize expected return for a given level of risk or minimize risk for a given level of return.
	- Rational investors will choose portfolios on the efficient frontier because they offer the best risk-return trade-off.

2. **Portfolio Variance and Covariance**:
	- The variance of a portfolio depends on the variances of individual assets and the covariances between them.
	- **Covariance** measures how two assets move together. Assets with low or negative covariance reduce portfolio risk.
	- An asset that is perfectly negatively correlated with a portfolio can act as a **perfect hedge**, potentially reducing portfolio variance to zero.

3. **Separation Principle**:
	- If a risk-free asset is available, all investors will choose the same portfolio of risky assets (the **tangency portfolio**) on the efficient frontier.
	- The allocation between the risk-free asset and the tangency portfolio depends on the investor's risk tolerance.

4. **Diversification**:
	- Diversification reduces **unsystematic risk** (firm-specific risk) by spreading investments across multiple assets.
	- Adding more assets to a portfolio reduces risk at a decreasing rate, with most benefits achieved by holding 10–15 assets.
	- **Systematic risk** (market risk) cannot be eliminated through diversification.

5. **Capital Allocation Line (CAL)**:
	- The CAL represents all possible combinations of a risk-free asset and a risky portfolio.
	- The slope of the CAL is the **reward-to-volatility ratio** (Sharpe ratio), which measures the excess return per unit of risk.

---

#### **Efficient Frontier and Risk-Free Asset**
- **Efficient Frontier of Risky Assets**:
  - Constructed by combining risky assets in different proportions.
  - Portfolio managers use optimization techniques to estimate the weights of assets that maximize return for a given level of risk.

- **Adding a Risk-Free Asset**:
  - When a risk-free asset is introduced, the efficient frontier becomes a straight line (CAL) tangent to the efficient frontier of risky assets.
  - The tangency portfolio is the **optimal risky portfolio**.

---

#### **Portfolio Optimization**
1. **Input List**:
	- Portfolio optimization requires estimates of:
	  - Expected returns of assets.
	  - Standard deviations of returns.
	  - Covariance matrix of asset returns.

2. **Optimization Process**:
	- The optimization program calculates:
	  - Investment proportions for each asset.
	  - Expected return and standard deviation of the portfolio.
	- Different portfolio managers may arrive at different optimal portfolios due to variations in their input assumptions and analysis methods.

3. **Minimum-Variance Portfolio**:
	- The portfolio with the lowest possible risk for a given set of assets.
	- It is part of the efficient frontier but may not always be the optimal risky portfolio.

---

#### **Risk and Return in Portfolios**
1. **Portfolio Return**:
	- The expected return of a portfolio is the weighted average of the expected returns of its constituent assets:
	  $$ E(R_p) = \sum_{i=1}^N w_i E(R_i) $$

2. **Portfolio Variance**:
	- Portfolio variance accounts for the variances of individual assets and their covariances:
	  $$ \sigma_p^2 = \sum_{i=1}^N \sum_{j=1}^N w_i w_j \text{Cov}(R_i, R_j) $$

3. **Diversification and Risk Reduction**:
	- Diversification reduces portfolio risk by combining assets with low or negative correlations.
	- However, adding more assets does not reduce **total dollar risk** if the investment base increases proportionally.

---

#### **Practical Applications**
1. **Risk-Free Rate and Borrowing**:
	- Investors can borrow or lend at the risk-free rate to adjust their risk exposure.
	- Borrowing allows investors to take on more risk by leveraging the tangency portfolio.

2. **Real Estate in Portfolios**:
	- Adding real estate to a portfolio can reduce risk if its returns are uncorrelated with other asset classes.

3. **Gold in Portfolios**:
	- Even if gold has lower returns and higher volatility, it may still be included in a portfolio if it has low or negative correlation with other assets.

---

#### **Problem-Solving Examples**
1. **Minimum-Variance Portfolio**:
	- Example: A portfolio with two risky assets (stocks and bonds) and their correlation of 0.10.
	- Calculate the weights of the assets in the minimum-variance portfolio using optimization formulas.

2. **Optimal Risky Portfolio**:
	- Example: Combine a stock fund (expected return = 20%, standard deviation = 30%) and a bond fund (expected return = 12%, standard deviation = 15%) with a risk-free asset (return = 8%).
	- Use the CAL to determine the optimal portfolio weights and expected return.

3. **Reward-to-Volatility Ratio**:
	- The Sharpe ratio is calculated as:
	  $$ \text{Sharpe Ratio} = \frac{E(R_p) - R_f}{\sigma_p} $$
	- It measures the efficiency of a portfolio in generating excess returns per unit of risk.

---

#### **Key Terms**
- **Efficient Frontier**: The set of portfolios that offer the best risk-return trade-off.
- **Minimum-Variance Portfolio**: The portfolio with the lowest risk for a given set of assets.
- **Capital Allocation Line (CAL)**: The line representing all combinations of a risk-free asset and a risky portfolio.
- **Sharpe Ratio**: A measure of risk-adjusted return.
- **Systematic Risk**: Market-wide risk that cannot be diversified away.
- **Unsystematic Risk**: Firm-specific risk that can be reduced through diversification.
- **Separation Principle**: All investors hold the same risky portfolio, differing only in their allocation to the risk-free asset.

---

#### **Key Takeaways**
1. **Diversification** reduces unsystematic risk but not systematic risk.
2. The **efficient frontier** helps investors identify optimal portfolios.
3. The **tangency portfolio** is the optimal risky portfolio when a risk-free asset is available.
4. The **Sharpe ratio** is a critical metric for evaluating portfolio performance.
5. Portfolio optimization requires accurate estimates of returns, variances, and covariances.
`;
