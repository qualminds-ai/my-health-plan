import React from 'react';
import PropTypes from 'prop-types';
import styles from './CMAlert.module.css';
import alertIcon from '../../assets/dashboard/icon-park-outline_share.svg';

/**
 * CM Alert Component for Case Management users
 * Displays alerts above the member tabs
 */
const CMAlert = ({ activeMode }) => {
    // Only show alerts for CM users
    if (activeMode !== 'CM') {
        return null;
    }

    return (
        <div className={styles.alertContainer}>
            <div className={styles.alertHeader}>
                <span className={styles.alertTitle}>Alerts</span>
                <img
                    src={alertIcon}
                    alt="Alert Icon"
                    className={styles.alertIcon}
                />
            </div>

            <ul className={styles.alertList}>
                <li className={styles.alertItem}>
                    EMR report indicates that Robert Abbott has developed Sepsis on 05/01/2025.
                </li>
                <li className={styles.alertItem}>
                    Risk stratification updated to "High"
                </li>
                <li className={styles.alertItem}>
                    Patient Persona updated to include "Non-Adherent"
                </li>
            </ul>
        </div>
    );
};

CMAlert.propTypes = {
    activeMode: PropTypes.string.isRequired
};

export default CMAlert;
