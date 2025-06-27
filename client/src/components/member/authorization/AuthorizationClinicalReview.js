import React from 'react';

// Import clinical review assets
import leftArrowTriangleIcon from '../../../assets/authorizations/clinical_review/left-arrow-triangle.svg';
import caratLeftIcon from '../../../assets/authorizations/clinical_review/carat-left.svg';
import caratRightIcon from '../../../assets/authorizations/clinical_review/carat-right.svg';

// Import step components
import ClinicalReviewStep1 from './clinical-review-steps/ClinicalReviewStep1';
import ClinicalReviewStep2 from './clinical-review-steps/ClinicalReviewStep2';
import ClinicalReviewStep3 from './clinical-review-steps/ClinicalReviewStep3';
import ClinicalReviewStep4 from './clinical-review-steps/ClinicalReviewStep4';

/**
 * AuthorizationClinicalReview Component
 * 
 * Renders the Clinical Review tab content for an authorization.
 * Includes multi-step review process with navigation controls.
 */
const AuthorizationClinicalReview = ({
    styles,
    clinicalReviewStep,
    showClinicalIndicators,
    selectedGuidelineRows,
    handleClinicalReviewNext,
    handleClinicalReviewPrev,
    setShowClinicalIndicators,
    setSelectedGuidelineRows,
    setActiveAuthTab
}) => {
    return (
        <div className={styles.clinicalReviewContent}>
            {/* Medical Necessity Guidelines Section */}
            <div className={styles.medicalGuidelinesContainer}>
                <div className={styles.guidelinesHeader}>
                    <div className={styles.guidelinesIconContainer}>
                        <img src={leftArrowTriangleIcon} alt="Left Arrow Triangle Icon" className={styles.guidelineIcon} />
                        <div className={styles.medicalGuidelinesTextContainer}>
                            <span className={styles.medicalGuidelinesText}>
                                Medical
                            </span>
                            <span className={styles.medicalGuidelinesText}>
                                Necessity
                            </span>
                            <span className={styles.medicalGuidelinesText}>
                                Guidelines
                            </span>
                        </div>
                    </div>

                    {/* Stage 4 Navigation - Only visible in step 4, positioned on the right side of the same row */}
                    {clinicalReviewStep === 4 && (
                        <div className={styles.stage4Navigation}>
                            <div className={styles.navigationHeader}>
                                Informed Care Strategies
                            </div>

                            <div className={styles.navigationLinks}>
                                <span className={styles.navigationLinksClickable}>LOG OUT</span>
                                <span className={styles.navigationSeparator}>|</span>
                                <span className={styles.navigationLinksClickable}>SEARCH</span>
                                <span className={styles.navigationSeparator}>|</span>
                                <span className={styles.navigationLinksClickable}>MY PRODUCTS</span>
                                <span className={styles.navigationSeparator}>|</span>
                                <span className={styles.navigationLinksClickable}>CONTACT US</span>
                                <span className={styles.navigationSeparator}>|</span>
                                <span className={styles.navigationLinksClickable}>USER GUIDE</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.navigationDivider} />
            </div>

            {/* Step 1: Guidelines Search and Selection */}
            {clinicalReviewStep === 1 && (
                <ClinicalReviewStep1
                    styles={styles}
                    selectedGuidelineRows={selectedGuidelineRows}
                    setSelectedGuidelineRows={setSelectedGuidelineRows}
                />
            )}

            {/* Step 2: Clinical Indications for Admission to Inpatient Care */}
            {clinicalReviewStep === 2 && (
                <ClinicalReviewStep2
                    styles={styles}
                    showClinicalIndicators={showClinicalIndicators}
                    setShowClinicalIndicators={setShowClinicalIndicators}
                />
            )}

            {/* Step 3: Care Planning - Inpatient Admission and Alternatives */}
            {clinicalReviewStep === 3 && (
                <ClinicalReviewStep3 styles={styles} />
            )}

            {/* Step 4: Medical Necessity Guidelines - Goal Length of Stay */}
            {clinicalReviewStep === 4 && (
                <ClinicalReviewStep4 styles={styles} />
            )}

            {/* Navigation Controls */}
            <div
                className={
                    clinicalReviewStep === 4
                        ? `${styles.navigationControls} ${styles.navigationControlsStep4}`
                        : styles.navigationControls
                }
            >
                <button
                    onClick={handleClinicalReviewPrev}
                    disabled={clinicalReviewStep === 1}
                    className={
                        clinicalReviewStep === 1
                            ? `${styles.navigationButton} ${styles.navigationButtonDisabled}`
                            : styles.navigationButton
                    }
                >
                    <img
                        src={caratLeftIcon}
                        alt="Previous"
                        className={styles.navigationButtonIcon}
                    />
                </button>
                <button
                    onClick={clinicalReviewStep === 4 ? () => setActiveAuthTab('Closed') : handleClinicalReviewNext}
                    disabled={false}
                    className={
                        clinicalReviewStep === 4
                            ? `${styles.navigationButton} ${styles.navigationButtonStep4}`
                            : styles.navigationButton
                    }
                >
                    {clinicalReviewStep === 4 ? (
                        'Close'
                    ) : (
                        <img
                            src={caratRightIcon}
                            alt="Next"
                            className={styles.navigationButtonIcon}
                        />)}
                </button>
            </div>
        </div>
    );
};

export default AuthorizationClinicalReview;
