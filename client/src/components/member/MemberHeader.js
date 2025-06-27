import React from 'react';
import PropTypes from 'prop-types';
import styles from './MemberHeader.module.css';
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
        <div id="member-header-container" className={styles.memberHeaderContainer}>
            <div id="member-header-content" className={styles.memberHeaderContent}>
                <div id="member-header-left" className={styles.memberHeaderLeft}>
                    <div id="member-header-title-container" className={styles.memberHeaderTitleContainer}>
                        <div id="member-header-title-wrapper" className={styles.memberHeaderTitleWrapper}>
                            <h3 id="member-header-title" className={styles.memberHeaderTitle}>
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
