/**
 * Diabetes Risk Calculator
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
        ${CalculatorUtils.createSlider('dr-age', 'Your Age', 20, 80, this.age, 1, ' years', '')}
        ${CalculatorUtils.createSlider('dr-bmi', 'Your BMI', 15, 45, this.bmi, 0.5, '', '')}
        ${CalculatorUtils.createSlider('dr-waist', 'Waist Circumference', 60, 150, this.waist, 1, ' cm', '')}
        ${CalculatorUtils.createSelect('dr-family', 'Family History of Diabetes', [
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes (Parents/Siblings)' }
        ], 'no')}
        ${CalculatorUtils.createSelect('dr-bp', 'High Blood Pressure?', [
          { value: 'no', label: 'No' },
          { value: 'yes', label: 'Yes' }
        ], 'no')}
        ${CalculatorUtils.createSelect('dr-activity', 'Regular Physical Activity?', [
          { value: 'yes', label: 'Yes (30+ minutes/day)' },
          { value: 'no', label: 'No' }
        ], 'yes')}
        
        <div style="text-align: center; margin-top: 10px;">
          <button class="calc-btn" id="dr-calculate">
            <i class="fa fa-heartbeat"></i> Assess My Risk
          </button>
        </div>

        <div class="calc-results" id="dr-results" style="display: none;">
          <div class="dr-display" id="dr-display">
            <div class="dr-score" id="dr-score">5</div>
            <div class="dr-level" id="dr-level">Moderate Risk</div>
          </div>
          
          <div class="dr-gauge">
            <div class="dr-gauge-bar">
              <div class="dr-gauge-fill" id="dr-fill"></div>
            </div>
            <div class="dr-gauge-labels">
              <span>Low</span>
              <span>Moderate</span>
              <span>High</span>
              <span>Very High</span>
            </div>
          </div>

          <div class="dr-recommendations" id="dr-recommendations"></div>
        </div>
      </div>
      <style>
        .dr-display {
          text-align: center;
          padding: 35px;
          border-radius: 12px;
          margin-bottom: 20px;
          transition: background 0.3s;
        }
        .dr-score {
          font-size: 4rem;
          font-weight: 700;
          line-height: 1;
        }
        .dr-level {
          font-size: 1.4rem;
          font-weight: 600;
          margin-top: 10px;
        }
        .dr-gauge {
          margin-bottom: 25px;
        }
        .dr-gauge-bar {
          height: 16px;
          background: linear-gradient(to right, #27ae60 0%, #f39c12 33%, #e67e22 66%, #e74c3c 100%);
          border-radius: 8px;
          position: relative;
          overflow: hidden;
        }
        .dr-gauge-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 4px;
          background: #1a1a2e;
          border-radius: 2px;
          transition: left 0.5s;
        }
        .dr-gauge-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          font-size: 0.8rem;
          color: #666;
        }
        .dr-recommendations {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
        }
        .dr-recommendations h5 {
          margin: 0 0 12px;
          font-size: 1rem;
          color: #1a1a2e;
        }
        .dr-recommendations ul {
          margin: 0;
          padding-left: 20px;
        }
        .dr-recommendations li {
          margin-bottom: 8px;
          color: #555;
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

    // Waist scoring
    if (this.waist >= 90 && this.waist < 100) score += 2;
    else if (this.waist >= 100) score += 3;

    // Other factors
    if (this.familyHistory === 'yes') score += 3;
    if (this.highBP === 'yes') score += 2;
    if (this.physicalActivity === 'no') score += 2;

    const maxScore = 17;
    const percentage = (score / maxScore) * 100;

    let level, bgColor, recommendations;
    if (score <= 4) {
      level = 'Low Risk';
      bgColor = '#e8f7ec';
      recommendations = `
        <h5>✅ Great News!</h5>
        <p>Your diabetes risk is currently low. Keep up the healthy lifestyle!</p>
        <ul>
          <li>Continue regular physical activity</li>
          <li>Maintain a balanced diet</li>
          <li>Annual health check-ups recommended</li>
        </ul>
      `;
    } else if (score <= 8) {
      level = 'Moderate Risk';
      bgColor = '#fef3e0';
      recommendations = `
        <h5>⚠️ Moderate Risk - Take Action</h5>
        <ul>
          <li>Get your blood sugar tested regularly</li>
          <li>Aim for 30 minutes of daily exercise</li>
          <li>Reduce sugar and refined carbs intake</li>
          <li>Maintain a healthy weight</li>
        </ul>
      `;
    } else if (score <= 12) {
      level = 'High Risk';
      bgColor = '#fdeae8';
      recommendations = `
        <h5>🔴 High Risk - Consult a Doctor</h5>
        <ul>
          <li>Schedule a doctor's appointment soon</li>
          <li>Get HbA1c test done</li>
          <li>Start lifestyle modifications immediately</li>
          <li>Monitor your diet closely</li>
          <li>Consider a diabetes prevention program</li>
        </ul>
      `;
    } else {
      level = 'Very High Risk';
      bgColor = '#fce8e8';
      recommendations = `
        <h5>🚨 Very High Risk - Immediate Action Needed</h5>
        <ul>
          <li><strong>Consult a doctor immediately</strong></li>
          <li>Get complete diabetes screening</li>
          <li>Start a structured diet plan</li>
          <li>Begin a supervised exercise program</li>
          <li>Regular blood sugar monitoring required</li>
        </ul>
      `;
    }

    const display = document.getElementById('dr-display');
    display.style.background = bgColor;

    document.getElementById('dr-results').style.display = 'block';
    document.getElementById('dr-score').textContent = score;
    document.getElementById('dr-level').textContent = level;
    document.getElementById('dr-fill').style.left = `${percentage}%`;
    document.getElementById('dr-recommendations').innerHTML = recommendations;
  }
}

registerCalculator('diabetes-risk', DiabetesRiskCalculator);
