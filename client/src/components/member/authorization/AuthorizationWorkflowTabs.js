import React from 'react';
import styles from '../../Member.module.css';

const AuthorizationWorkflowTabs = ({ authTabs, activeAuthTab, handleAuthTabClick }) => (
    <div className="flex items-center mb-4">
        <div className={`flex ${styles.authSubNavContainer}`}>
            {authTabs.map((authTab) => (
                <button
                    key={authTab.id}
                    className={`transition-colors relative ${styles.authSubTabButton} ${activeAuthTab === authTab.id ? styles.authSubTabButtonActive : styles.authSubTabButtonInactive}`}
                    onClick={() => handleAuthTabClick(authTab.id)}
                >
                    {authTab.label}
                </button>
            ))}
        </div>
    </div>
);

export default AuthorizationWorkflowTabs;
