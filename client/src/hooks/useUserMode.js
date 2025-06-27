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
    const [activeMode, setActiveMode] = useState('UM'); // UM, SNF, CM
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
            displayRole: 'UM',
            availableModes: ['UM', 'SNF']
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
                return ['UM', 'SNF', 'CM']; // Admin can access all modes
            case 'maria.hartsell@myhealthplan.com':
                return ['UM']; // Maria is UM only
            case 'elise.tran@myhealthplan.com':
                return ['UM', 'SNF']; // Elise can do UM and SNF
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

        // Set default modes based on user email/role
        switch (email) {
            case 'admin@myhealthplan.com':
                return 'UM'; // Admin defaults to UM (as Maria Hartsell persona)
            case 'maria.hartsell@myhealthplan.com':
                return 'UM'; // Maria is UM
            case 'elise.tran@myhealthplan.com':
                return 'UM'; // Elise defaults to UM (can switch to SNF)
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

                if (savedMode && isValidModeForUser(savedMode, currentUserContext)) {
                    setActiveMode(savedMode);
                    console.log(`🔄 Restored saved mode: ${savedMode} for ${currentUserContext?.full_name || currentUserContext?.email}`);
                } else {
                    // Set default mode for user
                    setActiveMode(defaultMode);
                    localStorage.setItem(STORAGE_KEYS.USER_MODE, defaultMode);
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
                        setScenarios(new Set(scenarioArray));
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
    }, [initialUser, activePersona, getDefaultModeForUser, isValidModeForUser, getUrlParams]);

    // Save mode changes to localStorage
    const saveMode = useCallback((mode, currentScenarios) => {
        localStorage.setItem(STORAGE_KEYS.USER_MODE, mode);
        localStorage.setItem(STORAGE_KEYS.USER_SCENARIOS, JSON.stringify([...currentScenarios]));
    }, []);

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

            // Clear scenarios when switching personas
            setScenarios(new Set());
            saveMode(defaultMode, new Set());

            console.log(`👤 Switched to persona: ${newPersona.full_name} (${defaultMode} mode)`);
        } catch (error) {
            console.error('Error switching persona:', error);
        } finally {
            setLoading(false);
        }
    }, [activePersona, availablePersonas, getDefaultModeForUser, saveMode]);

    // Switch user mode (UM, SNF, CM)
    const switchUserMode = useCallback(async (newMode) => {
        if (newMode === activeMode) return;

        setLoading(true);

        try {
            // Clear scenarios when switching modes
            const clearedScenarios = new Set();

            setActiveMode(newMode);
            setScenarios(clearedScenarios);
            saveMode(newMode, clearedScenarios);

            console.log(`🔄 Switched to ${newMode} mode`);
        } catch (error) {
            console.error('Error switching user mode:', error);
        } finally {
            setLoading(false);
        }
    }, [activeMode, saveMode]);

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

        // For role display, show the full capabilities, not just current mode
        let displayRole;
        if (currentUser.email === 'elise.tran@myhealthplan.com') {
            displayRole = 'UM, SNF'; // Show full capabilities for Elise
        } else {
            // For other users, show current active mode or their role
            displayRole = currentUser.role || activeMode;
        }

        return {
            ...user,
            ...currentUser,
            currentMode: activeMode,
            scenarios: [...scenarios],
            displayRole,
            isPersonaSwitched: !!activePersona
        };
    }, [user, activePersona, activeMode, scenarios]);

    // Reset to default mode
    const resetMode = useCallback(() => {
        const defaultMode = getDefaultModeForUser(user);
        setActiveMode(defaultMode);
        setScenarios(new Set());
        saveMode(defaultMode, new Set());
        console.log(`🔄 Reset to default ${defaultMode} mode`);
    }, [saveMode, getDefaultModeForUser, user]);

    // Available modes for current user/persona
    const availableModes = getAvailableModesForUser(activePersona || user);

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

        console.log('🦠 Applying sepsis modifications to', authorizationsData.length, 'authorizations');

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
    }, [hasScenario]);

    // Get sepsis-modified dashboard stats
    const getSepsisModifiedStats = useCallback((originalStats) => {
        if (!hasScenario('sepsis')) {
            console.log('🔍 Sepsis scenario not active, using original stats:', originalStats);
            return originalStats;
        }

        const modifiedStats = {
            ...originalStats,
            ...SEPSIS_MODIFICATIONS.dashboardStats
        };

        console.log('📊 Applying sepsis stats modifications:');
        console.log('Original:', originalStats);
        console.log('Modified:', modifiedStats);

        return modifiedStats;
    }, [hasScenario]);

    // Check if blue arrow should be hidden
    const shouldHideArrow = useCallback(() => {
        return hasScenario('sepsis') && SEPSIS_MODIFICATIONS.removeArrow;
    }, [hasScenario]);

    // Get member info modifications for sepsis
    const getMemberSepsisInfo = useCallback((memberNumber) => {
        if (!hasScenario('sepsis')) return null;

        return SEPSIS_MODIFICATIONS.memberInfo[memberNumber] || null;
    }, [hasScenario]);

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
        sepsisModifications: SEPSIS_MODIFICATIONS
    };
};
