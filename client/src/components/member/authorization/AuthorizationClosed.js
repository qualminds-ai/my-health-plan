import React from 'react';
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
    AttachmentItem
}) => {
    return (
        <>
            <AuthorizationClosedSummary />
            <AuthorizationAttachments
                attachments={attachments}
                AttachmentItem={AttachmentItem}
            />
        </>
    );
};

export default AuthorizationClosed;
