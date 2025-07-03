/**
 * Authentication Service - Static Data Only
 * All authentication is now handled client-side with static user data
 * No backend connectivity required
 */

import staticAuthService from './staticAuthService';

// =============================================================================
// STATIC AUTHENTICATION SERVICE WRAPPER
// =============================================================================

/**
 * Authentication Service
 * Direct wrapper around static auth service - no API mode switching
 */
class AuthService {
    constructor() {
        this.service = staticAuthService;
        console.log('🔧 AuthService initialized in static-only mode');
    }

    /**
     * Login user
     */
    async login(credentials) {
        return await this.service.login(credentials);
    }

    /**
     * Logout user
     */
    async logout() {
        return await this.service.logout();
    }

    /**
     * Refresh token
     */
    async refreshToken() {
        return await this.service.refreshToken();
    }

    /**
     * Validate token
     */
    async validateToken() {
        return await this.service.validateToken();
    }

    /**
     * Error handling
     */
    handleError(error) {
        return this.service.handleError(error);
    }
}

// Create and export singleton instance
const authService = new AuthService();

// Add to window for debugging
if (typeof window !== 'undefined') {
    window.authService = authService;
}

export default authService;
