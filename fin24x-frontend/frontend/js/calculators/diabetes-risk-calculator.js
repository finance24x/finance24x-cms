/**
 * Diabetes Risk Calculator
 * Assesses Type 2 Diabetes risk based on various factors
 */

class DiabetesRiskCalculator {
  constructor(container) {
    this.container = container;
    this.age = 40;
    this.bmi = 25;
    this.waist = 90;
    this.familyHistory = 'no';
    this.highBP = 'no';
    this.physicalActivity = 'yes';
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row">
          ${CalculatorUtils.createSlider('dr-age', 'Your Age', 20, 80, this.age, 1, ' yrs', '')}
          ${CalculatorUtils.createSlider('dr-bmi', 'Your BMI', 15, 45, this.bmi, 0.5, '', '')}
          ${CalculatorUtils.createSlider('dr-waist', 'Waist Size', 60, 150, this.waist, 1, ' cm', '')}
        </div>
        <div class="calc-row">
          ${CalculatorUtils.createSelect('dr-family', 'Family History of Diabetes', [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes (Parents/Siblings)' }
          ], 'no')}
          ${CalculatorUtils.createSelect('dr-bp', 'High Blood Pressure?', [
            { value: 'no', label: 'No' },
            { value: 'yes', label: 'Yes' }
          ], 'no')}
          ${CalculatorUtils.createSelect('dr-activity', 'Regular Exercise?', [
            { value: 'yes', label: 'Yes (30+ min/day)' },
            { value: 'no', label: 'No' }
          ], 'yes')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="dr-calculate">
            <i class="fa fa-heartbeat"></i> Assess Risk
          </button>
        </div>
        <div class="calc-results" id="dr-results" style="display: none;">
          <h4 class="calc-results-title">Diabetes Risk Assessment</h4>
          <div class="dr-risk-display">
            <div class="dr-risk-score" id="dr-score">0</div>
            <div class="dr-risk-level" id="dr-level">Low Risk</div>
            <div class="dr-risk-bar">
              <div class="dr-risk-fill" id="dr-fill"></div>
            </div>
          </div>
          <div class="dr-recommendations" id="dr-recommendations"></div>
        </div>
      </div>
      <style>
        .dr-risk-display {
          text-align: center;
          padding: 25px;
          background: #f8f9fa;
          border-radius: 12px;
          margin-bottom: 15px;
        }
        .dr-risk-score {
          font-size: 3rem;
          font-weight: 700;
          color: #27ae60;
        }
        .dr-risk-level {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .dr-risk-bar {
          height: 10px;
          background: #e0e0e0;
          border-radius: 5px;
          overflow: hidden;
          max-width: 300px;
          margin: 0 auto;
        }
        .dr-risk-fill {
          height: 100%;
          border-radius: 5px;
          transition: width 0.5s, background 0.5s;
        }
        .dr-recommendations {
          padding: 15px;
          background: #e8f7fc;
          border-radius: 8px;
          font-size: 0.95rem;
          color: #333;
        }
        .dr-recommendations ul {
          margin: 10px 0 0 20px;
          padding: 0;
        }
        .dr-recommendations li {
          margin-bottom: 5px;
        }
      </style>
    `;
    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    ['dr-age', 'dr-bmi', 'dr-waist'].forEach(id => {
      document.getElementById(id).addEventListener('input', (e) => {
        document.getElementById(`${id}-value`).textContent = 
          id === 'dr-bmi' ? parseFloat(e.target.value).toFixed(1) : e.target.value;
      });
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
    ['dr-family', 'dr-bp', 'dr-activity'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
    document.getElementById('dr-calculate').addEventListener('click', () => this.calculate());
  }

  calculate() {
    this.age = parseInt(document.getElementById('dr-age').value);
    this.bmi = parseFloat(document.getElementById('dr-bmi').value);
    this.waist = parseInt(document.getElementById('dr-waist').value);
    this.familyHistory = document.getElementById('dr-family').value;
    this.highBP = document.getElementById('dr-bp').value;
    this.physicalActivity = document.getElementById('dr-activity').value;

    let score = 0;

    // Age scoring
    if (this.age >= 45 && this.age < 55) score += 2;
    else if (this.age >= 55 && this.age < 65) score += 3;
    else if (this.age >= 65) score += 4;

    // BMI scoring
    if (this.bmi >= 25 && this.bmi < 30) score += 1;
    else if (this.bmi >= 30 && this.bmi < 35) score += 2;
    else if (this.bmi >= 35) score += 3;

    // Waist scoring (Asian thresholds)
    if (this.waist >= 90 && this.waist < 100) score += 2;
    else if (this.waist >= 100) score += 3;

    // Other factors
    if (this.familyHistory === 'yes') score += 3;
    if (this.highBP === 'yes') score += 2;
    if (this.physicalActivity === 'no') score += 2;

    const maxScore = 17;
    const percentage = (score / maxScore) * 100;

    let level, color, recommendations;
    if (score <= 4) {
      level = 'Low Risk';
      color = '#27ae60';
      recommendations = 'Great! Your risk is low. Continue maintaining a healthy lifestyle.';
    } else if (score <= 8) {
      level = 'Moderate Risk';
      color = '#f39c12';
      recommendations = '<strong>Moderate Risk.</strong> Consider:<ul><li>Regular blood sugar testing</li><li>Maintaining healthy weight</li><li>30 minutes of daily exercise</li></ul>';
    } else if (score <= 12) {
      level = 'High Risk';
      color = '#e67e22';
      recommendations = '<strong>High Risk.</strong> Please:<ul><li>Consult a doctor soon</li><li>Get HbA1c test</li><li>Lifestyle modifications</li><li>Monitor diet closely</li></ul>';
    } else {
      level = 'Very High Risk';
      color = '#e74c3c';
      recommendations = '<strong>Very High Risk.</strong> Immediate action needed:<ul><li>Consult doctor immediately</li><li>Complete diabetes screening</li><li>Dietary intervention</li><li>Regular monitoring</li></ul>';
    }

    document.getElementById('dr-results').style.display = 'block';
    document.getElementById('dr-score').textContent = score;
    document.getElementById('dr-score').style.color = color;
    document.getElementById('dr-level').textContent = level;
    document.getElementById('dr-level').style.color = color;
    document.getElementById('dr-fill').style.width = `${percentage}%`;
    document.getElementById('dr-fill').style.background = color;
    document.getElementById('dr-recommendations').innerHTML = recommendations;
  }
}

registerCalculator('diabetes-risk', DiabetesRiskCalculator);

