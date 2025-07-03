/**
 * Static Authentication Service
 * Replaces API-based authentication with client-side authentication
 * Maintains the same interface as the original authService for seamless replacement
 */

import {
    generateDemoToken,
    validateDemoToken,
    verifyCredentials,
    getUserProfile
} from '../constants/staticUserData';

/**
 * Static Authentication Service Class
 * Provides the same interface as the API-based authService but works entirely client-side
 */
class StaticAuthService {
    /**
     * Simulate API delay for realistic behavior
     * @param {number} delay - Delay in milliseconds
     */
    async simulateDelay(delay = 100) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    /**
     * Login user - replaces POST /api/auth/login
     * @param {object} credentials - User credentials
     * @returns {Promise<object>} Login response with token and user
     */
    async login(credentials) {
        await this.simulateDelay(150);

        console.log('🔑 StaticAuthService: Attempting login for', credentials.email);

        const { email, password } = credentials;

        if (!email || !password) {
            const error = new Error('Email and password are required');
            error.status = 400;
            throw error;
        }

        // Verify credentials against static user data
        const user = verifyCredentials(email, password);

        if (!user) {
            const error = new Error('Invalid email or password');
            error.status = 401;
            throw error;
        }

        // Generate demo token
        const token = generateDemoToken(user);

        console.log('✅ StaticAuthService: Login successful for', user.full_name);

        return {
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.full_name,
                full_name: user.full_name, // Keep both formats for compatibility
                role: user.role
            }
        };
    }

    /**
     * Logout user - replaces POST /api/auth/logout
     * @returns {Promise<object>} Logout response
     */
    async logout() {
        await this.simulateDelay(50);

        console.log('🔑 StaticAuthService: Logout successful');

        return {
            message: 'Logout successful',
            success: true
        };
    }

    /**
     * Refresh token
     * @returns {Promise<object>} Refresh response
     */
    async refreshToken() {
        await this.simulateDelay(100);

        // Get current token from localStorage
        const currentToken = localStorage.getItem('token');

        if (!currentToken) {
            const error = new Error('No token to refresh');
            error.status = 401;
            throw error;
        }

        // Validate current token
        const payload = validateDemoToken(currentToken);

        if (!payload) {
            const error = new Error('Invalid token');
            error.status = 401;
            throw error;
        }

        // Get user profile
        const user = getUserProfile(payload.userId);

        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        // Generate new token
        const newToken = generateDemoToken(user);

        console.log('🔑 StaticAuthService: Token refreshed for', user.full_name);

        return {
            message: 'Token refreshed successfully',
            token: newToken,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.full_name,
                full_name: user.full_name,
                role: user.role
            }
        };
    }

    /**
     * Validate token
     * @returns {Promise<object>} Validation response
     */
    async validateToken() {
        await this.simulateDelay(50);

        // Get current token from localStorage
        const currentToken = localStorage.getItem('token');

        if (!currentToken) {
            const error = new Error('No token provided');
            error.status = 401;
            throw error;
        }

        // Validate token
        const payload = validateDemoToken(currentToken);

        if (!payload) {
            const error = new Error('Invalid or expired token');
            error.status = 401;
            throw error;
        }

        // Get user profile
        const user = getUserProfile(payload.userId);

        if (!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        console.log('✅ StaticAuthService: Token valid for', user.full_name);

        return {
            message: 'Token is valid',
            valid: true,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.full_name,
                full_name: user.full_name,
                role: user.role
            }
        };
    }

    /**
     * Generic error handler for consistency with original auth service
     * @param {Error} error - Error object
     * @returns {object} Formatted error
     */
    handleError(error) {
        return {
            message: error.message || 'An authentication error occurred',
            status: error.status || 500,
            data: error.data || null
        };
    }
}

// Create and export a singleton instance
const staticAuthService = new StaticAuthService();
export default staticAuthService;
