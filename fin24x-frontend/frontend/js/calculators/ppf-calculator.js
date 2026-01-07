/**
 * PPF Calculator
 * Public Provident Fund Calculator
 */

class PPFCalculator {
  constructor(container) {
    this.container = container;
    this.yearlyInvestment = 150000;
    this.interestRate = 7.1;
    this.tenure = 15;
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row">
          ${CalculatorUtils.createSlider('ppf-yearly', 'Yearly Investment', 500, 150000, this.yearlyInvestment, 500, '', '₹')}
          ${CalculatorUtils.createSlider('ppf-rate', 'Interest Rate (%)', 5, 10, this.interestRate, 0.1, '%', '')}
          ${CalculatorUtils.createSlider('ppf-tenure', 'Tenure', 15, 50, this.tenure, 5, ' yrs', '')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="ppf-calculate">
            <i class="fa fa-calculator"></i> Calculate
          </button>
        </div>
        <div class="calc-results" id="ppf-results" style="display: none;">
          <h4 class="calc-results-title">PPF Maturity Details</h4>
          <div class="calc-results-grid">
            <div class="calc-result-box" style="border-color: #3498db">
              <div class="calc-result-label">Total Investment</div>
              <div class="calc-result-value" id="ppf-invested" style="color: #3498db">₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #27ae60">
              <div class="calc-result-label">Total Interest</div>
              <div class="calc-result-value" id="ppf-interest" style="color: #27ae60">₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #9b59b6">
              <div class="calc-result-label">Maturity Value</div>
              <div class="calc-result-value" id="ppf-maturity" style="color: #9b59b6">₹0</div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    document.getElementById('ppf-yearly').addEventListener('input', (e) => {
      this.yearlyInvestment = parseFloat(e.target.value);
      document.getElementById('ppf-yearly-value').textContent = CalculatorUtils.formatIndianNumber(this.yearlyInvestment);
    });
    document.getElementById('ppf-rate').addEventListener('input', (e) => {
      this.interestRate = parseFloat(e.target.value);
      document.getElementById('ppf-rate-value').textContent = this.interestRate.toFixed(1);
    });
    document.getElementById('ppf-tenure').addEventListener('input', (e) => {
      this.tenure = parseInt(e.target.value);
      document.getElementById('ppf-tenure-value').textContent = this.tenure;
    });
    document.getElementById('ppf-calculate').addEventListener('click', () => this.calculate());
    ['ppf-yearly', 'ppf-rate', 'ppf-tenure'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
  }

  calculate() {
    const P = this.yearlyInvestment;
    const r = this.interestRate / 100;
    const n = this.tenure;
    
    // PPF compound interest (annual)
    let maturity = 0;
    for (let i = 0; i < n; i++) {
      maturity = (maturity + P) * (1 + r);
    }
    const invested = P * n;
    const interest = maturity - invested;

    document.getElementById('ppf-results').style.display = 'block';
    document.getElementById('ppf-invested').textContent = CalculatorUtils.formatCurrency(invested);
    document.getElementById('ppf-interest').textContent = CalculatorUtils.formatCurrency(interest);
    document.getElementById('ppf-maturity').textContent = CalculatorUtils.formatCurrency(maturity);
  }
}

registerCalculator('ppf', PPFCalculator);

