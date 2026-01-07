/**
 * SIP Calculator
 * Calculates future value of Systematic Investment Plan
 */

class SIPCalculator {
  constructor(container) {
    this.container = container;
    this.monthlyInvestment = 10000;
    this.expectedReturn = 12;
    this.timePeriod = 10;
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row">
          ${CalculatorUtils.createSlider('sip-monthly', 'Monthly Investment', 500, 100000, this.monthlyInvestment, 500, '', '₹')}
          ${CalculatorUtils.createSlider('sip-return', 'Expected Return (%)', 1, 30, this.expectedReturn, 0.5, '%', '')}
          ${CalculatorUtils.createSlider('sip-years', 'Time Period', 1, 40, this.timePeriod, 1, ' yrs', '')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="sip-calculate">
            <i class="fa fa-calculator"></i> Calculate
          </button>
        </div>
        <div class="calc-results" id="sip-results" style="display: none;">
          <h4 class="calc-results-title">Your SIP Returns</h4>
          <div class="calc-results-grid">
            <div class="calc-result-box" style="border-color: #3498db">
              <div class="calc-result-label">Invested Amount</div>
              <div class="calc-result-value" id="sip-invested" style="color: #3498db">₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #27ae60">
              <div class="calc-result-label">Est. Returns</div>
              <div class="calc-result-value" id="sip-returns" style="color: #27ae60">₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #14bdee">
              <div class="calc-result-label">Total Value</div>
              <div class="calc-result-value" id="sip-total" style="color: #14bdee">₹0</div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.calculate(); // Initial calculation
  }

  bindEvents() {
    // Slider events
    document.getElementById('sip-monthly').addEventListener('input', (e) => {
      this.monthlyInvestment = parseFloat(e.target.value);
      document.getElementById('sip-monthly-value').textContent = CalculatorUtils.formatIndianNumber(this.monthlyInvestment);
    });

    document.getElementById('sip-return').addEventListener('input', (e) => {
      this.expectedReturn = parseFloat(e.target.value);
      document.getElementById('sip-return-value').textContent = this.expectedReturn.toFixed(1);
    });

    document.getElementById('sip-years').addEventListener('input', (e) => {
      this.timePeriod = parseInt(e.target.value);
      document.getElementById('sip-years-value').textContent = this.timePeriod;
    });

    // Calculate button
    document.getElementById('sip-calculate').addEventListener('click', () => this.calculate());

    // Auto-calculate on slider change
    ['sip-monthly', 'sip-return', 'sip-years'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
  }

  calculate() {
    const P = this.monthlyInvestment;
    const annualRate = this.expectedReturn / 100;
    const monthlyRate = annualRate / 12;
    const months = this.timePeriod * 12;

    // SIP Future Value formula
    const futureValue = CalculatorUtils.sipFutureValue(P, monthlyRate, months);
    const investedAmount = P * months;
    const returns = futureValue - investedAmount;

    // Show results
    document.getElementById('sip-results').style.display = 'block';
    document.getElementById('sip-invested').textContent = CalculatorUtils.formatCurrency(investedAmount);
    document.getElementById('sip-returns').textContent = CalculatorUtils.formatCurrency(returns);
    document.getElementById('sip-total').textContent = CalculatorUtils.formatCurrency(futureValue);
  }
}

// Register the calculator
registerCalculator('sip', SIPCalculator);

