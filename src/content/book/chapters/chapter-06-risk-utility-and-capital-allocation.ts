export const chapter06RiskUtilityAndCapitalAllocationMarkdown = String.raw`### Student Notes: Chapter 6 - Risk Aversion and Capital Allocation to Risky Assets

---

#### **Introduction**
- This chapter focuses on **risk aversion** and how investors allocate their wealth between **risky assets** and **risk-free assets**.
- Key concepts include:
	- Risk aversion and its impact on investment decisions.
	- The **Capital Allocation Line (CAL)** and its role in portfolio construction.
	- The relationship between risk, return, and utility.

---

#### **Risk Aversion**
- **Definition:** Risk aversion refers to an investor's preference for lower risk when given a choice between investments with the same expected return.
- **Risk Aversion Coefficient (A):**
	- Measures how much an investor dislikes risk.
	- Higher $A$: More risk-averse.
	- Lower $A$: Less risk-averse or risk-neutral.
	- **Risk Lovers:** Investors with negative $A$, who prefer riskier investments.

- **Utility Function:**
	- Formula:  
		$$ U = E(r) - \frac{1}{2}A\sigma^2 $$
		- $U$: Utility (satisfaction from investment).
		- $E(r)$: Expected return.
		- $\sigma^2$: Variance (risk).
		- $A$: Risk aversion coefficient.
	- **Key takeaway:** Investors balance expected return and risk to maximize utility.

---

#### **Certainty Equivalent**
- **Definition:** The guaranteed return an investor would accept instead of taking on a risky investment.
- Formula:  
	$$ CE = E(r) - \frac{1}{2}A\sigma^2 $$
- **Example:**  
	- If $E(r) = 10\%$, $\sigma = 15\%$, and $A = 4$:  
		$$ CE = 0.10 - \frac{1}{2}(4)(0.15^2) = 0.10 - 0.045 = 5.5\% $$
	- The investor would accept a guaranteed return of 5.5% instead of the risky investment.

---

#### **Capital Allocation to Risky Assets**
- **Complete Portfolio:** Combines a risk-free asset (e.g., T-bills) and a risky portfolio.
- **Capital Allocation Line (CAL):**
	- Represents all possible combinations of risk-free and risky assets.
	- Formula for expected return:  
		$$ E(r_c) = r_f + y[E(r_p) - r_f] $$
		- $r_f$: Risk-free rate.
		- $E(r_p)$: Expected return of the risky portfolio.
		- $y$: Proportion of wealth invested in the risky portfolio.
	- Formula for standard deviation:  
		$$ \sigma_c = y \cdot \sigma_p $$
		- $\sigma_p$: Standard deviation of the risky portfolio.

- **Slope of CAL (Sharpe Ratio):**
	- Measures the reward-to-volatility ratio:  
		$$ S = \frac{E(r_p) - r_f}{\sigma_p} $$
	- **Key takeaway:** A steeper CAL indicates a better risk-return tradeoff.

---

#### **Optimal Risky Portfolio**
- **Investor's Choice:** Depends on their risk aversion ($A$).
- **Optimal Allocation ($y^*$):**
	- Formula:  
		$$ y^* = \frac{E(r_p) - r_f}{A \cdot \sigma_p^2} $$
	- **Example:**
		- $E(r_p) = 12\%$, $r_f = 5\%$, $\sigma_p = 20\%$, $A = 4$:  
			$$ y^* = \frac{0.12 - 0.05}{4 \cdot (0.2^2)} = \frac{0.07}{0.16} = 0.4375 $$
		- The investor allocates 43.75% of their wealth to the risky portfolio and the rest to the risk-free asset.

---

#### **Indifference Curves**
- **Definition:** Graphs showing combinations of risk and return that provide the same utility.
- **Key Characteristics:**
	- Upward sloping: Higher risk requires higher return to maintain the same utility.
	- Steeper curves indicate higher risk aversion.
- **Example:**  
	- For $A = 3$ and utility level $U = 0.05$:  
		$$ E(r) = 0.05 + \frac{1}{2}(3)\sigma^2 $$
		- Plot $E(r)$ for different values of $\sigma$ to draw the curve.

---

#### **Passive vs. Active Strategies**
- **Passive Strategy:**
	- Invest in a market index (e.g., S&P 500) and a risk-free asset.
	- Results in the **Capital Market Line (CML)**, which is the CAL for a passive portfolio.
- **Active Strategy:**
	- Actively manage a portfolio to achieve higher returns than the market.
	- Results in a customized CAL based on the active portfolio's Sharpe ratio.

---

#### **Impact of Borrowing**
- **Leverage:** Borrowing to invest more in the risky portfolio.
- **Kinked CAL:**
	- Occurs when the borrowing rate exceeds the lending rate.
	- Reduces the slope of the CAL beyond the investor's own capital.

---

#### **Key Takeaways**
1. **Risk Aversion:** Determines how much risk an investor is willing to take.
2. **Utility Maximization:** Investors choose portfolios that maximize their utility based on risk and return.
3. **Capital Allocation Line:** Shows the tradeoff between risk and return for a combination of risky and risk-free assets.
4. **Optimal Portfolio:** Depends on the investor's risk aversion and the Sharpe ratio of the risky portfolio.
5. **Passive vs. Active:** Passive strategies are simpler but may offer lower returns compared to active strategies.

---

These notes summarize the key concepts from Chapter 6 in a student-friendly format, focusing on understanding the relationships between risk, return, and investor preferences.
`;


