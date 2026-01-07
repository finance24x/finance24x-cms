/**
 * RD Calculator
 * Recurring Deposit Calculator
 */

class RDCalculator {
  constructor(container) {
    this.container = container;
    this.monthlyDeposit = 5000;
    this.interestRate = 7;
    this.tenure = 5;
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row">
          ${CalculatorUtils.createSlider('rd-monthly', 'Monthly Deposit', 500, 100000, this.monthlyDeposit, 500, '', '₹')}
          ${CalculatorUtils.createSlider('rd-rate', 'Interest Rate (%)', 4, 10, this.interestRate, 0.1, '%', '')}
          ${CalculatorUtils.createSlider('rd-tenure', 'Tenure', 1, 10, this.tenure, 1, ' yrs', '')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="rd-calculate">
            <i class="fa fa-calculator"></i> Calculate
          </button>
        </div>
        <div class="calc-results" id="rd-results" style="display: none;">
          <h4 class="calc-results-title">RD Maturity Details</h4>
          <div class="calc-results-grid">
            <div class="calc-result-box" style="border-color: #3498db">
              <div class="calc-result-label">Total Deposited</div>
              <div class="calc-result-value" id="rd-deposited" style="color: #3498db">₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #27ae60">
              <div class="calc-result-label">Interest Earned</div>
              <div class="calc-result-value" id="rd-interest" style="color: #27ae60">₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #9b59b6">
              <div class="calc-result-label">Maturity Amount</div>
              <div class="calc-result-value" id="rd-maturity" style="color: #9b59b6">₹0</div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    document.getElementById('rd-monthly').addEventListener('input', (e) => {
      this.monthlyDeposit = parseFloat(e.target.value);
      document.getElementById('rd-monthly-value').textContent = CalculatorUtils.formatIndianNumber(this.monthlyDeposit);
    });
    document.getElementById('rd-rate').addEventListener('input', (e) => {
      this.interestRate = parseFloat(e.target.value);
      document.getElementById('rd-rate-value').textContent = this.interestRate.toFixed(1);
    });
    document.getElementById('rd-tenure').addEventListener('input', (e) => {
      this.tenure = parseInt(e.target.value);
      document.getElementById('rd-tenure-value').textContent = this.tenure;
    });
    document.getElementById('rd-calculate').addEventListener('click', () => this.calculate());
    ['rd-monthly', 'rd-rate', 'rd-tenure'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
  }

  calculate() {
    const P = this.monthlyDeposit;
    const r = this.interestRate / 100 / 4; // Quarterly compounding
    const n = this.tenure * 12;
    
    // RD maturity formula with quarterly compounding
    let maturity = 0;
    for (let i = 1; i <= n; i++) {
      maturity += P * Math.pow(1 + r, (n - i + 1) / 3);
    }
    
    const deposited = P * n;
    const interest = maturity - deposited;

    document.getElementById('rd-results').style.display = 'block';
    document.getElementById('rd-deposited').textContent = CalculatorUtils.formatCurrency(deposited);
    document.getElementById('rd-interest').textContent = CalculatorUtils.formatCurrency(interest);
    document.getElementById('rd-maturity').textContent = CalculatorUtils.formatCurrency(maturity);
  }
}

registerCalculator('rd', RDCalculator);

