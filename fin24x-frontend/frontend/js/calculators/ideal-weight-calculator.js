/**
 * Ideal Weight Calculator
 */

class IdealWeightCalculator {
  constructor(container) {
    this.container = container;
    this.height = 170;
    this.gender = 'male';
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row calc-row-2">
          ${CalculatorUtils.createSlider('iw-height', 'Your Height', 140, 210, this.height, 1, ' cm', '')}
          ${CalculatorUtils.createSelect('iw-gender', 'Gender', [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' }
          ], 'male')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="iw-calculate">
            <i class="fa fa-calculator"></i> Calculate Ideal Weight
          </button>
        </div>
        <div class="calc-results" id="iw-results" style="display: none;">
          <h4 class="calc-results-title">Ideal Weight Range</h4>
          <div class="calc-results-grid calc-row-2">
            <div class="calc-result-box" style="border-color: #27ae60">
              <div class="calc-result-label">Ideal Weight (Robinson)</div>
              <div class="calc-result-value" id="iw-robinson" style="color: #27ae60">0 kg</div>
            </div>
            <div class="calc-result-box" style="border-color: #3498db">
              <div class="calc-result-label">Ideal Weight (Miller)</div>
              <div class="calc-result-value" id="iw-miller" style="color: #3498db">0 kg</div>
            </div>
          </div>
          <div class="calc-results-grid">
            <div class="calc-result-box" style="border-color: #9b59b6">
              <div class="calc-result-label">Healthy BMI Range</div>
              <div class="calc-result-value" id="iw-bmi-range" style="color: #9b59b6; font-size: 1.1rem;">0 - 0 kg</div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    document.getElementById('iw-height').addEventListener('input', (e) => {
      this.height = parseInt(e.target.value);
      document.getElementById('iw-height-value').textContent = this.height;
    });
    document.getElementById('iw-gender').addEventListener('change', (e) => {
      this.gender = e.target.value;
      this.calculate();
    });
    document.getElementById('iw-calculate').addEventListener('click', () => this.calculate());
    document.getElementById('iw-height').addEventListener('change', () => this.calculate());
  }

  calculate() {
    this.height = parseInt(document.getElementById('iw-height').value);
    this.gender = document.getElementById('iw-gender').value;
    
    const heightInches = this.height / 2.54;
    const heightOver5Ft = Math.max(0, heightInches - 60);

    let robinson, miller;
    if (this.gender === 'male') {
      robinson = 52 + 1.9 * heightOver5Ft;
      miller = 56.2 + 1.41 * heightOver5Ft;
    } else {
      robinson = 49 + 1.7 * heightOver5Ft;
      miller = 53.1 + 1.36 * heightOver5Ft;
    }

    // Healthy BMI range (18.5 - 24.9)
    const heightM = this.height / 100;
    const minWeight = 18.5 * heightM * heightM;
    const maxWeight = 24.9 * heightM * heightM;

    document.getElementById('iw-results').style.display = 'block';
    document.getElementById('iw-robinson').textContent = `${robinson.toFixed(1)} kg`;
    document.getElementById('iw-miller').textContent = `${miller.toFixed(1)} kg`;
    document.getElementById('iw-bmi-range').textContent = `${minWeight.toFixed(1)} - ${maxWeight.toFixed(1)} kg`;
  }
}

registerCalculator('ideal-weight', IdealWeightCalculator);

