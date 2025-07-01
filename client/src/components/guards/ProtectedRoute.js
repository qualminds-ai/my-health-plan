import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants';

/**
 * Protected Route Component
 * Prevents flickering by properly handling authentication state
 */
const ProtectedRoute = ({ children, isAuthenticated, loading }) => {
    const location = useLocation();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center space-y-3">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-label="Loading">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className="text-gray-600 font-medium">Loading application...</p>
                </div>
            </div>
        );
    }

    // If not authenticated after loading is complete, redirect to login
    if (!isAuthenticated) {
        return (
            <Navigate
                to={ROUTES.LOGIN}
                state={{ from: location }}
                replace
            />
        );
    }

    // If authenticated, render the protected content
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
};

export default ProtectedRoute;
