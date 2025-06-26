import React from 'react';
import AuthorizationSummary from './AuthorizationSummary';
import AuthorizationAttachments from './AuthorizationAttachments';

/**
 * AuthorizationRequestSubmitted Component
 * 
 * Renders the Request Submitted tab content for an authorization.
 * Includes the authorization summary and attachments sections.
 */
const AuthorizationRequestSubmitted = ({
    getStatusBadgeClass,
    getPriorityBadgeClass,
    attachments,
    AttachmentItem
}) => {
    return (
        <>
            <AuthorizationSummary
                getStatusBadgeClass={getStatusBadgeClass}
                getPriorityBadgeClass={getPriorityBadgeClass}
            />
            <AuthorizationAttachments
                attachments={attachments}
                AttachmentItem={AttachmentItem}
            />
        </>
    );
};

export default AuthorizationRequestSubmitted;
