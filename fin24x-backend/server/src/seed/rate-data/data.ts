/**
 * Seed Data for Metals, Countries, States, and Cities
 */

export const metals = [
  {
    name: 'Gold',
    slug: 'gold',
    description: 'Gold is a precious metal used for investment and jewelry.'
  },
  {
    name: 'Silver',
    slug: 'silver',
    description: 'Silver is a precious metal used for investment and industrial purposes.'
  },
  {
    name: 'Platinum',
    slug: 'platinum',
    description: 'Platinum is a rare precious metal used in jewelry and automotive industry.'
  }
];

export const countries = [
  {
    name: 'India',
    code: 'IN',
    currency: 'INR'
  },
  {
    name: 'United States',
    code: 'US',
    currency: 'USD'
  },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    currency: 'AED'
  }
];

export const states = [
  // India States (28 States)
  { name: 'Andhra Pradesh', code: 'AP', country: 'India' },
  { name: 'Arunachal Pradesh', code: 'AR', country: 'India' },
  { name: 'Assam', code: 'AS', country: 'India' },
  { name: 'Bihar', code: 'BR', country: 'India' },
  { name: 'Chhattisgarh', code: 'CG', country: 'India' },
  { name: 'Goa', code: 'GA', country: 'India' },
  { name: 'Gujarat', code: 'GJ', country: 'India' },
  { name: 'Haryana', code: 'HR', country: 'India' },
  { name: 'Himachal Pradesh', code: 'HP', country: 'India' },
  { name: 'Jharkhand', code: 'JH', country: 'India' },
  { name: 'Karnataka', code: 'KA', country: 'India' },
  { name: 'Kerala', code: 'KL', country: 'India' },
  { name: 'Madhya Pradesh', code: 'MP', country: 'India' },
  { name: 'Maharashtra', code: 'MH', country: 'India' },
  { name: 'Manipur', code: 'MN', country: 'India' },
  { name: 'Meghalaya', code: 'ML', country: 'India' },
  { name: 'Mizoram', code: 'MZ', country: 'India' },
  { name: 'Nagaland', code: 'NL', country: 'India' },
  { name: 'Odisha', code: 'OD', country: 'India' },
  { name: 'Punjab', code: 'PB', country: 'India' },
  { name: 'Rajasthan', code: 'RJ', country: 'India' },
  { name: 'Sikkim', code: 'SK', country: 'India' },
  { name: 'Tamil Nadu', code: 'TN', country: 'India' },
  { name: 'Telangana', code: 'TG', country: 'India' },
  { name: 'Tripura', code: 'TR', country: 'India' },
  { name: 'Uttar Pradesh', code: 'UP', country: 'India' },
  { name: 'Uttarakhand', code: 'UK', country: 'India' },
  { name: 'West Bengal', code: 'WB', country: 'India' },
  
  // India Union Territories (8 Union Territories)
  { name: 'Andaman and Nicobar Islands', code: 'AN', country: 'India' },
  { name: 'Chandigarh', code: 'CH', country: 'India' },
  { name: 'Dadra and Nagar Haveli and Daman and Diu', code: 'DH', country: 'India' },
  { name: 'Delhi', code: 'DL', country: 'India' },
  { name: 'Jammu and Kashmir', code: 'JK', country: 'India' },
  { name: 'Ladakh', code: 'LA', country: 'India' },
  { name: 'Lakshadweep', code: 'LD', country: 'India' },
  { name: 'Puducherry', code: 'PY', country: 'India' },
  
  // US States (sample)
  { name: 'California', code: 'CA', country: 'United States' },
  { name: 'New York', code: 'NY', country: 'United States' },
  { name: 'Texas', code: 'TX', country: 'United States' },
  // UAE Emirates
  { name: 'Dubai', code: 'DXB', country: 'United Arab Emirates' },
  { name: 'Abu Dhabi', code: 'AUH', country: 'United Arab Emirates' }
];

export const cities = [
  // Uttar Pradesh
  { name: 'Gorakhpur', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Lucknow', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Kanpur', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Varanasi', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Agra', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Allahabad', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Meerut', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Noida', state: 'Uttar Pradesh', country: 'India' },
  { name: 'Ghaziabad', state: 'Uttar Pradesh', country: 'India' },
  
  // Bihar
  { name: 'Patna', state: 'Bihar', country: 'India' },
  { name: 'Gaya', state: 'Bihar', country: 'India' },
  { name: 'Bhagalpur', state: 'Bihar', country: 'India' },
  { name: 'Muzaffarpur', state: 'Bihar', country: 'India' },
  
  // Maharashtra
  { name: 'Mumbai', state: 'Maharashtra', country: 'India' },
  { name: 'Pune', state: 'Maharashtra', country: 'India' },
  { name: 'Nagpur', state: 'Maharashtra', country: 'India' },
  { name: 'Nashik', state: 'Maharashtra', country: 'India' },
  { name: 'Aurangabad', state: 'Maharashtra', country: 'India' },
  
  // Delhi
  { name: 'New Delhi', state: 'Delhi', country: 'India' },
  { name: 'Delhi', state: 'Delhi', country: 'India' },
  
  // Karnataka
  { name: 'Bangalore', state: 'Karnataka', country: 'India' },
  { name: 'Mysore', state: 'Karnataka', country: 'India' },
  { name: 'Mangalore', state: 'Karnataka', country: 'India' },
  
  // Tamil Nadu
  { name: 'Chennai', state: 'Tamil Nadu', country: 'India' },
  { name: 'Coimbatore', state: 'Tamil Nadu', country: 'India' },
  { name: 'Madurai', state: 'Tamil Nadu', country: 'India' },
  
  // West Bengal
  { name: 'Kolkata', state: 'West Bengal', country: 'India' },
  { name: 'Howrah', state: 'West Bengal', country: 'India' },
  
  // Gujarat
  { name: 'Ahmedabad', state: 'Gujarat', country: 'India' },
  { name: 'Surat', state: 'Gujarat', country: 'India' },
  { name: 'Vadodara', state: 'Gujarat', country: 'India' },
  
  // Rajasthan
  { name: 'Jaipur', state: 'Rajasthan', country: 'India' },
  { name: 'Jodhpur', state: 'Rajasthan', country: 'India' },
  { name: 'Udaipur', state: 'Rajasthan', country: 'India' },
  
  // Punjab
  { name: 'Chandigarh', state: 'Punjab', country: 'India' },
  { name: 'Amritsar', state: 'Punjab', country: 'India' },
  { name: 'Ludhiana', state: 'Punjab', country: 'India' },
  
  // Haryana
  { name: 'Gurgaon', state: 'Haryana', country: 'India' },
  { name: 'Faridabad', state: 'Haryana', country: 'India' },
  
  // Madhya Pradesh
  { name: 'Bhopal', state: 'Madhya Pradesh', country: 'India' },
  { name: 'Indore', state: 'Madhya Pradesh', country: 'India' },
  
  // Andhra Pradesh
  { name: 'Hyderabad', state: 'Andhra Pradesh', country: 'India' },
  { name: 'Vijayawada', state: 'Andhra Pradesh', country: 'India' },
  
  // Telangana
  { name: 'Hyderabad', state: 'Telangana', country: 'India' },
  
  // Kerala
  { name: 'Kochi', state: 'Kerala', country: 'India' },
  { name: 'Thiruvananthapuram', state: 'Kerala', country: 'India' },
  
  // Odisha
  { name: 'Bhubaneswar', state: 'Odisha', country: 'India' },
  
  // Assam
  { name: 'Guwahati', state: 'Assam', country: 'India' },
  
  // Jharkhand
  { name: 'Ranchi', state: 'Jharkhand', country: 'India' },
  
  // Chhattisgarh
  { name: 'Raipur', state: 'Chhattisgarh', country: 'India' },
  
  // Uttarakhand
  { name: 'Dehradun', state: 'Uttarakhand', country: 'India' },
  
  // United States
  { name: 'New York City', state: 'New York', country: 'United States' },
  { name: 'Los Angeles', state: 'California', country: 'United States' },
  { name: 'Chicago', state: 'Illinois', country: 'United States' },
  { name: 'Houston', state: 'Texas', country: 'United States' },
  
  // UAE
  { name: 'Dubai', state: 'Dubai', country: 'United Arab Emirates' },
  { name: 'Abu Dhabi', state: 'Abu Dhabi', country: 'United Arab Emirates' },
  { name: 'Sharjah', state: 'Dubai', country: 'United Arab Emirates' }
];

