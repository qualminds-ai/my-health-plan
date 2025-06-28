import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import StatsCard from './common/StatsCard';
import TabNavigation from './common/TabNavigation';
import AuthorizationsTable from './common/AuthorizationsTable';
import Pagination from './common/Pagination';
import { CalendarIcon, ClockIcon, BellIcon, ExpandIcon, RefreshIcon } from './common/Icons';
import apiService from '../services/apiService';
import styles from './Dashboard.module.css';

const Dashboard = ({
  user,
  onLogout,
  onMemberClick,
  onNavigate,
  activeMode,
  scenarios,
  availableModes,
  switchUserMode,
  toggleScenario,
  availablePersonas,
  activePersona,
  onPersonaSwitch,
  // Sepsis scenario functions
  applySepsisModifications,
  getSepsisModifiedStats,
  shouldHideArrow,
  hasScenario
}) => {
  const [dashboardStats, setDashboardStats] = useState({
    due_today_count: 0,
    high_priority_count: 0,
    reminders_count: 0,
    start_this_week_count: 0
  });
  const [authorizations, setAuthorizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('My Tasks');

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      console.log('🔄 Fetching dashboard data...');
      console.log('Current scenarios:', scenarios);
      console.log('Has sepsis scenario:', scenarios.includes('sepsis'));

      const statsResponse = await apiService.get('/api/dashboard/stats');
      console.log('📊 Original stats response:', statsResponse);

      // Apply sepsis modifications to stats if scenario is active
      const modifiedStats = getSepsisModifiedStats ? getSepsisModifiedStats(statsResponse) : statsResponse;
      console.log('📊 Modified stats:', modifiedStats);
      setDashboardStats(modifiedStats);

      const authResponse = await apiService.get('/api/dashboard/authorizations?limit=50');
      console.log('📋 Original authorizations response:', authResponse.data.slice(0, 3));

      // Apply sepsis modifications to authorizations if scenario is active
      const modifiedAuthorizations = applySepsisModifications ? applySepsisModifications(authResponse.data) : authResponse.data;
      console.log('📋 Modified authorizations:', modifiedAuthorizations.slice(0, 3));
      setAuthorizations(modifiedAuthorizations);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [applySepsisModifications, getSepsisModifiedStats, scenarios]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (user && token) {
      fetchDashboardData();
    }
  }, [user, scenarios, fetchDashboardData]); // Re-fetch when scenarios change

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleRowClick = (authorization) => {
    if (onMemberClick) {
      const memberData = {
        id: authorization.member_id || authorization.id,
        name: authorization.member_name || 'Robert Abbott',
        memberNumber: authorization.member_number || 'M1000020000',
        authorizationNumber: authorization.authorization_number,
        status: authorization.status,
        priority: authorization.priority,
        provider: authorization.provider_name,
        diagnosis: authorization.diagnosis_code,
        requestDate: authorization.received_date,
        admissionDate: authorization.admission_date
      };
      onMemberClick(memberData);
    }
  };

  // Stats cards configuration - mode-dependent
  const getStatsCards = () => {
    // Sepsis scenario values
    const sepsisStats = {
      due_today_count: 48,
      high_priority_count: 5,
      reminders_count: 9,
      start_this_week_count: 21
    };

    // Use sepsis stats if sepsis scenario is active AND user is UM, otherwise use regular stats
    const currentStats = scenarios.includes('sepsis') && activeMode === 'UM' ? sepsisStats : dashboardStats;

    const baseCards = [
      {
        title: 'Due Today',
        value: currentStats.due_today_count || 51,
        label: 'Due Today',
        iconSvg: <CalendarIcon />,
        isPrimary: true,
        variant: 'primary'
      },
      {
        title: 'High Priority',
        value: currentStats.high_priority_count || 6,
        label: 'High Priority',
        iconSvg: <ClockIcon />,
        variant: 'secondary'
      },
      {
        title: 'Reminder for Today',
        value: currentStats.reminders_count || 7,
        label: 'Reminder for Today',
        iconSvg: <BellIcon />,
        variant: 'tertiary'
      },
      {
        title: 'Start this Week',
        value: currentStats.start_this_week_count || 19,
        label: 'Start this Week',
        iconSvg: <CalendarIcon />,
        variant: 'tertiary'
      }
    ];

    // Modify based on user mode
    if (activeMode === 'SNF') {
      baseCards[0].title = 'SNF Authorizations';
      baseCards[0].label = 'Skilled Nursing';
    } else if (activeMode === 'CM') {
      baseCards[0].title = 'Cases to Review';
      baseCards[0].label = 'Case Management';
    }

    return baseCards;
  };

  const statsCards = getStatsCards();

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <Header
          user={user}
          onLogout={onLogout}
          onNavigate={onNavigate}
          activeTab="Dashboard"
          availablePersonas={availablePersonas}
          activePersona={activePersona}
          onPersonaSwitch={onPersonaSwitch}
        />
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
        </div>
      </div>
    );
  }

  const tabs = ['My Tasks', 'My Cases', 'Risk Stratification'];

  return (
    <div className={styles.dashboard}>
      <Header
        user={user}
        onLogout={onLogout}
        onNavigate={onNavigate}
        activeTab="Dashboard"
        availablePersonas={availablePersonas}
        activePersona={activePersona}
        onPersonaSwitch={onPersonaSwitch}
      />

      <main className={styles.mainContent}>
        {/* Top Section: Title, Tabs, Date */}
        <div className={styles.topSection}>
          <div className={styles.leftSection}>
            <div className={styles.title}>
              {activeMode === 'UM' && 'UM Dashboard'}
              {activeMode === 'SNF' && 'SNF Dashboard'}
              {activeMode === 'CM' && 'Case Management Dashboard'}
            </div>
            <TabNavigation
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
          <div className={styles.rightSection}>
            <div className={styles.dateDisplay}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className={styles.contentContainer}>
          {/* Stats Cards and Section Title Container */}
          <div className={styles.statsContainer}>
            {/* Stats Cards Row */}
            <div className={styles.statsRow}>
              {statsCards.map((card) => (
                <StatsCard
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  label={card.label}
                  iconSvg={card.iconSvg}
                  isPrimary={card.isPrimary}
                  variant={card.variant}
                />
              ))}
            </div>

            {/* Section Title */}
            <div className={styles.sectionTitle}>
              Inpatient Tasks - Due Today ({scenarios.includes('sepsis') && activeMode === 'UM' ? 48 : (dashboardStats.due_today_count || 0)})
              <ExpandIcon />
            </div>

            {/* Sepsis Scenario Control */}
            {user?.email === 'admin@myhealthplan.com' && (
              <div className={styles.scenarioControls}>
                <button
                  className={`${styles.scenarioButton} ${scenarios.includes('sepsis') ? styles.scenarioActive : ''}`}
                  onClick={() => {
                    console.log('🎭 Sepsis scenario toggle clicked!');
                    console.log('Current scenarios before toggle:', scenarios);
                    console.log('Current user:', user);
                    toggleScenario('sepsis');
                  }}
                >
                  {scenarios.includes('sepsis') ? '🚨 Sepsis Active' : '⚕️ Trigger Sepsis'}
                </button>
                <span className={styles.scenarioHelp}>
                  Admin only: Toggle Robert Abbott sepsis scenario
                </span>
                {/* Debug info */}
                <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>
                  Debug: User email: {user?.email}, Scenarios: {JSON.stringify(scenarios)}
                </div>
              </div>
            )}
          </div>

          {/* Table Section */}
          <div className={styles.tableSection}>
            {/* Last Updated */}
            <div className={styles.lastUpdated}>
              <span className={styles.lastUpdatedText}>Last Updated: 1 min ago</span>
              <RefreshIcon />
            </div>

            {/* Authorizations Table */}
            <AuthorizationsTable
              authorizations={authorizations}
              onRowClick={handleRowClick}
              formatDate={formatDate}
              formatDateTime={formatDateTime}
              userMode={activeMode}
              scenarios={scenarios}
              shouldHideArrow={shouldHideArrow ? shouldHideArrow() : false}
              hasScenario={hasScenario}
            />

            {/* Pagination */}
            <Pagination />
          </div>

          {/* Empty State */}
          {authorizations.length === 0 && (
            <div className={styles.emptyState}>
              <svg className={styles.emptyIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className={styles.emptyTitle}>No authorizations</h3>
              <p className={styles.emptyText}>Get started by creating a new authorization.</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className={styles.errorState}>
              <div className={styles.errorContainer}>
                <svg className={styles.errorIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className={styles.errorContent}>
                  <h3 className={styles.errorTitle}>Error loading dashboard</h3>
                  <p className={styles.errorMessage}>{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  onMemberClick: PropTypes.func,
  onNavigate: PropTypes.func,
  activeMode: PropTypes.string,
  scenarios: PropTypes.arrayOf(PropTypes.string),
  availableModes: PropTypes.arrayOf(PropTypes.string),
  switchUserMode: PropTypes.func,
  toggleScenario: PropTypes.func,
  availablePersonas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    full_name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  })),
  activePersona: PropTypes.shape({
    id: PropTypes.string,
    full_name: PropTypes.string,
    role: PropTypes.string
  }),
  onPersonaSwitch: PropTypes.func,
  // Sepsis scenario functions
  applySepsisModifications: PropTypes.func,
  getSepsisModifiedStats: PropTypes.func,
  shouldHideArrow: PropTypes.func,
  hasScenario: PropTypes.func
};

Dashboard.defaultProps = {
  activeMode: 'UM',
  scenarios: [],
  availableModes: ['UM'],
  switchUserMode: () => { },
  toggleScenario: () => { },
};

export default Dashboard;
