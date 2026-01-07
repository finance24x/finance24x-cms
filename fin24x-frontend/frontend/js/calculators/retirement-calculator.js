/**
 * Retirement Calculator
 */

class RetirementCalculator {
  constructor(container) {
    this.container = container;
    this.currentAge = 30;
    this.retirementAge = 60;
    this.monthlyExpenses = 50000;
    this.inflation = 6;
    this.expectedReturn = 8;
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row">
          ${CalculatorUtils.createSlider('ret-age', 'Current Age', 20, 55, this.currentAge, 1, ' yrs', '')}
          ${CalculatorUtils.createSlider('ret-retire', 'Retirement Age', 45, 70, this.retirementAge, 1, ' yrs', '')}
          ${CalculatorUtils.createSlider('ret-expenses', 'Monthly Expenses', 10000, 500000, this.monthlyExpenses, 5000, '', '₹')}
        </div>
        <div class="calc-row calc-row-2">
          ${CalculatorUtils.createSlider('ret-inflation', 'Inflation Rate', 3, 10, this.inflation, 0.5, '%', '')}
          ${CalculatorUtils.createSlider('ret-return', 'Post-Retire Return', 4, 12, this.expectedReturn, 0.5, '%', '')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="ret-calculate">
            <i class="fa fa-calculator"></i> Calculate
          </button>
        </div>
        <div class="calc-results" id="ret-results" style="display: none;">
          <h4 class="calc-results-title">Retirement Planning</h4>
          <div class="calc-results-grid">
            <div class="calc-result-box" style="border-color: #e74c3c">
              <div class="calc-result-label">Expenses at Retirement</div>
              <div class="calc-result-value" id="ret-future-exp" style="color: #e74c3c">₹0/mo</div>
            </div>
            <div class="calc-result-box" style="border-color: #9b59b6">
              <div class="calc-result-label">Corpus Required</div>
              <div class="calc-result-value" id="ret-corpus" style="color: #9b59b6">₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #27ae60">
              <div class="calc-result-label">Monthly SIP Needed</div>
              <div class="calc-result-value" id="ret-sip" style="color: #27ae60">₹0</div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    const sliders = ['ret-age', 'ret-retire', 'ret-expenses', 'ret-inflation', 'ret-return'];
    sliders.forEach(id => {
      document.getElementById(id).addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        const valueEl = document.getElementById(`${id}-value`);
        if (id === 'ret-expenses') {
          valueEl.textContent = CalculatorUtils.formatIndianNumber(val);
        } else if (id.includes('inflation') || id.includes('return')) {
          valueEl.textContent = val.toFixed(1);
        } else {
          valueEl.textContent = val;
        }
      });
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
    document.getElementById('ret-calculate').addEventListener('click', () => this.calculate());
  }

  calculate() {
    this.currentAge = parseInt(document.getElementById('ret-age').value);
    this.retirementAge = parseInt(document.getElementById('ret-retire').value);
    this.monthlyExpenses = parseFloat(document.getElementById('ret-expenses').value);
    this.inflation = parseFloat(document.getElementById('ret-inflation').value) / 100;
    this.expectedReturn = parseFloat(document.getElementById('ret-return').value) / 100;

    const yearsToRetirement = this.retirementAge - this.currentAge;
    const yearsInRetirement = 25; // Assume 25 years post-retirement

    // Future monthly expenses
    const futureMonthlyExpenses = this.monthlyExpenses * Math.pow(1 + this.inflation, yearsToRetirement);
    const annualExpenses = futureMonthlyExpenses * 12;

    // Corpus needed (using real return = return - inflation)
    const realReturn = this.expectedReturn - this.inflation;
    const corpus = annualExpenses * ((1 - Math.pow(1 + realReturn, -yearsInRetirement)) / realReturn);

    // Monthly SIP needed (assuming 12% pre-retirement returns)
    const preReturnMonthly = 0.12 / 12;
    const months = yearsToRetirement * 12;
    const sipNeeded = corpus / (((Math.pow(1 + preReturnMonthly, months) - 1) / preReturnMonthly) * (1 + preReturnMonthly));

    document.getElementById('ret-results').style.display = 'block';
    document.getElementById('ret-future-exp').textContent = `${CalculatorUtils.formatCurrency(futureMonthlyExpenses)}/mo`;
    document.getElementById('ret-corpus').textContent = CalculatorUtils.formatCurrency(corpus);
    document.getElementById('ret-sip').textContent = CalculatorUtils.formatCurrency(sipNeeded);
  }
}

registerCalculator('retirement', RetirementCalculator);

