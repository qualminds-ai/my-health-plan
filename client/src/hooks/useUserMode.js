import { useState, useEffect, useCallback, useMemo } from 'react';
import { STORAGE_KEYS } from '../constants';

// Hardcoded sepsis scenario data modifications
const SEPSIS_MODIFICATIONS = {
    // Robert Abbott's authorization changes when sepsis develops
    authorization: {
        '2025OP000389': {
            review_type: 'Concurrent Review',
            status: 'In Review',
            priority: 'High',
            clinical_notes: 'Patient developed sepsis - escalated to concurrent review',
            member_name: 'Abbott, Robert' // Database format is "Last, First"
        },
        '2025OP000312': {
            priority: 'Medium',
            specialStyling: 'specialBlue' // Special blue background
        }
    },
    // Dashboard stats when sepsis scenario is active
    dashboardStats: {
        due_today_count: 48,
        high_priority_count: 5,
        reminders_count: 9,
        start_this_week_count: 21
    },
    // Remove blue arrow for first record when sepsis is active
    removeArrow: true,
    // Member info changes for Robert Abbott
    memberInfo: {
        'MEM001': {
            urgentAlert: true,
            alertMessage: 'SEPSIS ALERT: Patient condition escalated to concurrent review',
            additionalNotes: 'Immediate clinical attention required'
        }
    }
};

/**
 * Enhanced User Mode Hook
 * Manages user role switching and scenario modes without logout/login
 */
export const useUserMode = (initialUser) => {
    const [user, setUser] = useState(initialUser);
    const [activeMode, setActiveMode] = useState('UM'); // UM, UM-SNF (internal for "UM, SNF"), CM
    const [scenarios, setScenarios] = useState(new Set()); // Active scenarios
    const [loading, setLoading] = useState(false);
    const [activePersona, setActivePersona] = useState(null); // Active user persona

    // Define available user personas
    const availablePersonas = useMemo(() => [
        {
            id: 'maria.hartsell',
            email: 'maria.hartsell@myhealthplan.com',
            full_name: 'Maria Hartsell',
            role: 'UM',
            displayRole: 'UM',
            availableModes: ['UM']
        },
        {
            id: 'elise.tran',
            email: 'elise.tran@myhealthplan.com',
            full_name: 'Elise Tran',
            role: 'UM, SNF',
            displayRole: 'UM, SNF',
            availableModes: ['UM-SNF'] // Internal representation of "UM, SNF" as single role
        },
        {
            id: 'karen.white',
            email: 'karen.white@myhealthplan.com',
            full_name: 'Karen White',
            role: 'CM',
            displayRole: 'CM',
            availableModes: ['CM']
        }
    ], []);

    // Update user when initialUser changes
    useEffect(() => {
        setUser(initialUser);

        // Set default persona based on logged-in user
        if (initialUser) {
            const savedPersona = localStorage.getItem(STORAGE_KEYS.ACTIVE_PERSONA);

            if (initialUser.email === 'admin@myhealthplan.com') {
                // Admin can switch between personas - check saved persona first
                if (savedPersona) {
                    const savedPersonaData = availablePersonas.find(p => p.id === savedPersona);
                    if (savedPersonaData) {
                        setActivePersona(savedPersonaData);
                        console.log(`👤 Restored saved persona for admin: ${savedPersonaData.full_name}`);
                    } else {
                        // Default to Maria if saved persona not found
                        const mariaPersona = availablePersonas.find(p => p.id === 'maria.hartsell');
                        setActivePersona(mariaPersona);
                        localStorage.setItem(STORAGE_KEYS.ACTIVE_PERSONA, 'maria.hartsell');
                    }
                } else {
                    // Default to Maria Hartsell persona
                    const mariaPersona = availablePersonas.find(p => p.id === 'maria.hartsell');
                    setActivePersona(mariaPersona);
                    localStorage.setItem(STORAGE_KEYS.ACTIVE_PERSONA, 'maria.hartsell');
                }
            } else {
                // Find matching persona for the logged-in user
                const userPersona = availablePersonas.find(p => p.email === initialUser.email);
                if (userPersona) {
                    setActivePersona(userPersona);
                    localStorage.setItem(STORAGE_KEYS.ACTIVE_PERSONA, userPersona.id);
                    console.log(`👤 Set persona for user: ${userPersona.full_name}`);
                }
            }
        }
    }, [initialUser, availablePersonas]);

    // Get available modes for user based on their profile or active persona
    const getAvailableModesForUser = useCallback((userProfile) => {
        // Use active persona if available, otherwise fallback to user profile
        const persona = activePersona || userProfile;
        if (!persona?.email) return ['UM'];

        const email = persona.email.toLowerCase();

        switch (email) {
            case 'admin@myhealthplan.com':
                return ['UM', 'UM-SNF', 'CM']; // Admin can access all modes (3 distinct roles)
            case 'maria.hartsell@myhealthplan.com':
                return ['UM']; // Maria is UM only
            case 'elise.tran@myhealthplan.com':
                return ['UM-SNF']; // Elise has the combined UM, SNF role
            case 'karen.white@myhealthplan.com':
                return ['CM']; // Karen is CM only
            default:
                return ['UM']; // Default fallback
        }
    }, [activePersona]);

    // Check if a mode is valid for the current user
    const isValidModeForUser = useCallback((mode, userProfile) => {
        if (!userProfile?.email) return false;

        const availableModesForUser = getAvailableModesForUser(userProfile);

        return availableModesForUser.includes(mode);
    }, [getAvailableModesForUser]);

    // Get default mode for user based on their profile or active persona
    const getDefaultModeForUser = useCallback((userProfile) => {
        // Use active persona if available, otherwise fallback to user profile
        const persona = activePersona || userProfile;
        if (!persona?.email) return 'UM';

        const email = persona.email.toLowerCase();

        // Set default modes based on user email/role (3 distinct roles)
        switch (email) {
            case 'admin@myhealthplan.com':
                return 'UM'; // Admin defaults to UM (as Maria Hartsell persona)
            case 'maria.hartsell@myhealthplan.com':
                return 'UM'; // Maria is UM
            case 'elise.tran@myhealthplan.com':
                return 'UM-SNF'; // Elise has the combined UM, SNF role
            case 'karen.white@myhealthplan.com':
                return 'CM'; // Karen is CM
            default:
                return 'UM'; // Default fallback
        }
    }, [activePersona]);

    // Helper function to extract URL parameters (supports both regular and hash URLs)
    const getUrlParams = useCallback(() => {
        let urlParams;

        // Handle both regular URLs and hash-based URLs (HashRouter)
        if (window.location.hash) {
            // Extract query params from hash (e.g., #/dashboard?sepsis=true)
            const hashParts = window.location.hash.split('?');
            if (hashParts.length > 1) {
                urlParams = new URLSearchParams(hashParts[1]);
                console.log(`🔍 Found hash URL params: ${hashParts[1]}`);
            } else {
                urlParams = new URLSearchParams();
            }
        } else {
            // Regular URL query params
            urlParams = new URLSearchParams(window.location.search);
            if (window.location.search) {
                console.log(`🔍 Found regular URL params: ${window.location.search}`);
            }
        }

        return urlParams;
    }, []);

    // Save mode changes to localStorage
    const saveMode = useCallback((mode, currentScenarios) => {
        // Convert internal mode representation to display format for storage
        let storageMode = mode;
        if (mode === 'UM-SNF') {
            storageMode = 'UM, SNF'; // Store as "UM, SNF" for display consistency
        }

        localStorage.setItem(STORAGE_KEYS.USER_MODE, storageMode);
        localStorage.setItem(STORAGE_KEYS.USER_SCENARIOS, JSON.stringify([...currentScenarios]));
    }, []);

    // Initialize mode from localStorage or set default based on user
    useEffect(() => {
        // Wait for both user and persona to be initialized
        if (initialUser) {
            // Add a small delay to ensure persona is set first
            const initializeMode = () => {
                const savedMode = localStorage.getItem(STORAGE_KEYS.USER_MODE);
                const savedScenarios = localStorage.getItem(STORAGE_KEYS.USER_SCENARIOS);

                // Check if sepsis is being set via URL parameter
                const urlParams = getUrlParams();
                const sepsisParam = urlParams.get('sepsis');
                const hasSepsisUrlParam = sepsisParam === 'true' || sepsisParam === 'false';

                // Use activePersona if available, otherwise fall back to initialUser
                const currentUserContext = activePersona || initialUser;
                const defaultMode = getDefaultModeForUser(currentUserContext);

                if (savedMode) {
                    // Convert stored mode back to internal representation
                    let internalMode = savedMode;
                    if (savedMode === 'UM, SNF') {
                        internalMode = 'UM-SNF'; // Convert display format to internal format
                    }

                    if (isValidModeForUser(internalMode, currentUserContext)) {
                        setActiveMode(internalMode);
                        console.log(`🔄 Restored saved mode: ${savedMode} (internal: ${internalMode}) for ${currentUserContext?.full_name || currentUserContext?.email}`);
                    } else {
                        // Set default mode for user, but preserve existing scenarios
                        setActiveMode(defaultMode);
                        // Don't clear scenarios here - let the scenario initialization handle it
                        console.log(`🔄 Invalid saved mode, set default for ${currentUserContext?.full_name || currentUserContext?.email}: ${defaultMode}`);
                    }
                } else {
                    // Set default mode for user, but preserve existing scenarios
                    setActiveMode(defaultMode);
                    // Don't clear scenarios here - let the scenario initialization handle it
                    console.log(`🔄 Set default mode for ${currentUserContext?.full_name || currentUserContext?.email}: ${defaultMode}`);
                }

                // Handle scenarios initialization properly
                if (hasSepsisUrlParam) {
                    // URL parameter takes precedence, let the URL effect handler manage it
                    console.log(`🔍 URL sepsis parameter detected: ${sepsisParam}, letting URL handler manage scenarios`);
                } else if (savedScenarios) {
                    // No URL parameter, restore from localStorage
                    try {
                        const scenarioArray = JSON.parse(savedScenarios);
                        const restoredScenarios = new Set(scenarioArray);
                        setScenarios(restoredScenarios);
                        console.log(`🎯 Restored scenarios from localStorage: ${scenarioArray.join(', ')}`);
                    } catch (error) {
                        console.error('Error parsing saved scenarios:', error);
                        localStorage.removeItem(STORAGE_KEYS.USER_SCENARIOS);
                        setScenarios(new Set());
                    }
                } else {
                    // No URL parameter and no saved scenarios
                    setScenarios(new Set());
                    console.log(`🧹 No saved scenarios found, starting clean`);
                }
            };

            // If activePersona is set, initialize immediately
            // Otherwise, wait a bit for persona to be set (in case of async loading)
            if (activePersona) {
                initializeMode();
            } else {
                setTimeout(initializeMode, 100);
            }
        }
    }, [initialUser, activePersona, getDefaultModeForUser, isValidModeForUser, getUrlParams, saveMode]);

    // Synchronize scenarios with localStorage when they change during initialization
    useEffect(() => {
        // Only sync if we have an active mode and user context
        if (activeMode && (activePersona || user)) {
            saveMode(activeMode, scenarios);
        }
    }, [scenarios, activeMode, saveMode, activePersona, user]);

    // Switch user persona
    const switchPersona = useCallback(async (personaId) => {
        const newPersona = availablePersonas.find(p => p.id === personaId);
        if (!newPersona || newPersona.id === activePersona?.id) return;

        setLoading(true);

        try {
            setActivePersona(newPersona);
            localStorage.setItem(STORAGE_KEYS.ACTIVE_PERSONA, personaId);

            // Reset to default mode for the new persona
            const defaultMode = getDefaultModeForUser(newPersona);
            setActiveMode(defaultMode);

            // Preserve sepsis scenario when switching personas, but clear other scenarios
            const preservedScenarios = new Set();
            if (scenarios.has('sepsis')) {
                preservedScenarios.add('sepsis');
                console.log('🦠 Preserving sepsis scenario during persona switch');
            }
            setScenarios(preservedScenarios);
            saveMode(defaultMode, preservedScenarios);

            const displayMode = defaultMode === 'UM-SNF' ? 'UM, SNF' : defaultMode;
            console.log(`👤 Switched to persona: ${newPersona.full_name} (${displayMode} mode)`);
        } catch (error) {
            console.error('Error switching persona:', error);
        } finally {
            setLoading(false);
        }
    }, [activePersona, availablePersonas, getDefaultModeForUser, saveMode, scenarios]);

    // Switch user mode (UM, UM-SNF, CM)
    const switchUserMode = useCallback(async (newMode) => {
        // Convert display mode to internal representation if needed
        let internalMode = newMode;
        if (newMode === 'UM, SNF') {
            internalMode = 'UM-SNF';
        }

        if (internalMode === activeMode) return;

        setLoading(true);

        try {
            // Preserve sepsis scenario when switching modes, but clear other scenarios
            const preservedScenarios = new Set();
            if (scenarios.has('sepsis')) {
                preservedScenarios.add('sepsis');
                console.log('🦠 Preserving sepsis scenario during mode switch');
            }

            setActiveMode(internalMode);
            setScenarios(preservedScenarios);
            saveMode(internalMode, preservedScenarios);

            const displayMode = internalMode === 'UM-SNF' ? 'UM, SNF' : internalMode;
            console.log(`🔄 Switched to ${displayMode} mode`);
        } catch (error) {
            console.error('Error switching user mode:', error);
        } finally {
            setLoading(false);
        }
    }, [activeMode, saveMode, scenarios]);

    // Toggle scenario (e.g., "sepsis" for Robert Abbott)
    const toggleScenario = useCallback(async (scenarioKey) => {
        setLoading(true);

        try {
            const newScenarios = new Set(scenarios);

            if (newScenarios.has(scenarioKey)) {
                newScenarios.delete(scenarioKey);
            } else {
                newScenarios.add(scenarioKey);
            }

            setScenarios(newScenarios);
            saveMode(activeMode, newScenarios);

            console.log(`🎯 Toggled scenario: ${scenarioKey}`, [...newScenarios]);
        } catch (error) {
            console.error('Error toggling scenario:', error);
        } finally {
            setLoading(false);
        }
    }, [scenarios, activeMode, saveMode]);

    // Check if a scenario is active
    const hasScenario = useCallback((scenarioKey) => {
        return scenarios.has(scenarioKey);
    }, [scenarios]);

    // Get user with current mode context
    const getUserWithMode = useCallback(() => {
        if (!user) return null;

        // Use active persona if available, otherwise use original user
        const currentUser = activePersona || user;

        // Convert internal mode representation to display format
        let displayRole;
        if (activeMode === 'UM-SNF') {
            displayRole = 'UM, SNF'; // Display as "UM, SNF"
        } else {
            displayRole = currentUser.role || activeMode;
        }

        return {
            ...user,
            ...currentUser,
            currentMode: activeMode === 'UM-SNF' ? 'UM, SNF' : activeMode, // Display format for current mode
            scenarios: [...scenarios],
            displayRole,
            isPersonaSwitched: !!activePersona
        };
    }, [user, activePersona, activeMode, scenarios]);

    // Reset to default mode
    const resetMode = useCallback(() => {
        const defaultMode = getDefaultModeForUser(activePersona || user);

        // Preserve sepsis scenario when resetting mode
        const preservedScenarios = new Set();
        if (scenarios.has('sepsis')) {
            preservedScenarios.add('sepsis');
            console.log('🦠 Preserving sepsis scenario during mode reset');
        }

        setActiveMode(defaultMode);
        setScenarios(preservedScenarios);
        saveMode(defaultMode, preservedScenarios);

        const displayMode = defaultMode === 'UM-SNF' ? 'UM, SNF' : defaultMode;
        console.log(`🔄 Reset to default ${displayMode} mode`);
    }, [saveMode, getDefaultModeForUser, activePersona, user, scenarios]);

    // Available modes for current user/persona
    const availableModes = getAvailableModesForUser(activePersona || user).map(mode =>
        mode === 'UM-SNF' ? 'UM, SNF' : mode // Convert to display format
    );

    // Check URL parameters for sepsis scenario on load and URL changes (supports hash routing)
    useEffect(() => {
        const checkUrlParams = () => {
            const urlParams = getUrlParams();
            const sepsisParam = urlParams.get('sepsis');

            console.log(`🔍 Checking URL params - sepsis: ${sepsisParam}`);

            if (sepsisParam === 'true') {
                // Enable sepsis scenario - only if not already active
                setScenarios(prevScenarios => {
                    if (!prevScenarios.has('sepsis')) {
                        const newScenarios = new Set(prevScenarios);
                        newScenarios.add('sepsis');
                        saveMode(activeMode, newScenarios);
                        console.log('🚨 Sepsis scenario activated via URL parameter');
                        return newScenarios;
                    }
                    // Already active, but ensure it's saved to localStorage
                    saveMode(activeMode, prevScenarios);
                    console.log('🚨 Sepsis scenario already active, ensuring localStorage is updated');
                    return prevScenarios;
                });
            } else if (sepsisParam === 'false') {
                // Disable sepsis scenario - only if currently active
                setScenarios(prevScenarios => {
                    if (prevScenarios.has('sepsis')) {
                        const newScenarios = new Set(prevScenarios);
                        newScenarios.delete('sepsis');
                        saveMode(activeMode, newScenarios);
                        console.log('✅ Sepsis scenario cleared via URL parameter (sepsis=false)');
                        return newScenarios;
                    }
                    // Not active, but ensure localStorage reflects this
                    saveMode(activeMode, prevScenarios);
                    console.log('✅ Sepsis scenario already cleared, ensuring localStorage is updated');
                    return prevScenarios;
                });
            }
            // If sepsisParam is null/undefined, don't change anything - respect current state
        };

        // Check on mount
        checkUrlParams();

        // Listen for URL changes (for browser back/forward)
        const handlePopState = () => {
            checkUrlParams();
        };

        // Listen for hash changes (important for HashRouter)
        const handleHashChange = () => {
            checkUrlParams();
        };

        window.addEventListener('popstate', handlePopState);
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('hashchange', handleHashChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getUrlParams, activeMode, saveMode]); // Removed scenarios to prevent infinite loop

    // Apply sepsis modifications to authorization data
    const applySepsisModifications = useCallback((authorizationsData) => {
        if (!hasScenario('sepsis')) {
            console.log('🔍 Sepsis scenario not active, returning original data');
            return authorizationsData;
        }

        // Only apply sepsis modifications for UM users, keep default view for others
        if (activeMode !== 'UM') {
            console.log(`🔍 Sepsis scenario active but user mode is ${activeMode}, keeping default view`);
            return authorizationsData;
        }

        console.log('🦠 Applying sepsis modifications to', authorizationsData.length, 'authorizations for UM user');

        const modifiedData = authorizationsData.map(auth => {
            const authMods = SEPSIS_MODIFICATIONS.authorization[auth.authorization_number];
            if (authMods) {
                console.log(`📝 Modifying authorization ${auth.authorization_number}:`, authMods);
                return {
                    ...auth,
                    ...authMods,
                    originalData: auth // Keep original for reference
                };
            }
            return auth;
        });

        console.log('✅ Sepsis modifications applied, modified data:', modifiedData);
        return modifiedData;
    }, [hasScenario, activeMode]);

    // Get sepsis-modified dashboard stats
    const getSepsisModifiedStats = useCallback((originalStats) => {
        if (!hasScenario('sepsis')) {
            console.log('🔍 Sepsis scenario not active, using original stats:', originalStats);
            return originalStats;
        }

        // Only apply sepsis modifications for UM users, keep default view for others
        if (activeMode !== 'UM') {
            console.log(`🔍 Sepsis scenario active but user mode is ${activeMode}, keeping default stats`);
            return originalStats;
        }

        const modifiedStats = {
            ...originalStats,
            ...SEPSIS_MODIFICATIONS.dashboardStats
        };

        console.log('📊 Applying sepsis stats modifications for UM user:');
        console.log('Original:', originalStats);
        console.log('Modified:', modifiedStats);

        return modifiedStats;
    }, [hasScenario, activeMode]);

    // Check if blue arrow should be hidden
    const shouldHideArrow = useCallback(() => {
        // Only hide arrow for UM users when sepsis is active, keep default view for others
        return hasScenario('sepsis') && activeMode === 'UM' && SEPSIS_MODIFICATIONS.removeArrow;
    }, [hasScenario, activeMode]);

    // Get member info modifications for sepsis
    const getMemberSepsisInfo = useCallback((memberNumber) => {
        if (!hasScenario('sepsis')) return null;

        // Only apply sepsis modifications for UM users, keep default view for others
        if (activeMode !== 'UM') {
            console.log(`🔍 Sepsis scenario active but user mode is ${activeMode}, no member modifications`);
            return null;
        }

        return SEPSIS_MODIFICATIONS.memberInfo[memberNumber] || null;
    }, [hasScenario, activeMode]);

    // Clear sepsis scenario (for logout or manual clearing)
    const clearSepsisScenario = useCallback(() => {
        setScenarios(prevScenarios => {
            const newScenarios = new Set(prevScenarios);
            const hadSepsis = newScenarios.has('sepsis');

            if (hadSepsis) {
                newScenarios.delete('sepsis');
                saveMode(activeMode, newScenarios);
                console.log('🧹 Sepsis scenario cleared and localStorage updated');
                return newScenarios;
            } else {
                // Even if sepsis wasn't active, ensure localStorage is clean
                saveMode(activeMode, newScenarios);
                console.log('🧹 Sepsis scenario was already clear, localStorage ensured clean');
                return prevScenarios;
            }
        });
    }, [activeMode, saveMode]);

    // Clear all user mode data for logout (doesn't save back to localStorage)
    const clearAllForLogout = useCallback(() => {
        setScenarios(new Set());
        setActiveMode('UM');
        setActivePersona(null);
        console.log('🧹 All user mode data cleared for logout (no localStorage writes)');
    }, []);

    return {
        user: getUserWithMode(),
        activeMode,
        scenarios: [...scenarios],
        loading,
        switchUserMode,
        toggleScenario,
        hasScenario,
        resetMode,
        availableModes,
        // Persona functions
        activePersona,
        availablePersonas,
        switchPersona,
        // Sepsis scenario functions
        applySepsisModifications,
        getSepsisModifiedStats,
        shouldHideArrow,
        getMemberSepsisInfo,
        clearSepsisScenario,
        clearAllForLogout,
        sepsisModifications: SEPSIS_MODIFICATIONS
    };
};
