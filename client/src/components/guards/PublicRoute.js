import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

/**
 * Public Route Component
 * Redirects authenticated users away from login page
 */
const PublicRoute = ({ children, isAuthenticated, loading }) => {
    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center space-y-3">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-label="Loading">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className="text-gray-600 font-medium">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // If authenticated, redirect to dashboard
    if (isAuthenticated) {
        return <Navigate to={ROUTES.DASHBOARD} replace />;
    }

    // If not authenticated, show the public content (login page)
    return children;
};

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
};

export default PublicRoute;
