/**
 * Calculator Base Utilities
 * Shared functions for all calculators
 */

const CalculatorUtils = {
  /**
   * Format number as Indian currency
   */
  formatCurrency(num, decimals = 0) {
    if (isNaN(num)) return '₹0';
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
    return formatted;
  },

  /**
   * Format number with Indian number system (lakhs, crores)
   */
  formatIndianNumber(num, decimals = 0) {
    if (isNaN(num)) return '0';
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  },

  /**
   * Format number as percentage
   */
  formatPercent(num, decimals = 1) {
    if (isNaN(num)) return '0%';
    return num.toFixed(decimals) + '%';
  },

  /**
   * Parse currency string to number
   */
  parseCurrency(str) {
    if (typeof str === 'number') return str;
    return parseFloat(str.replace(/[₹,]/g, '')) || 0;
  },

  /**
   * Calculate compound interest
   * P = Principal, r = rate (decimal), n = compounding frequency, t = time in years
   */
  compoundInterest(P, r, n, t) {
    return P * Math.pow(1 + r / n, n * t);
  },

  /**
   * Calculate SIP future value
   * P = monthly investment, r = monthly rate, n = total months
   */
  sipFutureValue(P, r, n) {
    if (r === 0) return P * n;
    return P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  },

  /**
   * Calculate EMI
   * P = Principal, r = monthly rate, n = total months
   */
  calculateEMI(P, r, n) {
    if (r === 0) return P / n;
    return P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  },

  /**
   * Calculate BMI
   */
  calculateBMI(weightKg, heightCm) {
    const heightM = heightCm / 100;
    return weightKg / (heightM * heightM);
  },

  /**
   * Get BMI category
   */
  getBMICategory(bmi) {
    if (bmi < 18.5) return { category: 'Underweight', color: '#3498db' };
    if (bmi < 25) return { category: 'Normal', color: '#27ae60' };
    if (bmi < 30) return { category: 'Overweight', color: '#f39c12' };
    return { category: 'Obese', color: '#e74c3c' };
  },

  /**
   * Calculate BMR using Mifflin-St Jeor formula
   */
  calculateBMR(weightKg, heightCm, age, gender) {
    const base = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
    return gender === 'male' ? base + 5 : base - 161;
  },

  /**
   * Calculate calories burned walking
   * MET values: slow (2.0), moderate (3.0), brisk (3.5), fast (4.3), very fast (5.0)
   */
  calculateWalkingCalories(weightKg, distanceKm, speedKmh) {
    let met = 3.0; // default moderate
    if (speedKmh < 3.5) met = 2.0;
    else if (speedKmh < 4.5) met = 3.0;
    else if (speedKmh < 5.5) met = 3.5;
    else if (speedKmh < 6.5) met = 4.3;
    else met = 5.0;
    
    const durationHours = distanceKm / speedKmh;
    return met * weightKg * durationHours;
  },

  /**
   * Create a range slider input with value display (compact version)
   */
  createSlider(id, label, min, max, value, step, unit = '', prefix = '') {
    return `
      <div class="calc-input-group calc-input-compact">
        <div class="calc-input-header">
          <label for="${id}">${label}</label>
          <div class="calc-slider-value-inline">
            <span class="prefix">${prefix}</span><span id="${id}-value">${this.formatIndianNumber(value)}</span><span class="unit">${unit}</span>
          </div>
        </div>
        <input type="range" id="${id}" class="calc-slider" 
               min="${min}" max="${max}" value="${value}" step="${step}">
      </div>
    `;
  },

  /**
   * Create a number input field
   */
  createNumberInput(id, label, value, placeholder = '', unit = '') {
    return `
      <div class="calc-input-group">
        <label for="${id}">${label}</label>
        <div class="calc-input-wrapper">
          <input type="number" id="${id}" class="calc-input" 
                 value="${value}" placeholder="${placeholder}">
          ${unit ? `<span class="calc-input-unit">${unit}</span>` : ''}
        </div>
      </div>
    `;
  },

  /**
   * Create a select dropdown
   */
  createSelect(id, label, options, selected = '') {
    const optionsHtml = options.map(opt => 
      `<option value="${opt.value}" ${opt.value === selected ? 'selected' : ''}>${opt.label}</option>`
    ).join('');
    
    return `
      <div class="calc-input-group">
        <label for="${id}">${label}</label>
        <select id="${id}" class="calc-select">${optionsHtml}</select>
      </div>
    `;
  },

  /**
   * Create radio button group
   */
  createRadioGroup(name, label, options, selected = '') {
    const optionsHtml = options.map(opt => `
      <label class="calc-radio-label">
        <input type="radio" name="${name}" value="${opt.value}" 
               ${opt.value === selected ? 'checked' : ''}>
        <span>${opt.label}</span>
      </label>
    `).join('');
    
    return `
      <div class="calc-input-group">
        <label>${label}</label>
        <div class="calc-radio-group">${optionsHtml}</div>
      </div>
    `;
  },

  /**
   * Create result display box
   */
  createResultBox(label, value, color = '#14bdee', sublabel = '') {
    return `
      <div class="calc-result-box" style="border-color: ${color}">
        <div class="calc-result-label">${label}</div>
        <div class="calc-result-value" style="color: ${color}">${value}</div>
        ${sublabel ? `<div class="calc-result-sublabel">${sublabel}</div>` : ''}
      </div>
    `;
  },

  /**
   * Animate number from 0 to target
   */
  animateValue(elementId, start, end, duration = 500) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startTime = performance.now();
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = start + (end - start) * progress;
      element.textContent = this.formatIndianNumber(Math.round(current));
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  },

  /**
   * Update slider track progress color
   */
  updateSliderProgress(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const val = parseFloat(slider.value);
    const percent = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #14bdee ${percent}%, #e0e0e0 ${percent}%)`;
  },

  /**
   * Initialize all sliders on the page to show progress
   */
  initSliderProgress() {
    document.querySelectorAll('.calc-slider').forEach(slider => {
      this.updateSliderProgress(slider);
      slider.addEventListener('input', () => this.updateSliderProgress(slider));
    });
  }
};

// Calculator registry - maps calculatorType to calculator class
const CalculatorRegistry = {};

/**
 * Register a calculator
 */
function registerCalculator(type, calculatorClass) {
  CalculatorRegistry[type] = calculatorClass;
}

/**
 * Get calculator by type
 */
function getCalculator(type) {
  return CalculatorRegistry[type] || null;
}

