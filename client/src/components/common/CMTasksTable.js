import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Dashboard.module.css';

/**
 * CM Tasks Table Component for Case Management Dashboard
 */
const CMTasksTable = ({ tasks, onRowClick }) => {
    const getPriorityClass = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return styles.high;
            case 'medium': return styles.medium;
            case 'low': return styles.low;
            default: return styles.low;
        }
    };

    return (
        <div className={styles.tableContainer}>
            <table id="cm-tasks-table" className={styles.authTable}>
                <thead>
                    <tr className={styles.tableHeader}>
                        <th className={styles.priorityCell}></th>
                        <th className={styles.tableHeaderCell}>
                            Priority <span className={styles.prioritySortIcon}>↓</span>
                        </th>
                        <th className={styles.tableHeaderCell}>Activity</th>
                        <th className={styles.tableHeaderCell}>Type</th>
                        <th className={`${styles.tableHeaderCell} ${styles.posColumnHeader}`}>POS</th>
                        <th className={styles.tableHeaderCell}>Diagnosis</th>
                        <th className={styles.tableHeaderCell}>Member Name</th>
                        <th className={styles.tableHeaderCell}>Due Date</th>
                        <th className={styles.tableHeaderCell}>Status</th>
                        <th className={styles.tableHeaderCell}>Action</th>
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
                                onClick={() => onRowClick && onRowClick(task)}
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
