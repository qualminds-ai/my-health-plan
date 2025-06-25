import React from 'react';
import PropTypes from 'prop-types';

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
        <div className="flex items-center gap-2">
            <button
                className="flex items-center justify-center"
                style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #D0D5DD',
                    borderRadius: '6px',
                    padding: '0',
                    cursor: 'pointer',
                    filter: 'grayscale(100%)'
                }}
                onClick={onStarClick}
            >
                <img src={starIcon} alt="Star" />
            </button>

            <button
                className="flex items-center justify-center"
                style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #D0D5DD',
                    borderRadius: '6px',
                    padding: '0',
                    cursor: 'pointer'
                }}
                onClick={onCallClick}
            >
                <img src={callIcon} alt="Call" />
            </button>

            <button
                className="flex items-center justify-center"
                style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #D0D5DD',
                    borderRadius: '6px',
                    padding: '0',
                    cursor: 'pointer'
                }}
                onClick={onTextChatClick}
            >
                <img src={textChatIcon} alt="Chat" />
            </button>

            <button
                className="flex items-center justify-center"
                style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #D0D5DD',
                    borderRadius: '6px',
                    padding: '0',
                    cursor: 'pointer'
                }}
                onClick={onMessageClick}
            >
                <img src={messageIcon} alt="Message" />
            </button>

            <button
                className="flex items-center justify-center"
                style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #D0D5DD',
                    borderRadius: '6px',
                    padding: '0',
                    cursor: 'pointer'
                }}
                onClick={onWatchClick}
            >
                <img src={watchIcon} alt="Watch" />
            </button>

            <button
                className="flex items-center justify-center"
                style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #D0D5DD',
                    borderRadius: '3.523px',
                    padding: '0',
                    cursor: 'pointer',
                    background: `url(${medicalIcon}) lightgray 50% / cover no-repeat`,
                    filter: 'grayscale(100%)'
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
