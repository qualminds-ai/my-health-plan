import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../Member.module.css';

const AuthorizationRequestNavTabs = ({ activeRequestTab, setActiveRequestTab }) => (
    <div id="authorization-request-nav-tabs" className={styles.flexItemsCenterMb4}>
        <div id="request-nav-container" className={styles.requestNavContainer}>
            <button
                id="request-history-tab-button"
                className={
                    `${styles.requestTabButton} ${activeRequestTab === 'Request History' ? styles.requestTabButtonActive : styles.requestTabButtonInactive}`
                }
                onClick={() => setActiveRequestTab('Request History')}
            >
                Request History
            </button>
            <button
                id="request-detail-tab-button"
                className={
                    `${styles.requestTabButton} ${activeRequestTab === '20250P000367' ? styles.requestTabButtonActive : styles.requestTabButtonInactive}`
                }
                onClick={() => setActiveRequestTab('20250P000367')}
            >
                20250P000367
            </button>
        </div>
    </div>
);

AuthorizationRequestNavTabs.propTypes = {
    activeRequestTab: PropTypes.string.isRequired,
    setActiveRequestTab: PropTypes.func.isRequired
};

export default AuthorizationRequestNavTabs;
