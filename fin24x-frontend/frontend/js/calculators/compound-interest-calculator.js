/**
 * Compound Interest Calculator
 */

class CompoundInterestCalculator {
  constructor(container) {
    this.container = container;
    this.principal = 100000;
    this.rate = 8;
    this.time = 5;
    this.compound = 12;
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row">
          ${CalculatorUtils.createSlider('ci-principal', 'Principal Amount', 1000, 10000000, this.principal, 5000, '', '₹')}
          ${CalculatorUtils.createSlider('ci-rate', 'Interest Rate (%)', 1, 20, this.rate, 0.5, '%', '')}
          ${CalculatorUtils.createSlider('ci-time', 'Time Period', 1, 30, this.time, 1, ' yrs', '')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="ci-calculate">
            <i class="fa fa-calculator"></i> Calculate
          </button>
        </div>
        <div class="calc-results" id="ci-results" style="display: none;">
          <h4 class="calc-results-title">Compound Interest Details</h4>
          <div class="calc-results-grid">
            <div class="calc-result-box" style="border-color: #3498db">
              <div class="calc-result-label">Principal</div>
              <div class="calc-result-value" id="ci-principal-result" style="color: #3498db">₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #27ae60">
              <div class="calc-result-label">Interest Earned</div>
              <div class="calc-result-value" id="ci-interest" style="color: #27ae60">₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #9b59b6">
              <div class="calc-result-label">Total Amount</div>
              <div class="calc-result-value" id="ci-total" style="color: #9b59b6">₹0</div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    document.getElementById('ci-principal').addEventListener('input', (e) => {
      this.principal = parseFloat(e.target.value);
      document.getElementById('ci-principal-value').textContent = CalculatorUtils.formatIndianNumber(this.principal);
    });
    document.getElementById('ci-rate').addEventListener('input', (e) => {
      this.rate = parseFloat(e.target.value);
      document.getElementById('ci-rate-value').textContent = this.rate.toFixed(1);
    });
    document.getElementById('ci-time').addEventListener('input', (e) => {
      this.time = parseInt(e.target.value);
      document.getElementById('ci-time-value').textContent = this.time;
    });
    document.getElementById('ci-calculate').addEventListener('click', () => this.calculate());
    ['ci-principal', 'ci-rate', 'ci-time'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
  }

  calculate() {
    // A = P(1 + r/n)^(nt) - Monthly compounding
    const n = 12;
    const total = this.principal * Math.pow(1 + (this.rate / 100) / n, n * this.time);
    const interest = total - this.principal;

    document.getElementById('ci-results').style.display = 'block';
    document.getElementById('ci-principal-result').textContent = CalculatorUtils.formatCurrency(this.principal);
    document.getElementById('ci-interest').textContent = CalculatorUtils.formatCurrency(interest);
    document.getElementById('ci-total').textContent = CalculatorUtils.formatCurrency(total);
  }
}

registerCalculator('compound-interest', CompoundInterestCalculator);

