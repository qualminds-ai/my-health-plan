import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Dashboard.module.css';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className={styles.tabsContainer}>
            {tabs.map((tab, index) => {
                let buttonClasses = [styles.tabButton];

                if (index === 0) {
                    buttonClasses.push(styles.first);
                }
                if (index === tabs.length - 1) {
                    buttonClasses.push(styles.last);
                }
                if (activeTab === tab) {
                    buttonClasses.push(styles.active);
                }

                return (
                    <button
                        key={tab}
                        id={`tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => onTabChange(tab)}
                        className={buttonClasses.join(' ')}
                    >
                        {tab}
                    </button>
                );
            })}
        </div>
    );
};

TabNavigation.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeTab: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired
};

export default TabNavigation;
