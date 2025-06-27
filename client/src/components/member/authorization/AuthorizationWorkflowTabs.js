import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../Member.module.css';

const AuthorizationWorkflowTabs = ({ authTabs, activeAuthTab, handleAuthTabClick }) => (
    <div id="authorization-workflow-tabs" className="flex items-center mb-4">
        <div id="auth-sub-nav-container" className={`flex ${styles.authSubNavContainer}`}>
            {authTabs.map((authTab) => (
                <button
                    key={authTab.id}
                    id={`auth-tab-${authTab.id.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`transition-colors relative ${styles.authSubTabButton} ${activeAuthTab === authTab.id ? styles.authSubTabButtonActive : styles.authSubTabButtonInactive}`}
                    onClick={() => handleAuthTabClick(authTab.id)}
                >
                    {authTab.label}
                </button>
            ))}
        </div>
    </div>
);

AuthorizationWorkflowTabs.propTypes = {
    authTabs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        status: PropTypes.string
    })).isRequired,
    activeAuthTab: PropTypes.string.isRequired,
    handleAuthTabClick: PropTypes.func.isRequired
};

export default AuthorizationWorkflowTabs;
