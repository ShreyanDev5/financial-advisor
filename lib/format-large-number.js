// Utility function to format large numbers in a more readable way
export function formatLargeNumber(value) {
  if (value === null || value === undefined || isNaN(value)) return "₹0";
  
  // Handle negative values
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);
  
  // Round down to nearest integer
  const roundedValue = Math.floor(absoluteValue);
  
  // Only abbreviate numbers >= 1 billion (1,000,000,000)
  if (roundedValue >= 1e9) {
    // Format numbers based on their magnitude
    if (roundedValue >= 1e15) {
      // Quadrillion
      return `${isNegative ? '-' : ''}₹${(roundedValue / 1e15).toFixed(2)}Q`;
    } else if (roundedValue >= 1e12) {
      // Trillion
      return `${isNegative ? '-' : ''}₹${(roundedValue / 1e12).toFixed(2)}T`;
    } else if (roundedValue >= 1e9) {
      // Billion
      return `${isNegative ? '-' : ''}₹${(roundedValue / 1e9).toFixed(2)}B`;
    }
  } else {
    // For numbers < 1 billion, format with commas using Indian numbering system
    return `${isNegative ? '-' : ''}₹${roundedValue.toLocaleString('en-IN')}`;
  }
}