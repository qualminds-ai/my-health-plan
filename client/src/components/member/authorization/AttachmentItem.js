import React from 'react';
import styles from '../../Member.module.css';

const AttachmentItem = ({ attachment, getAttachmentIcon }) => {
    const isActive = attachment.id === 1;
    const dynamicBgStyle = { backgroundImage: `url(${getAttachmentIcon(attachment.type, attachment.title)})` };
    return (
        <div className={styles.attachmentItem}>
            <div
                className={`${styles.attachmentIcon} ${styles.attachmentIconBg} ${styles.attachmentIconDynamicBg}`}
                style={dynamicBgStyle}
            />
            <div className={styles.attachmentContent}>
                <div className={`${styles.attachmentTitle} ${isActive ? styles.attachmentTitleActive : styles.attachmentTitleInactive}`}>{attachment.title}</div>
                <div className={`${styles.attachmentMeta} ${isActive ? styles.attachmentMetaActive : styles.attachmentMetaInactive}`}>
                    {attachment.date} · {attachment.size}.{attachment.type === 'fax' ? 'pdf' : attachment.type}
                </div>
            </div>
        </div>
    );
};

export default AttachmentItem;
