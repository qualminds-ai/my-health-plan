import React from 'react';
import PropTypes from 'prop-types';
import styles from './ActionButtons.module.css';

// Import assets
import starIcon from '../../../assets/authorizations/star-icon.png';
import callIcon from '../../../assets/authorizations/call-icon.png';
import textChatIcon from '../../../assets/authorizations/text-chat-icon.png';
import messageIcon from '../../../assets/authorizations/message-icon.png';
import watchIcon from '../../../assets/authorizations/watch-icon.png';
import medicalIcon from '../../../assets/authorizations/medical-icon.png';

const ActionButtons = ({
    onStarClick,
    onCallClick,
    onTextChatClick,
    onMessageClick,
    onWatchClick,
    onMedicalClick
}) => {
    return (
        <div id="member-action-buttons-container" className={styles.actionButtonsContainer}>
            <button
                id="member-star-button"
                className={`${styles.actionButton} ${styles.actionButtonGrayscale}`}
                onClick={onStarClick}
            >
                <img src={starIcon} alt="Star" />
            </button>

            <button
                id="member-call-button"
                className={styles.actionButton}
                onClick={onCallClick}
            >
                <img src={callIcon} alt="Call" />
            </button>

            <button
                id="member-text-chat-button"
                className={styles.actionButton}
                onClick={onTextChatClick}
            >
                <img src={textChatIcon} alt="Chat" />
            </button>

            <button
                id="member-message-button"
                className={styles.actionButton}
                onClick={onMessageClick}
            >
                <img src={messageIcon} alt="Message" />
            </button>

            <button
                id="member-watch-button"
                className={styles.actionButton}
                onClick={onWatchClick}
            >
                <img src={watchIcon} alt="Watch" />
            </button>

            <button
                id="member-medical-button"
                className={`${styles.actionButton} ${styles.actionButtonMedical} ${styles.actionButtonGrayscale}`}
                style={{
                    backgroundImage: `url(${medicalIcon})`
                }}
                onClick={onMedicalClick}
            >
            </button>
        </div>
    );
};

ActionButtons.propTypes = {
    onStarClick: PropTypes.func,
    onCallClick: PropTypes.func,
    onTextChatClick: PropTypes.func,
    onMessageClick: PropTypes.func,
    onWatchClick: PropTypes.func,
    onMedicalClick: PropTypes.func
};

ActionButtons.defaultProps = {
    onStarClick: () => { },
    onCallClick: () => { },
    onTextChatClick: () => { },
    onMessageClick: () => { },
    onWatchClick: () => { },
    onMedicalClick: () => { }
};

export default ActionButtons;
