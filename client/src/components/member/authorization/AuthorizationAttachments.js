import React from 'react';
import styles from '../../Member.module.css';

const AuthorizationAttachments = ({ attachments, AttachmentItem }) => (
    <div>
        <h3 className={styles.attachmentsTitle}>Attachments</h3>
        <div className={styles.attachmentsContainer}>
            {attachments.map((attachment) => (
                <AttachmentItem key={attachment.id} attachment={attachment} />
            ))}
        </div>
    </div>
);

export default AuthorizationAttachments;
