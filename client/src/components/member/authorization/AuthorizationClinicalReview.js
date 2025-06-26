import React from 'react';

// Import clinical review assets
import leftArrowTriangleIcon from '../../../assets/authorizations/clinical_review/left-arrow-triangle.svg';
import caratLeftIcon from '../../../assets/authorizations/clinical_review/carat-left.svg';
import caratRightIcon from '../../../assets/authorizations/clinical_review/carat-right.svg';
import navNewTabIcon from '../../../assets/authorizations/clinical_review/nav-new-tab-icon.png';
import letterNIcon from '../../../assets/authorizations/clinical_review/letter-n-icon.png';
import plusIcon from '../../../assets/authorizations/clinical_review/plus-icon.png';

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
                <div className={styles.navigationSection}>
                    {/* Guideline Selection Checkboxes */}
                    <div className={styles.guidelinesSelectionContainer}>
                        <span className={styles.guidelinesEditionLabel}>
                            1st Edition
                        </span>
                        <label className={styles.guidelinesCheckboxLabel}>
                            <input
                                type="checkbox"
                                className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                            />
                            <span className={styles.guidelinesCheckboxText}>
                                ACO
                            </span>
                        </label>
                        <label className={styles.guidelinesCheckboxLabel}>
                            <input
                                type="checkbox"
                                className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                            />
                            <span className={styles.guidelinesCheckboxText}>
                                ISC
                            </span>
                        </label>
                        <label className={styles.guidelinesCheckboxLabel}>
                            <input
                                type="checkbox"
                                className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                            />
                            <span className={styles.guidelinesCheckboxText}>
                                GRC
                            </span>
                        </label>
                        <label className={styles.guidelinesCheckboxLabel}>
                            <input
                                type="checkbox"
                                className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                            />
                            <span className={styles.guidelinesCheckboxText}>
                                MCM
                            </span>
                        </label>
                        <label className={styles.guidelinesCheckboxLabel}>
                            <input
                                type="checkbox"
                                className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                            />
                            <span className={styles.guidelinesCheckboxText}>
                                RFC
                            </span>
                        </label>
                        <label className={styles.guidelinesCheckboxLabel}>
                            <input
                                type="checkbox"
                                className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                            />
                            <span className={styles.guidelinesCheckboxText}>
                                HHC
                            </span>
                        </label>
                        <label className={styles.guidelinesCheckboxLabel}>
                            <input
                                type="checkbox"
                                className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                            />
                            <span className={styles.guidelinesCheckboxText}>
                                CCG
                            </span>
                        </label>
                        <label className={styles.guidelinesCheckboxLabel}>
                            <input
                                type="checkbox"
                                className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                            />
                            <span className={styles.guidelinesCheckboxText}>
                                TC
                            </span>
                        </label>
                        <label className={styles.guidelinesCheckboxLabel}>
                            <input
                                type="checkbox"
                                className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                            />
                            <span className={styles.guidelinesCheckboxText}>
                                DBHC
                            </span>
                        </label>
                        <label className={styles.guidelinesCheckboxLabel}>
                            <input
                                type="checkbox"
                                className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                            />
                            <span className={styles.guidelinesCheckboxText}>
                                PIP
                            </span>
                        </label>
                        <label className={styles.guidelinesCheckboxLabel}>
                            <input
                                type="checkbox"
                                className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                            />
                            <span className={styles.guidelinesCheckboxText}>
                                MCR
                            </span>
                        </label>
                    </div>

                    {/* Quick Search */}
                    <div className={styles.quickSearchContainer}>
                        <span className={styles.quickSearchLabel}>
                            Quick Search
                        </span>
                        <input
                            type="text"
                            defaultValue="DKA"
                            className={styles.quickSearchInput}
                        />
                        <button className={styles.quickSearchButton}>
                            Search
                        </button>
                    </div>

                    {/* Results Summary */}
                    <div className={styles.resultsContainer}>
                        6 results for DKA
                        <span className={styles.resultsFloatRight}>
                            (Results 1 - 6 of 6)
                        </span>
                    </div>

                    {/* Guidelines Table */}
                    <div className={styles.guidelinesTableContainer}>
                        <table className={styles.guidelinesTable}>
                            <thead>
                                <tr>
                                    <th className={styles.guidelinesTableHeaderCell}>
                                        Guideline Code
                                    </th>
                                    <th className={styles.attachmentsTableHeader}>
                                        Product
                                    </th>
                                    <th className={styles.attachmentsTableHeader}>
                                        Type
                                    </th>
                                    <th className={styles.attachmentsTableHeader}>
                                        Title
                                    </th>
                                    <th style={{
                                        padding: '4px 8px',
                                        textAlign: 'left',
                                        color: '#000',
                                        fontFamily: 'Inter',
                                        fontSize: '13.164px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        textDecoration: 'underline',
                                        textDecorationStyle: 'solid',
                                        textDecorationSkipInk: 'auto',
                                        textDecorationThickness: 'auto',
                                        textUnderlineOffset: 'auto',
                                        textUnderlinePosition: 'from-font'
                                    }}>
                                        GLOS/MBLOS
                                    </th>
                                    <th className={styles.attachmentsTableHeader}>
                                        Codes
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td
                                        className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellCode}
                                        style={{ backgroundColor: selectedGuidelineRows.has('M-130') ? '#e4de77' : 'transparent' }}
                                        onClick={() => {
                                            const newSelected = new Set(selectedGuidelineRows);
                                            if (newSelected.has('M-130')) {
                                                newSelected.delete('M-130');
                                            } else {
                                                newSelected.add('M-130');
                                            }
                                            setSelectedGuidelineRows(newSelected);
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!selectedGuidelineRows.has('M-130')) {
                                                e.target.style.backgroundColor = '#e4de77';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!selectedGuidelineRows.has('M-130')) {
                                                e.target.style.backgroundColor = 'transparent';
                                            }
                                        }}
                                    >
                                        M-130
                                    </td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellType}>ISC</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellType}>ORG</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellTitle}>Diabetes</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellDs}>(DS)</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellLink}>
                                        View Codes
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className={
                                            `${styles.guidelineTableCell} ${styles.guidelineTableCellCode} ${styles.guidelineTableCellSelectable} ${selectedGuidelineRows.has('P-140') ? styles.guidelineTableCellSelected : ''}`
                                        }
                                        onClick={() => {
                                            const newSelected = new Set(selectedGuidelineRows);
                                            if (newSelected.has('P-140')) {
                                                newSelected.delete('P-140');
                                            } else {
                                                newSelected.add('P-140');
                                            }
                                            setSelectedGuidelineRows(newSelected);
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!selectedGuidelineRows.has('P-140')) {
                                                e.target.style.backgroundColor = '#e4de77';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!selectedGuidelineRows.has('P-140')) {
                                                e.target.style.backgroundColor = 'transparent';
                                            }
                                        }}
                                    >
                                        P-140
                                    </td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellType}>ISC</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellType}>ORG-P</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellTitle}>Diabetes, Pediatric</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellDs}>(DS)</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellLink}>
                                        View Codes
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className={
                                            `${styles.guidelineTableCell} ${styles.guidelineTableCellCodeM130RRG} ${styles.guidelineTableCellSelectable} ${selectedGuidelineRows.has('M-130-RRG') ? styles.guidelineTableCellSelected : ''}`
                                        }
                                        onClick={() => {
                                            const newSelected = new Set(selectedGuidelineRows);
                                            if (newSelected.has('M-130-RRG')) {
                                                newSelected.delete('M-130-RRG');
                                            } else {
                                                newSelected.add('M-130-RRG');
                                            }
                                            setSelectedGuidelineRows(newSelected);
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!selectedGuidelineRows.has('M-130-RRG')) {
                                                e.target.style.backgroundColor = '#e4de77';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!selectedGuidelineRows.has('M-130-RRG')) {
                                                e.target.style.backgroundColor = 'transparent';
                                            }
                                        }}
                                    >
                                        M-130-RRG
                                    </td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellType}>ISC</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellType}>RRG</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellTitle}>Diabetes RRG</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellDs}>2(DS)</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellLink}>
                                        View Codes
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellCode}
                                        style={{ color: '#4444A2', backgroundColor: selectedGuidelineRows.has('P-140-RRG') ? '#e4de77' : 'transparent' }}
                                        onClick={() => {
                                            const newSelected = new Set(selectedGuidelineRows);
                                            if (newSelected.has('P-140-RRG')) {
                                                newSelected.delete('P-140-RRG');
                                            } else {
                                                newSelected.add('P-140-RRG');
                                            }
                                            setSelectedGuidelineRows(newSelected);
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!selectedGuidelineRows.has('P-140-RRG')) {
                                                e.target.style.backgroundColor = '#e4de77';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!selectedGuidelineRows.has('P-140-RRG')) {
                                                e.target.style.backgroundColor = 'transparent';
                                            }
                                        }}
                                    >
                                        P-140-RRG
                                    </td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellType}>ISC</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellType}>RRG-P</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellTitle}>Diabetes, Pediatric RRG</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellDs}>(DS)</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellLink}>
                                        View Codes
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellCode}
                                        style={{ color: '#4444A2', backgroundColor: selectedGuidelineRows.has('OC-014') ? '#e4de77' : 'transparent' }}
                                        onClick={() => {
                                            const newSelected = new Set(selectedGuidelineRows);
                                            if (newSelected.has('OC-014')) {
                                                newSelected.delete('OC-014');
                                            } else {
                                                newSelected.add('OC-014');
                                            }
                                            setSelectedGuidelineRows(newSelected);
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!selectedGuidelineRows.has('OC-014')) {
                                                e.target.style.backgroundColor = '#e4de77';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!selectedGuidelineRows.has('OC-014')) {
                                                e.target.style.backgroundColor = 'transparent';
                                            }
                                        }}
                                    >
                                        OC-014
                                    </td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellType}>ISC</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellType}>OCG</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellTitle}>Diabetes: Observation Care</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellDs}></td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellLink}>
                                        View Codes
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellCode}
                                        style={{ color: '#4444A2', backgroundColor: selectedGuidelineRows.has('CCC-015') ? '#e4de77' : 'transparent' }}
                                        onClick={() => {
                                            const newSelected = new Set(selectedGuidelineRows);
                                            if (newSelected.has('CCC-015')) {
                                                newSelected.delete('CCC-015');
                                            } else {
                                                newSelected.add('CCC-015');
                                            }
                                            setSelectedGuidelineRows(newSelected);
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!selectedGuidelineRows.has('CCC-015')) {
                                                e.target.style.backgroundColor = '#e4de77';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!selectedGuidelineRows.has('CCC-015')) {
                                                e.target.style.backgroundColor = 'transparent';
                                            }
                                        }}
                                    >
                                        CCC-015
                                    </td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellType}>ISC</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellType}>CCC</td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellTitle}>Hyperglycemia and Diabetes Control: Common Complications and Conditions</td>
                                    <td className={styles.guidelineTableCell} style={{ color: '#C7C9C8', fontSize: '15.879px', fontWeight: 600 }}></td>
                                    <td className={styles.guidelineTableCell + ' ' + styles.guidelineTableCellLink}>
                                        View Codes
                                    </td>
                                </tr>
                                {/* Add more rows as needed */}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Step 2: Clinical Indications for Admission to Inpatient Care */}
            {clinicalReviewStep === 2 && (
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
            )}

            {/* Expand/Collapse Controls - outside padded container */}
            {clinicalReviewStep === 2 && (
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
            )}

            {/* Step 3: Care Planning - Inpatient Admission and Alternatives */}
            {clinicalReviewStep === 3 && (
                <div>
                    {/* Separator - adding vertical spacing */}
                    <div className={styles.carePlanningSeparator}></div>

                    {/* Success Banner */}
                    <div className={styles.successBanner}>
                        <div className={styles.successBannerLeft}>
                            <div className={styles.successBannerIcon}>✓</div>
                            <span className={styles.successBannerText}>Selections Made, Criteria Met</span>
                        </div>
                        <div className={styles.successBannerRight}>
                            <button className={styles.successBannerSaveBtn}>Save</button>
                            <button className={styles.successBannerCancelBtn}>Cancel</button>
                        </div>
                    </div>

                    {/* Content Container with custom padding */}
                    <div className={styles.carePlanningContent}>
                        {/* Main Title */}
                        <h1 className={styles.carePlanningTitle}>
                            Care Planning - Inpatient Admission and Alternatives
                        </h1>

                        {/* Subtitle */}
                        <h2 className={styles.carePlanningSubtitle}>
                            Clinical Indications for Admission to Inpatient Care
                        </h2>

                        {/* Note Section */}
                        <div className={styles.carePlanningNoteSection}>
                            <div className={styles.carePlanningNoteMain}>Note:</div>
                            <div className={styles.carePlanningNoteSub}>Some patients may be appropriate for Observation care.</div>
                            <div>For consideration of observation care, see Diabetes: Observation Care.</div>
                        </div>

                        {/* Clinical Indications Section */}
                        <div className={styles.carePlanningIndicationsSection}>
                            <div>Clinical Indications for Inpatient Admission - Diabetic Ketoacidosis (DKA)</div>
                            <ul className={styles.carePlanningList}>
                                <li>Confirmed diagnosis of DKA, typically with:
                                    <ul className={styles.carePlanningListNested}>
                                        <li>Blood glucose &gt;250 mg/dL</li>
                                        <li>Arterial pH &lt;7.30</li>
                                        <li>Serum bicarbonate &lt;18 mEq/L</li>
                                        <li>Presence of ketones and moderate/severe ketosis</li>
                                        <li>Elevated anion gap metabolic acidosis</li>
                                    </ul>
                                </li>
                            </ul>

                            <div>Physiologic Instability / Severity Indicators</div>
                            <ul className={styles.carePlanningList}>
                                <li>Altered mental status (e.g., lethargy, confusion, stupor, coma)</li>
                                <li>Hemodynamic instability (e.g., hypotension, tachycardia unresponsive to fluid resuscitation)</li>
                                <li>Severe dehydration with poor oral intake or need for IV fluids</li>
                                <li>Significant electrolyte disturbances, such as:
                                    <ul className={styles.carePlanningListNested}>
                                        <li>Severe hyponatremia(&lt;3.3 mEq/L)</li>
                                        <li>Hyperkalemia with ECG changes</li>
                                        <li>Severe hypokalemia</li>
                                    </ul>
                                </li>
                                <li>Refractory or persistent acidosis (e.g., pH &lt;7.0 despite initial treatment)</li>
                                <li>Inability to tolerate oral intake due to nausea, vomiting, or ileus</li>
                                <li>Respiratory distress or Kussmaul breathing</li>
                            </ul>

                            <div>Comorbidities / Complicating Factors</div>
                            <ul className={styles.carePlanningList}>
                                <li>Renal insufficiency / acute kidney injury (AKI)</li>
                                <li>Congestive heart failure</li>
                                <li>History of recent stroke or cardiac event</li>
                                <li>Sepsis or suspected infection</li>
                                <li>Coexisting conditions requiring close monitoring (e.g., pancreatitis, MI)</li>
                            </ul>

                            <div>Inadequate Outpatient Support or Risk Factors:</div>
                            <ul className={styles.carePlanningList}>
                                <li>Inability to safely manage at home due to social or environmental factors</li>
                                <li>History of noncompliance or poor follow-up</li>
                                <li>No access to insulin or inability to administer insulin safely</li>
                                <li>Lack of adequate support system</li>
                                <li>Recent psychiatric illness or suicidal ideation</li>
                            </ul>

                            <div>Pediatric Considerations (if applicable)</div>
                            <ul className={styles.carePlanningList}>
                                <li>Younger age (e.g., &lt;5 years) or low body weight</li>
                                <li>Risk of cerebral edema, especially in pediatric patients</li>
                                <li>Parental inability to manage condition at home</li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Success Banner */}
                    <div className={styles.successBanner}>
                        <div className={styles.successBannerLeft}>
                            <div className={styles.successBannerIcon}>✓</div>
                            <span className={styles.successBannerText}>Selections Made, Criteria Met</span>
                        </div>
                        <div className={styles.successBannerRight}>
                            <button className={styles.successBannerSaveBtn}>Save</button>
                            <button className={styles.successBannerCancelBtn}>Cancel</button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.actionButtonsContainer}>
                        <button className={styles.actionButtonNoteHistory}>View Note History</button>
                        <button className={styles.actionButtonEditNote}>Edit Note</button>
                    </div>
                </div>
            )}

            {/* Step 4: Medical Necessity Guidelines - Goal Length of Stay */}
            {clinicalReviewStep === 4 && (
                <div className={styles.step4Container}>
                    {/* Separator - adding vertical spacing */}
                    <div className={styles.step4Separator}></div>
                    {/* Main Content */}
                    <div className={styles.step4Content}>
                        {/* Title */}
                        <h1 className={styles.step4Title}>Goal Length of Stay: 2 Days</h1>
                        {/* Brief Stay Section */}
                        <div className={styles.staySection}>
                            <h2 className={styles.staySectionTitle}>Brief Stay (1 to 3 Days) – Target LOS: 2 Days</h2>
                            <ul className={styles.staySectionList}>
                                <li className={styles.staySectionListItem}>Initial stabilization within first 12–24 hours</li>
                                <li className={styles.staySectionListItem}>Transition from IV insulin to subcutaneous insulin regimen on Day 2</li>
                                <li className={styles.staySectionListItem}>
                                    Correction of:
                                    <ul className={styles.staySectionListNested}>
                                        <li>Acidosis</li>
                                    </ul>
                                </li>
                                <li className={styles.staySectionListItem}>
                                    Keto sis
                                    <ul className={styles.staySectionListNested}>
                                        <li>Electrolyte imbalances</li>
                                    </ul>
                                </li>
                                <li className={styles.staySectionListItem}>Nutritional intake established with adequate PO hydration</li>
                                <li className={styles.staySectionListItem}>Ongoing monitoring of labs and vitals for stability</li>
                                <li className={styles.staySectionListItem}>
                                    Diabetes education and discharge planning initiated:
                                    <ul className={styles.staySectionListNested}>
                                        <li>Insulin use, glucose monitoring</li>
                                        <li>Sick-day management</li>
                                    </ul>
                                </li>
                                <li className={styles.staySectionListItem}>Social work consult as needed (e.g., cost of insulin, access to care)</li>
                                <li className={styles.staySectionListItem}>Outpatient endocrinology follow-up arranged</li>
                                <li className={styles.staySectionListItem}>Documented improvement in mental status and vitals</li>
                            </ul>
                            <p className={styles.staySectionText}>
                                Represents a well-executed, protocol-based DKA management plan with effective interdisciplinary care coordination
                            </p>
                        </div>

                        {/* Moderate Stay Section */}
                        <div className={styles.staySection}>
                            <h2 className={styles.staySectionTitle}>
                                Moderate Stay (4 to 7 Days)
                            </h2>
                            <ul className={styles.staySectionList}>
                                <li className={styles.staySectionListItem}>Delayed response to treatment (e.g., persistent acidosis or ketosis)</li>
                                <li className={styles.staySectionListItem}>
                                    Complicating factors, such as:
                                    <ul className={styles.staySectionListNested}>
                                        <li>Infection requiring IV antibiotics</li>
                                        <li>Renal insufficiency delaying fluid or insulin management</li>
                                    </ul>
                                </li>
                                <li className={styles.staySectionListItem}>Nutrition or GI issues (e.g., nausea, gastroparesis) prolonging PO tolerance</li>
                                <li className={styles.staySectionListItem}>Slow weaning off insulin drip due to rebound hyperglycemia</li>
                                <li className={styles.staySectionListItem}>Psychosocial or discharge barriers (e.g., homelessness, no caregiver)</li>
                                <li className={styles.staySectionListItem}>Diabetes education prolonged or not yet completed</li>
                            </ul>
                            <p className={styles.staySectionText}>
                                Indicates medical or social complexity requiring extended monitoring or coordination
                            </p>
                        </div>

                        {/* Prolonged Stay Section */}
                        <div className={styles.staySection}>
                            <h2 className={styles.staySectionTitle}>
                                Prolonged Stay (&gt;7 Days)
                            </h2>
                            <ul className={styles.staySectionList}>
                                <li className={styles.staySectionListItem}>Severe or refractory DKA (e.g., pH &lt;7.0 not improving)</li>
                                <li className={styles.staySectionListItem}>Major comorbidities (e.g., MI, stroke, sepsis, pancreatitis)</li>
                                <li className={styles.staySectionListItem}>ICU-level complications (e.g., cerebral edema, ARDS)</li>
                                <li className={styles.staySectionListItem}>Psychiatric decompensation or suicide risk requiring inpatient psych</li>
                                <li className={styles.staySectionListItem}>Lack of safe discharge plan or need for long-term placement</li>
                                <li className={styles.staySectionListItem}>Multidisciplinary involvement (e.g., case management, psychiatry, rehab)</li>
                            </ul>
                            <p className={styles.staySectionText}>
                                Represents a highly complex patient requiring extended inpatient resources beyond standard DKA care
                            </p>
                        </div>
                    </div>
                </div>
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
