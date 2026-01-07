/**
 * Gratuity Calculator
 */

class GratuityCalculator {
  constructor(container) {
    this.container = container;
    this.basicSalary = 50000;
    this.yearsOfService = 10;
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row calc-row-2">
          ${CalculatorUtils.createSlider('gratuity-salary', 'Last Basic + DA', 10000, 500000, this.basicSalary, 5000, '', '₹')}
          ${CalculatorUtils.createSlider('gratuity-years', 'Years of Service', 5, 40, this.yearsOfService, 1, ' yrs', '')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="gratuity-calculate">
            <i class="fa fa-calculator"></i> Calculate Gratuity
          </button>
        </div>
        <div class="calc-results" id="gratuity-results" style="display: none;">
          <div class="calc-results-grid calc-row-2">
            <div class="calc-result-box" style="border-color: #27ae60">
              <div class="calc-result-label">Gratuity Amount</div>
              <div class="calc-result-value" id="gratuity-amount" style="color: #27ae60">₹0</div>
            </div>
            <div class="calc-result-box" style="border-color: #3498db">
              <div class="calc-result-label">Tax-Free Limit</div>
              <div class="calc-result-value" style="color: #3498db">₹20,00,000</div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    document.getElementById('gratuity-salary').addEventListener('input', (e) => {
      this.basicSalary = parseFloat(e.target.value);
      document.getElementById('gratuity-salary-value').textContent = CalculatorUtils.formatIndianNumber(this.basicSalary);
    });
    document.getElementById('gratuity-years').addEventListener('input', (e) => {
      this.yearsOfService = parseInt(e.target.value);
      document.getElementById('gratuity-years-value').textContent = this.yearsOfService;
    });
    document.getElementById('gratuity-calculate').addEventListener('click', () => this.calculate());
    ['gratuity-salary', 'gratuity-years'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
  }

  calculate() {
    // Gratuity = (Last Drawn Salary × 15 × Years of Service) / 26
    const gratuity = (this.basicSalary * 15 * this.yearsOfService) / 26;
    
    document.getElementById('gratuity-results').style.display = 'block';
    document.getElementById('gratuity-amount').textContent = CalculatorUtils.formatCurrency(gratuity);
  }
}

registerCalculator('gratuity', GratuityCalculator);

