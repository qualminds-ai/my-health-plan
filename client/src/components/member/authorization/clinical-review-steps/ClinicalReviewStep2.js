import React from 'react';
import navNewTabIcon from '../../../../assets/authorizations/clinical_review/nav-new-tab-icon.png';
import letterNIcon from '../../../../assets/authorizations/clinical_review/letter-n-icon.png';
import plusIcon from '../../../../assets/authorizations/clinical_review/plus-icon.png';

/**
 * ClinicalReviewStep2 Component
 * 
 * Renders Step 2: Clinical Indications for Admission to Inpatient Care
 * Handles clinical indicators display with animation controls
 */
const ClinicalReviewStep2 = ({
    styles,
    showClinicalIndicators,
    setShowClinicalIndicators
}) => {
    return (
        <>
            <div className={styles.clinicalIndicationsContainer}>
                {/* Separator - adding vertical spacing */}
                <div className={styles.clinicalIndicationsSeparator}></div>
                {/* Main Title */}
                <h1 className={styles.clinicalIndicationsTitle}>
                    Clinical Indications for Admission to Inpatient Care
                </h1>
                {/* Subtitle Link */}
                <div className={styles.clinicalIndicationsSubtitleLink}>
                    Return to top of Diabetes - ISC
                </div>
                {/* Note Section */}
                <div className={styles.clinicalIndicationsNoteSection}>
                    <span className={styles.clinicalIndicationsNoteText}>Note: Some patients may be appropriate for </span>
                    <span className={styles.clinicalIndicationsNoteHighlight}>Observation care.</span>
                    <span className={styles.clinicalIndicationsNoteText}> For consideration of observation care, see </span>
                    <span className={styles.clinicalIndicationsNoteLink}>
                        Diabetes: Observation Care
                        <span className={styles.clinicalIndicationsNoteIcon} style={{ backgroundImage: `url(${navNewTabIcon})` }}></span>
                        <span className={styles.clinicalIndicationsNoteISC}>ISC.</span>
                    </span>
                </div>
            </div>

            {/* Expand/Collapse Controls - outside padded container */}
            <div>
                {/* Expand/Collapse Controls */}
                <div className={styles.expandCollapseControl}>
                    [Expand All / Collapse All]
                </div>

                {/* Admission Criteria */}
                <div className={styles.admissionCriteriaContainer}>
                    <span className={styles.admissionCriteriaDash}>●</span>
                    <span className={styles.admissionCriteriaTextMain}>Admission is indicated for </span>
                    <span className={styles.admissionCriteriaTextSub}>1 or more of the following(1)(2)(3): </span>
                    <span
                        className={styles.admissionCriteriaIcon}
                        style={{ backgroundImage: `url(${letterNIcon})` }}
                    ></span>
                </div>
                {/* Clinical Indicators with Animation */}
                <div className={styles.clinicalIndicatorsContainer}>
                    {/* First Indicator */}
                    <div
                        className={
                            styles.clinicalIndicatorRow + ' ' +
                            (showClinicalIndicators[0]
                                ? styles.clinicalIndicatorRowVisible
                                : styles.clinicalIndicatorRowHidden)
                        }
                    >
                        <span
                            className={styles.clinicalIndicatorIcon}
                            style={{ backgroundImage: `url(${plusIcon})` }}
                        ></span>
                        <span className={styles.clinicalIndicatorText}>
                            Diabetic ketoacidosis that requires inpatient management, as indicated by
                        </span>
                    </div>

                    {/* Second Indicator */}
                    <div
                        className={
                            styles.clinicalIndicatorRow + ' ' +
                            (showClinicalIndicators[1]
                                ? styles.clinicalIndicatorRowVisible
                                : styles.clinicalIndicatorRowHidden)
                        }
                    >
                        <span
                            className={styles.clinicalIndicatorIcon}
                            style={{ backgroundImage: `url(${plusIcon})` }}
                        ></span>
                        <span className={styles.clinicalIndicatorText}>
                            Hyperglycemic hyperosmolar state, as indicated by
                        </span>
                    </div>

                    {/* Third Indicator */}
                    <div
                        className={
                            styles.clinicalIndicatorRow + ' ' +
                            (showClinicalIndicators[2]
                                ? styles.clinicalIndicatorRowVisible
                                : styles.clinicalIndicatorRowHidden)
                        }
                    >
                        <span
                            className={styles.clinicalIndicatorIcon}
                            style={{ backgroundImage: `url(${plusIcon})` }}
                        ></span>
                        <span className={styles.clinicalIndicatorText}>
                            Hyperglycemia requiring inpatient care, as indicated by
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClinicalReviewStep2;
