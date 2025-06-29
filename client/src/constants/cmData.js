/**
 * Case Management Dashboard Static Data
 * This data structure allows for easy updates based on localStorage scenarios
 */

// CM Dashboard Stats Cards Data
export const CM_STATS_DATA = {
    default: {
        due_today_count: 24,
        overdue_count: 11,
        reminder_for_today_count: 5,
        start_this_week_count: 3
    },
    // Future scenarios can be added here
    // scenario1: { ... },
    // scenario2: { ... }
};

// CM Dashboard Tasks Table Data
export const CM_TASKS_DATA = {
    default: [
        {
            id: 1,
            member_id: 1,
            member_number: 'MEM001',
            priority: 'High',
            activity: 'Initial meeting',
            type: 'Discharge Planning',
            pos: 'SNF',
            diagnosis: 'DKA, CHF',
            member_name: 'Abbott, Robert',
            due_date: '05/01/2025 1:00 PM',
            status: 'Pending'
        },
        {
            id: 2,
            member_id: 2,
            member_number: 'MEM002',
            priority: 'High',
            activity: 'Review care plan',
            type: 'Readmission Risk',
            pos: 'SNF',
            diagnosis: 'CHF',
            member_name: 'Perry, Samuel',
            due_date: '05/01/2025 4:00 PM',
            status: 'Pending'
        },
        {
            id: 3,
            member_id: 4,
            member_number: 'MEM004',
            priority: 'High',
            activity: 'Call member',
            type: 'Readmission Risk',
            pos: 'Home',
            diagnosis: 'CKD',
            member_name: 'Smith, Laura',
            due_date: '05/02/2025 11:00 AM',
            status: 'Pending'
        },
        {
            id: 4,
            member_id: 8,
            member_number: 'MEM008',
            priority: 'High',
            activity: 'Meet care team',
            type: 'Discharge Planning',
            pos: 'LTACH',
            diagnosis: 'COPD',
            member_name: 'Emerson, John',
            due_date: '05/02/2025 3:00 PM',
            status: 'Pending'
        },
        {
            id: 5,
            member_id: 5,
            member_number: 'MEM005',
            priority: 'Medium',
            activity: 'Assessment',
            type: 'Readmission Risk',
            pos: 'SNF',
            diagnosis: 'DKA',
            member_name: 'Rutherford, Renee',
            due_date: '05/04/2025 11:00 AM',
            status: 'Pending'
        },
        {
            id: 6,
            member_id: 7,
            member_number: 'MEM007',
            priority: 'Medium',
            activity: 'Meet care team',
            type: 'Transition of Care',
            pos: 'Home',
            diagnosis: 'Cellulitis',
            member_name: 'Oliver, James',
            due_date: '05/04/2025 12:00 PM',
            status: 'Pending'
        },
        {
            id: 7,
            member_id: 3,
            member_number: 'MEM003',
            priority: 'Medium',
            activity: 'Review discharge',
            type: 'Transition of Care',
            pos: 'LTACH',
            diagnosis: 'CKD',
            member_name: 'Sawyer, Kate',
            due_date: '05/04/2025 1:00 PM',
            status: 'Pending'
        },
        {
            id: 8,
            member_id: 2,
            member_number: 'MEM002',
            priority: 'Medium',
            activity: 'Call member',
            type: 'Care Planning',
            pos: 'IRF',
            diagnosis: 'UTI',
            member_name: 'Perry, Samuel',
            due_date: '05/04/2025 2:00 PM',
            status: 'Pending'
        },
        {
            id: 9,
            member_id: 4,
            member_number: 'MEM004',
            priority: 'Medium',
            activity: 'Initial meeting',
            type: 'Readmission Risk',
            pos: 'IRF',
            diagnosis: 'DKA',
            member_name: 'Smith, Laura',
            due_date: '05/04/2025 3:00 PM',
            status: 'Pending'
        },
        {
            id: 10,
            member_id: 6,
            member_number: 'MEM006',
            priority: 'Medium',
            activity: 'Review care plan',
            type: 'Readmission Risk',
            pos: 'Home',
            diagnosis: 'DKA',
            member_name: 'Andrews, Mike',
            due_date: '05/04/2025 4:00 PM',
            status: 'Pending'
        }
    ]
    // Future scenarios can be added here
    // scenario1: [...],
    // scenario2: [...]
};

// Group Queues Chart Data
export const GROUP_QUEUES_DATA = {
    default: [
        { label: 'Assessment', count: 39, color: '#737373' },
        { label: 'Care Coordination ERM PH', count: 42, color: '#A9A9A9' },
        { label: 'Dietitian', count: 31, color: '#737373' },
        { label: 'Pharmacist', count: 23, color: '#878787' },
        { label: 'Screening Queue', count: 87, color: '#737373' }
    ]
    // Future scenarios can be added here
    // scenario1: [...],
    // scenario2: [...]
};

/**
 * Get CM data based on current scenario from localStorage
 * @param {string} dataType - 'stats', 'tasks', or 'queues'
 * @param {string} scenario - scenario name, defaults to 'default'
 * @returns {Object|Array} The requested data
 */
export const getCMData = (dataType, scenario = 'default') => {
    switch (dataType) {
        case 'stats':
            return CM_STATS_DATA[scenario] || CM_STATS_DATA.default;
        case 'tasks':
            return CM_TASKS_DATA[scenario] || CM_TASKS_DATA.default;
        case 'queues':
            return GROUP_QUEUES_DATA[scenario] || GROUP_QUEUES_DATA.default;
        default:
            return null;
    }
};
