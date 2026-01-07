/**
 * Simple Interest Calculator
 */

class SimpleInterestCalculator {
  constructor(container) {
    this.container = container;
    this.principal = 100000;
    this.rate = 8;
    this.time = 5;
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row">
          ${CalculatorUtils.createSlider('si-principal', 'Principal Amount', 1000, 10000000, this.principal, 5000, '', '₹')}
          ${CalculatorUtils.createSlider('si-rate', 'Interest Rate (%)', 1, 20, this.rate, 0.5, '%', '')}
          ${CalculatorUtils.createSlider('si-time', 'Time Period', 1, 30, this.time, 1, ' yrs', '')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="si-calculate">
            <i class="fa fa-calculator"></i> Calculate
          </button>
        </div>
        <div class="calc-results" id="si-results" style="display: none;">
          <h4 class="calc-results-title">Simple Interest Details</h4>
          <div class="calc-results-grid">
            <div class="calc-result-box" style="border-color: #3498db">
              <div class="calc-result-label">Principal</div>
              <div class="calc-result-value" id="si-principal-result" style="color: #3498db">₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #27ae60">
              <div class="calc-result-label">Interest Earned</div>
              <div class="calc-result-value" id="si-interest" style="color: #27ae60">₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #9b59b6">
              <div class="calc-result-label">Total Amount</div>
              <div class="calc-result-value" id="si-total" style="color: #9b59b6">₹0</div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    document.getElementById('si-principal').addEventListener('input', (e) => {
      this.principal = parseFloat(e.target.value);
      document.getElementById('si-principal-value').textContent = CalculatorUtils.formatIndianNumber(this.principal);
    });
    document.getElementById('si-rate').addEventListener('input', (e) => {
      this.rate = parseFloat(e.target.value);
      document.getElementById('si-rate-value').textContent = this.rate.toFixed(1);
    });
    document.getElementById('si-time').addEventListener('input', (e) => {
      this.time = parseInt(e.target.value);
      document.getElementById('si-time-value').textContent = this.time;
    });
    document.getElementById('si-calculate').addEventListener('click', () => this.calculate());
    ['si-principal', 'si-rate', 'si-time'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
  }

  calculate() {
    // SI = P × R × T / 100
    const interest = (this.principal * this.rate * this.time) / 100;
    const total = this.principal + interest;

    document.getElementById('si-results').style.display = 'block';
    document.getElementById('si-principal-result').textContent = CalculatorUtils.formatCurrency(this.principal);
    document.getElementById('si-interest').textContent = CalculatorUtils.formatCurrency(interest);
    document.getElementById('si-total').textContent = CalculatorUtils.formatCurrency(total);
  }
}

registerCalculator('simple-interest', SimpleInterestCalculator);

