import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { STORAGE_KEYS, ROUTES, MESSAGES } from '../constants';
import authService from '../services/authService';
import { useUserMode } from './useUserMode';

/**
 * Enhanced Custom hook for authentication management with user mode support
 */
export const useAuth = () => {
    const [baseUser, setBaseUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    // Initialize user mode management
    const userModeState = useUserMode(baseUser);

    const clearAuthData = useCallback(() => {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        setBaseUser(null);
        setToken(null);
        setError(null);
    }, []);

    // Initialize authentication state
    const initializeAuth = useCallback(() => {
        try {
            const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
            const savedUser = localStorage.getItem(STORAGE_KEYS.USER);

            if (savedToken && savedUser) {
                setToken(savedToken);
                setBaseUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.error('Error parsing saved user data:', error);
            clearAuthData();
        } finally {
            setLoading(false);
        }
    }, [clearAuthData]);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    const login = async (credentials) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authService.login(credentials);

            if (response.token && response.user) {
                setToken(response.token);
                setBaseUser(response.user);

                localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
                localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));

                // Redirect to intended page or dashboard
                const from = location.state?.from?.pathname || ROUTES.DASHBOARD;
                navigate(from, { replace: true });

                return response;
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            const errorMessage = error.message || MESSAGES.NETWORK_ERROR;
            setError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);

            // Call logout endpoint
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
            // Continue with logout even if API call fails
        } finally {
            // Clear sepsis scenario on logout
            userModeState.clearSepsisScenario?.();
            clearAuthData();
            navigate(ROUTES.LOGIN, { replace: true });
            setLoading(false);
        }
    };

    const isAuthenticated = () => {
        return !!(userModeState.user && token);
    };

    return {
        user: userModeState.user,
        token,
        loading: loading || userModeState.loading,
        error,
        login,
        logout,
        isAuthenticated,
        clearError: () => setError(null),
        // User mode functions
        activeMode: userModeState.activeMode,
        scenarios: userModeState.scenarios,
        switchUserMode: userModeState.switchUserMode,
        toggleScenario: userModeState.toggleScenario,
        hasScenario: userModeState.hasScenario,
        resetMode: userModeState.resetMode,
        availableModes: userModeState.availableModes,
        // Persona functions
        activePersona: userModeState.activePersona,
        availablePersonas: userModeState.availablePersonas,
        switchPersona: userModeState.switchPersona,
        // Sepsis scenario functions
        applySepsisModifications: userModeState.applySepsisModifications,
        getSepsisModifiedStats: userModeState.getSepsisModifiedStats,
        shouldHideArrow: userModeState.shouldHideArrow,
        getMemberSepsisInfo: userModeState.getMemberSepsisInfo,
        clearSepsisScenario: userModeState.clearSepsisScenario,
        sepsisModifications: userModeState.sepsisModifications
    };
};
