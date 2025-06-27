import React from 'react';
import styles from '../../Member.module.css';

const AuthorizationAttachments = ({ attachments, AttachmentItem }) => (
    <div id="authorization-attachments">
        <h3 id="authorization-attachments-title" className={styles.attachmentsTitle}>Attachments</h3>
        <div id="authorization-attachments-container" className={styles.attachmentsContainer}>
            {attachments.map((attachment) => (
                <AttachmentItem key={attachment.id} attachment={attachment} />
            ))}
        </div>
    </div>
);

export default AuthorizationAttachments;
