/**
 * BMR Calculator
 * Basal Metabolic Rate Calculator
 */

class BMRCalculator {
  constructor(container) {
    this.container = container;
    this.age = 30;
    this.weight = 70;
    this.height = 170;
    this.gender = 'male';
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row">
          ${CalculatorUtils.createSlider('bmr-age', 'Your Age', 15, 80, this.age, 1, ' yrs', '')}
          ${CalculatorUtils.createSlider('bmr-weight', 'Your Weight', 40, 150, this.weight, 1, ' kg', '')}
          ${CalculatorUtils.createSlider('bmr-height', 'Your Height', 140, 210, this.height, 1, ' cm', '')}
        </div>
        <div class="calc-row" style="max-width: 300px;">
          ${CalculatorUtils.createSelect('bmr-gender', 'Gender', [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' }
          ], 'male')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="bmr-calculate">
            <i class="fa fa-calculator"></i> Calculate BMR
          </button>
        </div>
        <div class="calc-results" id="bmr-results" style="display: none;">
          <h4 class="calc-results-title">Basal Metabolic Rate</h4>
          <div class="calc-results-grid">
            <div class="calc-result-box result-large" style="border-color: #27ae60">
              <div class="calc-result-label">Your BMR</div>
              <div class="calc-result-value" id="bmr-value" style="color: #27ae60; font-size: 2rem;">0</div>
              <div class="calc-result-sublabel">calories/day</div>
            </div>
          </div>
          <p class="bmr-info">This is the number of calories your body burns at complete rest - just to maintain vital functions like breathing, circulation, and cell production.</p>
        </div>
      </div>
      <style>
        .bmr-info {
          margin-top: 15px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          font-size: 0.9rem;
          color: #666;
          text-align: center;
        }
        .result-large {
          grid-column: 1 / -1;
          max-width: 300px;
          margin: 0 auto;
        }
      </style>
    `;
    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    ['bmr-age', 'bmr-weight', 'bmr-height'].forEach(id => {
      document.getElementById(id).addEventListener('input', (e) => {
        document.getElementById(`${id}-value`).textContent = e.target.value;
      });
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
    document.getElementById('bmr-gender').addEventListener('change', () => this.calculate());
    document.getElementById('bmr-calculate').addEventListener('click', () => this.calculate());
  }

  calculate() {
    this.age = parseInt(document.getElementById('bmr-age').value);
    this.weight = parseFloat(document.getElementById('bmr-weight').value);
    this.height = parseInt(document.getElementById('bmr-height').value);
    this.gender = document.getElementById('bmr-gender').value;

    // Mifflin-St Jeor Equation
    let bmr;
    if (this.gender === 'male') {
      bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age + 5;
    } else {
      bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age - 161;
    }

    document.getElementById('bmr-results').style.display = 'block';
    document.getElementById('bmr-value').textContent = Math.round(bmr);
  }
}

registerCalculator('bmr', BMRCalculator);

