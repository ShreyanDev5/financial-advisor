
/**
 * Utility function to format large numbers in a more readable way
 * Handles K, L, Cr for Indian context if needed, or K, M, B for international.
 * The current requirement seems to be international/mixed (B, T, Q) for very large numbers
 * and Indian locale for smaller numbers.
 */
export function formatLargeNumber(value: number | string | null | undefined): string {
    if (value === null || value === undefined) return "₹0";

    const numValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numValue)) return "₹0";

    // Handle negative values
    const isNegative = numValue < 0;
    const absoluteValue = Math.abs(numValue);

    // Round down to nearest integer using floor
    const roundedValue = Math.floor(absoluteValue);

    // Return full number with commas (Indian locale) without abbreviations
    return `${isNegative ? '-' : ''}₹${roundedValue.toLocaleString('en-IN')}`;
}
