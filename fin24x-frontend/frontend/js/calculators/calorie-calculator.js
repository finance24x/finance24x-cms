/**
 * Daily Calorie Calculator
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
        ${CalculatorUtils.createSlider('cal-age', 'Your Age', 15, 80, this.age, 1, ' years', '')}
        ${CalculatorUtils.createSlider('cal-weight', 'Your Weight', 40, 150, this.weight, 1, ' kg', '')}
        ${CalculatorUtils.createSlider('cal-height', 'Your Height', 140, 210, this.height, 1, ' cm', '')}
        ${CalculatorUtils.createSelect('cal-gender', 'Gender', [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' }
        ], 'male')}
        ${CalculatorUtils.createSelect('cal-activity', 'Activity Level', [
          { value: '1.2', label: 'Sedentary (little or no exercise)' },
          { value: '1.375', label: 'Light (exercise 1-3 days/week)' },
          { value: '1.55', label: 'Moderate (exercise 3-5 days/week)' },
          { value: '1.725', label: 'Active (exercise 6-7 days/week)' },
          { value: '1.9', label: 'Very Active (hard exercise daily)' }
        ], '1.55')}
        
        <div style="text-align: center; margin-top: 10px;">
          <button class="calc-btn" id="cal-calculate">
            <i class="fa fa-calculator"></i> Calculate Calories
          </button>
        </div>

        <div class="calc-results" id="cal-results" style="display: none;">
          <div class="cal-main">
            <div class="cal-value" id="cal-maintain">2,200</div>
            <div class="cal-label">Calories/day to maintain weight</div>
          </div>

          <div class="cal-goals">
            <div class="cal-goal loss">
              <div class="goal-icon">📉</div>
              <div class="goal-title">Weight Loss</div>
              <div class="goal-value" id="cal-loss">1,700 cal</div>
              <div class="goal-desc">-500 cal/day = ~0.5 kg/week</div>
            </div>
            <div class="cal-goal gain">
              <div class="goal-icon">📈</div>
              <div class="goal-title">Weight Gain</div>
              <div class="goal-value" id="cal-gain">2,700 cal</div>
              <div class="goal-desc">+500 cal/day = ~0.5 kg/week</div>
            </div>
          </div>

          <div class="cal-bmr">
            <span>Your BMR (Base Metabolic Rate):</span>
            <strong id="cal-bmr">1,650 cal/day</strong>
          </div>
        </div>
      </div>
      <style>
        .cal-main {
          text-align: center;
          padding: 35px;
          background: linear-gradient(135deg, #e8f7fc, #d4f1f9);
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .cal-value {
          font-size: 3.5rem;
          font-weight: 700;
          color: #14bdee;
          line-height: 1;
        }
        .cal-label {
          margin-top: 10px;
          color: #0a7d9c;
          font-size: 1rem;
        }
        .cal-goals {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }
        .cal-goal {
          padding: 20px;
          border-radius: 10px;
          text-align: center;
        }
        .cal-goal.loss {
          background: #fef3f2;
          border: 1px solid #fee4e2;
        }
        .cal-goal.gain {
          background: #f0fdf4;
          border: 1px solid #dcfce7;
        }
        .goal-icon {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }
        .goal-title {
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 5px;
        }
        .goal-value {
          font-size: 1.4rem;
          font-weight: 700;
        }
        .cal-goal.loss .goal-value { color: #dc2626; }
        .cal-goal.gain .goal-value { color: #16a34a; }
        .goal-desc {
          font-size: 0.8rem;
          color: #888;
          margin-top: 5px;
        }
        .cal-bmr {
          background: #f8f9fa;
          padding: 15px 20px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.95rem;
          color: #555;
        }
        .cal-bmr strong {
          color: #1a1a2e;
        }
      </style>
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

    const bmr = CalculatorUtils.calculateBMR(this.weight, this.height, this.age, this.gender);
    const maintenance = bmr * this.activity;
    const loss = maintenance - 500;
    const gain = maintenance + 500;

    document.getElementById('cal-results').style.display = 'block';
    document.getElementById('cal-maintain').textContent = CalculatorUtils.formatIndianNumber(Math.round(maintenance));
    document.getElementById('cal-loss').textContent = `${CalculatorUtils.formatIndianNumber(Math.round(loss))} cal`;
    document.getElementById('cal-gain').textContent = `${CalculatorUtils.formatIndianNumber(Math.round(gain))} cal`;
    document.getElementById('cal-bmr').textContent = `${CalculatorUtils.formatIndianNumber(Math.round(bmr))} cal/day`;
  }
}

registerCalculator('calorie', CalorieCalculator);
