export const lecture01RiskAndReturnMarkdown = String.raw`### Student Notes: Lecture I - Risk and Return

---

#### **Introduction**
- The lecture focuses on understanding **risk and return** in investments.
- Key topics: how to calculate returns, the relationship between risk and return, and the importance of compounding.

---

#### **Rates of Return**
- **Holding-Period Return (HPR):**
	- Measures how much an investment grows over a specific period.
	- Formula:  
		$$HPR = \frac{\text{Ending Price - Beginning Price + Dividend}}{\text{Beginning Price}}$$
	- Example: If you buy a stock for $100, it grows to $110, and you receive a $5 dividend, the HPR is:  
		$$HPR = \frac{110 - 100 + 5}{100} = 15\%$$
	- **Key takeaway:** HPR combines dividend yield and capital gains yield.

---

#### **Returns Over Multiple Periods**
- **Arithmetic Average:**
	- Simple average of returns over multiple periods.
	- Formula:  
		$$\text{Arithmetic Average} = \frac{\text{Sum of Returns}}{\text{Number of Periods}}$$
	- Example: Returns over 4 years: 20%, 5%, 10%, 15%.  
		$$\text{Arithmetic Average} = \frac{20 + 5 + 10 + 15}{4} = 10\%$$
	- **Key points:**
		- Ignores compounding.
		- Useful for forecasting future returns.
		- Sensitive to outliers.

- **Geometric Average:**
	- Accounts for compounding and gives the true average growth rate.
	- Formula:  
		$$r_g = \left[\prod (1 + r_i)\right]^{1/n} - 1$$
	- Example: Using the same returns:  
		$$r_g = [(1+0.2) \times (1+0.05) \times (1+0.1) \times (1+0.15)]^{1/4} - 1 = 9.58\%$$
	- **Key points:**
		- Smaller than arithmetic average.
		- Known as the *time-weighted average return*.

- **Dollar-Weighted Return:**
	- Accounts for cash inflows and outflows during the investment period.
	- Example: A fund starts with $5M, receives inflows/outflows, and ends with $6.09M. The **internal rate of return (IRR)** is calculated using Excel’s xIRR function, resulting in 4.27%.

---

#### **Compounding and Effective Annual Rate (EAR)**
- **Compounding:** The process of earning interest on both the principal and previously earned interest.
- **Effective Annual Rate (EAR):**
	- Formula:  
		$$r_{eff} = \left(1 + \frac{APR}{n}\right)^n - 1$$
	- Example: APR = 6%, compounded semiannually:  
		$$r_{eff} = (1 + 0.03)^2 - 1 = 6.09\%$$
	- **Key takeaway:** As compounding frequency increases, EAR approaches the continuous compounding rate.

---

#### **Scenario Analysis: Expected Value**
- **Expected Return (E(r)):**
	- Weighted average of possible returns based on probabilities.
	- Formula:  
		$$E(r) = \sum p(s)r(s)$$
	- Example:  
		| State of Economy | Probability | Return |
		|------------------|-------------|--------|
		| Boom             | 0.25        | 30%    |
		| Normal Growth    | 0.50        | 10%    |
		| Recession        | 0.25        | -10%   |
		$$E(r) = (0.25 \cdot 30\%) + (0.5 \cdot 10\%) + (0.25 \cdot -10\%) = 10\%$$

- **Variance and Standard Deviation:**
	- Variance measures the spread of returns around the expected return.  
		$$\sigma^2 = \sum p(s)[r(s) - E(r)]^2$$
	- Standard deviation is the square root of variance, providing a measure of risk in percentage terms.

---

#### **Historical Returns and Risk**
- **Historical Data:**  
	- Equities (1900–2010): 9.4% annual return → $1 grows to $21,706.
	- Bonds: 4.8% annual return → $1 grows to $191.
	- Bills: 3.9% annual return → $1 grows to $74.
	- Inflation: 3.0% annual rate → $1 grows to $26.

---

#### **Risk Aversion**
- **Risk Premium:** The extra return investors demand for taking on risk.
- **Utility Function:**  
	$$U = E(r) - \frac{1}{2}A\sigma^2$$  
	- A = risk aversion coefficient.
	- Higher A → more risk-averse investor.

- **Example Portfolios:**
	| Portfolio | Expected Return | Risk (SD) |
	|-----------|-----------------|-----------|
	| Low Risk  | 7%              | 5%        |
	| Medium Risk | 9%            | 10%       |
	| High Risk | 13%             | 20%       |

---

#### **Capital Allocation Line (CAL)**
- **Mixing Risk-Free and Risky Assets:**
	- Investors can combine a risk-free asset (e.g., T-bills) with a risky portfolio to achieve their desired risk-return tradeoff.
	- Formula for expected return:  
		$$E(r) = y \cdot E(r_p) + (1-y)r_f$$
	- Formula for standard deviation:  
		$$\sigma = y \cdot \sigma_p$$
	- Example: If 50% is invested in a risky portfolio (E(rₚ) = 15%, σₚ = 22%) and 50% in T-bills (r_f = 7%), the portfolio’s return and risk are:  
		$$E(r) = 0.5(15\%) + 0.5(7\%) = 11\%$$  
		$$\sigma = 0.5(22\%) = 11\%$$

- **Passive Investing:**  
	- A strategy where investors replicate a market index (e.g., S&P 500) instead of actively picking stocks.
	- The **Capital Market Line (CML)** represents the CAL for a passive portfolio.

---

#### **Inflation and Real Returns**
- **Real Rate of Return:** Adjusts nominal returns for inflation.  
	- Approximation:  
		$$r \approx R - i$$  
	- Exact formula:  
		$$1 + r = \frac{1+R}{1+i}$$  
		Rearranged:  
		$$r = \frac{R-i}{1+i}$$
	- Example: If nominal return = 10% and inflation = 3%, real return is:  
		$$r = \frac{0.10 - 0.03}{1 + 0.03} = 6.8\%$$

---

#### **Key Takeaways**
1. **Compounding:** EAR > APR as compounding frequency increases.
2. **Risk and Return:** Higher risk demands higher returns (risk premium).
3. **Averages:** Arithmetic average is higher than geometric average; geometric accounts for compounding.
4. **Scenario Analysis:** Expected return and variance quantify risk and return.
5. **Capital Allocation Line:** Balances risk-free and risky assets for optimal portfolios.
6. **Inflation:** Adjust nominal returns to account for inflation for real purchasing power.
`;


