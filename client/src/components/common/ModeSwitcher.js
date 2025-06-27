import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ModeSwitcher.module.css';

/**
 * User Mode Switcher Component
 * Allows switching between UM, SNF, CM modes and toggling scenarios
 */
const ModeSwitcher = ({
    user,
    activeMode,
    scenarios,
    availableModes,
    onModeSwitch,
    onScenarioToggle,
    loading
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!user) return null;

    const handleModeSwitch = (mode) => {
        onModeSwitch(mode);
        setIsExpanded(false);
    };

    const handleScenarioToggle = (scenario) => {
        onScenarioToggle(scenario);
    };

    const getModeIcon = (mode) => {
        switch (mode) {
            case 'UM': return '👨‍⚕️';
            case 'SNF': return '🏥';
            case 'CM': return '📋';
            default: return '👤';
        }
    };

    const getModeColor = (mode) => {
        switch (mode) {
            case 'UM': return '#007bff';
            case 'SNF': return '#28a745';
            case 'CM': return '#ffc107';
            default: return '#6c757d';
        }
    };

    return (
        <div className={styles.modeSwitcher}>
            {/* Mode Switcher Button */}
            <button
                className={styles.modeButton}
                onClick={() => setIsExpanded(!isExpanded)}
                type="button"
                aria-expanded={isExpanded}
                aria-haspopup="true"
            >
                <div className={styles.modeIcon} style={{ color: getModeColor(activeMode) }}>
                    {getModeIcon(activeMode)}
                </div>
                <div className={styles.modeInfo}>
                    <div className={styles.modeLabel}>{activeMode} Mode</div>
                    <div className={styles.userRole}>{user.displayRole}</div>
                </div>
                <div className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}>
                    ▼
                </div>
            </button>

            {/* Expanded Mode Options */}
            {isExpanded && (
                <div className={styles.modeDropdown}>
                    <div className={styles.dropdownHeader}>Switch User Mode</div>

                    {/* Mode Options */}
                    <div className={styles.modeOptions}>
                        {availableModes.map(mode => (
                            <button
                                key={mode}
                                type="button"
                                className={`${styles.modeOption} ${mode === activeMode ? styles.active : ''}`}
                                onClick={() => handleModeSwitch(mode)}
                                disabled={loading}
                            >
                                <div className={styles.optionIcon} style={{ color: getModeColor(mode) }}>
                                    {getModeIcon(mode)}
                                </div>
                                <div className={styles.optionInfo}>
                                    <div className={styles.optionLabel}>{mode} Mode</div>
                                    <div className={styles.optionDescription}>
                                        {mode === 'UM' && 'Utilization Manager'}
                                        {mode === 'SNF' && 'Skilled Nursing Facility'}
                                        {mode === 'CM' && 'Case Manager'}
                                    </div>
                                </div>
                                {mode === activeMode && (
                                    <div className={styles.activeIndicator}>✓</div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Scenario Toggles */}
                    {activeMode === 'UM' && (
                        <div className={styles.scenarioSection}>
                            <div className={styles.sectionHeader}>Demo Scenarios</div>
                            <div className={styles.scenarioOptions}>
                                <button
                                    type="button"
                                    className={`${styles.scenarioOption} ${scenarios.includes('sepsis') ? styles.active : ''}`}
                                    onClick={() => handleScenarioToggle('sepsis')}
                                >
                                    <div className={styles.scenarioIcon}>🦠</div>
                                    <div className={styles.scenarioInfo}>
                                        <div className={styles.scenarioLabel}>Sepsis Scenario</div>
                                        <div className={styles.scenarioDescription}>
                                            Robert Abbott develops sepsis - changes to Concurrent Review
                                        </div>
                                    </div>
                                    <div className={styles.scenarioToggle}>
                                        {scenarios.includes('sepsis') ? '✓' : '+'}
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className={styles.loadingOverlay}>
                            <div className={styles.spinner}></div>
                        </div>
                    )}
                </div>
            )}

            {/* Click outside to close */}
            {isExpanded && (
                <button
                    type="button"
                    className={styles.backdrop}
                    onClick={() => setIsExpanded(false)}
                    aria-label="Close mode switcher"
                />
            )}
        </div>
    );
};

ModeSwitcher.propTypes = {
    user: PropTypes.shape({
        displayRole: PropTypes.string
    }),
    activeMode: PropTypes.string.isRequired,
    scenarios: PropTypes.arrayOf(PropTypes.string).isRequired,
    availableModes: PropTypes.arrayOf(PropTypes.string).isRequired,
    onModeSwitch: PropTypes.func.isRequired,
    onScenarioToggle: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

ModeSwitcher.defaultProps = {
    user: null,
    loading: false
};

export default ModeSwitcher;
