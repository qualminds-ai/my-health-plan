import React from 'react';
import PropTypes from 'prop-types';

const MemberTabs = ({
    tabs,
    activeTab,
    onTabChange
}) => {
    return (
        <div className="member-tabs" style={{ backgroundColor: '#FEFEFE' }}>
            <div style={{ width: '100%' }}>
                <ul className="flex border-0" style={{ marginBottom: '0', gap: '30px', borderBottom: '4px solid #EDEDED' }}>
                    {tabs.map((tab) => (
                        <li className="nav-item" key={tab}>
                            <button
                                className="px-4 py-2 transition-colors relative"
                                style={{
                                    color: activeTab === tab ? '#000' : '#727272',
                                    fontFamily: 'Inter',
                                    fontSize: '11.455px',
                                    fontStyle: 'normal',
                                    fontWeight: activeTab === tab ? '700' : '400',
                                    lineHeight: 'normal',
                                    backgroundColor: activeTab === tab ? '#EDEDED' : 'transparent',
                                    borderRadius: activeTab === tab ? '6.545px 6.545px 0px 0px' : '0',
                                    border: 'none',
                                    borderBottom: activeTab === tab ? '4px solid #EDEDED' : 'none',
                                    marginBottom: '-4px'
                                }}
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
