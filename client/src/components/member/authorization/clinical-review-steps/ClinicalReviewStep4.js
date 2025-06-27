import React from 'react';

/**
 * ClinicalReviewStep4 Component
 * 
 * Renders Step 4: Medical Necessity Guidelines - Goal Length of Stay
 * Displays stay duration guidelines and target length of stay information
 */
const ClinicalReviewStep4 = ({ styles }) => {
    return (
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
    );
};

export default ClinicalReviewStep4;
