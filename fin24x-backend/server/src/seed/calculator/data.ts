/**
 * Calculator Seed Data
 * All 17 calculators - 10 Finance + 7 Health
 */

export interface CalculatorFAQ {
  question: string;
  answer: string;
}

export interface CalculatorData {
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  calculatorCategory: 'finance' | 'health';
  calculatorType: string;
  icon: string;
  iconColor: string;
  howToUse: string;
  formulaExplanation: string;
  disclaimer: string;
  metaTitle: string;
  metaDescription: string;
  order: number;
  isFeatured: boolean;
  isPopular: boolean;
  faqs: CalculatorFAQ[];
}

export const calculators: CalculatorData[] = [
  // ============ FINANCE CALCULATORS ============
  {
    title: 'SIP Calculator',
    slug: 'sip-calculator',
    excerpt: 'Calculate your Systematic Investment Plan returns and see how your money grows over time.',
    calculatorCategory: 'finance',
    calculatorType: 'sip',
    icon: 'fa-line-chart',
    iconColor: '#4CAF50',
    order: 1,
    isFeatured: true,
    isPopular: true,
    metaTitle: 'SIP Calculator - Calculate Your Mutual Fund SIP Returns',
    metaDescription: 'Free SIP calculator to estimate your mutual fund returns. Enter monthly investment, expected return rate, and duration to see your wealth growth.',
    description: `A SIP (Systematic Investment Plan) calculator helps you estimate the future value of your regular monthly investments in mutual funds.

SIP is one of the most popular investment methods in India as it promotes disciplined investing and helps in rupee cost averaging.`,
    howToUse: `## How to Use This Calculator

1. **Monthly Investment**: Enter the amount you plan to invest every month
2. **Expected Return Rate**: Enter the expected annual return rate (typically 10-15% for equity funds)
3. **Investment Duration**: Enter the number of years you plan to invest
4. Click **Calculate** to see your estimated returns

The calculator will show you:
- Total amount invested
- Estimated returns
- Total future value of your investment`,
    formulaExplanation: `## SIP Formula

The SIP returns are calculated using the compound interest formula:

**FV = P × [{(1 + r)^n – 1} / r] × (1 + r)**

Where:
- **FV** = Future Value
- **P** = Monthly investment amount
- **r** = Monthly rate of return (annual rate / 12 / 100)
- **n** = Total number of months

### Example
If you invest ₹10,000 per month for 10 years at 12% annual return:
- Total Investment = ₹12,00,000
- Estimated Returns = ₹11,23,391
- Future Value = ₹23,23,391`,
    disclaimer: 'This calculator provides estimates based on assumed returns. Actual returns may vary based on market conditions. Mutual fund investments are subject to market risks.',
    faqs: [
      { question: 'What is a good SIP amount to start with?', answer: 'You can start a SIP with as little as ₹500 per month. However, ₹5,000-₹10,000 monthly is recommended for meaningful wealth creation.' },
      { question: 'Can I change my SIP amount later?', answer: 'Yes, most mutual funds allow you to increase, decrease, or pause your SIP anytime.' },
      { question: 'What returns can I expect from SIP?', answer: 'Historically, equity mutual funds have delivered 12-15% annual returns over 10+ years, though past performance doesn\'t guarantee future results.' }
    ]
  },
  {
    title: 'FD Calculator',
    slug: 'fd-calculator',
    excerpt: 'Calculate your Fixed Deposit maturity amount and interest earned.',
    calculatorCategory: 'finance',
    calculatorType: 'fd',
    icon: 'fa-bank',
    iconColor: '#2196F3',
    order: 2,
    isFeatured: true,
    isPopular: true,
    metaTitle: 'FD Calculator - Fixed Deposit Maturity Calculator',
    metaDescription: 'Calculate your FD maturity amount and interest. Enter principal, interest rate, and tenure to see your returns.',
    description: `A Fixed Deposit (FD) calculator helps you calculate the maturity amount and interest earned on your fixed deposit investment.

FDs are one of the safest investment options offering guaranteed returns at fixed interest rates.`,
    howToUse: `## How to Use This Calculator

1. **Principal Amount**: Enter your deposit amount
2. **Interest Rate**: Enter the annual interest rate offered by your bank
3. **Tenure**: Select the deposit period
4. **Compounding Frequency**: Select quarterly or monthly compounding
5. Click **Calculate** to see your maturity amount`,
    formulaExplanation: `## FD Formula

**A = P × (1 + r/n)^(n×t)**

Where:
- **A** = Maturity Amount
- **P** = Principal (Initial Deposit)
- **r** = Annual Interest Rate (in decimal)
- **n** = Compounding frequency per year
- **t** = Time in years`,
    disclaimer: 'Interest rates are subject to change. Please verify current rates with your bank. TDS may be applicable on interest earned above ₹40,000 per year.',
    faqs: [
      { question: 'Is FD interest taxable?', answer: 'Yes, FD interest is fully taxable as per your income tax slab. TDS of 10% is deducted if interest exceeds ₹40,000 per year.' },
      { question: 'Can I break my FD before maturity?', answer: 'Yes, but you may face a penalty of 0.5-1% reduction in interest rate.' }
    ]
  },
  {
    title: 'PPF Calculator',
    slug: 'ppf-calculator',
    excerpt: 'Calculate your Public Provident Fund maturity amount with tax benefits.',
    calculatorCategory: 'finance',
    calculatorType: 'ppf',
    icon: 'fa-piggy-bank',
    iconColor: '#9C27B0',
    order: 3,
    isFeatured: true,
    isPopular: true,
    metaTitle: 'PPF Calculator - Public Provident Fund Returns Calculator',
    metaDescription: 'Calculate your PPF maturity amount. See how your yearly contributions grow with compound interest and tax benefits.',
    description: `The Public Provident Fund (PPF) is a government-backed savings scheme offering attractive interest rates and tax benefits under Section 80C.

PPF has a lock-in period of 15 years and offers one of the safest investment options with sovereign guarantee.`,
    howToUse: `## How to Use This Calculator

1. **Yearly Investment**: Enter your annual contribution (max ₹1.5 lakh)
2. **Current PPF Rate**: The current rate is 7.1% (as of 2024)
3. **Duration**: 15 years (can be extended in blocks of 5 years)
4. Click **Calculate** to see your maturity amount`,
    formulaExplanation: `## PPF Calculation

PPF uses compound interest calculated annually at the end of each financial year.

Interest is calculated on the lowest balance between the 5th and last day of each month.

**Maturity = Sum of [P × (1 + r)^n] for each year's contribution**`,
    disclaimer: 'PPF interest rate is revised quarterly by the government. Current calculations are based on prevailing rates and may change.',
    faqs: [
      { question: 'What is the current PPF interest rate?', answer: 'The current PPF interest rate is 7.1% per annum (as of 2024), compounded annually.' },
      { question: 'Can I withdraw from PPF before 15 years?', answer: 'Partial withdrawal is allowed from the 7th year. Premature closure is only allowed after 5 years under specific conditions.' },
      { question: 'Is PPF return tax-free?', answer: 'Yes, PPF offers EEE (Exempt-Exempt-Exempt) tax benefit - contributions, interest, and maturity are all tax-free.' }
    ]
  },
  {
    title: 'Income Tax Calculator',
    slug: 'income-tax-calculator',
    excerpt: 'Calculate your income tax liability under old and new tax regimes.',
    calculatorCategory: 'finance',
    calculatorType: 'income-tax',
    icon: 'fa-file-text-o',
    iconColor: '#FF5722',
    order: 4,
    isFeatured: true,
    isPopular: true,
    metaTitle: 'Income Tax Calculator 2024-25 - Old vs New Regime',
    metaDescription: 'Calculate your income tax for FY 2024-25. Compare old and new tax regimes to find which saves more tax for you.',
    description: `Calculate your income tax liability for the current financial year. Compare the old tax regime (with deductions) vs the new tax regime to make an informed choice.

The new tax regime offers lower tax rates but fewer deductions.`,
    howToUse: `## How to Use This Calculator

1. **Annual Income**: Enter your gross annual income
2. **Age Group**: Select your age category
3. **Deductions (Old Regime)**: Enter your eligible deductions under 80C, 80D, etc.
4. Click **Calculate** to compare both regimes`,
    formulaExplanation: `## Tax Slabs FY 2024-25

### New Tax Regime
| Income | Tax Rate |
|--------|----------|
| Up to ₹3,00,000 | Nil |
| ₹3,00,001 - ₹6,00,000 | 5% |
| ₹6,00,001 - ₹9,00,000 | 10% |
| ₹9,00,001 - ₹12,00,000 | 15% |
| ₹12,00,001 - ₹15,00,000 | 20% |
| Above ₹15,00,000 | 30% |

Standard deduction of ₹50,000 is allowed in the new regime.`,
    disclaimer: 'This is for estimation purposes only. Consult a tax professional for accurate tax planning. Rates are subject to change as per government announcements.',
    faqs: [
      { question: 'Which tax regime is better for me?', answer: 'If your deductions exceed ₹3.75 lakh, the old regime is usually better. Otherwise, the new regime with lower rates may save more tax.' },
      { question: 'Can I switch between regimes?', answer: 'Salaried individuals can switch between regimes each year. Business owners can only switch once.' }
    ]
  },
  {
    title: 'NPS Calculator',
    slug: 'nps-calculator',
    excerpt: 'Calculate your National Pension System retirement corpus and monthly pension.',
    calculatorCategory: 'finance',
    calculatorType: 'nps',
    icon: 'fa-umbrella',
    iconColor: '#00BCD4',
    order: 5,
    isFeatured: false,
    isPopular: true,
    metaTitle: 'NPS Calculator - National Pension Scheme Returns Calculator',
    metaDescription: 'Calculate your NPS retirement corpus and estimated monthly pension. Plan your retirement with our free NPS calculator.',
    description: `The National Pension System (NPS) is a government-sponsored pension scheme for retirement planning. It offers market-linked returns and tax benefits up to ₹2 lakh under Sections 80CCD(1) and 80CCD(1B).`,
    howToUse: `## How to Use This Calculator

1. **Current Age**: Enter your current age
2. **Monthly Contribution**: Enter your monthly NPS contribution
3. **Expected Return**: Select expected return rate (typically 9-12%)
4. **Annuity %**: Percentage of corpus for buying annuity (min 40%)
5. Click **Calculate** to see your retirement corpus`,
    formulaExplanation: `## NPS Calculation

NPS corpus is calculated using compound interest formula until retirement age (60).

At maturity:
- 60% of corpus can be withdrawn tax-free
- 40% must be used to buy an annuity for monthly pension`,
    disclaimer: 'NPS returns are market-linked and not guaranteed. Actual returns depend on the asset allocation and market performance.',
    faqs: [
      { question: 'What is the tax benefit of NPS?', answer: 'You can claim up to ₹1.5 lakh under 80CCD(1) and additional ₹50,000 under 80CCD(1B), totaling ₹2 lakh deduction.' },
      { question: 'Can I withdraw NPS before 60?', answer: 'Partial withdrawal (up to 25%) is allowed after 3 years for specific purposes like education, marriage, or medical treatment.' }
    ]
  },
  {
    title: 'Gratuity Calculator',
    slug: 'gratuity-calculator',
    excerpt: 'Calculate your gratuity amount based on your last drawn salary and years of service.',
    calculatorCategory: 'finance',
    calculatorType: 'gratuity',
    icon: 'fa-gift',
    iconColor: '#E91E63',
    order: 6,
    isFeatured: false,
    isPopular: false,
    metaTitle: 'Gratuity Calculator - Calculate Your Gratuity Amount',
    metaDescription: 'Calculate gratuity amount based on your salary and service years. Know your entitled gratuity as per the Payment of Gratuity Act.',
    description: `Gratuity is a lump sum amount paid by an employer to an employee for their service of 5 or more years. It is governed by the Payment of Gratuity Act, 1972.`,
    howToUse: `## How to Use This Calculator

1. **Last Drawn Salary**: Enter your basic salary + DA
2. **Years of Service**: Enter completed years of service
3. Click **Calculate** to see your gratuity amount`,
    formulaExplanation: `## Gratuity Formula

**Gratuity = (Last Drawn Salary × 15 × Years of Service) / 26**

Where:
- Last Drawn Salary = Basic + Dearness Allowance
- 15 = Number of days considered per year
- 26 = Working days in a month`,
    disclaimer: 'Gratuity calculation may vary for government employees. The maximum tax-free gratuity is ₹20 lakh as per current rules.',
    faqs: [
      { question: 'Is gratuity taxable?', answer: 'Gratuity up to ₹20 lakh is tax-free for private employees. For government employees, entire gratuity is tax-exempt.' },
      { question: 'What is the minimum service required?', answer: 'You need to complete at least 5 years of continuous service to be eligible for gratuity.' }
    ]
  },
  {
    title: 'RD Calculator',
    slug: 'rd-calculator',
    excerpt: 'Calculate your Recurring Deposit maturity amount and interest earned.',
    calculatorCategory: 'finance',
    calculatorType: 'rd',
    icon: 'fa-calendar-plus-o',
    iconColor: '#795548',
    order: 7,
    isFeatured: false,
    isPopular: false,
    metaTitle: 'RD Calculator - Recurring Deposit Maturity Calculator',
    metaDescription: 'Calculate RD maturity amount and interest. Enter monthly deposit, interest rate, and tenure to see your returns.',
    description: `A Recurring Deposit (RD) is a savings scheme where you deposit a fixed amount every month for a specified tenure. It helps build disciplined savings habits with guaranteed returns.`,
    howToUse: `## How to Use This Calculator

1. **Monthly Deposit**: Enter the amount you'll deposit each month
2. **Interest Rate**: Enter the annual interest rate
3. **Tenure**: Select the deposit period in months/years
4. Click **Calculate** to see maturity amount`,
    formulaExplanation: `## RD Formula

**M = R × [(1 + r/n)^(n×t) - 1] / (1 - (1 + r/n)^(-1/3))**

A simplified approach uses quarterly compounding where each monthly installment earns interest for its remaining tenure.`,
    disclaimer: 'Interest rates vary by bank and are subject to change. TDS is applicable on interest earned above the threshold.',
    faqs: [
      { question: 'What is the minimum RD amount?', answer: 'Most banks allow RD starting from ₹100 per month. Post office RD starts from ₹10 per month.' },
      { question: 'Can I withdraw RD before maturity?', answer: 'Yes, but premature withdrawal may attract penalty and reduced interest rate.' }
    ]
  },
  {
    title: 'Retirement Calculator',
    slug: 'retirement-calculator',
    excerpt: 'Plan your retirement by calculating the corpus needed to maintain your lifestyle.',
    calculatorCategory: 'finance',
    calculatorType: 'retirement',
    icon: 'fa-hourglass-end',
    iconColor: '#607D8B',
    order: 8,
    isFeatured: true,
    isPopular: false,
    metaTitle: 'Retirement Calculator - How Much Do You Need to Retire?',
    metaDescription: 'Calculate how much you need to save for retirement. Factor in inflation, expenses, and life expectancy for accurate planning.',
    description: `Plan your retirement by estimating the corpus you need to maintain your current lifestyle. This calculator factors in inflation, life expectancy, and your current savings.`,
    howToUse: `## How to Use This Calculator

1. **Current Age**: Enter your present age
2. **Retirement Age**: When do you plan to retire?
3. **Monthly Expenses**: Your current monthly expenses
4. **Expected Inflation**: Typically 6-7% for India
5. **Life Expectancy**: How long you expect to live post-retirement
6. Click **Calculate** to see required corpus`,
    formulaExplanation: `## Retirement Corpus Calculation

1. **Expenses at Retirement** = Current Expenses × (1 + inflation)^years_to_retire
2. **Corpus Needed** = Annual Expenses × [(1 - (1 + r)^(-n)) / r]

Where r = real return rate (return - inflation) and n = years in retirement`,
    disclaimer: 'This is an estimate. Actual requirements may vary based on lifestyle changes, medical expenses, and economic conditions.',
    faqs: [
      { question: 'How much should I save for retirement?', answer: 'A common rule is to save 20-25 times your annual expenses. Start early to benefit from compounding.' },
      { question: 'What is the 4% withdrawal rule?', answer: 'It suggests you can withdraw 4% of your retirement corpus annually without depleting it for 30+ years.' }
    ]
  },
  {
    title: 'Compound Interest Calculator',
    slug: 'compound-interest-calculator',
    excerpt: 'Calculate compound interest and see the power of compounding over time.',
    calculatorCategory: 'finance',
    calculatorType: 'compound-interest',
    icon: 'fa-percent',
    iconColor: '#3F51B5',
    order: 9,
    isFeatured: false,
    isPopular: false,
    metaTitle: 'Compound Interest Calculator - Calculate Compound Interest',
    metaDescription: 'Free compound interest calculator. See how your money grows with the power of compounding. Calculate daily, monthly, quarterly, or yearly.',
    description: `Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods. It's the "interest on interest" effect.`,
    howToUse: `## How to Use This Calculator

1. **Principal Amount**: Enter your initial investment
2. **Interest Rate**: Annual interest rate
3. **Time Period**: Duration in years
4. **Compounding Frequency**: Daily, Monthly, Quarterly, or Yearly
5. Click **Calculate** to see total amount`,
    formulaExplanation: `## Compound Interest Formula

**A = P × (1 + r/n)^(n×t)**

Where:
- **A** = Final amount
- **P** = Principal
- **r** = Annual interest rate (decimal)
- **n** = Compounding frequency per year
- **t** = Time in years

**Compound Interest = A - P**`,
    disclaimer: 'This calculator shows mathematical results. Actual investment returns may vary based on market conditions and fees.',
    faqs: [
      { question: 'What is the difference between simple and compound interest?', answer: 'Simple interest is calculated only on principal. Compound interest is calculated on principal plus accumulated interest.' },
      { question: 'How often should interest be compounded?', answer: 'More frequent compounding (daily > monthly > quarterly > yearly) results in higher returns.' }
    ]
  },
  {
    title: 'Simple Interest Calculator',
    slug: 'simple-interest-calculator',
    excerpt: 'Calculate simple interest on your principal amount.',
    calculatorCategory: 'finance',
    calculatorType: 'simple-interest',
    icon: 'fa-calculator',
    iconColor: '#9E9E9E',
    order: 10,
    isFeatured: false,
    isPopular: false,
    metaTitle: 'Simple Interest Calculator - Calculate SI Easily',
    metaDescription: 'Calculate simple interest on your investment or loan. Enter principal, rate, and time to get instant results.',
    description: `Simple Interest (SI) is calculated only on the principal amount throughout the loan or investment period. It's straightforward and commonly used for short-term loans.`,
    howToUse: `## How to Use This Calculator

1. **Principal Amount**: Enter the initial amount
2. **Interest Rate**: Annual interest rate
3. **Time Period**: Duration in years
4. Click **Calculate** to see interest earned`,
    formulaExplanation: `## Simple Interest Formula

**SI = (P × R × T) / 100**

Where:
- **SI** = Simple Interest
- **P** = Principal amount
- **R** = Rate of interest per annum
- **T** = Time in years

**Total Amount = P + SI**`,
    disclaimer: 'Simple interest is rarely used for long-term investments. Most financial products use compound interest.',
    faqs: [
      { question: 'When is simple interest used?', answer: 'Simple interest is typically used for short-term loans, car loans, and some personal loans.' }
    ]
  },

  // ============ HEALTH CALCULATORS ============
  {
    title: 'BMI Calculator',
    slug: 'bmi-calculator',
    excerpt: 'Calculate your Body Mass Index and check if you\'re in a healthy weight range.',
    calculatorCategory: 'health',
    calculatorType: 'bmi',
    icon: 'fa-balance-scale',
    iconColor: '#4CAF50',
    order: 11,
    isFeatured: true,
    isPopular: true,
    metaTitle: 'BMI Calculator - Check Your Body Mass Index',
    metaDescription: 'Free BMI calculator. Enter your height and weight to calculate your Body Mass Index and see if you\'re in a healthy range.',
    description: `Body Mass Index (BMI) is a measure of body fat based on height and weight. It's a quick way to screen for weight categories that may lead to health problems.`,
    howToUse: `## How to Use This Calculator

1. **Height**: Enter your height in cm or feet/inches
2. **Weight**: Enter your weight in kg or pounds
3. Click **Calculate** to see your BMI

### BMI Categories
- Underweight: Below 18.5
- Normal: 18.5 - 24.9
- Overweight: 25 - 29.9
- Obese: 30 and above`,
    formulaExplanation: `## BMI Formula

**BMI = Weight (kg) / Height² (m)**

Or in imperial units:
**BMI = (Weight (lbs) × 703) / Height² (inches)**`,
    disclaimer: 'BMI is a screening tool and does not directly measure body fat. Athletes may have high BMI due to muscle mass. Consult a doctor for proper health assessment.',
    faqs: [
      { question: 'Is BMI accurate for everyone?', answer: 'BMI may not be accurate for athletes, elderly, pregnant women, or very muscular individuals.' },
      { question: 'What is a healthy BMI?', answer: 'A BMI between 18.5 and 24.9 is considered healthy for most adults.' }
    ]
  },
  {
    title: 'BMR Calculator',
    slug: 'bmr-calculator',
    excerpt: 'Calculate your Basal Metabolic Rate - calories your body burns at rest.',
    calculatorCategory: 'health',
    calculatorType: 'bmr',
    icon: 'fa-fire',
    iconColor: '#FF9800',
    order: 12,
    isFeatured: false,
    isPopular: true,
    metaTitle: 'BMR Calculator - Calculate Basal Metabolic Rate',
    metaDescription: 'Calculate your BMR to know how many calories your body burns at rest. Essential for weight loss and fitness planning.',
    description: `Basal Metabolic Rate (BMR) is the number of calories your body needs to maintain basic life-sustaining functions like breathing, circulation, and cell production while at rest.`,
    howToUse: `## How to Use This Calculator

1. **Age**: Enter your age
2. **Gender**: Select male or female
3. **Height**: Enter your height
4. **Weight**: Enter your weight
5. Click **Calculate** to see your BMR`,
    formulaExplanation: `## BMR Formula (Mifflin-St Jeor)

**Men**: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5

**Women**: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161`,
    disclaimer: 'BMR is an estimate. Actual metabolic rate can vary based on genetics, hormones, and body composition.',
    faqs: [
      { question: 'How do I use BMR for weight loss?', answer: 'Multiply BMR by activity factor (1.2-1.9) to get TDEE. Eat 500 calories below TDEE to lose ~0.5kg per week.' },
      { question: 'Does muscle affect BMR?', answer: 'Yes, more muscle mass increases BMR as muscle burns more calories than fat even at rest.' }
    ]
  },
  {
    title: 'Calorie Calculator',
    slug: 'calorie-calculator',
    excerpt: 'Calculate your daily calorie needs based on your activity level and goals.',
    calculatorCategory: 'health',
    calculatorType: 'calorie',
    icon: 'fa-cutlery',
    iconColor: '#F44336',
    order: 13,
    isFeatured: true,
    isPopular: true,
    metaTitle: 'Calorie Calculator - Daily Calorie Needs Calculator',
    metaDescription: 'Calculate how many calories you need per day. Factor in activity level and goals for weight loss, maintenance, or gain.',
    description: `This calculator estimates your Total Daily Energy Expenditure (TDEE) - the total calories you burn each day including physical activity.`,
    howToUse: `## How to Use This Calculator

1. **Age, Gender, Height, Weight**: Enter your details
2. **Activity Level**: Select from sedentary to very active
3. **Goal**: Maintain, lose, or gain weight
4. Click **Calculate** to see daily calorie needs`,
    formulaExplanation: `## TDEE Calculation

**TDEE = BMR × Activity Multiplier**

Activity Multipliers:
- Sedentary (little/no exercise): 1.2
- Lightly Active (1-3 days/week): 1.375
- Moderately Active (3-5 days/week): 1.55
- Very Active (6-7 days/week): 1.725
- Extra Active (physical job): 1.9`,
    disclaimer: 'Calorie needs are estimates. Individual metabolism varies. Consult a nutritionist for personalized advice.',
    faqs: [
      { question: 'How many calories for weight loss?', answer: 'A deficit of 500 calories/day leads to ~0.5kg weight loss per week. Don\'t go below 1200 (women) or 1500 (men) calories.' },
      { question: 'Should I eat back exercise calories?', answer: 'It depends on your goals. For weight loss, eating back only 50% of exercise calories is often recommended.' }
    ]
  },
  {
    title: 'Ideal Weight Calculator',
    slug: 'ideal-weight-calculator',
    excerpt: 'Find your ideal body weight based on height, age, and gender.',
    calculatorCategory: 'health',
    calculatorType: 'ideal-weight',
    icon: 'fa-user',
    iconColor: '#673AB7',
    order: 14,
    isFeatured: false,
    isPopular: false,
    metaTitle: 'Ideal Weight Calculator - Find Your Healthy Weight Range',
    metaDescription: 'Calculate your ideal body weight using multiple formulas. Find the healthy weight range for your height and body frame.',
    description: `Calculate your ideal weight using multiple established formulas including Devine, Robinson, Miller, and Hamwi. Get a healthy weight range based on your height and body frame.`,
    howToUse: `## How to Use This Calculator

1. **Height**: Enter your height
2. **Gender**: Select male or female
3. **Frame Size**: Small, medium, or large
4. Click **Calculate** to see ideal weight range`,
    formulaExplanation: `## Ideal Weight Formulas

### Devine Formula
- Men: 50 + 2.3 × (height in inches - 60)
- Women: 45.5 + 2.3 × (height in inches - 60)

### Robinson Formula
- Men: 52 + 1.9 × (height in inches - 60)
- Women: 49 + 1.7 × (height in inches - 60)`,
    disclaimer: 'Ideal weight formulas are estimates and don\'t account for muscle mass. Focus on overall health, not just weight.',
    faqs: [
      { question: 'Which ideal weight formula is best?', answer: 'No single formula is perfect. We show multiple formulas to give you a range. Focus on the average.' }
    ]
  },
  {
    title: 'Child Height Predictor',
    slug: 'child-height-calculator',
    excerpt: 'Predict your child\'s adult height based on parents\' heights.',
    calculatorCategory: 'health',
    calculatorType: 'child-height',
    icon: 'fa-child',
    iconColor: '#03A9F4',
    order: 15,
    isFeatured: false,
    isPopular: false,
    metaTitle: 'Child Height Calculator - Predict Adult Height',
    metaDescription: 'Predict your child\'s adult height based on parents\' heights using the mid-parental height method.',
    description: `This calculator predicts a child's potential adult height based on the heights of both parents. It uses the mid-parental height method, which is widely used by pediatricians.`,
    howToUse: `## How to Use This Calculator

1. **Father's Height**: Enter father's height
2. **Mother's Height**: Enter mother's height
3. **Child's Gender**: Select boy or girl
4. Click **Calculate** to see predicted adult height`,
    formulaExplanation: `## Mid-Parental Height Formula

**For Boys:**
Predicted Height = (Father's Height + Mother's Height + 13cm) / 2

**For Girls:**
Predicted Height = (Father's Height + Mother's Height - 13cm) / 2

The prediction is ±5cm (2 inches) accurate in most cases.`,
    disclaimer: 'This is an estimate based on genetics. Actual height depends on nutrition, health, and other environmental factors. The result has a margin of ±5cm.',
    faqs: [
      { question: 'How accurate is height prediction?', answer: 'Mid-parental height method is accurate within ±5cm for most children. Genetics account for 60-80% of height.' },
      { question: 'Can nutrition affect height?', answer: 'Yes, proper nutrition during childhood and adolescence is crucial for reaching genetic height potential.' }
    ]
  },
  {
    title: 'Diabetes Risk Calculator',
    slug: 'diabetes-risk-calculator',
    excerpt: 'Assess your risk of developing Type 2 diabetes based on lifestyle factors.',
    calculatorCategory: 'health',
    calculatorType: 'diabetes-risk',
    icon: 'fa-heartbeat',
    iconColor: '#E91E63',
    order: 16,
    isFeatured: false,
    isPopular: false,
    metaTitle: 'Diabetes Risk Calculator - Type 2 Diabetes Risk Assessment',
    metaDescription: 'Assess your risk of developing Type 2 diabetes. Answer questions about lifestyle, family history, and health to get your risk score.',
    description: `This calculator assesses your risk of developing Type 2 diabetes in the next 10 years based on the FINDRISC (Finnish Diabetes Risk Score) questionnaire.`,
    howToUse: `## How to Use This Calculator

Answer questions about:
1. **Age**
2. **BMI** (calculated from height/weight)
3. **Waist circumference**
4. **Physical activity**
5. **Diet habits**
6. **Blood pressure history**
7. **Blood sugar history**
8. **Family history of diabetes**

Click **Calculate** to see your risk score.`,
    formulaExplanation: `## FINDRISC Scoring

Points are assigned based on answers:
- Age: 0-4 points
- BMI: 0-3 points
- Waist: 0-4 points
- Physical activity: 0-2 points
- Diet: 0-1 point
- Blood pressure: 0-2 points
- Blood sugar: 0-5 points
- Family history: 0-5 points

**Total Score Interpretation:**
- <7: Low risk (1 in 100)
- 7-11: Slightly elevated (1 in 25)
- 12-14: Moderate (1 in 6)
- 15-20: High (1 in 3)
- >20: Very high (1 in 2)`,
    disclaimer: 'This is a risk assessment tool, not a diagnosis. High risk doesn\'t mean you will get diabetes. Consult a doctor for proper screening.',
    faqs: [
      { question: 'Can Type 2 diabetes be prevented?', answer: 'Yes, lifestyle changes like healthy eating, regular exercise, and maintaining healthy weight can reduce risk by up to 58%.' }
    ]
  },
  {
    title: 'Walk Calorie Burn Calculator',
    slug: 'walk-calorie-burn-calculator',
    excerpt: 'Calculate how many calories you burn while walking based on distance, speed, and weight.',
    calculatorCategory: 'health',
    calculatorType: 'walk-calorie-burn',
    icon: 'fa-street-view',
    iconColor: '#8BC34A',
    order: 17,
    isFeatured: true,
    isPopular: true,
    metaTitle: 'Walking Calorie Calculator - Calories Burned Walking',
    metaDescription: 'Calculate calories burned while walking. Enter distance, speed, and your weight to see how many calories you burn.',
    description: `Calculate how many calories you burn during your daily walk. The calculator considers your weight, walking distance, speed, and terrain to give an accurate estimate.`,
    howToUse: `## How to Use This Calculator

1. **Your Weight**: Enter your body weight
2. **Distance**: Enter walking distance in km
3. **Speed**: Enter walking speed (average 4-5 km/h)
4. **Terrain**: Flat, uphill, or mixed
5. Click **Calculate** to see calories burned`,
    formulaExplanation: `## Walking Calorie Formula

**Calories = MET × Weight (kg) × Duration (hours)**

MET values for walking:
- Slow (3.2 km/h): 2.0
- Moderate (4.0 km/h): 3.0
- Brisk (4.8 km/h): 3.5
- Fast (5.6 km/h): 4.3
- Very Fast (6.4 km/h): 5.0

Uphill walking increases MET by 50-100%.`,
    disclaimer: 'Calorie burn varies based on individual metabolism, fitness level, and actual walking conditions. This is an estimate.',
    faqs: [
      { question: 'How many calories does 10,000 steps burn?', answer: 'Approximately 400-500 calories for an average person, depending on weight and walking speed.' },
      { question: 'Is walking good for weight loss?', answer: 'Yes! A daily 30-minute brisk walk can help burn 150-200 calories and improve cardiovascular health.' },
      { question: 'What is the best walking speed for calorie burn?', answer: 'Brisk walking (5-6 km/h) is optimal - fast enough to burn calories but sustainable for longer durations.' }
    ]
  }
];

