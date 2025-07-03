/**
 * Static Data Layer - Complete Application Data
 * This file contains all hardcoded data that replaces API calls
 * Organized by user modes and scenarios for dynamic data modification
 */

// =============================================================================
// DASHBOARD STATS DATA
// =============================================================================

export const DASHBOARD_STATS_DATA = {
    UM: {
        default: {
            date: "Monday, April 28", // Display date for dashboard header
            due_today_count: 56, // Based on next_review_date 
            high_priority_count: 6, // Count of High priority authorizations
            reminders_count: 6, // Same as due today
            start_this_week_count: 18, // Count of admissions this week
            total_pending_count: 7, // Count of Pending status
            total_in_review_count: 2, // Count of In Review status  
            total_approved_count: 0, // Count of Approved status
            total_denied_count: 0, // Count of Denied status
            total_count: 10 // Total authorizations
        },
        sepsis: {
            date: "Thursday, May 1", // Display date for sepsis scenario
            due_today_count: 49, // Updated for sepsis scenario
            high_priority_count: 5, // Updated for sepsis scenario
            reminders_count: 9, // Updated for sepsis scenario
            start_this_week_count: 21, // Updated for sepsis scenario
            total_pending_count: 7, // Same as default
            total_in_review_count: 2, // Same as default
            total_approved_count: 0, // Same as default
            total_denied_count: 0, // Same as default
            total_count: 10 // Same as default
        }
    },
    'UM-SNF': {
        default: {
            date: "Thursday, May 2", // Display date for UM-SNF dashboard header
            due_today_count: 51, // Updated from provided data
            high_priority_count: 6, // Updated from provided data
            reminders_count: 7, // Updated from provided data (reminder_for_today)
            start_this_week_count: 19, // Updated from provided data
            total_pending_count: 8, // Count of Pending status
            total_in_review_count: 1, // Count of In Review status
            total_approved_count: 0, // Count of Approved status
            total_denied_count: 0, // Count of Denied status
            total_count: 10 // Total SNF authorizations
        }
    },
    CM: {
        default: {
            due_today_count: 24, // Keep existing CM data
            overdue_count: 11,
            reminder_for_today_count: 5,
            start_this_week_count: 3
        }
    }
};

// =============================================================================
// AUTHORIZATIONS DATA
// =============================================================================

export const AUTHORIZATIONS_DATA = {
    UM: {
        default: [
            {
                id: 1,
                authorization_number: '2025OP000389',
                member_id: 1,
                member_number: 'MEM001',
                member_name: 'Abbott, Robert',
                priority: 'High',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Initial Review',
                received_date: '2025-04-28T03:47:01Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-04-28T10:00:00Z',
                pos: 'Silverpine Medical Center',
                diagnosis_code: 'DKA',
                diagnosis_name: 'Diabetic Ketoacidosis',
                drg_code: '637',
                provider_name: 'Silverpine Medical Center',
                provider_code: 'SILV001'
            },
            {
                id: 2,
                authorization_number: '2025OP000387',
                member_id: 2,
                member_number: 'MEM002',
                member_name: 'Perry, Samuel',
                priority: 'High',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Initial Review',
                received_date: '2025-04-28T04:35:02Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-04-28T10:30:00Z',
                pos: 'Evernorth Health ',
                diagnosis_code: 'CHF',
                diagnosis_name: 'Congestive Heart Failure',
                drg_code: '291',
                provider_name: 'Evernorth Health',
                provider_code: 'EVER001'
            },
            {
                id: 3,
                authorization_number: '2025OP000928',
                member_id: 3,
                member_number: 'MEM003',
                member_name: 'Sawyer, Kate',
                priority: 'High',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Concurrent Review',
                received_date: '2025-04-28T05:02:03Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-04-28T11:30:00Z',
                pos: 'Cascade Heart & Wellness',
                diagnosis_code: 'CKD',
                diagnosis_name: 'Chronic Kidney Disease',
                drg_code: '687',
                provider_name: 'Cascade Heart & Wellness',
                provider_code: 'CASC001'
            },
            {
                id: 4,
                authorization_number: '2025OP000278',
                member_id: 4,
                member_number: 'MEM004',
                member_name: 'Smith, Laura',
                priority: 'High',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Initial Review',
                received_date: '2025-04-28T05:47:04Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-04-28T12:00:00Z',
                pos: 'Palisade Regional Hospital',
                diagnosis_code: 'CKD',
                diagnosis_name: 'Chronic Kidney Disease',
                drg_code: '688~',
                provider_name: 'Palisade Regional Hospital',
                provider_code: 'PALI001'
            },
            {
                id: 5,
                authorization_number: '2025OP000378',
                member_id: 5,
                member_number: 'MEM005',
                member_name: 'Rutherford, Renee',
                priority: 'High',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Initial Review',
                received_date: '2025-04-28T06:14:05Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-04-28T12:30:00Z',
                pos: 'Trinity Oaks Health Alliance',
                diagnosis_code: 'DKA',
                diagnosis_name: 'Diabetic Ketoacidosis',
                drg_code: '637',
                provider_name: 'Trinity Oaks Health Alliance',
                provider_code: 'TRIN001'
            },
            {
                id: 6,
                authorization_number: '2025OP000312',
                member_id: 6,
                member_number: 'MEM006',
                member_name: 'Andrews, Mike',
                priority: 'High',
                status: 'APPEAL',
                request_type: 'Inpatient',
                review_type: 'Concurrent Review',
                received_date: '2025-04-27T17:38:06Z',
                admission_date: '2025-04-27',
                approved_days: 3,
                next_review_date: '2025-04-28T13:00:00Z',
                pos: 'LumenPoint Healthcare',
                diagnosis_code: 'DKA',
                diagnosis_name: 'Diabetic Ketoacidosis',
                drg_code: '638',
                provider_name: 'LumenPoint Healthcare',
                provider_code: 'LUME001'
            },
            {
                id: 7,
                authorization_number: '2025OP000152',
                member_id: 7,
                member_number: 'MEM007',
                member_name: 'Oliver, James',
                priority: 'Medium',
                status: 'In Review',
                request_type: 'Inpatient',
                review_type: 'Concurrent Review',
                received_date: '2025-04-27T14:34:07Z',
                admission_date: '2025-04-27',
                approved_days: 3,
                next_review_date: '2025-04-28T14:00:00Z',
                pos: 'St. Aurelius General',
                diagnosis_code: 'CELLULITIS',
                diagnosis_name: 'Cellulitis',
                drg_code: '602',
                provider_name: 'St. Aurelius General',
                provider_code: 'SAUR001'
            },
            {
                id: 8,
                authorization_number: '2025OP000369',
                member_id: 8,
                member_number: 'MEM008',
                member_name: 'Emerson, John',
                priority: 'Medium',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Initial Review',
                received_date: '2025-04-28T07:33:08Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-04-28T14:30:00Z',
                pos: 'Cobalt Bay Medical ',
                diagnosis_code: 'COPD',
                diagnosis_name: 'Chronic Obstructive Pulmonary Disease',
                drg_code: '191',
                provider_name: 'Cobalt Bay Medical',
                provider_code: 'COBA001'
            },
            {
                id: 9,
                authorization_number: '2025OP003189',
                member_id: 2,
                member_number: 'MEM002',
                member_name: 'Perry, Samuel',
                priority: 'Medium',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Concurrent Review',
                received_date: '2025-04-28T08:16:09Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-04-28T15:00:00Z',
                pos: 'Trinity Oaks Health Alliance',
                diagnosis_code: 'UTI',
                diagnosis_name: 'Urinary Tract Infection',
                drg_code: '690',
                provider_name: 'Trinity Oaks Health Alliance',
                provider_code: 'TRIN001'
            },
            {
                id: 10,
                authorization_number: '2025OP000390',
                member_id: 4,
                member_number: 'MEM004',
                member_name: 'Smith, Laura',
                priority: 'Medium',
                status: 'In Review',
                request_type: 'Inpatient',
                review_type: 'Initial Review',
                received_date: '2025-04-27T16:16:10Z',
                admission_date: '2025-04-27',
                approved_days: 3,
                next_review_date: '2025-04-28T15:30:00Z',
                pos: 'St. Aurelius General',
                diagnosis_code: 'DKA',
                diagnosis_name: 'Diabetic Ketoacidosis',
                drg_code: '637',
                provider_name: 'St. Aurelius General',
                provider_code: 'SAUR001'
            }
        ],
        sepsis: [
            {
                id: 1,
                authorization_number: '2025OP000389',
                member_id: 1,
                member_number: 'MEM001',
                member_name: 'Abbott, Robert',
                priority: 'High',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Concurrent Review', // Changed from Initial to Concurrent Review
                received_date: '2025-04-28T03:47:01Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-05-01T09:00:00Z', // Updated for May 1st
                pos: 'Silverpine Medical Center',
                diagnosis_code: 'DKA',
                diagnosis_name: 'Diabetic Ketoacidosis',
                drg_code: '637',
                provider_name: 'Silverpine Medical Center',
                provider_code: 'SILV001',
                sepsisAlert: true,
                urgentFlag: true
            },
            {
                id: 2,
                authorization_number: '2025OP000387',
                member_id: 2,
                member_number: 'MEM002',
                member_name: 'Perry, Samuel',
                priority: 'High',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Initial Review',
                received_date: '2025-04-28T04:35:02Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-05-01T09:30:00Z',
                pos: 'Evernorth Health',
                diagnosis_code: 'CHF',
                diagnosis_name: 'Congestive Heart Failure',
                drg_code: '292', // Updated DRG code
                provider_name: 'Evernorth Health',
                provider_code: 'EVER001'
            },
            {
                id: 3,
                authorization_number: '2025OP000928',
                member_id: 3,
                member_number: 'MEM003',
                member_name: 'Sawyer, Kate',
                priority: 'High',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Concurrent Review',
                received_date: '2025-04-28T05:02:03Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-05-01T10:00:00Z',
                pos: 'Cascade Heart & Wellness',
                diagnosis_code: 'CKD',
                diagnosis_name: 'Chronic Kidney Disease',
                drg_code: '688', // Updated DRG code
                provider_name: 'Cascade Heart & Wellness',
                provider_code: 'CASC001'
            },
            {
                id: 4,
                authorization_number: '2025OP000278',
                member_id: 4,
                member_number: 'MEM004',
                member_name: 'Smith, Laura',
                priority: 'High',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Initial Review',
                received_date: '2025-04-28T05:47:04Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-05-01T10:30:00Z',
                pos: 'Palisade Regional Hospital',
                diagnosis_code: 'CKD',
                diagnosis_name: 'Chronic Kidney Disease',
                drg_code: '687', // Updated DRG code
                provider_name: 'Palisade Regional Hospital',
                provider_code: 'PALI001'
            },
            {
                id: 5,
                authorization_number: '2025OP000378',
                member_id: 5,
                member_number: 'MEM005',
                member_name: 'Rutherford, Renee',
                priority: 'High',
                status: 'APPEAL', // Changed status to APPEAL
                request_type: 'Inpatient',
                review_type: 'Initial Review',
                received_date: '2025-04-28T06:14:05Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-05-01T11:00:00Z',
                pos: 'Trinity Oaks Health Alliance',
                diagnosis_code: 'DKA',
                diagnosis_name: 'Diabetic Ketoacidosis',
                drg_code: '638', // Updated DRG code
                provider_name: 'Trinity Oaks Health Alliance',
                provider_code: 'TRIN001'
            },
            {
                id: 6,
                authorization_number: '2025OP000312',
                member_id: 6,
                member_number: 'MEM006',
                member_name: 'Andrews, Mike',
                priority: 'Medium', // Changed from High to Medium
                status: 'Pending', // Changed from APPEAL to Pending
                request_type: 'Inpatient',
                review_type: 'Concurrent Review',
                received_date: '2025-04-27T17:38:06Z',
                admission_date: '2025-04-27',
                approved_days: 3,
                next_review_date: '2025-05-01T12:30:00Z',
                pos: 'LumenPoint Healthcare',
                diagnosis_code: 'DKA',
                diagnosis_name: 'Diabetic Ketoacidosis',
                drg_code: '638',
                provider_name: 'LumenPoint Healthcare',
                provider_code: 'LUME001'
            },
            {
                id: 7,
                authorization_number: '2025OP000152',
                member_id: 7,
                member_number: 'MEM007',
                member_name: 'Oliver, James',
                priority: 'Medium',
                status: 'In Review',
                request_type: 'Inpatient',
                review_type: 'Concurrent Review',
                received_date: '2025-04-27T14:34:07Z',
                admission_date: '2025-04-27',
                approved_days: 3,
                next_review_date: '2025-05-01T13:00:00Z',
                pos: 'St. Aurelius General',
                diagnosis_code: 'CELLULITIS',
                diagnosis_name: 'Cellulitis',
                drg_code: '602',
                provider_name: 'St. Aurelius General',
                provider_code: 'SAUR001'
            },
            {
                id: 8,
                authorization_number: '2025OP000369',
                member_id: 8,
                member_number: 'MEM008',
                member_name: 'Emerson, John',
                priority: 'Medium',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Initial Review',
                received_date: '2025-04-28T07:33:08Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-05-01T13:15:00Z',
                pos: 'Cobalt Bay Medical',
                diagnosis_code: 'COPD',
                diagnosis_name: 'Chronic Obstructive Pulmonary Disease',
                drg_code: '191',
                provider_name: 'Cobalt Bay Medical',
                provider_code: 'COBA001'
            },
            {
                id: 9,
                authorization_number: '2025OP003189',
                member_id: 9,
                member_number: 'MEM009',
                member_name: 'Perry, Tyler', // Changed from Samuel to Tyler
                priority: 'Medium',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Concurrent Review',
                received_date: '2025-04-28T08:16:09Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-05-01T13:30:00Z',
                pos: 'Trinity Oaks Health Alliance',
                diagnosis_code: 'UTI',
                diagnosis_name: 'Urinary Tract Infection',
                drg_code: '690',
                provider_name: 'Trinity Oaks Health Alliance',
                provider_code: 'TRIN001'
            },
            {
                id: 10,
                authorization_number: '2025OP000390',
                member_id: 4,
                member_number: 'MEM004',
                member_name: 'Smith, Laura',
                priority: 'Medium',
                status: 'In Review',
                request_type: 'Inpatient',
                review_type: 'Initial Review',
                received_date: '2025-04-27T16:16:10Z',
                admission_date: '2025-04-27',
                approved_days: 3,
                next_review_date: '2025-05-01T13:45:00Z',
                pos: 'St. Aurelius General',
                diagnosis_code: 'DKA',
                diagnosis_name: 'Diabetic Ketoacidosis',
                drg_code: '637',
                provider_name: 'St. Aurelius General',
                provider_code: 'SAUR001'
            }
        ]
    },
    'UM-SNF': {
        default: [
            {
                id: 1,
                authorization_number: '2025OP000390',
                member_id: 1,
                member_number: 'MEM001',
                member_name: 'Abbott, Robert',
                priority: 'High',
                status: 'Pending',
                request_type: 'Post Acute Transition',
                review_type: 'Discharge to SNF',
                received_date: '2025-04-27T16:16:00Z',
                admission_date: '2025-04-27',
                approved_days: 3,
                next_review_date: '2025-05-03T01:45:00Z',
                pos: 'Silverpine Medical Center',
                diagnosis_code: 'DKA',
                diagnosis_name: 'Diabetic Ketoacidosis',
                drg_code: 'JKL',
                provider_name: 'Silverpine Medical Center',
                provider_code: 'SILV001'
            },
            {
                id: 2,
                authorization_number: '2025OP000389',
                member_id: 1,
                member_number: 'MEM001',
                member_name: 'Abbott, Robert',
                priority: 'High',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Discharge from IP to SNF',
                received_date: '2025-04-28T03:47:00Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-05-03T09:00:00Z',
                pos: 'Silverpine Medical Center',
                diagnosis_code: 'DKA',
                diagnosis_name: 'Diabetic Ketoacidosis',
                drg_code: 'ABC',
                provider_name: 'Silverpine Medical Center',
                provider_code: 'SILV001'
            },
            {
                id: 3,
                authorization_number: '2025OP000387',
                member_id: 9,
                member_number: 'MEM009',
                member_name: 'Perry, Tyler',
                priority: 'High',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Initial Review',
                received_date: '2025-04-28T04:35:00Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-05-03T09:30:00Z',
                pos: 'Evernorth Health',
                diagnosis_code: 'CHF',
                diagnosis_name: 'Congestive Heart Failure',
                drg_code: 'BCD',
                provider_name: 'Evernorth Health',
                provider_code: 'EVER001'
            },
            {
                id: 4,
                authorization_number: '2025OP000928',
                member_id: 3,
                member_number: 'MEM003',
                member_name: 'Sawyer, Kate',
                priority: 'High',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Concurrent Review',
                received_date: '2025-04-28T05:02:00Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-05-03T10:00:00Z',
                pos: 'Cascade Heart & Wellness',
                diagnosis_code: 'CKD',
                diagnosis_name: 'Chronic Kidney Disease',
                drg_code: 'CDE',
                provider_name: 'Cascade Heart & Wellness',
                provider_code: 'CASC001'
            },
            {
                id: 5,
                authorization_number: '2025OP000278',
                member_id: 4,
                member_number: 'MEM004',
                member_name: 'Smith, Laura',
                priority: 'High',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Initial Review',
                received_date: '2025-04-28T05:47:00Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-05-03T10:30:00Z',
                pos: 'Palisade Regional Hospital',
                diagnosis_code: 'CKD',
                diagnosis_name: 'Chronic Kidney Disease',
                drg_code: 'DEF',
                provider_name: 'Palisade Regional Hospital',
                provider_code: 'PALI001'
            },
            {
                id: 6,
                authorization_number: '2025OP000378',
                member_id: 5,
                member_number: 'MEM005',
                member_name: 'Rutherford, Renee',
                priority: 'High',
                status: 'APPEAL',
                request_type: 'Inpatient',
                review_type: 'Initial Review',
                received_date: '2025-04-28T06:14:00Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-05-03T11:00:00Z',
                pos: 'Trinity Oaks Health Alliance',
                diagnosis_code: 'DKA',
                diagnosis_name: 'Diabetic Ketoacidosis',
                drg_code: 'EFG',
                provider_name: 'Trinity Oaks Health Alliance',
                provider_code: 'TRIN001'
            },
            {
                id: 7,
                authorization_number: '2025OP000312',
                member_id: 6,
                member_number: 'MEM006',
                member_name: 'Andrews, Mike',
                priority: 'High',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Concurrent Review',
                received_date: '2025-04-27T17:38:00Z',
                admission_date: '2025-04-27',
                approved_days: 3,
                next_review_date: '2025-05-03T12:30:00Z',
                pos: 'LumenPoint Healthcare',
                diagnosis_code: 'DKA',
                diagnosis_name: 'Diabetic Ketoacidosis',
                drg_code: 'FGH',
                provider_name: 'LumenPoint Healthcare',
                provider_code: 'LUME001'
            },
            {
                id: 8,
                authorization_number: '2025OP000152',
                member_id: 7,
                member_number: 'MEM007',
                member_name: 'Oliver, James',
                priority: 'Medium',
                status: 'In Review',
                request_type: 'Inpatient',
                review_type: 'Concurrent Review',
                received_date: '2025-04-27T14:34:00Z',
                admission_date: '2025-04-27',
                approved_days: 3,
                next_review_date: '2025-05-03T13:00:00Z',
                pos: 'St. Aurelius General',
                diagnosis_code: 'CELLULITIS',
                diagnosis_name: 'Cellulitis',
                drg_code: 'GHI',
                provider_name: 'St. Aurelius General',
                provider_code: 'SAUR001'
            },
            {
                id: 9,
                authorization_number: '2025OP000369',
                member_id: 8,
                member_number: 'MEM008',
                member_name: 'Emerson, John',
                priority: 'Medium',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Initial Review',
                received_date: '2025-04-28T07:33:00Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-05-03T13:15:00Z',
                pos: 'Cobalt Bay Medical',
                diagnosis_code: 'COPD',
                diagnosis_name: 'Chronic Obstructive Pulmonary Disease',
                drg_code: 'HIJ',
                provider_name: 'Cobalt Bay Medical',
                provider_code: 'COBA001'
            },
            {
                id: 10,
                authorization_number: '2025OP003189',
                member_id: 9,
                member_number: 'MEM009',
                member_name: 'Perry, Tyler',
                priority: 'Medium',
                status: 'Pending',
                request_type: 'Inpatient',
                review_type: 'Concurrent Review',
                received_date: '2025-04-28T08:16:00Z',
                admission_date: '2025-04-28',
                approved_days: 3,
                next_review_date: '2025-05-03T13:30:00Z',
                pos: 'Trinity Oaks Health Alliance',
                diagnosis_code: 'UTI',
                diagnosis_name: 'Urinary Tract Infection',
                drg_code: 'IJK',
                provider_name: 'Trinity Oaks Health Alliance',
                provider_code: 'TRIN001'
            }
        ]
    }
};

// =============================================================================
// MEMBER DATA
// =============================================================================

export const MEMBER_DATA = {
    'MEM001': {
        id: 1,
        member_number: 'MEM001',
        first_name: 'Robert',
        last_name: 'Abbott',
        name: 'Robert Abbott',
        dob: '1985-03-15',
        gender: 'Male',
        address: null,
        phone: null,
        email: null,
        insurance_group: 'Health Plan A',
        policy_number: null,
        effectiveDate: '2024-01-01',
        status: 'Active'
    },
    'MEM002': {
        id: 2,
        member_number: 'MEM002',
        first_name: 'Samuel',
        last_name: 'Perry',
        name: 'Samuel Perry',
        dob: '1978-07-22',
        gender: 'Male',
        address: null,
        phone: null,
        email: null,
        insurance_group: 'Health Plan B',
        policy_number: null,
        effectiveDate: '2024-02-01',
        status: 'Active'
    },
    'MEM003': {
        id: 3,
        member_number: 'MEM003',
        first_name: 'Kate',
        last_name: 'Sawyer',
        name: 'Kate Sawyer',
        dob: '1992-11-08',
        gender: 'Female',
        address: null,
        phone: null,
        email: null,
        insurance_group: 'Health Plan C',
        policy_number: null,
        effectiveDate: '2024-03-01',
        status: 'Active'
    },
    'MEM004': {
        id: 4,
        member_number: 'MEM004',
        first_name: 'Laura',
        last_name: 'Smith',
        name: 'Laura Smith',
        dob: '1981-05-30',
        gender: 'Female',
        address: null,
        phone: null,
        email: null,
        insurance_group: 'Health Plan D',
        policy_number: null,
        effectiveDate: '2024-04-01',
        status: 'Active'
    },
    'MEM005': {
        id: 5,
        member_number: 'MEM005',
        first_name: 'Renee',
        last_name: 'Rutherford',
        name: 'Renee Rutherford',
        dob: '1975-09-12',
        gender: 'Female',
        address: null,
        phone: null,
        email: null,
        insurance_group: 'Health Plan E',
        policy_number: null,
        effectiveDate: '2024-05-01',
        status: 'Active'
    },
    'MEM006': {
        id: 6,
        member_number: 'MEM006',
        first_name: 'Mike',
        last_name: 'Andrews',
        name: 'Mike Andrews',
        dob: '1988-12-04',
        gender: 'Male',
        address: null,
        phone: null,
        email: null,
        insurance_group: 'Health Plan F',
        policy_number: null,
        effectiveDate: '2024-06-01',
        status: 'Active'
    },
    'MEM007': {
        id: 7,
        member_number: 'MEM007',
        first_name: 'James',
        last_name: 'Oliver',
        name: 'James Oliver',
        dob: '1973-04-18',
        gender: 'Male',
        address: null,
        phone: null,
        email: null,
        insurance_group: 'Health Plan G',
        policy_number: null,
        effectiveDate: '2024-07-01',
        status: 'Active'
    },
    'MEM008': {
        id: 8,
        member_number: 'MEM008',
        first_name: 'John',
        last_name: 'Emerson',
        name: 'John Emerson',
        dob: '1990-08-25',
        gender: 'Male',
        address: null,
        phone: null,
        email: null,
        insurance_group: 'Health Plan H',
        policy_number: null,
        effectiveDate: '2024-08-01',
        status: 'Active'
    },
    'MEM009': {
        id: 9,
        member_number: 'MEM009',
        first_name: 'Tyler',
        last_name: 'Perry',
        name: 'Tyler Perry',
        dob: '1980-09-13',
        gender: 'Male',
        address: null,
        phone: null,
        email: null,
        insurance_group: 'Health Plan I',
        policy_number: null,
        effectiveDate: '2024-09-01',
        status: 'Active'
    },
    // Default member data for routing edge cases
    'M1000020000': {
        id: 'M001234',
        member_number: 'M1000020000',
        first_name: 'Robert',
        last_name: 'Abbott',
        name: 'Robert Abbott',
        dob: '1985-03-15',
        gender: 'Male',
        address: null,
        phone: null,
        email: null,
        insurance_group: 'Health Plan A',
        policy_number: null,
        effectiveDate: '2024-01-01',
        status: 'Active'
    }
};

// =============================================================================
// DATA ACCESS FUNCTIONS
// =============================================================================

/**
 * Get dashboard stats based on user mode and scenarios
 * @param {string} userMode - User mode (UM, UM-SNF, CM)
 * @param {array} scenarios - Active scenarios (e.g., ['sepsis'])
 * @returns {object} Dashboard stats
 */
export const getDashboardStats = (userMode = 'UM', scenarios = []) => {
    const modeData = DASHBOARD_STATS_DATA[userMode] || DASHBOARD_STATS_DATA.UM;

    // Check if sepsis scenario is active for UM users only
    if (userMode === 'UM' && scenarios.includes('sepsis')) {
        return modeData.sepsis || modeData.default;
    }

    return modeData.default;
};

/**
 * Get authorizations data based on user mode and scenarios
 * @param {string} userMode - User mode (UM, UM-SNF, CM)
 * @param {array} scenarios - Active scenarios (e.g., ['sepsis'])
 * @returns {array} Authorizations array
 */
export const getAuthorizationsData = (userMode = 'UM', scenarios = []) => {
    console.log('🔍 getAuthorizationsData called with:', { userMode, scenarios });

    const modeData = AUTHORIZATIONS_DATA[userMode] || AUTHORIZATIONS_DATA.UM;
    console.log('🔍 Mode data found:', !!modeData);
    console.log('🔍 Available modes in AUTHORIZATIONS_DATA:', Object.keys(AUTHORIZATIONS_DATA));

    // Check if sepsis scenario is active for UM users only
    if (userMode === 'UM' && scenarios.includes('sepsis')) {
        const result = modeData.sepsis || modeData.default;
        console.log('🔍 Returning sepsis data for UM:', result ? result.length : 'null');
        return result;
    }

    const result = modeData.default || [];
    console.log('🔍 Returning default data:', result ? result.length : 'null');
    return result;
};

/**
 * Get member data by member number
 * @param {string} memberNumber - Member number (e.g., 'MEM001')
 * @param {string} userMode - User mode for any mode-specific modifications
 * @param {array} scenarios - Active scenarios for any scenario-specific modifications
 * @returns {object|null} Member data or null if not found
 */
export const getMemberData = (memberNumber, userMode = 'UM', scenarios = []) => {
    const member = MEMBER_DATA[memberNumber];

    if (!member) {
        console.warn(`⚠️ Member ${memberNumber} not found in static data`);
        return null;
    }

    // Apply scenario-specific modifications
    let modifiedMember = { ...member };

    // Apply sepsis modifications for Robert Abbott if sepsis scenario is active
    if ((userMode === 'UM' || userMode === 'UM-SNF') && scenarios.includes('sepsis') &&
        (memberNumber === 'MEM001' || memberNumber === 'M1000020000' || member.name === 'Robert Abbott')) {
        // Future: Add other sepsis-related modifications here without alert
        console.log('🦠 Sepsis scenario active for Robert Abbott in', userMode, 'mode');
    }

    return modifiedMember;
};

/**
 * Search members by query string
 * @param {string} query - Search query
 * @returns {array} Array of matching members
 */
export const searchMembers = (query) => {
    if (!query || query.trim().length === 0) {
        return [];
    }

    const searchTerm = query.toLowerCase();
    return Object.values(MEMBER_DATA).filter(member =>
        member.first_name.toLowerCase().includes(searchTerm) ||
        member.last_name.toLowerCase().includes(searchTerm) ||
        member.member_number.toLowerCase().includes(searchTerm) ||
        member.email.toLowerCase().includes(searchTerm)
    );
};

/**
 * Get all members with pagination
 * @param {number} limit - Number of results per page
 * @param {number} offset - Offset for pagination
 * @returns {object} Paginated results with data and pagination info
 */
export const getAllMembers = (limit = 10, offset = 0) => {
    const allMembers = Object.values(MEMBER_DATA);
    const total = allMembers.length;
    const paginatedMembers = allMembers.slice(offset, offset + limit);

    return {
        data: paginatedMembers,
        pagination: {
            total,
            limit,
            offset,
            page: Math.floor(offset / limit) + 1,
            pages: Math.ceil(total / limit)
        }
    };
};

// Test function for browser console debugging
window.testStaticData = () => {
    console.log('=== TESTING STATIC DATA ===');
    console.log('UM default authorizations:', getAuthorizationsData('UM', []).length);
    console.log('UM sepsis authorizations:', getAuthorizationsData('UM', ['sepsis']).length);
    console.log('UM-SNF default authorizations:', getAuthorizationsData('UM-SNF', []).length);
    console.log('UM dashboard stats:', getDashboardStats('UM', []));
    console.log('UM-SNF dashboard stats:', getDashboardStats('UM-SNF', []));
    console.log('Available data modes:', Object.keys(AUTHORIZATIONS_DATA));
    return {
        umAuth: getAuthorizationsData('UM', []),
        umSnfAuth: getAuthorizationsData('UM-SNF', []),
        umStats: getDashboardStats('UM', []),
        umSnfStats: getDashboardStats('UM-SNF', [])
    };
};

// =============================================================================
// EXPORTS FOR BACKWARD COMPATIBILITY
// =============================================================================

// Re-export CM data for backward compatibility
export { CM_STATS_DATA, CM_TASKS_DATA, GROUP_QUEUES_DATA, getCMData } from './cmData';

// Default export with all functions
const staticDataModule = {
    getDashboardStats,
    getAuthorizationsData,
    getMemberData,
    searchMembers,
    getAllMembers,
    DASHBOARD_STATS_DATA,
    AUTHORIZATIONS_DATA,
    MEMBER_DATA
};

export default staticDataModule;
