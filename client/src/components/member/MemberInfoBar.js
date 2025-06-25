import React from 'react';
import PropTypes from 'prop-types';
import userIcon from '../../assets/authorizations/mingcute_user-x-fill.svg';

const MemberInfoBar = ({
    memberName,
    memberNumber,
    dateOfBirth,
    age,
    gender,
    eligibilityPeriod,
    language,
    programs,
    bhpType,
    optOut
}) => {
    return (
        <div style={{
            backgroundColor: '#F7F7F7',
            borderRadius: '13.091px',
            height: '72px',
            marginBottom: '20px'
        }}>
            <div style={{ width: '100%' }} className="px-4">
                <div className="flex py-3 items-center" style={{ height: '72px' }}>
                    {/* Icon Column (Far Left) */}
                    <div className="flex items-center justify-center mr-4">
                        <img src={userIcon} alt="User" style={{ width: '24px', height: '24px' }} />
                    </div>

                    {/* Member Details Column */}
                    <div className="mr-6 flex flex-col" style={{ gap: '5px' }}>
                        <div style={{
                            fontFamily: 'Inter',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#1D2939',
                            lineHeight: 'normal'
                        }}>
                            {memberName}
                        </div>
                        <div style={{
                            fontFamily: 'Inter',
                            fontSize: '11px',
                            fontWeight: '400',
                            color: '#667085',
                            lineHeight: 'normal'
                        }}>
                            {dateOfBirth}, {age} Years, {gender}
                        </div>
                    </div>

                    {/* Data Columns */}
                    <div className="flex-1 flex justify-between">
                        {/* Eligibility Column */}
                        <div className="flex flex-col" style={{ gap: '5px' }}>
                            <div style={{
                                fontFamily: 'Inter',
                                fontSize: '9px',
                                fontWeight: '400',
                                color: '#667085',
                                lineHeight: 'normal'
                            }}>
                                Eligibility
                            </div>
                            <div style={{
                                fontFamily: 'Inter',
                                fontSize: '11px',
                                fontWeight: '500',
                                color: '#1D2939',
                                lineHeight: 'normal'
                            }}>
                                {eligibilityPeriod}
                            </div>
                        </div>

                        {/* MRIN Column */}
                        <div className="flex flex-col" style={{ gap: '5px' }}>
                            <div style={{
                                fontFamily: 'Inter',
                                fontSize: '9px',
                                fontWeight: '400',
                                color: '#667085',
                                lineHeight: 'normal'
                            }}>
                                MRIN
                            </div>
                            <div style={{
                                fontFamily: 'Inter',
                                fontSize: '11px',
                                fontWeight: '500',
                                color: '#1D2939',
                                lineHeight: 'normal'
                            }}>
                                {memberNumber}
                            </div>
                        </div>

                        {/* Language Column */}
                        <div className="flex flex-col" style={{ gap: '5px' }}>
                            <div style={{
                                fontFamily: 'Inter',
                                fontSize: '9px',
                                fontWeight: '400',
                                color: '#667085',
                                lineHeight: 'normal'
                            }}>
                                Language (1st)
                            </div>
                            <div style={{
                                fontFamily: 'Inter',
                                fontSize: '11px',
                                fontWeight: '500',
                                color: '#1D2939',
                                lineHeight: 'normal'
                            }}>
                                {language}
                            </div>
                        </div>

                        {/* Programs Column */}
                        <div className="flex flex-col" style={{ gap: '5px' }}>
                            <div style={{
                                fontFamily: 'Inter',
                                fontSize: '9px',
                                fontWeight: '400',
                                color: '#667085',
                                lineHeight: 'normal'
                            }}>
                                Programs
                            </div>
                            <div style={{
                                fontFamily: 'Inter',
                                fontSize: '11px',
                                fontWeight: '500',
                                color: '#1D2939',
                                lineHeight: 'normal'
                            }}>
                                {programs}
                            </div>
                        </div>

                        {/* BHP Column */}
                        <div className="flex flex-col" style={{ gap: '5px' }}>
                            <div style={{
                                fontFamily: 'Inter',
                                fontSize: '9px',
                                fontWeight: '400',
                                color: '#667085',
                                lineHeight: 'normal'
                            }}>
                                BHP
                            </div>
                            <div style={{
                                fontFamily: 'Inter',
                                fontSize: '11px',
                                fontWeight: '500',
                                color: '#1D2939',
                                lineHeight: 'normal'
                            }}>
                                {bhpType}
                            </div>
                        </div>

                        {/* Opt Out Column */}
                        <div className="flex flex-col" style={{ gap: '5px' }}>
                            <div style={{
                                fontFamily: 'Inter',
                                fontSize: '9px',
                                fontWeight: '400',
                                color: '#667085',
                                lineHeight: 'normal'
                            }}>
                                Opt out
                            </div>
                            <div style={{
                                fontFamily: 'Inter',
                                fontSize: '11px',
                                fontWeight: '500',
                                color: '#1D2939',
                                lineHeight: 'normal'
                            }}>
                                {optOut}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

MemberInfoBar.propTypes = {
    memberName: PropTypes.string.isRequired,
    memberNumber: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    gender: PropTypes.string.isRequired,
    eligibilityPeriod: PropTypes.string.isRequired,
    language: PropTypes.string,
    programs: PropTypes.string,
    bhpType: PropTypes.string,
    optOut: PropTypes.string
};

MemberInfoBar.defaultProps = {
    language: 'English',
    programs: 'Care Coordination: ERM PH',
    bhpType: 'Large Group',
    optOut: 'No'
};

export default MemberInfoBar;
