export default function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PKR',
  });
  const formattedAmount = formatter.format(amount); // Format the amount
  
  // Remove currency symbol and extra decimal points
  const regex = /([\d,]+)\.\d+/;
  const match = formattedAmount.match(regex);
  const formattedCurrency = match ? match[1] : formattedAmount;
  
  return `Rs. ${formattedCurrency}`; // Add 'Rs.' prefix
}
