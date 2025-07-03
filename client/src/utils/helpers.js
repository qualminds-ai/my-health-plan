/**
 * Utility functions for the application
 */

/**
 * Format date to readable string
 */
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    try {
        // Handle both ISO datetime strings and date-only strings without timezone conversion
        let datePart;
        if (dateString.includes('T')) {
            // ISO datetime string like '2025-04-28T03:47:01Z'
            datePart = dateString.split('T')[0];
        } else {
            // Date-only string like '2025-04-28'
            datePart = dateString;
        }

        const [year, month, day] = datePart.split('-');

        // Create month names array
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const monthName = months[parseInt(month, 10) - 1];
        const dayNum = parseInt(day, 10);

        return `${monthName} ${dayNum}, ${year}`;
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid Date';
    }
};

/**
 * Format member number for display
 */
export const formatMemberNumber = (memberNumber) => {
    if (!memberNumber) return 'N/A';
    return memberNumber.toString().toUpperCase();
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Capitalize first letter of each word
 */
export const capitalize = (str) => {
    if (!str) return '';
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Debounce function for search inputs
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Generate unique ID
 */
export const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
};

/**
 * Safe JSON parse with fallback
 */
export const safeJsonParse = (str, fallback = null) => {
    try {
        return JSON.parse(str);
    } catch (error) {
        console.error('JSON parse error:', error);
        return fallback;
    }
};

/**
 * Check if object is empty
 */
export const isEmpty = (obj) => {
    if (!obj) return true;
    if (Array.isArray(obj)) return obj.length === 0;
    if (typeof obj === 'object') return Object.keys(obj).length === 0;
    return false;
};

/**
 * Deep clone object
 */
export const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const cloned = {};
        Object.keys(obj).forEach(key => {
            cloned[key] = deepClone(obj[key]);
        });
        return cloned;
    }
};
