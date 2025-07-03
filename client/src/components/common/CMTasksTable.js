import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Dashboard.module.css';

/**
 * CM Tasks Table Component for Case Management Dashboard
 */
const CMTasksTable = ({ tasks, onRowClick }) => {
    // Detect at_home=2 scenario
    const isAtHome2Scenario = () => {
        // Check hash-based URL first (e.g., #/dashboard?at_home=2)
        if (window.location.hash?.includes('?')) {
            const hashParts = window.location.hash.split('?');
            if (hashParts.length > 1) {
                const hashParams = new URLSearchParams(hashParts[1]);
                return hashParams.get('at_home') === '2';
            }
        }

        // Fallback to regular URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('at_home') === '2';
    };

    const getPriorityClass = (priority) => {
        const isAtHome2 = isAtHome2Scenario();

        if (isAtHome2) {
            // Special colors for at_home=2 scenario
            switch (priority?.toLowerCase()) {
                case 'high': return styles.athome2High;
                case 'medium': return styles.athome2Medium;
                case 'low': return styles.low; // Keep default low priority color
                default: return styles.low;
            }
        } else {
            // Default priority colors
            switch (priority?.toLowerCase()) {
                case 'high': return styles.high;
                case 'medium': return styles.medium;
                case 'low': return styles.low;
                default: return styles.low;
            }
        }
    };

    return (
        <div className={styles.tableContainer}>
            <table id="cm-tasks-table" className={styles.authTable}>
                <thead>
                    <tr className={`${styles.tableHeader} ${isAtHome2Scenario() ? styles.athome2 : ''}`}>
                        <th className={`${styles.priorityCell} ${isAtHome2Scenario() ? styles.athome2 : ''}`}></th>
                        <th className={`${styles.tableHeaderCell} ${isAtHome2Scenario() ? styles.athome2 : ''}`}>
                            Priority <span className={styles.prioritySortIcon}>↓</span>
                        </th>
                        <th className={`${styles.tableHeaderCell} ${isAtHome2Scenario() ? styles.athome2 : ''}`}>Activity</th>
                        <th className={`${styles.tableHeaderCell} ${isAtHome2Scenario() ? styles.athome2 : ''}`}>Type</th>
                        <th className={`${styles.tableHeaderCell} ${styles.posColumnHeader} ${isAtHome2Scenario() ? styles.athome2 : ''}`}>POS</th>
                        <th className={`${styles.tableHeaderCell} ${isAtHome2Scenario() ? styles.athome2 : ''}`}>Diagnosis</th>
                        <th className={`${styles.tableHeaderCell} ${isAtHome2Scenario() ? styles.athome2 : ''}`}>Member Name</th>
                        <th className={`${styles.tableHeaderCell} ${isAtHome2Scenario() ? styles.athome2 : ''}`}>Due Date</th>
                        <th className={`${styles.tableHeaderCell} ${isAtHome2Scenario() ? styles.athome2 : ''}`}>Status</th>
                        <th className={`${styles.tableHeaderCell} ${isAtHome2Scenario() ? styles.athome2 : ''}`}>Action</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {tasks.map((task, idx) => {
                        const memberRowId = task.member_number || `MEM${String(task.member_id || idx + 1).padStart(3, '0')}`;
                        const priorityClass = getPriorityClass(task.priority);

                        return (
                            <tr
                                key={task.id || idx}
                                id={`member-row-${memberRowId}`}
                                data-member-id={task.member_id}
                                data-member-number={task.member_number}
                                data-task-id={task.id}
                                className={styles.tableRow}
                                onClick={() => onRowClick?.(task)}
                            >
                                <td className={`${styles.priorityStrip} ${priorityClass}`}></td>
                                <td className={`${styles.tableCell} ${styles.priority}`}>{task.priority}</td>
                                <td className={`${styles.tableCell} ${styles.secondary}`}>{task.activity}</td>
                                <td className={`${styles.tableCell} ${styles.secondary}`}>{task.type}</td>
                                <td
                                    className={`${styles.tableCell} ${styles.secondary} ${styles.posCell}`}
                                    data-full-text={task.pos}
                                    title={task.pos}
                                >
                                    {task.pos}
                                </td>
                                <td className={`${styles.tableCell} ${styles.secondary}`}>{task.diagnosis}</td>
                                <td className={`${styles.tableCell} ${styles.secondary}`}>{task.member_name}</td>
                                <td className={`${styles.tableCell} ${styles.primary}`}>{task.due_date}</td>
                                <td className={`${styles.tableCell} ${styles.primary}`}>{task.status}</td>
                                <td className={styles.tableCell} style={{ textAlign: 'right' }}>
                                    <button
                                        id={`action-menu-member-row-${memberRowId}`}
                                        className={styles.actionButton}
                                        type="button"
                                        aria-label="Open action menu"
                                    >
                                        <svg width="20" height="5" viewBox="0 0 20 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="2.5" cy="2.5" r="2.5" fill="#02060E" />
                                            <circle cx="10" cy="2.5" r="2.5" fill="#02060E" />
                                            <circle cx="17.5" cy="2.5" r="2.5" fill="#02060E" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Empty state */}
            {tasks.length === 0 && (
                <div className={styles.emptyState}>
                    <svg className={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className={styles.emptyTitle}>No case management tasks</h3>
                    <p className={styles.emptyText}>No tasks requiring case management review at this time.</p>
                </div>
            )}
        </div>
    );
};

CMTasksTable.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRowClick: PropTypes.func
};

export default CMTasksTable;
