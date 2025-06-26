import React from 'react';
import styles from '../../Member.module.css';

const AuthorizationSummary = ({ getStatusBadgeClass, getPriorityBadgeClass }) => (
    <div className={styles.authorizationContent}>
        <h2 className={styles.authorizationHeader}>Authorization Request Summary</h2>
        <div>
            <div className={styles.authGridLayout}>
                <div className={styles.authGridItem}>
                    <div className={styles.authGridLabel}>Authorization #</div>
                    <div className={styles.authGridValue}>2025OP000367</div>
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
                        <select className={styles.authStatusSelect}>
                            <option>Pending</option>
                            <option>Approve</option>
                            <option>Send to Review</option>
                            <option>Deny</option>
                        </select>
                        <button className={`bg-gray-500 rounded hover:bg-gray-600 ${styles.actionButton}`}>
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
                    <div className={styles.authGridValue}>DKA</div>
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
                    <div className={styles.authGridValue}>Initial Review</div>
                </div>
            </div>
        </div>
        <div className={`mb-6 ${styles.closedTabNotesSection}`}>
            <h3 className={styles.closedTabNotesTitle}>Notes</h3>
            <div className={styles.closedTabNotesContent}>
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

export default AuthorizationSummary;
