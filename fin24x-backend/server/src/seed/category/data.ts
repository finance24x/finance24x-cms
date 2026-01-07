/**
 * Category Data
 * 
 * Add, modify, or remove categories here.
 * The code.ts file will use this data to populate the database.
 */

export interface CategoryData {
  name: string;
  slug: string;
  description: string;
  order: number;
  enabled: boolean;
  contentType?: 'articles' | 'calculators' | 'mixed';
}

export const categories: CategoryData[] = [
  {
    name: 'Insights',
    slug: 'insights',
    description: 'Expert analysis and in-depth insights on market trends, investment strategies, and economic indicators. Stay informed with comprehensive market analysis from financial experts.',
    order: 1,
    enabled: true,
  },
  {
    name: 'Latest News',
    slug: 'latest-news',
    description: 'Breaking news and latest updates from the business and economy world. Get real-time coverage of major financial events, policy changes, and market developments.',
    order: 2,
    enabled: true,
  },
  {
    name: 'Market News',
    slug: 'market-news',
    description: 'Live updates and breaking news from stock exchanges worldwide. Track market movements, corporate announcements, and trading activities as they happen.',
    order: 3,
    enabled: true,
  },
  {
    name: 'Gold Rates',
    slug: 'gold-rates',
    description: 'Today\'s gold prices for 22k and 24k gold across major cities in India. Track daily gold rates, historical trends, and get expert predictions on gold price movements.',
    order: 4,
    enabled: true,
  },
  {
    name: 'Silver Rates',
    slug: 'silver-rates',
    description: 'Live silver price trends per kilogram with real-time updates. Monitor silver rates, historical data, and market analysis to make informed investment decisions.',
    order: 5,
    enabled: true,
  },
  {
    name: 'Commodities',
    slug: 'commodities',
    description: 'Track prices and trends for oil, gas, metals, and agricultural commodities. Stay updated with commodity market movements, futures, and spot prices.',
    order: 6,
    enabled: true,
  },
  {
    name: 'IPOs',
    slug: 'ipos',
    description: 'Complete IPO information including Grey Market Premium (GMP), subscription dates, issue details, and subscription status. Get expert analysis on upcoming and ongoing IPOs.',
    order: 7,
    enabled: true,
  },
  {
    name: 'Stocks & Indices',
    slug: 'stocks-indices',
    description: 'Live stock quotes, charts, top gainers, and losers across major indices. Track NIFTY, SENSEX, BANKNIFTY, and individual stock performance with real-time data.',
    order: 8,
    enabled: true,
  },
  {
    name: 'Cryptocurrency',
    slug: 'cryptocurrency',
    description: 'Real-time cryptocurrency prices for Bitcoin (BTC), Ethereum (ETH), and other major cryptocurrencies. Track crypto market trends, news, and expert analysis.',
    order: 9,
    enabled: true,
  },
  {
    name: 'Mutual Funds',
    slug: 'mutual-funds',
    description: 'Top performing mutual funds with NAV performance, returns, and ratings. Compare funds, track portfolio performance, and get expert recommendations for your investment goals.',
    order: 10,
    enabled: true,
  },
  {
    name: 'Calculators',
    slug: 'calculators',
    description: 'Financial and health calculators for SIP, FD, EMI, tax planning, BMI, calorie tracking, and more. Use our comprehensive suite of calculators to plan your finances and health effectively.',
    order: 11,
    enabled: true,
    contentType: 'calculators',
  },
  {
    name: 'Bank Deposits',
    slug: 'bank-deposits',
    description: 'Compare Fixed Deposits (FD), Recurring Deposits (RD), and interest rates across major banks. Find the best deposit schemes and maximize your savings returns.',
    order: 12,
    enabled: true,
  },
  {
    name: 'Govt. Schemes',
    slug: 'government-schemes',
    description: 'Complete information on government schemes including Provident Fund (PF), pension plans, subsidies, and social security benefits. Stay informed about eligibility and application procedures.',
    order: 13,
    enabled: true,
  },
];

