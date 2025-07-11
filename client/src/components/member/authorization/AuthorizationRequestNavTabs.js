import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../../hooks/useAuth';
import styles from '../../Member.module.css';

const AuthorizationRequestNavTabs = ({ activeRequestTab, setActiveRequestTab }) => {
    const { activeMode } = useAuth();

    // Dynamic authorization number based on user mode
    const authorizationNumber = activeMode === 'UM-SNF' ? '2025OP000390' : '2025OP000389';

    return (
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
                        `${styles.requestTabButton} ${activeRequestTab === authorizationNumber ? styles.requestTabButtonActive : styles.requestTabButtonInactive}`
                    }
                    onClick={() => setActiveRequestTab(authorizationNumber)}
                >
                    {authorizationNumber}
                </button>
            </div>
        </div>
    );
};

AuthorizationRequestNavTabs.propTypes = {
    activeRequestTab: PropTypes.string.isRequired,
    setActiveRequestTab: PropTypes.func.isRequired
};

export default AuthorizationRequestNavTabs;
