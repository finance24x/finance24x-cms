/**
 * Daily Calorie Calculator
 * Calculates daily calorie needs based on activity level
 */

class CalorieCalculator {
  constructor(container) {
    this.container = container;
    this.age = 30;
    this.weight = 70;
    this.height = 170;
    this.gender = 'male';
    this.activity = '1.55';
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row">
          ${CalculatorUtils.createSlider('cal-age', 'Your Age', 15, 80, this.age, 1, ' yrs', '')}
          ${CalculatorUtils.createSlider('cal-weight', 'Your Weight', 40, 150, this.weight, 1, ' kg', '')}
          ${CalculatorUtils.createSlider('cal-height', 'Your Height', 140, 210, this.height, 1, ' cm', '')}
        </div>
        <div class="calc-row calc-row-2">
          ${CalculatorUtils.createSelect('cal-gender', 'Gender', [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' }
          ], 'male')}
          ${CalculatorUtils.createSelect('cal-activity', 'Activity Level', [
            { value: '1.2', label: 'Sedentary (little exercise)' },
            { value: '1.375', label: 'Light (1-3 days/week)' },
            { value: '1.55', label: 'Moderate (3-5 days/week)' },
            { value: '1.725', label: 'Active (6-7 days/week)' },
            { value: '1.9', label: 'Very Active (athlete)' }
          ], '1.55')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="cal-calculate">
            <i class="fa fa-calculator"></i> Calculate Calories
          </button>
        </div>
        <div class="calc-results" id="cal-results" style="display: none;">
          <h4 class="calc-results-title">Daily Calorie Needs</h4>
          <div class="calc-results-grid">
            <div class="calc-result-box" style="border-color: #e74c3c">
              <div class="calc-result-label">Weight Loss</div>
              <div class="calc-result-value" id="cal-loss" style="color: #e74c3c">0</div>
              <div class="calc-result-sublabel">-500 cal/day</div>
            </div>
            <div class="calc-result-box" style="border-color: #27ae60">
              <div class="calc-result-label">Maintenance</div>
              <div class="calc-result-value" id="cal-maintain" style="color: #27ae60">0</div>
              <div class="calc-result-sublabel">Stay same weight</div>
            </div>
            <div class="calc-result-box" style="border-color: #3498db">
              <div class="calc-result-label">Weight Gain</div>
              <div class="calc-result-value" id="cal-gain" style="color: #3498db">0</div>
              <div class="calc-result-sublabel">+500 cal/day</div>
            </div>
          </div>
          <div class="calc-results-grid calc-row-2" style="margin-top: 15px;">
            <div class="calc-result-box" style="border-color: #9b59b6">
              <div class="calc-result-label">BMR (Base Metabolic Rate)</div>
              <div class="calc-result-value" id="cal-bmr" style="color: #9b59b6; font-size: 1.1rem;">0 cal/day</div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    ['cal-age', 'cal-weight', 'cal-height'].forEach(id => {
      document.getElementById(id).addEventListener('input', (e) => {
        document.getElementById(`${id}-value`).textContent = e.target.value;
      });
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
    ['cal-gender', 'cal-activity'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
    document.getElementById('cal-calculate').addEventListener('click', () => this.calculate());
  }

  calculate() {
    this.age = parseInt(document.getElementById('cal-age').value);
    this.weight = parseFloat(document.getElementById('cal-weight').value);
    this.height = parseInt(document.getElementById('cal-height').value);
    this.gender = document.getElementById('cal-gender').value;
    this.activity = parseFloat(document.getElementById('cal-activity').value);

    // Mifflin-St Jeor Equation
    let bmr;
    if (this.gender === 'male') {
      bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age + 5;
    } else {
      bmr = 10 * this.weight + 6.25 * this.height - 5 * this.age - 161;
    }

    const maintenance = bmr * this.activity;
    const loss = maintenance - 500;
    const gain = maintenance + 500;

    document.getElementById('cal-results').style.display = 'block';
    document.getElementById('cal-bmr').textContent = `${Math.round(bmr)} cal/day`;
    document.getElementById('cal-maintain').textContent = `${Math.round(maintenance)} cal`;
    document.getElementById('cal-loss').textContent = `${Math.round(loss)} cal`;
    document.getElementById('cal-gain').textContent = `${Math.round(gain)} cal`;
  }
}

registerCalculator('calorie', CalorieCalculator);

