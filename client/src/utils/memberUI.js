// Utility functions for member UI badge classes

export const getStatusBadgeClass = (status, styles) => {
    const baseClass = styles.statusBadge;
    switch (status?.toLowerCase()) {
        case 'approved': return `${baseClass} ${styles.statusApproved}`;
        case 'pending': return `${baseClass} ${styles.statusPending}`;
        case 'in review': return `${baseClass} ${styles.statusInReview}`;
        case 'denied': return `${baseClass} ${styles.statusDenied}`;
        default: return `${baseClass} bg-gray-500`;
    }
};

export const getPriorityBadgeClass = (priority, styles) => {
    const baseClass = styles.priorityBadge;
    switch (priority?.toLowerCase()) {
        case 'high': return `${baseClass} ${styles.priorityHigh}`;
        case 'medium': return `${baseClass} ${styles.priorityMedium}`;
        case 'low': return `${baseClass} ${styles.priorityLow}`;
        default: return `${baseClass} bg-gray-500`;
    }
};
