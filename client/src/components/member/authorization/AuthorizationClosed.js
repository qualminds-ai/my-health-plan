import React from 'react';
import PropTypes from 'prop-types';
import AuthorizationClosedSummary from './AuthorizationClosedSummary';
import AuthorizationAttachments from './AuthorizationAttachments';

/**
 * AuthorizationClosed Component
 * 
 * Renders the Closed tab content for an authorization.
 * Includes the closed authorization summary and attachments sections.
 */
const AuthorizationClosed = ({
    attachments,
    AttachmentItem,
    activeRequestTab
}) => {
    return (
        <>
            <AuthorizationClosedSummary activeRequestTab={activeRequestTab} />
            <AuthorizationAttachments
                attachments={attachments}
                AttachmentItem={AttachmentItem}
            />
        </>
    );
};

AuthorizationClosed.propTypes = {
    attachments: PropTypes.array.isRequired,
    AttachmentItem: PropTypes.func.isRequired,
    activeRequestTab: PropTypes.string
};

export default AuthorizationClosed;
