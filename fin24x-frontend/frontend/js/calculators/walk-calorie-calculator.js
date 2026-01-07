/**
 * Walk Calorie Burn Calculator
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
        ${CalculatorUtils.createSlider('walk-weight', 'Your Weight', 40, 150, this.weight, 1, ' kg', '')}
        ${CalculatorUtils.createSlider('walk-distance', 'Walking Distance', 0.5, 20, this.distance, 0.5, ' km', '')}
        ${CalculatorUtils.createSlider('walk-speed', 'Walking Speed', 3, 8, this.speed, 0.5, ' km/h', '')}
        
        <div style="text-align: center; margin-top: 10px;">
          <button class="calc-btn" id="walk-calculate">
            <i class="fa fa-fire"></i> Calculate Calories Burned
          </button>
        </div>

        <div class="calc-results" id="walk-results" style="display: none;">
          <div class="walk-main">
            <div class="walk-calories" id="walk-calories">250</div>
            <div class="walk-label">Calories Burned</div>
          </div>

          <div class="walk-stats">
            <div class="walk-stat">
              <div class="stat-icon">⏱️</div>
              <div class="stat-value" id="walk-time">60 min</div>
              <div class="stat-label">Duration</div>
            </div>
            <div class="walk-stat">
              <div class="stat-icon">👟</div>
              <div class="stat-value" id="walk-steps">~6,500</div>
              <div class="stat-label">Est. Steps</div>
            </div>
            <div class="walk-stat">
              <div class="stat-icon">🔥</div>
              <div class="stat-value" id="walk-met">3.5</div>
              <div class="stat-label">MET Value</div>
            </div>
          </div>

          <div class="walk-info">
            <h5>Speed Reference</h5>
            <div class="speed-ref">
              <span>🚶 Slow: 3-3.5 km/h</span>
              <span>🚶‍♂️ Moderate: 4-5 km/h</span>
              <span>🏃 Brisk: 5.5-6.5 km/h</span>
              <span>🏃‍♂️ Fast: 7+ km/h</span>
            </div>
          </div>
        </div>
      </div>
      <style>
        .walk-main {
          text-align: center;
          padding: 35px;
          background: linear-gradient(135deg, #fef3e0, #fed7aa);
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .walk-calories {
          font-size: 4rem;
          font-weight: 700;
          color: #ea580c;
          line-height: 1;
        }
        .walk-label {
          margin-top: 10px;
          color: #c2410c;
          font-size: 1.1rem;
          font-weight: 500;
        }
        .walk-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }
        .walk-stat {
          background: #fff;
          border: 1px solid #e8e8e8;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
        }
        .stat-icon {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }
        .stat-value {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1a1a2e;
        }
        .stat-label {
          font-size: 0.85rem;
          color: #888;
          margin-top: 5px;
        }
        .walk-info {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
        }
        .walk-info h5 {
          margin: 0 0 12px;
          font-size: 0.95rem;
          color: #1a1a2e;
        }
        .speed-ref {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          font-size: 0.9rem;
          color: #555;
        }
        @media (max-width: 576px) {
          .walk-stats {
            grid-template-columns: 1fr;
          }
          .speed-ref {
            grid-template-columns: 1fr;
          }
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

  getMET(speed) {
    if (speed < 3.5) return 2.0;
    if (speed < 4.5) return 3.0;
    if (speed < 5.5) return 3.5;
    if (speed < 6.5) return 4.3;
    return 5.0;
  }

  calculate() {
    const met = this.getMET(this.speed);
    const durationHours = this.distance / this.speed;
    const durationMinutes = Math.round(durationHours * 60);
    const calories = Math.round(met * this.weight * durationHours);
    
    // Estimate steps (average stride ~0.75m)
    const steps = Math.round((this.distance * 1000) / 0.75);

    document.getElementById('walk-results').style.display = 'block';
    document.getElementById('walk-calories').textContent = CalculatorUtils.formatIndianNumber(calories);
    document.getElementById('walk-time').textContent = `${durationMinutes} min`;
    document.getElementById('walk-steps').textContent = `~${CalculatorUtils.formatIndianNumber(steps)}`;
    document.getElementById('walk-met').textContent = met.toFixed(1);
  }
}

registerCalculator('walk-calorie', WalkCalorieCalculator);
