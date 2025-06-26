import React from 'react';
import styles from '../../Member.module.css';

const AuthorizationRequestNavTabs = ({ activeRequestTab, setActiveRequestTab }) => (
    <div className={styles.flexItemsCenterMb4}>
        <div className={styles.requestNavContainer}>
            <button
                className={
                    `${styles.requestTabButton} ${activeRequestTab === 'Request History' ? styles.requestTabButtonActive : styles.requestTabButtonInactive}`
                }
                onClick={() => setActiveRequestTab('Request History')}
            >
                Request History
            </button>
            <button
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

export default AuthorizationRequestNavTabs;
