import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../hooks/useAuth';
import styles from '../../Member.module.css';

const AuthorizationSummary = ({ getStatusBadgeClass, getPriorityBadgeClass }) => {
    const { activeMode, hasScenario } = useAuth();
    const [selectedStatus, setSelectedStatus] = useState('Pending');

    // Authorization number - different for UM-SNF users
    const authorizationNumber = activeMode === 'UM-SNF' ? '2025OP000390' : '2025OP000389';

    // Check if user is UM or UM-SNF with sepsis scenario active AND viewing the specific authorization
    const isUMWithSepsisForAuth = (activeMode === 'UM' || activeMode === 'UM-SNF') && hasScenario('sepsis');

    // Debug logging for development
    console.log('🔍 AuthorizationSummary Debug:', {
        activeMode,
        hasSepsisScenario: hasScenario('sepsis'),
        authorizationNumber,
        isUMWithSepsisForAuth,
        selectedStatus
    });

    // Dynamic values based on sepsis scenario and user mode
    const diagnosisValue = activeMode === 'UM-SNF' ? 'DKA' : (isUMWithSepsisForAuth ? 'Sepsis, Other' : 'DKA');
    // UM-SNF users always see "Initial Review" regardless of sepsis scenario
    const updatedValue = activeMode === 'UM-SNF' ? 'Initial Review' : (isUMWithSepsisForAuth ? 'Concurrent Review' : 'Initial Review');
    const receivedDateValue = isUMWithSepsisForAuth ? '05/01/2025 09:03 AM' : '04/28/2025 03:47:01 AM';
    const admissionDateValue = isUMWithSepsisForAuth ? '04/28/2025 02:58:09 AM' : '04/28/2025 02:58:09 AM';
    const codeNumberValue = activeMode === 'UM-SNF' ? 'E11.10' : (isUMWithSepsisForAuth ? 'A41' : 'E11.10');
    const placeOfServiceValue = activeMode === 'UM-SNF' ? 'Discharge to SNF' : 'Inpatient Hospital';

    // Handle status change
    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setSelectedStatus(newStatus);
        console.log('🔄 Status changed to:', newStatus);
    };

    // Determine which CSS class to use based on selected status
    const getStatusSelectClass = () => {
        // Special case for UM-SNF users with sepsis - use the UM-SNF specific styling
        if (activeMode === 'UM-SNF' && hasScenario('sepsis')) {
            return styles.authStatusSelectUMSNFSepsis;
        }
        if (selectedStatus === 'Partial approval') {
            // Use the sepsis-specific class with increased width (125px)
            return styles.authStatusSelectSepsis;
        }
        return styles.authStatusSelect;
    };

    return (
        <div id="authorization-summary" className={styles.authorizationContent}>
            <h2 id="authorization-summary-header" className={styles.authorizationHeader}>Authorization Request Summary</h2>
            <div id="authorization-summary-content">
                <div id="authorization-details-grid" className={styles.authGridLayout}>
                    <div className={styles.authGridItem}>
                        <div className={styles.authGridLabel}>Authorization #</div>
                        <div className={styles.authGridValue}>{authorizationNumber}</div>
                    </div>
                    <div className={styles.authGridItem}>
                        <div className={styles.authGridLabel}>Received Date</div>
                        <div className={styles.authGridValue}>{receivedDateValue}</div>
                    </div>
                    <div className={styles.authGridItem}>
                        <div className={styles.authGridLabel}>Admission Date</div>
                        <div className={styles.authGridValue}>{admissionDateValue}</div>
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
                                <option value="Approve">Approve</option>
                                <option value="Send to Review">Send to Review</option>
                                <option value="Deny">Deny</option>
                                {/* Add Partial approval option when sepsis scenario is enabled */}
                                {isUMWithSepsisForAuth && (
                                    <option value="Partial approval">Partial approval</option>
                                )}
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
                        <div className={styles.authGridValue}>{placeOfServiceValue}</div>
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
                        <div className={styles.authGridValue}>{codeNumberValue}</div>
                    </div>
                    <div className={styles.authGridItem}>
                        <div className={styles.authGridLabel}>Updated</div>
                        <div className={styles.authGridValue}>{updatedValue}</div>
                    </div>
                </div>
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
                                "Patient did not discharge as anticipated on 04/30/2025
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

AuthorizationSummary.propTypes = {
    getStatusBadgeClass: PropTypes.func,
    getPriorityBadgeClass: PropTypes.func
};

export default AuthorizationSummary;
