/**
 * Child Height Calculator
 * Predicts adult height based on parents' height
 */

class ChildHeightCalculator {
  constructor(container) {
    this.container = container;
    this.fatherHeight = 175;
    this.motherHeight = 162;
    this.childGender = 'male';
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row">
          ${CalculatorUtils.createSlider('ch-father', "Father's Height", 150, 200, this.fatherHeight, 1, ' cm', '')}
          ${CalculatorUtils.createSlider('ch-mother', "Mother's Height", 140, 190, this.motherHeight, 1, ' cm', '')}
          ${CalculatorUtils.createSelect('ch-gender', "Child's Gender", [
            { value: 'male', label: 'Boy' },
            { value: 'female', label: 'Girl' }
          ], 'male')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="ch-calculate">
            <i class="fa fa-child"></i> Predict Height
          </button>
        </div>
        <div class="calc-results" id="ch-results" style="display: none;">
          <h4 class="calc-results-title">Predicted Adult Height</h4>
          <div class="calc-results-grid calc-row-2">
            <div class="calc-result-box" style="border-color: #27ae60">
              <div class="calc-result-label">Predicted Height</div>
              <div class="calc-result-value" id="ch-predicted" style="color: #27ae60">0 cm</div>
            </div>
            <div class="calc-result-box" style="border-color: #3498db">
              <div class="calc-result-label">Height Range (±10cm)</div>
              <div class="calc-result-value" id="ch-range" style="color: #3498db; font-size: 1.1rem;">0 - 0 cm</div>
            </div>
          </div>
          <p class="calc-note">*Based on Mid-Parental Height Method. Actual height depends on nutrition, health, and genetics.</p>
        </div>
      </div>
      <style>
        .calc-note {
          margin-top: 15px;
          font-size: 0.85rem;
          color: #888;
          text-align: center;
          font-style: italic;
        }
      </style>
    `;
    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    document.getElementById('ch-father').addEventListener('input', (e) => {
      this.fatherHeight = parseInt(e.target.value);
      document.getElementById('ch-father-value').textContent = this.fatherHeight;
    });
    document.getElementById('ch-mother').addEventListener('input', (e) => {
      this.motherHeight = parseInt(e.target.value);
      document.getElementById('ch-mother-value').textContent = this.motherHeight;
    });
    document.getElementById('ch-gender').addEventListener('change', (e) => {
      this.childGender = e.target.value;
      this.calculate();
    });
    document.getElementById('ch-calculate').addEventListener('click', () => this.calculate());
    ['ch-father', 'ch-mother'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
  }

  calculate() {
    this.fatherHeight = parseInt(document.getElementById('ch-father').value);
    this.motherHeight = parseInt(document.getElementById('ch-mother').value);
    this.childGender = document.getElementById('ch-gender').value;

    let predictedHeight;
    if (this.childGender === 'male') {
      // Boys: (Father's height + Mother's height + 13) / 2
      predictedHeight = (this.fatherHeight + this.motherHeight + 13) / 2;
    } else {
      // Girls: (Father's height + Mother's height - 13) / 2
      predictedHeight = (this.fatherHeight + this.motherHeight - 13) / 2;
    }

    document.getElementById('ch-results').style.display = 'block';
    document.getElementById('ch-predicted').textContent = `${predictedHeight.toFixed(1)} cm`;
    document.getElementById('ch-range').textContent = `${(predictedHeight - 10).toFixed(0)} - ${(predictedHeight + 10).toFixed(0)} cm`;
  }
}

registerCalculator('child-height', ChildHeightCalculator);

