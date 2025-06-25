import React from 'react';
import PropTypes from 'prop-types';
import ActionButtons from './shared/ActionButtons';

const MemberHeader = ({
    memberName,
    onStarClick,
    onCallClick,
    onTextChatClick,
    onMessageClick,
    onWatchClick,
    onMedicalClick
}) => {
    return (
        <div style={{ width: '100%' }}>
            <div className="flex items-center py-3">
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h3 style={{
                                fontFamily: 'Inter',
                                fontSize: '20px',
                                fontWeight: '590',
                                lineHeight: '28px',
                                color: '#1D2939',
                                margin: '0'
                            }}>
                                Member Overview: {memberName}
                            </h3>
                        </div>
                        <ActionButtons
                            onStarClick={onStarClick}
                            onCallClick={onCallClick}
                            onTextChatClick={onTextChatClick}
                            onMessageClick={onMessageClick}
                            onWatchClick={onWatchClick}
                            onMedicalClick={onMedicalClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

MemberHeader.propTypes = {
    memberName: PropTypes.string.isRequired,
    onStarClick: PropTypes.func,
    onCallClick: PropTypes.func,
    onTextChatClick: PropTypes.func,
    onMessageClick: PropTypes.func,
    onWatchClick: PropTypes.func,
    onMedicalClick: PropTypes.func
};

MemberHeader.defaultProps = {
    onStarClick: () => { },
    onCallClick: () => { },
    onTextChatClick: () => { },
    onMessageClick: () => { },
    onWatchClick: () => { },
    onMedicalClick: () => { }
};

export default MemberHeader;
