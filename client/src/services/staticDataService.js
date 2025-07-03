/**
 * Static Data Service
 * Provides static healthcare data for the MyHealthPlan demo application
 * All data is client-side only with no external dependencies
 */

import {
    getDashboardStats,
    getAuthorizationsData,
    getMemberData,
    searchMembers,
    getAllMembers
} from '../constants/staticData';

/**
 * Static Data Service Class
 * Provides static healthcare data with scenario-based modifications
 */
class StaticDataService {
    /**
     * Simulate loading delay for realistic user experience
     * @param {number} delay - Delay in milliseconds
     */
    async simulateDelay(delay = 100) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    /**
     * Dashboard Statistics
     * @param {string} userMode - Current user mode
     * @param {array} scenarios - Active scenarios
     * @returns {Promise<object>} Dashboard statistics
     */
    async getDashboardStats(userMode = 'UM', scenarios = []) {
        await this.simulateDelay(150);

        console.log('📊 StaticDataService: Getting dashboard stats for', { userMode, scenarios });
        const stats = getDashboardStats(userMode, scenarios);

        console.log('📊 StaticDataService: Returning stats:', stats);
        return stats;
    }

    /**
     * Authorization Data
     * @param {string} userMode - Current user mode
     * @param {array} scenarios - Active scenarios
     * @param {object} options - Query options (limit, page, filters)
     * @returns {Promise<object>} Authorizations with pagination
     */
    async getAuthorizations(userMode = 'UM', scenarios = [], options = {}) {
        await this.simulateDelay(200);

        const { limit = 50, page = 1, status, priority, search } = options;
        const offset = (page - 1) * limit;

        console.log('📋 StaticDataService: Getting authorizations for', { userMode, scenarios, options });

        let authorizations = getAuthorizationsData(userMode, scenarios);
        console.log('📋 StaticDataService: Raw authorizations from static data:', authorizations);
        console.log('📋 StaticDataService: Authorizations type:', typeof authorizations);
        console.log('📋 StaticDataService: Authorizations is array:', Array.isArray(authorizations));

        // Apply filters
        if (status) {
            authorizations = authorizations.filter(auth => auth.status === status);
        }

        if (priority) {
            authorizations = authorizations.filter(auth => auth.priority === priority);
        }

        if (search) {
            const searchTerm = search.toLowerCase();
            authorizations = authorizations.filter(auth =>
                auth.authorization_number.toLowerCase().includes(searchTerm) ||
                auth.member_name.toLowerCase().includes(searchTerm) ||
                auth.diagnosis_code.toLowerCase().includes(searchTerm) ||
                auth.provider_name.toLowerCase().includes(searchTerm)
            );
        }

        // Apply pagination
        const total = authorizations.length;
        const paginatedData = authorizations.slice(offset, offset + limit);

        const result = {
            data: paginatedData,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        };

        console.log('📋 StaticDataService: Returning authorizations:', result.data.length, 'items');
        return result;
    }

    /**
     * Member Data
     * @param {string} memberNumber - Member number
     * @param {string} userMode - Current user mode
     * @param {array} scenarios - Active scenarios
     * @returns {Promise<object>} Member data
     */
    async getMemberByNumber(memberNumber, userMode = 'UM', scenarios = []) {
        await this.simulateDelay(100);

        console.log('👤 StaticDataService: Getting member data for', { memberNumber, userMode, scenarios });

        const member = getMemberData(memberNumber, userMode, scenarios);

        if (!member) {
            const error = new Error('Member not found');
            error.status = 404;
            throw error;
        }

        console.log('👤 StaticDataService: Returning member:', member.name);
        return member;
    }

    /**
     * Search Members
     * @param {string} query - Search query
     * @returns {Promise<array>} Search results
     */
    async searchMembers(query) {
        await this.simulateDelay(150);

        console.log('🔍 StaticDataService: Searching members with query:', query);

        const results = searchMembers(query);

        console.log('🔍 StaticDataService: Found', results.length, 'members');
        return results;
    }

    /**
     * Get All Members
     * @param {object} options - Query options (limit, page)
     * @returns {Promise<object>} Members with pagination
     */
    async getAllMembers(options = {}) {
        await this.simulateDelay(200);

        const { limit = 10, page = 1 } = options;
        const offset = (page - 1) * limit;

        console.log('👥 StaticDataService: Getting all members with', options);

        const result = getAllMembers(limit, offset);

        console.log('👥 StaticDataService: Returning', result.data.length, 'members');
        return result;
    }

    /**
     * Update Member
     * @param {string} memberNumber - Member number
     * @param {object} memberData - Updated member data
     * @returns {Promise<object>} Updated member data
     */
    async updateMember(memberNumber, memberData) {
        await this.simulateDelay(100);

        console.log('✏️ StaticDataService: Updating member', memberNumber, 'with data:', memberData);

        // In a real implementation, this would update the static data
        // For now, just return the updated data merged with existing data
        const existingMember = getMemberData(memberNumber);

        if (!existingMember) {
            const error = new Error('Member not found');
            error.status = 404;
            throw error;
        }

        const updatedMember = { ...existingMember, ...memberData };

        console.log('✏️ StaticDataService: Member updated successfully');
        return {
            success: true,
            data: updatedMember,
            message: 'Member updated successfully'
        };
    }

    /**
     * Authorization Details
     * @param {string} authorizationId - Authorization ID
     * @param {string} userMode - Current user mode
     * @param {array} scenarios - Active scenarios
     * @returns {Promise<object>} Authorization details
     */
    async getAuthorizationDetails(authorizationId, userMode = 'UM', scenarios = []) {
        await this.simulateDelay(100);

        console.log('📋 StaticDataService: Getting authorization details for', authorizationId);

        const authorizations = getAuthorizationsData(userMode, scenarios);
        const authorization = authorizations.find(auth =>
            auth.id.toString() === authorizationId.toString() ||
            auth.authorization_number === authorizationId
        );

        if (!authorization) {
            const error = new Error('Authorization not found');
            error.status = 404;
            throw error;
        }

        console.log('📋 StaticDataService: Returning authorization:', authorization.authorization_number);
        return authorization;
    }

    /**
     * Application Health Status
     * @returns {Promise<object>} Health status
     */
    async getHealthStatus() {
        await this.simulateDelay(50);

        return {
            status: 'OK',
            timestamp: new Date().toISOString(),
            mode: 'Static Data Mode',
            version: '2.0.0'
        };
    }

    /**
     * Generic error handler for consistent error responses
     * @param {Error} error - Error object
     * @returns {object} Formatted error
     */
    handleError(error) {
        return {
            message: error.message || 'An error occurred',
            status: error.status || 500,
            data: error.data || null
        };
    }
}

// Create and export a singleton instance
const staticDataService = new StaticDataService();
export default staticDataService;
