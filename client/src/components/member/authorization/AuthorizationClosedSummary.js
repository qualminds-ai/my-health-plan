import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../hooks/useAuth';
import styles from '../../Member.module.css';

const AuthorizationClosedSummary = ({ activeRequestTab }) => {
    const { activeMode, hasScenario } = useAuth();

    // Use the actual authorization number from the active request tab
    const authorizationNumber = activeRequestTab || '20250P000367';

    // Check if user is UM or UM-SNF with sepsis scenario active AND viewing Robert Abbott's specific authorization
    // For sepsis scenario, we check if it's the specific sepsis authorization (20250P000367)
    const isUMWithSepsisForAuth = (activeMode === 'UM' || activeMode === 'UM-SNF') && hasScenario('sepsis') && authorizationNumber === '20250P000367';

    // Display authorization number - show sepsis-specific number when in sepsis scenario
    const displayAuthNumber = isUMWithSepsisForAuth ? '2025OP000389' : authorizationNumber;

    // Set initial status based on whether this is the specific sepsis case
    const [selectedStatus, setSelectedStatus] = useState(isUMWithSepsisForAuth ? 'Approved' : 'Pending');

    // Debug logging for development
    console.log('🔍 AuthorizationClosedSummary Debug:', {
        activeMode,
        hasSepsisScenario: hasScenario('sepsis'),
        authorizationNumber,
        isUMWithSepsisForAuth,
        selectedStatus
    });

    // Dynamic values based on sepsis scenario for this specific authorization
    const diagnosisValue = isUMWithSepsisForAuth ? 'Sepsis, Other' : 'DKA';
    const updatedValue = isUMWithSepsisForAuth ? 'Concurrent Review' : 'Initial Review';

    // Handle status change
    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setSelectedStatus(newStatus);
        console.log('🔄 Status changed to:', newStatus);
    };

    // Determine which CSS class to use based on selected status and scenario
    const getStatusSelectClass = () => {
        if (isUMWithSepsisForAuth && selectedStatus === 'Approved') {
            // Use the sepsis-specific class with increased width (125px) only for the specific case
            return styles.authStatusSelectSepsis;
        }
        return styles.authStatusSelectClosed;
    };

    return (
        <div id="authorization-summary" className={styles.authorizationContent}>
            <h2 id="authorization-summary-header" className={styles.authorizationHeader}>Authorization Request Summary</h2>
            <div id="authorization-summary-content">
                <div id="authorization-details-grid" className={styles.authGridLayout}>
                    <div className={styles.authGridItem}>
                        <div className={styles.authGridLabel}>Authorization #</div>
                        <div className={styles.authGridValue}>{displayAuthNumber}</div>
                    </div>
                    <div className={styles.authGridItem}>
                        <div className={styles.authGridLabel}>Received Date</div>
                        <div className={styles.authGridValue}>04/28/2025 03:47:01 AM</div>
                    </div>
                    <div className={styles.authGridItem}>
                        <div className={styles.authGridLabel}>Admission Date</div>
                        <div className={styles.authGridValue}>04/28/2025 02:58:09 AM</div>
                    </div>
                    <div className={styles.authGridItem}>
                        <div className={styles.authGridLabel}>Request Type</div>
                        <div className={styles.authGridValue}>Standard</div>
                    </div>
                    <div className={styles.authGridItem}>
                        <div className={styles.authGridLabel}>Status</div>
                        <div className={styles.flexCenterGap10}>
                            <select
                                id="authorization-status-select"
                                className={getStatusSelectClass()}
                                value={selectedStatus}
                                onChange={handleStatusChange}
                            >
                                <option value="Pending">Pending</option>
                                {/* Only show Approved option for UM + sepsis + Robert Abbott case */}
                                {isUMWithSepsisForAuth ? (
                                    <option value="Approved">Approved</option>
                                ) : (
                                    <option value="Approve">Approve</option>
                                )}
                                <option value="Send to Review">Send to Review</option>
                                <option value="Deny">Deny</option>
                            </select>
                            <button id="check-guidelines-button" className={`bg-gray-500 rounded hover:bg-gray-600 ${styles.actionButton}`}>
                                Check Guidelines
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.authGridLayout}>
                    <div className={styles.authGridItem}>
                        <div className={styles.authGridLabel}>Place of Service</div>
                        <div className={styles.authGridValue}>Inpatient Hospital</div>
                    </div>
                    <div className={styles.authGridItem}>
                        <div className={styles.authGridLabel}>Diagnosis</div>
                        <div className={styles.authGridValue}>{diagnosisValue}</div>
                    </div>
                    <div className={styles.authGridItem}>
                        <div className={styles.authGridLabel}>Code Type</div>
                        <div className={styles.authGridValue}>ICD 10</div>
                    </div>
                    <div className={styles.authGridItem}>
                        <div className={styles.authGridLabel}>Code Number</div>
                        <div className={styles.authGridValue}>A41</div>
                    </div>
                    <div className={styles.authGridItem}>
                        <div className={styles.authGridLabel}>Updated</div>
                        <div className={styles.authGridValue}>{updatedValue}</div>
                    </div>
                </div>
                {/* Duplicate the entire row when UM user with sepsis for this authorization */}
                {isUMWithSepsisForAuth && (
                    <div className={styles.authGridLayout}>
                        <div className={styles.authGridItem}>
                            <div className={styles.authGridLabel}>Place of Service</div>
                            <div className={styles.authGridValue}>Inpatient Hospital</div>
                        </div>
                        <div className={styles.authGridItem}>
                            <div className={styles.authGridLabel}>Diagnosis</div>
                            <div className={styles.authGridValue}>Sepsis, Other</div>
                        </div>
                        <div className={styles.authGridItem}>
                            <div className={styles.authGridLabel}>Code Type</div>
                            <div className={styles.authGridValue}>ICD 10</div>
                        </div>
                        <div className={styles.authGridItem}>
                            <div className={styles.authGridLabel}>Code Number</div>
                            <div className={styles.authGridValue}>A41</div>
                        </div>
                        <div className={styles.authGridItem}>
                            <div className={styles.authGridLabel}>Updated</div>
                            <div className={styles.authGridValue}>Concurrent Review</div>
                        </div>
                    </div>
                )}
            </div>
            <div className={`mb-6 ${styles.closedTabNotesSection}`}>
                <h3 className={styles.closedTabNotesTitle}>Notes</h3>
                <div className={styles.closedTabNotesContent}>
                    {/* Add sepsis note for UM users when sepsis is active for this authorization */}
                    {isUMWithSepsisForAuth && (
                        <div style={{ marginBottom: '16px' }}>
                            <p className={styles.closedTabNotesP}>
                                From original authorization request:
                            </p>
                            <p className={styles.closedTabNotesP2}>
                                "Patient did not discharge as anticipated on 3/29
                            </p>
                            <p className={styles.closedTabNotesP2}>
                                Found to have fever of 104 and WBC of 30; patient seems confused, has decreased urine output.
                            </p>
                            <p className={styles.closedTabNotesP2}>
                                Requesting continued stay."
                            </p>
                        </div>
                    )}
                    <p className={styles.closedTabNotesP}>
                        Additional pertinent patient information from the BCBS AI Assistant:
                    </p>
                    <p className={styles.closedTabNotesP2}>Other current patient diagnoses:</p>
                    <ul className={styles.closedTabNotesList}>
                        <li>• CHF (ICD10: I50.9): 4/28/2025</li>
                        <li>• DKA (DKA: E11.10): 4/28/2025</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

AuthorizationClosedSummary.propTypes = {
    activeRequestTab: PropTypes.string
};

export default AuthorizationClosedSummary;
