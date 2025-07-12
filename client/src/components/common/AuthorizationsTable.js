import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Dashboard.module.css';
import VectorRightIcon from '../../assets/dashboard/Vector-right.svg';

/**
 * Authorizations Table with mode and scenario support
 */
const AuthorizationsTable = ({
    authorizations,
    onRowClick,
    formatDate,
    formatDateTime,
    userMode,
    scenarios,
    shouldHideArrow = false,
    hasScenario
}) => {
    const getPriorityClass = (priority, auth) => {
        // Always use default UM priority styling regardless of mode or scenario
        switch (priority?.toLowerCase()) {
            case 'high': return styles.high;
            case 'medium': return styles.medium;
            case 'low': return styles.low;
            default: return styles.low;
        }
    };

    // Transform data based on user mode (scenarios are handled in useUserMode hook)
    const transformAuthorizationData = (auth) => {
        const transformed = { ...auth };
        // Authorization modifications are now handled in useUserMode applySepsisModifications
        return transformed;
    };

    // Filter and transform authorizations based on mode
    const getFilteredAuthorizations = () => {
        let filtered = authorizations.map(transformAuthorizationData);

        // Apply mode-specific filtering
        switch (userMode) {
            case 'UM-SNF':
                // SNF users see all authorizations (no filtering, just styling changes)
                break;
            case 'CM':
                // Case managers see authorizations requiring case management
                filtered = filtered.filter(auth =>
                    auth.priority === 'High' ||
                    auth.status === 'Appeal' ||
                    (scenarios.includes('sepsis') && userMode === 'UM') // Only show sepsis for UM users
                );
                break;
            case 'UM':
            default:
                // UM users see all authorizations
                break;
        }

        return filtered;
    };

    // Check if arrow should be shown (always show for consistency with default UM)
    const shouldShowArrow = () => {
        // Always show the arrow regardless of mode or scenario for consistency
        const filteredAuths = getFilteredAuthorizations();
        return filteredAuths.length > 0;
    };

    // Get row styling based on scenario
    const getRowStyling = (auth) => {
        let className = styles.tableRow;

        // Special styling for sepsis scenario - only for UM users
        if (scenarios.includes('sepsis') && userMode === 'UM' && auth.member_name === 'Robert Abbott') {
            className += ` ${styles.sepsisHighlight}`;
        }

        return className;
    };

    const filteredAuthorizations = getFilteredAuthorizations();

    return (
        <div className={styles.tableContainer}>
            {shouldShowArrow() && (
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
                        {userMode !== 'UM' && <th className={`${styles.tableHeaderCell} ${styles.requestTypeColumnHeader}`}>Request Type</th>}
                        <th className={`${styles.tableHeaderCell} ${styles.posColumnHeader}`}>POS</th>
                        <th className={`${styles.tableHeaderCell} ${styles.typeColumnHeader}`}>Type</th>
                        <th className={styles.tableHeaderCell}>Member Name</th>
                        <th className={styles.tableHeaderCell}>Approved Days</th>
                        <th className={styles.tableHeaderCell}>Next Review Date</th>
                        <th className={styles.tableHeaderCell}>Status</th>
                        <th className={styles.tableHeaderCell}>Action</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {filteredAuthorizations.map((auth, idx) => {
                        const memberRowId = auth.member_number || `MEM${String(idx + 1).padStart(3, '0')}`;
                        const priorityClass = getPriorityClass(auth.priority, auth);
                        const rowClass = getRowStyling(auth);

                        return (
                            <tr
                                key={auth.authorization_number || auth.id}
                                id={`member-row-${memberRowId}`}
                                data-member-id={auth.member_id}
                                data-authorization-number={auth.authorization_number}
                                data-scenario={scenarios.includes('sepsis') && userMode === 'UM' && auth.member_name === 'Robert Abbott' ? 'sepsis' : ''}
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
                                {userMode !== 'UM' &&
                                    <td
                                        className={`${styles.tableCell} ${styles.secondary} ${styles.requestTypeCell}`}
                                        data-full-text={auth.request_type}
                                        title={auth.request_type}
                                    >
                                        {auth.request_type}
                                    </td>
                                }
                                <td
                                    className={`${styles.tableCell} ${styles.secondary} ${styles.posCell}`}
                                    data-full-text={auth.pos}
                                    title={auth.pos}
                                >
                                    {auth.pos}
                                </td>
                                <td
                                    className={`${styles.tableCell} ${styles.secondary} ${styles.typeCell} ${scenarios.includes('sepsis') && userMode === 'UM' && auth.member_name === 'Robert Abbott' ? styles.typeHighlight : ''}`}
                                    data-full-text={auth.review_type}
                                    title={auth.review_type}
                                >
                                    {auth.review_type}
                                </td>
                                <td className={`${styles.tableCell} ${styles.secondary}`}>{auth.member_name}</td>
                                <td className={`${styles.tableCell} ${styles.primary}`}>{auth.approved_days}</td>
                                <td className={`${styles.tableCell} ${styles.primary}`}>{formatDateTime(auth.next_review_date)}</td>
                                <td className={`${styles.tableCell} ${styles.primary}`}>{auth.status}</td>
                                <td className={styles.tableCell} style={{ textAlign: 'right' }}>
                                    <button
                                        id={`action-menu-${memberRowId}`}
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

            {/* Mode-specific empty states */}
            {filteredAuthorizations.length === 0 && (
                <div className={styles.emptyState}>
                    <svg className={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className={styles.emptyTitle}>
                        {userMode === 'UM-SNF' && 'No SNF authorizations'}
                        {userMode === 'CM' && 'No case management tasks'}
                        {userMode === 'UM' && 'No authorizations'}
                    </h3>
                    <p className={styles.emptyText}>
                        {userMode === 'UM-SNF' && 'No skilled nursing facility authorizations to display.'}
                        {userMode === 'CM' && 'No high-priority or appeal cases requiring case management.'}
                        {userMode === 'UM' && 'Get started by creating a new authorization.'}
                    </p>
                </div>
            )}
        </div>
    );
};

AuthorizationsTable.propTypes = {
    authorizations: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRowClick: PropTypes.func.isRequired,
    formatDate: PropTypes.func.isRequired,
    formatDateTime: PropTypes.func.isRequired,
    userMode: PropTypes.string,
    scenarios: PropTypes.arrayOf(PropTypes.string),
    shouldHideArrow: PropTypes.bool,
    hasScenario: PropTypes.func
};

AuthorizationsTable.defaultProps = {
    userMode: 'UM',
    scenarios: [],
    shouldHideArrow: false,
    hasScenario: () => false
};

export default AuthorizationsTable;
