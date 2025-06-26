import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import StatsCard from './common/StatsCard';
import TabNavigation from './common/TabNavigation';
import AuthorizationsTable from './common/AuthorizationsTable';
import Pagination from './common/Pagination';
import { CalendarIcon, ClockIcon, BellIcon, ExpandIcon, RefreshIcon } from './common/Icons';
import apiService from '../services/apiService';
import styles from './Dashboard.module.css';

const Dashboard = ({ user, onLogout, onMemberClick, onNavigate }) => {
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (user && token) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const statsResponse = await apiService.get('/api/dashboard/stats');
      setDashboardStats(statsResponse);

      const authResponse = await apiService.get('/api/dashboard/authorizations?limit=50');
      setAuthorizations(authResponse.data);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

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

  // Stats cards configuration
  const statsCards = [
    {
      title: 'Due Today',
      value: dashboardStats.due_today_count || 51,
      label: 'Due Today',
      iconSvg: <CalendarIcon />,
      isPrimary: true,
      variant: 'primary'
    },
    {
      title: 'High Priority',
      value: dashboardStats.high_priority_count || 6,
      label: 'High Priority',
      iconSvg: <ClockIcon />,
      variant: 'secondary'
    },
    {
      title: 'Reminder for Today',
      value: dashboardStats.reminders_count || 7,
      label: 'Reminder for Today',
      iconSvg: <BellIcon />,
      variant: 'tertiary'
    },
    {
      title: 'Start this Week',
      value: dashboardStats.start_this_week_count || 19,
      label: 'Start this Week',
      iconSvg: <CalendarIcon />,
      variant: 'tertiary'
    }
  ];

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <Header user={user} onLogout={onLogout} onNavigate={onNavigate} activeTab="Dashboard" />
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
        </div>
      </div>
    );
  }

  const tabs = ['My Tasks', 'My Cases', 'Risk Stratification'];

  return (
    <div className={styles.dashboard}>
      <Header user={user} onLogout={onLogout} onNavigate={onNavigate} activeTab="Dashboard" />

      <main className={styles.mainContent}>
        {/* Top Section: Title, Tabs, Date */}
        <div className={styles.topSection}>
          <div className={styles.leftSection}>
            <div className={styles.title}>UM Dashboard</div>
            <TabNavigation
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
          <div className={styles.dateDisplay}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
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
              Inpatient Tasks - Due Today ({dashboardStats.due_today_count || 0})
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

            {/* Authorizations Table */}
            <AuthorizationsTable
              authorizations={authorizations}
              onRowClick={handleRowClick}
              formatDate={formatDate}
              formatDateTime={formatDateTime}
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
};

export default Dashboard;
