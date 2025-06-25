import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Dashboard.module.css';

const StatsCard = ({
    title,
    value,
    label,
    iconSvg,
    isPrimary = false,
    variant = 'primary'
}) => {
    let variantClass;
    if (variant === 'primary') {
        variantClass = styles.primary;
    } else if (variant === 'secondary') {
        variantClass = styles.secondary;
    } else {
        variantClass = styles.tertiary;
    }

    const cardClasses = [
        styles.statsCard,
        variantClass
    ].filter(Boolean).join(' ');

    const iconClasses = [
        styles.statsIcon,
        variant === 'tertiary' ? styles.tertiary : ''
    ].filter(Boolean).join(' ');

    const labelClasses = [
        styles.statsLabel,
        styles[variant]
    ].filter(Boolean).join(' ');

    const numberClasses = [
        styles.statsNumber,
        styles[variant]
    ].filter(Boolean).join(' ');

    return (
        <div
            id={`stats-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
            className={cardClasses}
        >
            <div className={styles.statsCardLeft}>
                <div className={iconClasses}>
                    {iconSvg}
                </div>
                <div className={labelClasses}>
                    {label}
                </div>
            </div>
            <div className={numberClasses}>
                {value}
            </div>
        </div>
    );
};

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    iconSvg: PropTypes.element.isRequired,
    isPrimary: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary'])
};

export default StatsCard;
