import React from 'react';
import PropTypes from 'prop-types';

/**
 * Smooth Transition Wrapper Component
 * Prevents layout shifts and flickering during navigation
 */
const SmoothTransition = ({ children, loading, className = '' }) => {
    return (
        <div
            className={`page-transition ${className}`}
            style={{
                opacity: loading ? 0.8 : 1,
                transition: 'opacity 0.2s ease-in-out',
                minHeight: '100vh'
            }}
        >
            {children}
        </div>
    );
};

SmoothTransition.propTypes = {
    children: PropTypes.node.isRequired,
    loading: PropTypes.bool,
    className: PropTypes.string
};

export default SmoothTransition;
