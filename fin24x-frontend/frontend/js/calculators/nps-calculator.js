/**
 * NPS Calculator
 * National Pension System Calculator
 */

class NPSCalculator {
  constructor(container) {
    this.container = container;
    this.currentAge = 30;
    this.monthlyContribution = 5000;
    this.expectedReturn = 10;
    this.annuityPercent = 40;
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row">
          ${CalculatorUtils.createSlider('nps-age', 'Current Age', 18, 55, this.currentAge, 1, ' yrs', '')}
          ${CalculatorUtils.createSlider('nps-monthly', 'Monthly Contribution', 500, 50000, this.monthlyContribution, 500, '', '₹')}
          ${CalculatorUtils.createSlider('nps-return', 'Expected Return', 8, 14, this.expectedReturn, 0.5, '%', '')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="nps-calculate">
            <i class="fa fa-calculator"></i> Calculate
          </button>
        </div>
        <div class="calc-results" id="nps-results" style="display: none;">
          <h4 class="calc-results-title">NPS Retirement Benefits</h4>
          <div class="calc-results-grid">
            <div class="calc-result-box" style="border-color: #3498db">
              <div class="calc-result-label">Total Corpus</div>
              <div class="calc-result-value" id="nps-corpus" style="color: #3498db">₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #27ae60">
              <div class="calc-result-label">Lump Sum (60%)</div>
              <div class="calc-result-value" id="nps-lumpsum" style="color: #27ae60">₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #9b59b6">
              <div class="calc-result-label">Est. Monthly Pension</div>
              <div class="calc-result-value" id="nps-pension" style="color: #9b59b6">₹0</div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    document.getElementById('nps-age').addEventListener('input', (e) => {
      this.currentAge = parseInt(e.target.value);
      document.getElementById('nps-age-value').textContent = this.currentAge;
    });
    document.getElementById('nps-monthly').addEventListener('input', (e) => {
      this.monthlyContribution = parseFloat(e.target.value);
      document.getElementById('nps-monthly-value').textContent = CalculatorUtils.formatIndianNumber(this.monthlyContribution);
    });
    document.getElementById('nps-return').addEventListener('input', (e) => {
      this.expectedReturn = parseFloat(e.target.value);
      document.getElementById('nps-return-value').textContent = this.expectedReturn.toFixed(1);
    });
    document.getElementById('nps-calculate').addEventListener('click', () => this.calculate());
    ['nps-age', 'nps-monthly', 'nps-return'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
  }

  calculate() {
    const yearsToRetirement = 60 - this.currentAge;
    const months = yearsToRetirement * 12;
    const monthlyRate = this.expectedReturn / 100 / 12;

    const corpus = CalculatorUtils.sipFutureValue(this.monthlyContribution, monthlyRate, months);
    const lumpSum = corpus * 0.6;
    const annuityCorpus = corpus * 0.4;
    // Assuming 6% annuity rate
    const monthlyPension = (annuityCorpus * 0.06) / 12;

    document.getElementById('nps-results').style.display = 'block';
    document.getElementById('nps-corpus').textContent = CalculatorUtils.formatCurrency(corpus);
    document.getElementById('nps-lumpsum').textContent = CalculatorUtils.formatCurrency(lumpSum);
    document.getElementById('nps-pension').textContent = CalculatorUtils.formatCurrency(monthlyPension);
  }
}

registerCalculator('nps', NPSCalculator);

