import React from 'react';
import PropTypes from 'prop-types';
import styles from './CMOverview.module.css';

/**
 * CM Member Overview Component for Case Management users
 * Displays risk stratification, conditions, programs, care gaps, and other member information
 */
const CMOverview = ({ memberData, activeMode }) => {
    // Only show CM overview for CM users
    if (activeMode !== 'CM') {
        return null;
    }

    return (
        <div className={styles.cmOverviewContainer}>
            {/* Summary Section */}
            <div className={styles.summarySection}>
                <div className={styles.summaryTabs}>
                    <button className={`${styles.tab} ${styles.activeTab}`}>Summary</button>
                    <button className={styles.tab}>Timeline</button>
                </div>
            </div>

            {/* Risk Stratification Section - Contains all content below tabs */}
            <div className={styles.riskStratificationSection}>
                {/* Risk Stratification Content */}
                <div className={styles.riskSection}>
                    <h3 className={styles.sectionTitle}>Risk Stratification</h3>
                    <div className={styles.riskGrid}>
                        <div className={styles.riskItem}>
                            <span className={styles.riskLabel}>Overall Risk Score</span>
                            <div className={styles.riskValueWithIcon}>
                                <svg className={styles.warningIcon} width="20" height="20" viewBox="0 0 16 16" fill="#A64544">
                                    <path d="M8 1L1 15h14L8 1z" />
                                    <path d="M8 6v4M8 12h.01" stroke="white" strokeWidth="1" />
                                </svg>
                                <span className={styles.riskValueHigh}>High</span>
                            </div>
                        </div>
                        <div className={styles.riskItem}>
                            <span className={styles.riskLabel}>Patient Persona</span>
                            <span className={styles.riskValueComplex}>
                                Complex Multichronic<br />
                                Non-Adherent
                            </span>
                        </div>
                        <div className={styles.riskItem}>
                            <span className={styles.riskLabel}>Likelihood of inpatient</span>
                            <span className={styles.riskValue}>HIGH</span>
                        </div>
                        <div className={styles.riskItem}>
                            <span className={styles.riskLabel}>HCC Score</span>
                            <span className={styles.riskValue}>5</span>
                        </div>
                    </div>
                </div>

                {/* Side by Side Layout for Conditions and Right Column (Programs + Care Gaps) */}
                <div className={styles.sideBySideContainer}>
                    {/* Conditions */}
                    <div className={styles.leftSection}>
                        <div className={styles.sectionHeader}>
                            <h3 className={styles.sectionTitle}>Conditions (4)</h3>
                            <svg className={styles.externalLinkIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M6 2H2v12h12V10M10 2h4v4M6 10l8-8" stroke="#6B7280" strokeWidth="1.5" fill="none" />
                            </svg>
                        </div>
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr className={styles.tableHeaderRow}>
                                        <th className={styles.tableHeader}>Current Condition</th>
                                        <th className={styles.tableHeader}>Acuity</th>
                                        <th className={styles.tableHeader}>Overall Risk</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tableCell}>Hypertension</td>
                                        <td className={styles.tableCell}>High</td>
                                        <td className={styles.tableCell}>High</td>
                                    </tr>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tableCell}>Diabetes</td>
                                        <td className={styles.tableCell}>High</td>
                                        <td className={styles.tableCell}>Low</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className={styles.table}>
                                <thead>
                                    <tr className={styles.tableHeaderRow}>
                                        <th className={styles.tableHeader}>Future Condition Name</th>
                                        <th className={styles.tableHeader}>Likelihood</th>
                                        <th className={styles.tableHeader}>Overall Risk</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tableCell}>Asthma</td>
                                        <td className={styles.tableCell}>High</td>
                                        <td className={styles.tableCell}>High</td>
                                    </tr>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tableCell}>Blood Pressure</td>
                                        <td className={styles.tableCell}>High</td>
                                        <td className={styles.tableCell}>Low</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Column - Programs and Care Gaps stacked vertically */}
                    <div className={styles.rightColumnContainer}>
                        {/* Programs */}
                        <div className={styles.rightSection}>
                            <div className={styles.sectionHeader}>
                                <h3 className={styles.sectionTitle}>Programs (2)</h3>
                                <svg className={styles.externalLinkIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M6 2H2v12h12V10M10 2h4v4M6 10l8-8" stroke="#6B7280" strokeWidth="1.5" fill="none" />
                                </svg>
                            </div>
                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr className={styles.tableHeaderRow}>
                                            <th className={styles.tableHeader}>Program</th>
                                            <th className={styles.tableHeader}>Start Date</th>
                                            <th className={styles.tableHeader}>Engagement Level</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className={styles.tableRow}>
                                            <td className={styles.tableCell}>Hypertension</td>
                                            <td className={styles.tableCell}>High</td>
                                            <td className={styles.tableCell}>High</td>
                                        </tr>
                                        <tr className={styles.tableRow}>
                                            <td className={styles.tableCell}>Diabetes</td>
                                            <td className={styles.tableCell}>High</td>
                                            <td className={styles.tableCell}>Low</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Care Gaps */}
                        <div className={styles.rightSection}>
                            <div className={styles.sectionHeader}>
                                <h3 className={styles.sectionTitle}>Care Gaps (2)</h3>
                                <svg className={styles.externalLinkIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M6 2H2v12h12V10M10 2h4v4M6 10l8-8" stroke="#6B7280" strokeWidth="1.5" fill="none" />
                                </svg>
                            </div>
                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr className={styles.tableHeaderRow}>
                                            <th className={styles.tableHeader}>Category</th>
                                            <th className={styles.tableHeader}>Risk Indicator</th>
                                            <th className={styles.tableHeader}>Status</th>
                                            <th className={styles.tableHeader}>Due Date</th>
                                            <th className={styles.tableHeader}>Acuity/Risk</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className={styles.tableRow}>
                                            <td className={styles.tableCell}>Predictive</td>
                                            <td className={styles.tableCell}>PM-High</td>
                                            <td className={styles.tableCell}></td>
                                            <td className={styles.tableCell}>01/11/2022</td>
                                            <td className={styles.tableCell}></td>
                                        </tr>
                                        <tr className={styles.tableRow}>
                                            <td className={styles.tableCell}>Psychographic</td>
                                            <td className={styles.tableCell}>Assessments...</td>
                                            <td className={styles.tableCell}></td>
                                            <td className={styles.tableCell}>01/11/2022</td>
                                            <td className={styles.tableCell}></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Social Determinants and Medications side by side */}
                <div className={styles.bottomSideBySideContainer}>
                    {/* Social Determinants of Health - Left */}
                    <div className={styles.bottomLeftSection}>
                        <div className={styles.sectionHeader}>
                            <h3 className={styles.sectionTitle}>Social Determinants of Health (3)</h3>
                        </div>
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr className={styles.tableHeaderRow}>
                                        <th className={styles.tableHeader}>Category</th>
                                        <th className={styles.tableHeader}>Risk Score</th>
                                        <th className={styles.tableHeader}>Referral</th>
                                        <th className={styles.tableHeader}>Referral Date</th>
                                        <th className={styles.tableHeader}>Start Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tableCell}>Lack of Transportation</td>
                                        <td className={styles.tableCell}>Low</td>
                                        <td className={styles.tableCell}>No</td>
                                        <td className={styles.tableCell}></td>
                                        <td className={styles.tableCell}></td>
                                    </tr>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tableCell}>Lack of Housing</td>
                                        <td className={styles.tableCell}>Low</td>
                                        <td className={styles.tableCell}>No</td>
                                        <td className={styles.tableCell}></td>
                                        <td className={styles.tableCell}></td>
                                    </tr>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tableCell}>Lack of Food</td>
                                        <td className={styles.tableCell}>Low</td>
                                        <td className={styles.tableCell}>No</td>
                                        <td className={styles.tableCell}></td>
                                        <td className={styles.tableCell}></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Medications - Right */}
                    <div className={styles.bottomRightSection}>
                        <div className={styles.sectionHeader}>
                            <h3 className={styles.sectionTitle}>Medications (2)</h3>
                            <svg className={styles.externalLinkIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M6 2H2v12h12V10M10 2h4v4M6 10l8-8" stroke="#6B7280" strokeWidth="1.5" fill="none" />
                            </svg>
                        </div>
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr className={styles.tableHeaderRow}>
                                        <th className={styles.tableHeader}>Medication</th>
                                        <th className={styles.tableHeader}>Frequency</th>
                                        <th className={styles.tableHeader}>Status</th>
                                        <th className={styles.tableHeader}>Last Reviewed Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tableCell}>Morphine</td>
                                        <td className={styles.tableCell}>Weekly</td>
                                        <td className={styles.tableCell}>Open</td>
                                        <td className={styles.tableCell}>02/30/2023</td>
                                    </tr>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tableCell}>Lantus</td>
                                        <td className={styles.tableCell}>10mg sub q BID</td>
                                        <td className={styles.tableCell}>Open</td>
                                        <td className={styles.tableCell}>02/30/2023</td>
                                    </tr>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tableCell}>Novolog</td>
                                        <td className={styles.tableCell}>As directed</td>
                                        <td className={styles.tableCell}>In Progress</td>
                                        <td className={styles.tableCell}>02/30/2023</td>
                                    </tr>
                                    <tr className={styles.tableRow}>
                                        <td className={styles.tableCell}>Lisinopril</td>
                                        <td className={styles.tableCell}>5mg po daily</td>
                                        <td className={styles.tableCell}>Pending</td>
                                        <td className={styles.tableCell}>Renewal Name</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

CMOverview.propTypes = {
    memberData: PropTypes.object,
    activeMode: PropTypes.string.isRequired
};

export default CMOverview;
