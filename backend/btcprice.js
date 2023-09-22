let btcinrData;  

async function fetchBTCINRPrice() {
  const apiUrl = 'https://api.wazirx.com/api/v2/tickers';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    btcinrData = data.btcinr;

    console.log('BTC/INR Data:', btcinrData);

    calculateValues();
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    throw error;
  }
}

function calculatePriceChange(initialPrice, finalPrice) {
  return (((finalPrice - initialPrice) / initialPrice) * 100).toFixed(2);
}
  
function calculateAverageNetPrice(initialPrice, commissionRate) {
  return initialPrice * (1 + commissionRate / 100);
}
  
async function calculateValues() {
  try {
    const initialPriceBTCINR = parseFloat(btcinrData.last);
      
    const priceChange5mins = 0.45;
    const priceChange1hour = 0.48;
    const priceChange1day = 0.62;
    const priceChange7days = 8.1;
  
    const priceChange5minsINR = calculatePriceChange(initialPriceBTCINR, initialPriceBTCINR + (initialPriceBTCINR * priceChange5mins / 100));
    const priceChange1hourINR = calculatePriceChange(initialPriceBTCINR, initialPriceBTCINR + (initialPriceBTCINR * priceChange1hour / 100));
    const priceChange1dayINR = calculatePriceChange(initialPriceBTCINR, initialPriceBTCINR + (initialPriceBTCINR * priceChange1day / 100));
    const priceChange7daysINR = calculatePriceChange(initialPriceBTCINR, initialPriceBTCINR + (initialPriceBTCINR * priceChange7days / 100));
  
    const commissionRate = 0.5;
  
    const averageNetPriceBTCINR = calculateAverageNetPrice(initialPriceBTCINR, commissionRate);
      
    console.log('Price change of BTC/INR:');
    console.log(`5 minutes:  ${priceChange5minsINR}%`);
    console.log(`1 hour:  ${priceChange1hourINR}%`);
    console.log(`1 day:  ${priceChange1dayINR}%`);
    console.log(`7 days:  ${priceChange7daysINR}%`);
    console.log();
    console.log(`Average BTC/INR net price including ${commissionRate}% commission: ${averageNetPriceBTCINR} INR`);
  } catch (error) {
    console.error('Error calculating values:', error);
  }
}
   
module.exports = { fetchBTCINRPrice, calculateValues };
