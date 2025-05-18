/**
 * Generates a random tracking number for LBC Express
 * @returns A string tracking number with LBC prefix + 8 digits
 */
export function generateTrackingNumber(): string {
  const prefix = "LBC";
  const randomDigits = Math.floor(10000000 + Math.random() * 90000000).toString();
  return `${prefix}${randomDigits}`;
}

/**
 * Formats a currency value with a currency symbol
 * @param value The numeric value to format
 * @param currency The currency code (e.g., PHP, USD)
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, currency: string): string {
  const symbols: Record<string, string> = {
    PHP: "₱",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    SGD: "S$",
    CAD: "C$"
  };

  const symbol = symbols[currency] || currency;
  
  return `${symbol}${value.toFixed(2)}`;
}

/**
 * Generates a random order ID for use in the system
 * @returns A string UUID for orders
 */
export function generateOrderId(): string {
  return crypto.randomUUID();
}

/**
 * Validates if a tracking number follows the LBC format
 * @param trackingNumber The tracking number to validate
 * @returns Boolean indicating if the tracking number is valid
 */
export function isValidTrackingNumber(trackingNumber: string): boolean {
  // LBC tracking numbers should start with LBC followed by 8-12 digits
  const regex = /^LBC\d{8,12}$/;
  return regex.test(trackingNumber);
}

/**
 * Calculates estimated delivery date based on shipping method
 * @param shippingMethod The shipping method selected
 * @param fromDate Starting date (defaults to current date)
 * @returns Estimated delivery date
 */
export function calculateEstimatedDeliveryDate(
  shippingMethod: string, 
  fromDate: Date = new Date()
): Date {
  const result = new Date(fromDate);
  
  switch (shippingMethod) {
    case "Same Day":
      // Same day delivery (add 12 hours)
      result.setHours(result.getHours() + 12);
      break;
    case "Express":
      // Express delivery (1-2 business days)
      result.setDate(result.getDate() + 1);
      break;
    case "Standard":
      // Standard delivery (3-5 business days)
      result.setDate(result.getDate() + 3);
      break;
    case "International":
      // International delivery (7-14 business days)
      result.setDate(result.getDate() + 7);
      break;
    default:
      // Default to standard
      result.setDate(result.getDate() + 3);
  }
  
  return result;
}

/**
 * Sanitizes input strings to prevent XSS attacks
 * @param input The input string to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
