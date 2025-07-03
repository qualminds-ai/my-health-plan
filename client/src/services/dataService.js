/**
 * Data Service - Static Data Only
 * All data is now hardcoded and served from static data files
 * No backend connectivity required
 */

import staticDataService from './staticDataService';

// =============================================================================
// STATIC DATA SERVICE WRAPPER
// =============================================================================

/**
 * Data Service
 * Direct wrapper around static data service - no API mode switching
 */
class DataService {
    constructor() {
        this.service = staticDataService;
        console.log('🔧 DataService initialized in static-only mode');
    }

    /**
     * Dashboard stats
     */
    async getDashboardStats(userMode, scenarios) {
        return await this.service.getDashboardStats(userMode, scenarios);
    }

    /**
     * Authorizations data
     */
    async getAuthorizations(userMode, scenarios, options = {}) {
        return await this.service.getAuthorizations(userMode, scenarios, options);
    }

    /**
     * Member data
     */
    async getMemberByNumber(memberNumber, userMode, scenarios) {
        return await this.service.getMemberByNumber(memberNumber, userMode, scenarios);
    }

    /**
     * Search members
     */
    async searchMembers(query) {
        return await this.service.searchMembers(query);
    }

    /**
     * Get all members
     */
    async getAllMembers(options = {}) {
        return await this.service.getAllMembers(options);
    }

    /**
     * Update member
     */
    async updateMember(memberNumber, memberData) {
        return await this.service.updateMember(memberNumber, memberData);
    }

    /**
     * Authorization details
     */
    async getAuthorizationDetails(authorizationId, userMode, scenarios) {
        return await this.service.getAuthorizationDetails(authorizationId, userMode, scenarios);
    }

    /**
     * Health check
     */
    async getHealthStatus() {
        return await this.service.getHealthStatus();
    }

    /**
     * Error handling
     */
    handleError(error) {
        return this.service.handleError(error);
    }
}

// Create and export singleton instance
const dataService = new DataService();

// Add to window for debugging
if (typeof window !== 'undefined') {
    window.dataService = dataService;
}

export default dataService;
