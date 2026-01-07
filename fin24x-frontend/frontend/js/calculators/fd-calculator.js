/**
 * FD Calculator
 * Calculates Fixed Deposit maturity amount
 */

class FDCalculator {
  constructor(container) {
    this.container = container;
    this.principal = 100000;
    this.interestRate = 7;
    this.tenure = 5;
    this.compounding = 4; // Quarterly
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row">
          ${CalculatorUtils.createSlider('fd-principal', 'Principal Amount', 10000, 10000000, this.principal, 10000, '', '₹')}
          ${CalculatorUtils.createSlider('fd-rate', 'Interest Rate (%)', 1, 15, this.interestRate, 0.1, '%', '')}
          ${CalculatorUtils.createSlider('fd-tenure', 'Tenure', 1, 10, this.tenure, 1, ' yrs', '')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="fd-calculate">
            <i class="fa fa-calculator"></i> Calculate
          </button>
        </div>
        <div class="calc-results" id="fd-results" style="display: none;">
          <h4 class="calc-results-title">FD Maturity Details</h4>
          <div class="calc-results-grid">
            <div class="calc-result-box" style="border-color: #3498db">
              <div class="calc-result-label">Principal Amount</div>
              <div class="calc-result-value" id="fd-principal-display" style="color: #3498db">₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #27ae60">
              <div class="calc-result-label">Total Interest</div>
              <div class="calc-result-value" id="fd-interest" style="color: #27ae60">₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #14bdee">
              <div class="calc-result-label">Maturity Amount</div>
              <div class="calc-result-value" id="fd-maturity" style="color: #14bdee">₹0</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    document.getElementById('fd-principal').addEventListener('input', (e) => {
      this.principal = parseFloat(e.target.value);
      document.getElementById('fd-principal-value').textContent = CalculatorUtils.formatIndianNumber(this.principal);
    });

    document.getElementById('fd-rate').addEventListener('input', (e) => {
      this.interestRate = parseFloat(e.target.value);
      document.getElementById('fd-rate-value').textContent = this.interestRate.toFixed(1);
    });

    document.getElementById('fd-tenure').addEventListener('input', (e) => {
      this.tenure = parseInt(e.target.value);
      document.getElementById('fd-tenure-value').textContent = this.tenure;
    });

    document.getElementById('fd-calculate').addEventListener('click', () => this.calculate());

    ['fd-principal', 'fd-rate', 'fd-tenure'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
  }

  calculate() {
    const P = this.principal;
    const r = this.interestRate / 100;
    const n = this.compounding;
    const t = this.tenure;

    // Compound Interest formula: A = P(1 + r/n)^(nt)
    const maturityAmount = CalculatorUtils.compoundInterest(P, r, n, t);
    const interest = maturityAmount - P;

    document.getElementById('fd-results').style.display = 'block';
    document.getElementById('fd-principal-display').textContent = CalculatorUtils.formatCurrency(P);
    document.getElementById('fd-interest').textContent = CalculatorUtils.formatCurrency(interest);
    document.getElementById('fd-maturity').textContent = CalculatorUtils.formatCurrency(maturityAmount);
  }
}

registerCalculator('fd', FDCalculator);

