/**
 * Application Constants
 */

// Application Configuration - Client-only mode
export const APP_CONFIG = {
    STATIC_MODE: true, // Application runs entirely client-side
    VERSION: '2.0.0'
};

// Route Constants
export const ROUTES = {
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    MEMBER: '/member',
    HOME: '/'
};

// Local Storage Keys
export const STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
    PREFERENCES: 'userPreferences',
    USER_MODE: 'userMode',
    USER_SCENARIOS: 'userScenarios',
    ACTIVE_PERSONA: 'activePersona'
};

// Application Messages
export const MESSAGES = {
    LOADING: 'Loading...',
    LOGIN_SUCCESS: 'Login successful',
    MEMBER_NOT_FOUND: 'Member not found',
    DATA_ERROR: 'Error loading data',
    INVALID_CREDENTIALS: 'Invalid email or password'
};

// Application Status Codes
export const APP_STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
    LOADING: 'loading',
    IDLE: 'idle'
};

// Navigation Items
export const NAV_ITEMS = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Members', path: '/members' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Providers', path: '/providers' },
    { name: 'Authorization', path: '/authorization' },
    { name: 'Faxes', path: '/faxes' }
];
