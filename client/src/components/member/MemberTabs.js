import React from 'react';
import PropTypes from 'prop-types';
import styles from './MemberTabs.module.css';

const MemberTabs = ({
    tabs,
    activeTab,
    onTabChange
}) => {
    return (
        <div className={styles.memberTabs}>
            <div className={styles.memberTabsContainer}>
                <ul className={styles.memberTabsList}>
                    {tabs.map((tab) => (
                        <li className={styles.memberTabItem} key={tab}>
                            <button
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
