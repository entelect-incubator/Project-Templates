/**
 * Global utility functions for the application
 */

/**
 * Format a date string to a localized format
 * @param dateString - The date string to format
 * @param options - Intl.DateTimeFormatOptions for customization
 * @returns Formatted date string
 */
export function formatDate(
  dateString?: string | null,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!dateString) return 'Unknown';

  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return 'Invalid Date';

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      ...options,
    };

    return date.toLocaleString(undefined, defaultOptions);
  } catch {
    return 'Invalid Date';
  }
}

/**
 * Parse and validate an order ID input
 * @param input - The input string to parse
 * @returns Object with parsed ID and validation result
 */
export function parseOrderId(input: string): {
  id: number | null;
  isValid: boolean;
  error?: string;
} {
  const trimmed = input.trim();

  if (!trimmed) {
    return { id: null, isValid: false, error: 'Order ID is required' };
  }

  const parsed = Number.parseInt(trimmed, 10);

  if (Number.isNaN(parsed)) {
    return { id: null, isValid: false, error: 'Invalid Order ID format' };
  }

  if (parsed <= 0) {
    return { id: null, isValid: false, error: 'Order ID must be a positive number' };
  }

  return { id: parsed, isValid: true };
}

/**
 * Copy text to clipboard with error handling
 * @param text - Text to copy
 * @returns Promise that resolves to success boolean
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const result = document.execCommand('copy');
    document.body.removeChild(textArea);
    return result;
  } catch {
    return false;
  }
}
