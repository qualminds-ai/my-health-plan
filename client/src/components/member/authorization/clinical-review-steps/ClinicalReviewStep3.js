import React from 'react';

/**
 * ClinicalReviewStep3 Component
 * 
 * Renders Step 3: Care Planning - Inpatient Admission and Alternatives
 * Handles success banners and action buttons
 */
const ClinicalReviewStep3 = ({ styles }) => {
    return (
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
    );
};

export default ClinicalReviewStep3;
