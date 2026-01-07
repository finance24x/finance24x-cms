/**
 * Walk Calorie Burn Calculator
 * Calculates calories burned while walking
 */

class WalkCalorieCalculator {
  constructor(container) {
    this.container = container;
    this.weight = 70;
    this.distance = 5;
    this.speed = 5;
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row">
          ${CalculatorUtils.createSlider('walk-weight', 'Your Weight', 40, 150, this.weight, 1, ' kg', '')}
          ${CalculatorUtils.createSlider('walk-distance', 'Distance', 0.5, 20, this.distance, 0.5, ' km', '')}
          ${CalculatorUtils.createSlider('walk-speed', 'Speed', 3, 8, this.speed, 0.5, ' km/h', '')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="walk-calculate">
            <i class="fa fa-fire"></i> Calculate Calories
          </button>
        </div>
        <div class="calc-results" id="walk-results" style="display: none;">
          <div class="walk-result-main">
            <div class="walk-calories-display">
              <i class="fa fa-fire walk-fire-icon"></i>
              <span class="walk-calories-number" id="walk-calories">0</span>
              <span class="walk-calories-unit">calories</span>
            </div>
            <p class="walk-summary" id="walk-summary">Walking 5 km at 5 km/h</p>
          </div>
          <div class="calc-results-grid" style="margin-top: 20px;">
            <div class="calc-result-box" style="border-color: #9b59b6">
              <div class="calc-result-label">Duration</div>
              <div class="calc-result-value" id="walk-duration" style="color: #9b59b6">0 min</div>
            </div>
            <div class="calc-result-box" style="border-color: #3498db">
              <div class="calc-result-label">Steps (approx.)</div>
              <div class="calc-result-value" id="walk-steps" style="color: #3498db">0</div>
            </div>
            <div class="calc-result-box" style="border-color: #27ae60">
              <div class="calc-result-label">Fat Burned</div>
              <div class="calc-result-value" id="walk-fat" style="color: #27ae60">0 g</div>
            </div>
          </div>
          <div class="walk-speed-info" id="walk-speed-info">
            <i class="fa fa-info-circle"></i>
            <span>Brisk walking - Great for cardio!</span>
          </div>
        </div>
      </div>
      <style>
        .walk-result-main {
          text-align: center;
          padding: 30px 20px;
          background: linear-gradient(135deg, #ff6b6b20, #ff8e5320);
          border-radius: 12px;
          margin-bottom: 15px;
        }
        .walk-calories-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .walk-fire-icon {
          font-size: 2.5rem;
          color: #ff6b6b;
          animation: flicker 1s infinite alternate;
        }
        @keyframes flicker {
          from { opacity: 0.8; transform: scale(1); }
          to { opacity: 1; transform: scale(1.1); }
        }
        .walk-calories-number {
          font-size: 3rem;
          font-weight: 700;
          color: #ff6b6b;
        }
        .walk-calories-unit {
          font-size: 1.1rem;
          color: #666;
        }
        .walk-summary {
          font-size: 0.95rem;
          color: #666;
          margin: 0;
        }
        .walk-speed-info {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 15px;
          background: #e8f7fc;
          border-radius: 8px;
          font-size: 0.9rem;
          color: #14bdee;
          margin-top: 15px;
        }
        .walk-speed-info i {
          font-size: 1.1rem;
        }
      </style>
    `;

    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    document.getElementById('walk-weight').addEventListener('input', (e) => {
      this.weight = parseFloat(e.target.value);
      document.getElementById('walk-weight-value').textContent = this.weight;
    });

    document.getElementById('walk-distance').addEventListener('input', (e) => {
      this.distance = parseFloat(e.target.value);
      document.getElementById('walk-distance-value').textContent = this.distance.toFixed(1);
    });

    document.getElementById('walk-speed').addEventListener('input', (e) => {
      this.speed = parseFloat(e.target.value);
      document.getElementById('walk-speed-value').textContent = this.speed.toFixed(1);
    });

    document.getElementById('walk-calculate').addEventListener('click', () => this.calculate());

    ['walk-weight', 'walk-distance', 'walk-speed'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
  }

  calculate() {
    const calories = CalculatorUtils.calculateWalkingCalories(this.weight, this.distance, this.speed);
    const durationHours = this.distance / this.speed;
    const durationMinutes = Math.round(durationHours * 60);
    
    // Approximate steps (avg stride ~0.75m)
    const steps = Math.round((this.distance * 1000) / 0.75);
    
    // Fat burned (1g fat = ~7.7 calories)
    const fatBurned = (calories / 7.7).toFixed(1);

    // Speed category
    let speedInfo = 'Slow walking - Light activity';
    if (this.speed >= 6) speedInfo = 'Fast walking - Intense cardio!';
    else if (this.speed >= 5) speedInfo = 'Brisk walking - Great for cardio!';
    else if (this.speed >= 4) speedInfo = 'Moderate walking - Good exercise';

    document.getElementById('walk-results').style.display = 'block';
    document.getElementById('walk-calories').textContent = Math.round(calories);
    document.getElementById('walk-summary').textContent = `Walking ${this.distance} km at ${this.speed} km/h`;
    document.getElementById('walk-duration').textContent = `${durationMinutes} min`;
    document.getElementById('walk-steps').textContent = CalculatorUtils.formatIndianNumber(steps);
    document.getElementById('walk-fat').textContent = `${fatBurned} g`;
    document.getElementById('walk-speed-info').querySelector('span').textContent = speedInfo;
  }
}

registerCalculator('walk-calorie-burn', WalkCalorieCalculator);

