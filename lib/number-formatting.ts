// Utility functions for number formatting
export function formatWithCommas(value: string): string {
  // Remove any non-digit characters except for decimal point
  const cleanValue = value.replace(/[^\d.]/g, '');
  
  // Handle decimal numbers
  if (cleanValue.includes('.')) {
    const parts = cleanValue.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];
    
    // Format integer part with commas
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Return with decimal part (limit to 2 decimal places)
    return `${formattedInteger}.${decimalPart.slice(0, 2)}`;
  }
  
  // Format integer numbers with commas
  return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function removeCommas(value: string): string {
  return value.replace(/,/g, '');
}