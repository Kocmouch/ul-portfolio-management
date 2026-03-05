export const lecture02QuantitativeMethodsAndMarkowitzMarkdown = String.raw`### Detailed Notes: Lecture 2 - Portfolio Theory

---

#### **Introduction to Portfolio Theory**
- Portfolio theory, introduced by Harry Markowitz, provides a mathematical framework for constructing portfolios to maximize return for a given level of risk or minimize risk for a given level of return.
- Key concepts include **risk**, **return**, **diversification**, and the **efficient frontier**.

---

### **Quantitative Review: Covariance**
- **Covariance** measures the relationship between two random variables (e.g., bungee jumps and bungee-related accidents).
- **Formula**:

  $$
  \text{Cov}(X, Y) = \frac{\sum (X_i - E(X))(Y_i - E(Y))}{N-1}
  $$

  This expression computes the average product of deviations from each variable's mean (i.e. from \(E(X)\) and \(E(Y)\)). The denominator \(N-1\) corrects for bias when estimating from a sample (degrees of freedom).

- **Interpretation**:
  - Positive covariance: Variables tend to move in the same direction.
  - Negative covariance: Variables tend to move in opposite directions.

- **Example**:
  - Covariance between bungee jumps ($BJ$) and accidents ($BA$) is calculated using the formula above.
  - Result: Positive covariance implies more jumps lead to more accidents.

---

### **Correlation Coefficient**
- **Correlation Coefficient** ($\rho$) standardizes covariance by the product of the variables' standard deviations.
- **Formula**:

  $$
  \rho_{X,Y} = \frac{\text{Cov}(X, Y)}{\sigma_X \sigma_Y}
  $$

  Because each standard deviation scales the covariance, $\rho$ is bounded between -1 and 1. A value close to 1 means a very strong positive linear relationship; close to -1 means a strong negative relationship; near 0 implies little linear association.

- **Example**:
  - For $BJ$ and $BA$:

    $$
    \rho_{BJ,BA} = \frac{4330}{\sqrt{22628000} \times \sqrt{1.3}} = 0.79835
    $$

    - Indicates a strong positive relationship.

---

### **Regression Analysis**
- **Linear Regression** models the linear relationship between a dependent variable (e.g., $BA$ for accidents) and an independent variable (e.g., $BJ$ for jumps).
- **Model equation**:

  $$
  BA_i = a + b \cdot BJ_i + \varepsilon_i
  $$

  where:
  - $a$: intercept (expected value of BA when BJ=0).
  - $b$: slope, indicating the change in $BA$ for a one‑unit change in $BJ$. 
  - $\varepsilon_i$: residual error for observation $i$. 

- **Estimating the parameters** using sample statistics:
  - Slope ($b$):

    $$
    \hat{b} = \frac{\text{Cov}(BA, BJ)}{\sigma_{BJ}^2} = \frac{4330}{2262860} = 0.000191
    $$

  - Intercept ($a$):

    $$
    a = E(BA) - b \cdot E(BJ) = 2.4 - 0.000191 \cdot 13340 = -0.153
    $$

- **Interpretation**:
  - A positive slope $b$ means that as the number of jumps increases, the number of accidents is expected to increase; the slope quantifies how steeply the relationship rises.

---

### **Markowitz Portfolio Theory**
- **Portfolio Return**:

  $$
  E(R_{\text{portfolio}}) = w_1 E(R_1) + w_2 E(R_2)
  $$

  This weighted average shows how the expected return of a two-asset portfolio depends on each asset's expected return and its portfolio weight.
  - $w_1, w_2$: weights of the two assets (must sum to 1 in a complete portfolio).
  - $E(R_1), E(R_2)$: expected returns of the individual assets.

- **Portfolio Risk (Variance)**:

  $$
  \sigma_{\text{portfolio}}^2 = w_1^2 \sigma_1^2 + w_2^2 \sigma_2^2 + 2w_1 w_2 \text{Cov}(R_1, R_2)
  $$

  The variance accounts not only for each asset's own risk but also how the assets co‑move. When assets are uncorrelated, the covariance term drops out.
  - Simplifies to:

    $$
    \sigma_{\text{portfolio}}^2 = w_1^2 \sigma_1^2 + w_2^2 \sigma_2^2 + 2w_1 w_2 \rho_{1,2} \sigma_1 \sigma_2
    $$

  where $\rho_{1,2}$ is the correlation between the asset returns.

- **Efficient Frontier**:
	- Represents the set of optimal portfolios offering the highest return for a given level of risk.
	- Diversification reduces risk, especially when assets are uncorrelated ($\rho = 0$) or negatively correlated ($\rho < 0$).

---

### **Two-Asset Portfolio Example**
- **Assumptions**:
	- Asset 1: $E(R_1) = 10\%,\; \sigma_1^2 = 0.040$
	- Asset 2: $E(R_2) = 20\%,\; \sigma_2^2 = 0.100$
	- Correlation ($\rho_{1,2}$): 0 (uncorrelated).

- **Portfolio Calculations**:
	- Varying weights ($w_1, w_2$) produce different risk–return combinations along the frontier.
	- Example:
		- $w_1 = 0.5, w_2 = 0.5$:
			$$ E(R_p) = 0.5 \cdot 10\% + 0.5 \cdot 20\% = 15\% $$
			This means that the expected portfolio return is simply the weighted average of the two assets' returns.
			$$ \sigma_p = \sqrt{0.5^2 \cdot 0.040 + 0.5^2 \cdot 0.100} = 0.0812 $$
			The portfolio standard deviation is lower than the weighted average of the individual standard deviations because diversification removes some risk when the assets are uncorrelated.

---

### **Multiple Risky Assets**
- **General Case**:
	- Portfolio return:  
		$$ E(R_{\text{portfolio}}) = \sum_{i=1}^{N} w_i E(R_i) $$
	- Portfolio variance:  
		$$ \sigma_{\text{portfolio}}^2 = \sum_{i=1}^{N} \sum_{j=1}^{N} w_i w_j \text{Cov}(R_i, R_j) $$

- **Diversification**:
	- Adding more assets reduces portfolio risk.
	- Most diversification benefits are achieved with 10-15 assets.

---

### **The Risk-Free Asset**
- Combining a risk-free asset with a risky portfolio creates a **Capital Market Line (CML)**:
	- Portfolio return:  
		$$ E(R_{\text{portfolio}}) = vE(R_{\text{risky}}) + (1-v)R_f $$
	- Portfolio risk:  
		$$ \sigma_{\text{portfolio}} = v\sigma_{\text{risky}} $$

- **CML**:
	- Tangent to the efficient frontier.
	- Represents the highest return for a given level of risk.

---

### **Separation Property**
- All investors should hold the same risky portfolio (portfolio $M$), regardless of risk aversion.
- Risk aversion determines the allocation between the risk-free asset and portfolio $M$:
	- Risk-averse investors: More in the risk-free asset.
	- Risk-tolerant investors: More in the risky portfolio.

---

### **Single Index Model**
- Simplifies portfolio analysis by relating individual asset returns to a market index.
	- Formula:  
		$$ R_i = \alpha_i + \beta_i R_M + e_i $$
		- $\alpha_i$: Asset-specific return.
		- $\beta_i$: Sensitivity to market returns.
		- $e_i$: Firm-specific risk.

- **Risk Decomposition**:
	- Total risk:  
		$$ \text{var}(R_i) = \beta_i^2 \sigma_M^2 + \sigma^2(e_i) $$
		- Systematic risk ($\beta_i^2 \sigma_M^2$): Non-diversifiable.
		- Unsystematic risk ($\sigma^2(e_i)$): Diversifiable.

---

### **Diversification: Practical Insights**
- **Solnik (1974)**:
	- Most diversification benefits are achieved with 10-15 assets.
	- International diversification reduces risk further due to lower correlations between national markets.

- **Graphical Insights**:
	- Portfolio risk decreases as the number of assets increases.
	- Systematic risk remains constant, while unsystematic risk diminishes.

---

### **Key Takeaways**
1. **Covariance and Correlation**: Measure relationships between assets.
2. **Markowitz Theory**: Diversification reduces risk; efficient frontier identifies optimal portfolios.
3. **Risk-Free Asset**: Combines with risky portfolios to create the CML.
4. **Separation Property**: Risky portfolio is the same for all; allocation depends on risk aversion.
5. **Single Index Model**: Simplifies risk decomposition into systematic and unsystematic components.
6. **Diversification**: Most benefits achieved with 10-15 assets; international diversification enhances risk reduction.
`;
