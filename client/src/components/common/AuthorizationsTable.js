import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Dashboard.module.css';
import VectorRightIcon from '../../assets/dashboard/Vector-right.svg';

const AuthorizationsTable = ({ authorizations, onRowClick, formatDate, formatDateTime }) => {
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
            {authorizations.length > 0 && (
                <div className={styles.vectorIcon}>
                    <img src={VectorRightIcon} alt="Row indicator" width="14" height="18" />
                </div>
            )}
            <table id="authorizations-table" className={styles.authTable}>
                <thead>
                    <tr className={styles.tableHeader}>
                        <th className={styles.priorityCell}></th>
                        <th className={styles.tableHeaderCell}>
                            Priority <span className={styles.prioritySortIcon}>↓</span>
                        </th>
                        <th className={styles.tableHeaderCell}>Authorization #</th>
                        <th className={styles.tableHeaderCell}>Received Date</th>
                        <th className={styles.tableHeaderCell}>Admission Date</th>
                        <th className={styles.tableHeaderCell}>Diagnosis</th>
                        <th className={styles.tableHeaderCell}>DRG</th>
                        <th className={styles.tableHeaderCell}>Request Type</th>
                        <th className={`${styles.tableHeaderCell} ${styles.posColumnHeader}`}>POS</th>
                        <th className={styles.tableHeaderCell}>Type</th>
                        <th className={styles.tableHeaderCell}>Member Name</th>
                        <th className={styles.tableHeaderCell}>Approved Days</th>
                        <th className={styles.tableHeaderCell}>Next Review Date</th>
                        <th className={styles.tableHeaderCell}>Status</th>
                        <th className={styles.tableHeaderCell}>Action</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {authorizations.map((auth, idx) => {
                        const memberRowId = auth.member_number || `MEM${String(idx + 1).padStart(3, '0')}`;
                        const priorityClass = getPriorityClass(auth.priority);
                        const rowClass = styles.tableRow;

                        return (
                            <tr
                                key={auth.authorization_number || auth.id}
                                id={`member-row-${memberRowId}`}
                                data-member-id={auth.member_id}
                                data-authorization-number={auth.authorization_number}
                                className={rowClass}
                                onClick={() => onRowClick(auth)}
                            >
                                <td className={`${styles.priorityStrip} ${priorityClass}`}></td>
                                <td className={`${styles.tableCell} ${styles.priority}`}>{auth.priority}</td>
                                <td className={`${styles.tableCell} ${styles.secondary}`}>{auth.authorization_number}</td>
                                <td className={`${styles.tableCell} ${styles.primary}`}>{formatDateTime(auth.received_date)}</td>
                                <td className={`${styles.tableCell} ${styles.primary}`}>{formatDate(auth.admission_date)}</td>
                                <td className={`${styles.tableCell} ${styles.secondary}`}>{auth.diagnosis_code}</td>
                                <td className={`${styles.tableCell} ${styles.secondary}`}>{auth.drg_code}</td>
                                <td className={`${styles.tableCell} ${styles.secondary}`}>{auth.request_type}</td>
                                <td
                                    className={`${styles.tableCell} ${styles.secondary} ${styles.posCell}`}
                                    data-full-text={auth.pos}
                                    title={auth.pos}
                                >
                                    {auth.pos}
                                </td>
                                <td className={`${styles.tableCell} ${styles.secondary}`}>{auth.review_type}</td>
                                <td className={`${styles.tableCell} ${styles.secondary}`}>{auth.member_name}</td>
                                <td className={`${styles.tableCell} ${styles.primary}`}>{auth.approved_days}</td>
                                <td className={`${styles.tableCell} ${styles.primary}`}>{formatDateTime(auth.next_review_date)}</td>
                                <td className={`${styles.tableCell} ${styles.primary}`}>{auth.status}</td>
                                <td className={styles.tableCell} style={{ textAlign: 'right' }}>
                                    <button
                                        id={`action-menu-${memberRowId}`}
                                        className={styles.actionButton}
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
        </div>
    );
};

AuthorizationsTable.propTypes = {
    authorizations: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRowClick: PropTypes.func.isRequired,
    formatDate: PropTypes.func.isRequired,
    formatDateTime: PropTypes.func.isRequired
};

export default AuthorizationsTable;
