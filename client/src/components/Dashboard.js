import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import StatsCard from './common/StatsCard';
import TabNavigation from './common/TabNavigation';
import AuthorizationsTable from './common/AuthorizationsTable';
import CMTasksTable from './common/CMTasksTable';
import GroupQueuesChart from './common/GroupQueuesChart';
import Pagination from './common/Pagination';
import { CalendarIcon, ClockIcon, BellIcon, ExpandIcon, RefreshIcon } from './common/Icons';
import { getCMData } from '../constants/cmData';
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
  hasScenario,
  // SNF user functions
  applySNFModifications
}) => {
  const [dashboardStats, setDashboardStats] = useState({
    due_today_count: 0,
    high_priority_count: 0,
    reminders_count: 0,
    start_this_week_count: 0
  });
  const [authorizations, setAuthorizations] = useState([]);
  const [cmTasks, setCmTasks] = useState([]);
  const [groupQueues, setGroupQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('My Tasks');

  // Use refs to track fetch state without causing re-renders
  const lastFetchKeyRef = useRef('');
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user?.email || !token) {
      console.log('⚠️ User or token not available, skipping data fetch');
      setLoading(false);
      return;
    }

    // Create a unique key for this fetch combination
    const fetchKey = `${user.email}-${activeMode}-${scenarios.join(',')}`;

    // Only fetch if this combination hasn't been fetched yet and not currently fetching
    if (fetchKey !== lastFetchKeyRef.current && !isFetchingRef.current) {
      console.log('🔄 Dashboard fetch triggered by key change:', fetchKey);
      lastFetchKeyRef.current = fetchKey;
      isFetchingRef.current = true;

      // Inline fetch logic to avoid dependency issues
      const performFetch = async () => {
        // Don't fetch if user is not available
        if (!user?.email) {
          console.log('⚠️ User not available, skipping dashboard data fetch');
          return;
        }

        try {
          setLoading(true);
          setError(null);

          console.log('🔄 Fetching dashboard data...');
          console.log('Current scenarios:', scenarios);
          console.log('Current active mode:', activeMode);
          console.log('Has sepsis scenario:', scenarios.includes('sepsis'));

          // Handle CM Dashboard with static data
          if (activeMode === 'CM') {
            // Get current scenario from localStorage
            const userScenarios = JSON.parse(localStorage.getItem('userScenarios') || '[]');
            const currentScenario = userScenarios.length > 0 ? userScenarios[0] : 'default';

            // Load CM static data
            const cmStats = getCMData('stats', currentScenario);
            const cmTasksData = getCMData('tasks', currentScenario);
            const cmQueuesData = getCMData('queues', currentScenario);

            setDashboardStats({
              due_today_count: cmStats.due_today_count,
              high_priority_count: cmStats.overdue_count,
              reminders_count: cmStats.reminder_for_today_count,
              start_this_week_count: cmStats.start_this_week_count
            });
            setCmTasks(cmTasksData);
            setGroupQueues(cmQueuesData);
            setAuthorizations([]); // CM doesn't use authorizations

            console.log('📊 CM Dashboard data loaded:', { cmStats, cmTasksData, cmQueuesData });
            return;
          }

          // Handle UM/SNF Dashboard with API data
          const statsResponse = await apiService.get('/api/dashboard/stats');
          console.log('📊 Original stats response:', statsResponse);

          // Apply sepsis modifications to stats if scenario is active
          const modifiedStats = getSepsisModifiedStats ? getSepsisModifiedStats(statsResponse) : statsResponse;
          console.log('📊 Modified stats:', modifiedStats);
          setDashboardStats(modifiedStats);

          const authResponse = await apiService.get('/api/dashboard/authorizations?limit=50');
          console.log('📋 Original authorizations response:', authResponse.data.slice(0, 3));

          // Apply sepsis modifications to authorizations if scenario is active
          let modifiedAuthorizations = applySepsisModifications ? applySepsisModifications(authResponse.data) : authResponse.data;
          console.log('📋 Sepsis modified authorizations:', modifiedAuthorizations.slice(0, 3));

          // Apply SNF modifications to authorizations if user is in SNF mode
          modifiedAuthorizations = applySNFModifications ? applySNFModifications(modifiedAuthorizations) : modifiedAuthorizations;
          console.log('🏥 SNF modified authorizations:', modifiedAuthorizations.slice(0, 3));

          setAuthorizations(modifiedAuthorizations);
          setCmTasks([]); // UM/SNF doesn't use CM tasks
          setGroupQueues([]); // UM/SNF doesn't use group queues

          console.log('✅ Dashboard data loaded successfully');
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
          setError('Failed to load dashboard data');
        } finally {
          setLoading(false);
          isFetchingRef.current = false;
        }
      };

      performFetch();
    } else {
      console.log('✅ Dashboard data already fetched for this combination or currently fetching, skipping');
    }
  }, [user?.email, activeMode, scenarios, applySepsisModifications, applySNFModifications, getSepsisModifiedStats]); // Include necessary functions

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

  const handleRowClick = (item) => {
    if (onMemberClick) {
      if (activeMode === 'CM') {
        // Handle CM task click
        const memberData = {
          id: item.member_id || item.id,
          name: item.member_name || 'Unknown Member',
          memberNumber: item.member_number || `MEM${String(item.member_id || item.id).padStart(3, '0')}`,
          taskType: item.type,
          activity: item.activity,
          priority: item.priority,
          diagnosis: item.diagnosis,
          pos: item.pos,
          dueDate: item.due_date,
          status: item.status,
          navigateToOverview: true // Flag to indicate navigation should go to Overview tab
        };
        onMemberClick(memberData);
      } else {
        // Handle authorization click
        const memberData = {
          id: item.member_id || item.id,
          name: item.member_name || 'Robert Abbott',
          memberNumber: item.member_number || 'M1000020000',
          authorizationNumber: item.authorization_number,
          status: item.status,
          priority: item.priority,
          provider: item.provider_name,
          diagnosis: item.diagnosis_code,
          requestDate: item.received_date,
          admissionDate: item.admission_date
        };
        onMemberClick(memberData);
      }
    }
  };

  // Stats cards configuration - mode-dependent
  const getStatsCards = () => {
    // CM mode has different stats structure
    if (activeMode === 'CM') {
      return [
        {
          title: 'Due Today',
          value: dashboardStats.due_today_count || 24,
          label: 'Due Today',
          iconSvg: <CalendarIcon />,
          isPrimary: true,
          variant: 'primary'
        },
        {
          title: 'Overdue',
          value: dashboardStats.high_priority_count || 11,
          label: 'Overdue',
          iconSvg: <ClockIcon />,
          variant: 'secondary'
        },
        {
          title: 'Reminder for Today',
          value: dashboardStats.reminders_count || 5,
          label: 'Reminder for Today',
          iconSvg: <BellIcon />,
          variant: 'tertiary'
        },
        {
          title: 'Start this Week',
          value: dashboardStats.start_this_week_count || 3,
          label: 'Start this Week',
          iconSvg: <CalendarIcon />,
          variant: 'tertiary'
        }
      ];
    }

    // Sepsis scenario values for UM mode
    const sepsisStats = {
      due_today_count: 48,
      high_priority_count: 5,
      reminders_count: 9,
      start_this_week_count: 21
    };

    // SNF user values
    const snfStats = {
      due_today_count: 51,
      high_priority_count: 6,
      reminders_count: 7,
      start_this_week_count: 19
    };

    // Choose stats based on user mode and scenarios
    let currentStats = dashboardStats;

    if (scenarios.includes('sepsis') && activeMode === 'UM') {
      currentStats = sepsisStats;
    } else if (activeMode === 'UM-SNF') {
      currentStats = snfStats;
    }

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
    if (activeMode === 'UM-SNF') {
      baseCards[0].title = 'SNF Authorizations';
      baseCards[0].label = 'Skilled Nursing';
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
              {activeMode === 'UM-SNF' && 'SNF Dashboard'}
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
        {activeMode === 'CM' ? (
          // CM Dashboard Layout - No background wrapper, direct flex layout
          <div className={styles.cmDashboardLayout}>
            {/* Left Side - Stats and Table with Background */}
            <div className={styles.cmLeftContent}>
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
                  My Tasks - Due Today ({dashboardStats.due_today_count || 24})
                  <ExpandIcon />
                </div>
              </div>

              {/* Table Section */}
              <div className={styles.tableSection}>
                {/* Last Updated */}
                <div className={styles.lastUpdated}>
                  <span className={styles.lastUpdatedText}>Last Updated: 1 min ago</span>
                  <RefreshIcon />
                </div>

                {/* CM Tasks Table */}
                <CMTasksTable
                  tasks={cmTasks}
                  onRowClick={handleRowClick}
                />

                {/* Pagination */}
                <Pagination />
              </div>
            </div>

            {/* Right Side - Group Queues Chart */}
            <div className={styles.cmRightContent}>
              <GroupQueuesChart
                queuesData={groupQueues}
                includeFilter={{ overdue: true, dueToday: true, all: false }}
              />
            </div>
          </div>
        ) : (
          // UM/SNF Dashboard Layout - Original background container
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
          </div>)}

        {/* Empty State */}
        {authorizations.length === 0 && activeMode !== 'CM' && (
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
  hasScenario: PropTypes.func,
  // SNF user functions
  applySNFModifications: PropTypes.func
};

Dashboard.defaultProps = {
  activeMode: 'UM',
  scenarios: [],
  availableModes: ['UM'],
  switchUserMode: () => { },
  toggleScenario: () => { },
};

export default Dashboard;
