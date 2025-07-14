import React from 'react';
import PropTypes from 'prop-types';

/**
 * ClinicalReviewStep1 Component
 * 
 * Renders Step 1: Guidelines Search and Selection
 * Handles guideline selection checkboxes, quick search, and guidelines table
 */
const ClinicalReviewStep1 = ({
    styles,
    selectedGuidelineRows,
    setSelectedGuidelineRows
}) => {
    return (
        <div className={styles.navigationSection}>
            {/* Guideline Selection Checkboxes */}
            <div id="guidelines-selection-container" className={styles.guidelinesSelectionContainer}>
                <label className={styles.guidelinesCheckboxLabel}>
                    <input
                        id="guideline-checkbox-aco"
                        type="checkbox"
                        className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                    />
                    <span className={styles.guidelinesCheckboxText}>
                        ACO
                    </span>
                </label>
                <label className={styles.guidelinesCheckboxLabel}>
                    <input
                        id="guideline-checkbox-isc"
                        type="checkbox"
                        className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                    />
                    <span className={styles.guidelinesCheckboxText}>
                        ISC
                    </span>
                </label>
                <label className={styles.guidelinesCheckboxLabel}>
                    <input
                        id="guideline-checkbox-grc"
                        type="checkbox"
                        className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                    />
                    <span className={styles.guidelinesCheckboxText}>
                        GRC
                    </span>
                </label>
                <label className={styles.guidelinesCheckboxLabel}>
                    <input
                        id="guideline-checkbox-mcm"
                        type="checkbox"
                        className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                    />
                    <span className={styles.guidelinesCheckboxText}>
                        MCM
                    </span>
                </label>
                <label className={styles.guidelinesCheckboxLabel}>
                    <input
                        id="guideline-checkbox-rfc"
                        type="checkbox"
                        className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                    />
                    <span className={styles.guidelinesCheckboxText}>
                        RFC
                    </span>
                </label>
                <label className={styles.guidelinesCheckboxLabel}>
                    <input
                        id="guideline-checkbox-hhc"
                        type="checkbox"
                        className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                    />
                    <span className={styles.guidelinesCheckboxText}>
                        HHC
                    </span>
                </label>
                <label className={styles.guidelinesCheckboxLabel}>
                    <input
                        id="guideline-checkbox-ccg"
                        type="checkbox"
                        className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                    />
                    <span className={styles.guidelinesCheckboxText}>
                        CCG
                    </span>
                </label>
                <label className={styles.guidelinesCheckboxLabel}>
                    <input
                        id="guideline-checkbox-tc"
                        type="checkbox"
                        className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                    />
                    <span className={styles.guidelinesCheckboxText}>
                        TC
                    </span>
                </label>
                <label className={styles.guidelinesCheckboxLabel}>
                    <input
                        id="guideline-checkbox-dbhc"
                        type="checkbox"
                        className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                    />
                    <span className={styles.guidelinesCheckboxText}>
                        DBHC
                    </span>
                </label>
                <label className={styles.guidelinesCheckboxLabel}>
                    <input
                        id="guideline-checkbox-pip"
                        type="checkbox"
                        className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                    />
                    <span className={styles.guidelinesCheckboxText}>
                        PIP
                    </span>
                </label>
                <label className={styles.guidelinesCheckboxLabel}>
                    <input
                        id="guideline-checkbox-mcr"
                        type="checkbox"
                        className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                    />
                    <span className={styles.guidelinesCheckboxText}>
                        MCR
                    </span>
                </label>
            </div>

            {/* Quick Search */}
            <div id="quick-search-container" className={styles.quickSearchContainer}>
                <span id="quick-search-label" className={styles.quickSearchLabel}>
                    Quick Search
                </span>
                <input
                    id="quick-search-input"
                    type="text"
                    defaultValue="DKA"
                    className={styles.quickSearchInput}
                />
                <button id="quick-search-button" className={styles.quickSearchButton}>
                    Search
                </button>
            </div>

            {/* Results Summary */}
            <div id="search-results-container" className={styles.resultsContainer}>
                6 results for DKA
                <span className={styles.resultsFloatRight}>
                    (Results 1 - 6 of 6)
                </span>
            </div>

            {/* Guidelines Table */}
            <div id="guidelines-table-container" className={styles.guidelinesTableContainer}>
                <table id="guidelines-table" className={styles.guidelinesTable}>
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
                                id="guideline-cell-m-130"
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
                                id="guideline-cell-p-140"
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
                                id="guideline-cell-m-130-rrg"
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
                                id="guideline-cell-p-140-rrg"
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
                                id="guideline-cell-oc-014"
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
                                id="guideline-cell-ccc-015"
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
                    </tbody>
                </table>
            </div>
        </div>
    );
};

ClinicalReviewStep1.propTypes = {
    styles: PropTypes.object.isRequired,
    selectedGuidelineRows: PropTypes.instanceOf(Set).isRequired,
    setSelectedGuidelineRows: PropTypes.func.isRequired
};

export default ClinicalReviewStep1;
