/**
 * Income Tax Calculator
 * Calculates tax under old and new regimes
 */

class IncomeTaxCalculator {
  constructor(container) {
    this.container = container;
    this.income = 1000000;
    this.deductions80C = 150000;
    this.deductions80D = 25000;
    this.otherDeductions = 50000;
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row calc-row-2">
          ${CalculatorUtils.createSlider('tax-income', 'Annual Income', 300000, 10000000, this.income, 50000, '', '₹')}
          ${CalculatorUtils.createSlider('tax-80c', '80C Deductions', 0, 150000, this.deductions80C, 10000, '', '₹')}
        </div>
        <div class="calc-row calc-row-2">
          ${CalculatorUtils.createSlider('tax-80d', '80D (Health)', 0, 100000, this.deductions80D, 5000, '', '₹')}
          ${CalculatorUtils.createSlider('tax-other', 'Other Deductions', 0, 500000, this.otherDeductions, 10000, '', '₹')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="tax-calculate">
            <i class="fa fa-calculator"></i> Compare Tax Regimes
          </button>
        </div>
        <div class="calc-results" id="tax-results" style="display: none;">
          <h4 class="calc-results-title">Tax Comparison</h4>
          <div class="calc-results-grid calc-row-2">
            <div class="calc-result-box" style="border-color: #e74c3c">
              <div class="calc-result-label">Old Regime Tax</div>
              <div class="calc-result-value" id="tax-old" style="color: #e74c3c">₹0</div>
              <div class="calc-result-sublabel" id="tax-old-taxable">Taxable: ₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #27ae60">
              <div class="calc-result-label">New Regime Tax</div>
              <div class="calc-result-value" id="tax-new" style="color: #27ae60">₹0</div>
              <div class="calc-result-sublabel" id="tax-new-taxable">Taxable: ₹0</div>
            </div>
          </div>
          <div class="tax-recommendation" id="tax-recommendation"></div>
        </div>
      </div>
      <style>
        .tax-recommendation {
          margin-top: 15px;
          padding: 15px;
          background: #e8f7fc;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
          color: #14bdee;
        }
      </style>
    `;
    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    ['tax-income', 'tax-80c', 'tax-80d', 'tax-other'].forEach(id => {
      document.getElementById(id).addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        document.getElementById(`${id}-value`).textContent = CalculatorUtils.formatIndianNumber(value);
      });
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
    document.getElementById('tax-calculate').addEventListener('click', () => this.calculate());
  }

  calculateOldRegimeTax(taxableIncome) {
    if (taxableIncome <= 250000) return 0;
    if (taxableIncome <= 500000) return (taxableIncome - 250000) * 0.05;
    if (taxableIncome <= 1000000) return 12500 + (taxableIncome - 500000) * 0.2;
    return 12500 + 100000 + (taxableIncome - 1000000) * 0.3;
  }

  calculateNewRegimeTax(income) {
    const taxableIncome = income - 75000; // Standard deduction
    if (taxableIncome <= 300000) return 0;
    if (taxableIncome <= 700000) return (taxableIncome - 300000) * 0.05;
    if (taxableIncome <= 1000000) return 20000 + (taxableIncome - 700000) * 0.10;
    if (taxableIncome <= 1200000) return 20000 + 30000 + (taxableIncome - 1000000) * 0.15;
    if (taxableIncome <= 1500000) return 20000 + 30000 + 30000 + (taxableIncome - 1200000) * 0.20;
    return 20000 + 30000 + 30000 + 60000 + (taxableIncome - 1500000) * 0.30;
  }

  calculate() {
    this.income = parseFloat(document.getElementById('tax-income').value);
    this.deductions80C = parseFloat(document.getElementById('tax-80c').value);
    this.deductions80D = parseFloat(document.getElementById('tax-80d').value);
    this.otherDeductions = parseFloat(document.getElementById('tax-other').value);

    const totalDeductions = this.deductions80C + this.deductions80D + this.otherDeductions + 50000; // 50k std deduction
    const oldTaxableIncome = Math.max(0, this.income - totalDeductions);
    const newTaxableIncome = Math.max(0, this.income - 75000);

    const oldTax = this.calculateOldRegimeTax(oldTaxableIncome);
    const newTax = this.calculateNewRegimeTax(this.income);

    document.getElementById('tax-results').style.display = 'block';
    document.getElementById('tax-old').textContent = CalculatorUtils.formatCurrency(oldTax);
    document.getElementById('tax-new').textContent = CalculatorUtils.formatCurrency(newTax);
    document.getElementById('tax-old-taxable').textContent = `Taxable: ${CalculatorUtils.formatCurrency(oldTaxableIncome)}`;
    document.getElementById('tax-new-taxable').textContent = `Taxable: ${CalculatorUtils.formatCurrency(newTaxableIncome)}`;

    const savings = Math.abs(oldTax - newTax);
    const recommendation = oldTax < newTax 
      ? `💡 Old Regime saves you ${CalculatorUtils.formatCurrency(savings)}`
      : `💡 New Regime saves you ${CalculatorUtils.formatCurrency(savings)}`;
    document.getElementById('tax-recommendation').textContent = recommendation;
  }
}

registerCalculator('income-tax', IncomeTaxCalculator);

