/**
 * BMI Calculator
 * Calculates Body Mass Index
 */

class BMICalculator {
  constructor(container) {
    this.container = container;
    this.weight = 70;
    this.height = 170;
  }

  render() {
    this.container.innerHTML = `
      <div class="calc-form">
        <div class="calc-row calc-row-2">
          ${CalculatorUtils.createSlider('bmi-weight', 'Your Weight', 30, 200, this.weight, 1, ' kg', '')}
          ${CalculatorUtils.createSlider('bmi-height', 'Your Height', 100, 220, this.height, 1, ' cm', '')}
        </div>
        <div style="text-align: center;">
          <button class="calc-btn" id="bmi-calculate">
            <i class="fa fa-calculator"></i> Calculate BMI
          </button>
        </div>
        <div class="calc-results" id="bmi-results" style="display: none;">
          <div class="bmi-result-main">
            <div class="bmi-value-display">
              <span class="bmi-number" id="bmi-value">0</span>
              <span class="bmi-unit">kg/m²</span>
            </div>
            <div class="bmi-category" id="bmi-category">Normal</div>
          </div>
          <div class="bmi-scale">
            <div class="bmi-scale-bar">
              <div class="bmi-scale-segment underweight">Underweight</div>
              <div class="bmi-scale-segment normal">Normal</div>
              <div class="bmi-scale-segment overweight">Overweight</div>
              <div class="bmi-scale-segment obese">Obese</div>
            </div>
            <div class="bmi-indicator" id="bmi-indicator" style="left: 30%;"></div>
          </div>
          <div class="bmi-ranges">
            <div class="bmi-range"><span class="bmi-range-color" style="background: #3498db"></span> Underweight: &lt; 18.5</div>
            <div class="bmi-range"><span class="bmi-range-color" style="background: #27ae60"></span> Normal: 18.5 - 24.9</div>
            <div class="bmi-range"><span class="bmi-range-color" style="background: #f39c12"></span> Overweight: 25 - 29.9</div>
            <div class="bmi-range"><span class="bmi-range-color" style="background: #e74c3c"></span> Obese: ≥ 30</div>
          </div>
        </div>
      </div>
      <style>
        .bmi-result-main {
          text-align: center;
          padding: 30px 20px;
          background: #fff;
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .bmi-value-display {
          margin-bottom: 10px;
        }
        .bmi-number {
          font-size: 3.5rem;
          font-weight: 700;
          color: #27ae60;
        }
        .bmi-unit {
          font-size: 1rem;
          color: #999;
          margin-left: 5px;
        }
        .bmi-category {
          font-size: 1.25rem;
          font-weight: 600;
          color: #27ae60;
        }
        .bmi-scale {
          position: relative;
          margin: 30px 0;
          padding-top: 20px;
        }
        .bmi-scale-bar {
          display: flex;
          height: 30px;
          border-radius: 15px;
          overflow: hidden;
        }
        .bmi-scale-segment {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 600;
          color: #fff;
          text-transform: uppercase;
        }
        .bmi-scale-segment.underweight { background: #3498db; }
        .bmi-scale-segment.normal { background: #27ae60; }
        .bmi-scale-segment.overweight { background: #f39c12; }
        .bmi-scale-segment.obese { background: #e74c3c; }
        .bmi-indicator {
          position: absolute;
          top: 0;
          width: 20px;
          height: 20px;
          background: #1a1a2e;
          transform: translateX(-50%) rotate(45deg);
          border-radius: 3px;
        }
        .bmi-ranges {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          padding: 15px;
          background: #fff;
          border-radius: 8px;
        }
        .bmi-range {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #555;
        }
        .bmi-range-color {
          width: 12px;
          height: 12px;
          border-radius: 3px;
        }
      </style>
    `;

    this.bindEvents();
    this.calculate();
  }

  bindEvents() {
    document.getElementById('bmi-weight').addEventListener('input', (e) => {
      this.weight = parseFloat(e.target.value);
      document.getElementById('bmi-weight-value').textContent = this.weight;
    });

    document.getElementById('bmi-height').addEventListener('input', (e) => {
      this.height = parseFloat(e.target.value);
      document.getElementById('bmi-height-value').textContent = this.height;
    });

    document.getElementById('bmi-calculate').addEventListener('click', () => this.calculate());

    ['bmi-weight', 'bmi-height'].forEach(id => {
      document.getElementById(id).addEventListener('change', () => this.calculate());
    });
  }

  calculate() {
    const bmi = CalculatorUtils.calculateBMI(this.weight, this.height);
    const { category, color } = CalculatorUtils.getBMICategory(bmi);

    document.getElementById('bmi-results').style.display = 'block';
    document.getElementById('bmi-value').textContent = bmi.toFixed(1);
    document.getElementById('bmi-value').style.color = color;
    document.getElementById('bmi-category').textContent = category;
    document.getElementById('bmi-category').style.color = color;

    // Position the indicator (BMI 15-40 range mapped to 0-100%)
    const position = Math.min(Math.max(((bmi - 15) / 25) * 100, 0), 100);
    document.getElementById('bmi-indicator').style.left = `${position}%`;
  }
}

registerCalculator('bmi', BMICalculator);

