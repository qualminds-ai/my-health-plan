import dataService from './dataService';

/**
 * Member Service
 * Handles all member-related API calls
 * Now uses dataService which automatically routes to static data or API
 */
class MemberService {
    /**
     * Get member by number
     */
    async getMemberByNumber(memberNumber, userMode, scenarios) {
        const data = await dataService.getMemberByNumber(memberNumber, userMode, scenarios);

        // Transform snake_case to camelCase for frontend consistency
        if (data) {
            return {
                ...data,
                memberNumber: data.member_number || data.memberNumber,
                firstName: data.first_name || data.firstName,
                lastName: data.last_name || data.lastName,
                dateOfBirth: data.dob || data.dateOfBirth,
                primaryCareProvider: data.pcp || data.primaryCareProvider
            };
        }

        return data;
    }

    /**
     * Get all members
     */
    async getAllMembers(options = {}) {
        return await dataService.getAllMembers(options);
    }

    /**
     * Search members
     */
    async searchMembers(query) {
        return await dataService.searchMembers(query);
    }

    /**
     * Update member
     */
    async updateMember(memberNumber, memberData) {
        return await dataService.updateMember(memberNumber, memberData);
    }
}

const memberService = new MemberService();
export default memberService;
