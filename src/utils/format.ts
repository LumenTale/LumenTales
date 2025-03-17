/**
 * Formats a date string to a readable format
 * @param dateString ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Formats a number to a compact representation
 * @param num Number to format
 * @returns Formatted number string
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num);
};

/**
 * Formats a price in USD
 * @param price Price to format
 * @param decimals Number of decimal places
 * @returns Formatted price string
 */
export const formatPrice = (price: number, decimals = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(price);
};

/**
 * Truncates text to a specified length
 * @param text Text to truncate
 * @param maxLength Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Formats an Ethereum address
 * @param address Ethereum address
 * @returns Formatted address
 */
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

/**
 * Truncates a blockchain address to make it more readable
 * Format: "0x1234...5678"
 * @param address The full address to truncate
 * @param startLength Number of characters to show at the start
 * @param endLength Number of characters to show at the end
 * @returns Truncated address string
 */
export const truncateAddress = (
  address: string,
  startLength = 6,
  endLength = 4
): string => {
  if (!address) return '';
  if (address.length <= startLength + endLength) return address;
  
  const start = address.slice(0, startLength);
  const end = address.slice(-endLength);
  
  return `${start}...${end}`;
};

/**
 * Format a number to display with a specific number of decimal places
 * @param value The number to format
 * @param decimals Number of decimal places
 * @returns Formatted number as string
 */
export const formatNumber = (value: number, decimals = 2): string => {
  if (value === null || value === undefined) return 'N/A';
  return value.toFixed(decimals);
};

/**
 * Format a price value with currency symbol
 * @param price The price value to format
 * @param currency Currency symbol to use
 * @param decimals Number of decimal places
 * @returns Formatted price string
 */
export const formatPrice = (
  price: number,
  currency = 'SOL',
  decimals = 2
): string => {
  if (price === null || price === undefined) return 'N/A';
  return `${price.toFixed(decimals)} ${currency}`;
};

/**
 * Format a date to a readable string
 * @param date Date to format
 * @param options Date formatting options
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
};

/**
 * Format a date as relative time (e.g., "2 hours ago")
 * @param date Date to format
 * @returns Relative time string
 */
export const formatRelativeTime = (date: Date | string): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffWeeks = Math.round(diffDays / 7);
  const diffMonths = Math.round(diffDays / 30);
  const diffYears = Math.round(diffDays / 365);
  
  if (diffSecs < 60) return `${diffSecs} seconds ago`;
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
  if (diffMonths < 12) return `${diffMonths} months ago`;
  return `${diffYears} years ago`;
}; 