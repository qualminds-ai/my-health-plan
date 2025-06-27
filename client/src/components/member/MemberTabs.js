import React from 'react';
import PropTypes from 'prop-types';
import styles from './MemberTabs.module.css';

const MemberTabs = ({
    tabs,
    activeTab,
    onTabChange
}) => {
    return (
        <div id="member-tabs" className={styles.memberTabs}>
            <div id="member-tabs-container" className={styles.memberTabsContainer}>
                <ul id="member-tabs-list" className={styles.memberTabsList}>
                    {tabs.map((tab) => (
                        <li id={`member-tab-item-${tab.toLowerCase().replace(/\s+/g, '-')}`} className={styles.memberTabItem} key={tab}>
                            <button
                                id={`member-tab-button-${tab.toLowerCase().replace(/\s+/g, '-')}`}
                                className={`${styles.memberTabButton} ${activeTab === tab ? styles.memberTabButtonActive : ''}`}
                                onClick={() => onTabChange(tab)}
                            >
                                {tab}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

MemberTabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeTab: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired
};

export default MemberTabs;
