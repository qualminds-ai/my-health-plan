import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import apiService from '../services/apiService';
// Dashboard icons from assets
import IconBell from '../assets/dashboard/Group-bell.svg';
import IconShare from '../assets/dashboard/icon-park-outline_share.svg';
import IconRestart from '../assets/dashboard/iconamoon_restart-bold.svg';
import IconArrowUp from '../assets/dashboard/tabler_arrow-up.svg';

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

  // Format date and time as MM/DD/YYYY HH:MM AM/PM
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


  // ...existing code...

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
  // Updated stats cards with new design
  const statsCards = [{
    title: 'Due Today',
    value: dashboardStats.due_today_count || 51,
    label: 'Due Today',
    containerStyle: {
      width: '150px',
      padding: '12px 12px 0px 12px',
      alignItems: 'center',
      borderRadius: '8px',
      background: '#8E8E8E',
      gap: '12px'
    },
    iconStyle: {
      width: '26px',
      height: '26px',
      borderRadius: '100px',
      background: '#FFF'
    },
    iconSvg: (
      <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0833 2.60733V2.5C10.0833 2.03587 9.89896 1.59075 9.57077 1.26256C9.24258 0.934375 8.79746 0.75 8.33333 0.75C7.8692 0.75 7.42408 0.934375 7.0959 1.26256C6.76771 1.59075 6.58333 2.03587 6.58333 2.5H5.41667C5.41667 2.03587 5.23229 1.59075 4.9041 1.26256C4.57591 0.934375 4.1308 0.75 3.66667 0.75C3.20254 0.75 2.75742 0.934375 2.42923 1.26256C2.10104 1.59075 1.91667 2.03587 1.91667 2.5V2.60733C1.57664 2.72755 1.28205 2.94989 1.07322 3.24393C0.864382 3.53797 0.751495 3.88935 0.75 4.25V9.5C0.75 10.4648 1.53517 11.25 2.5 11.25H9.5C10.4648 11.25 11.25 10.4648 11.25 9.5V4.25C11.2485 3.88935 11.1356 3.53797 10.9268 3.24393C10.7179 2.94989 10.4234 2.72755 10.0833 2.60733ZM7.75 2.5C7.75 2.34529 7.81146 2.19692 7.92085 2.08752C8.03025 1.97812 8.17862 1.91667 8.33333 1.91667C8.48804 1.91667 8.63642 1.97812 8.74581 2.08752C8.85521 2.19692 8.91667 2.34529 8.91667 2.5V3.66667C8.91667 3.82138 8.85521 3.96975 8.74581 4.07915C8.63642 4.18854 8.48804 4.25 8.33333 4.25C8.17862 4.25 8.03025 4.18854 7.92085 4.07915C7.81146 3.96975 7.75 3.82138 7.75 3.66667V2.5ZM3.08333 2.5C3.08333 2.34529 3.14479 2.19692 3.25419 2.08752C3.36358 1.97812 3.51196 1.91667 3.66667 1.91667C3.82138 1.91667 3.96975 1.97812 4.07915 2.08752C4.18854 2.19692 4.25 2.34529 4.25 2.5V3.66667C4.25 3.82138 4.18854 3.96975 4.07915 4.07915C3.96975 4.18854 3.82138 4.25 3.66667 4.25C3.51196 4.25 3.36358 4.18854 3.25419 4.07915C3.14479 3.96975 3.08333 3.82138 3.08333 3.66667V2.5ZM10.0833 9.5C10.0833 9.82142 9.822 10.0833 9.5 10.0833H2.5C2.178 10.0833 1.91667 9.82142 1.91667 9.5V6H10.0833V9.5Z" fill="#C2C2C2" />
      </svg>
    ),
    textStyle: {
      color: '#FFF',
      fontFamily: 'Inter',
      fontSize: '11px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: 'normal'
    },
    numberStyle: {
      color: '#FFF',
      fontFamily: 'Inter',
      fontSize: '32px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: 'normal'
    },
    isPrimary: true,
  },
  {
    title: 'High Priority',
    value: dashboardStats.high_priority_count || 6,
    label: 'High Priority',
    containerStyle: {
      width: '150px',
      padding: '12px 12px 0px 12px',
      alignItems: 'center',
      borderRadius: '8px',
      background: '#A8A8A8',
      gap: '12px'
    },
    iconStyle: {
      width: '26px',
      height: '26px',
      borderRadius: '100px',
      background: '#FFF'
    }, iconSvg: (
      <svg width="14" height="14" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.96578 11.2195L5.96024 11.2206L5.92443 11.2382L5.91435 11.2402L5.90729 11.2382L5.87148 11.2206C5.86611 11.2189 5.86207 11.2197 5.85938 11.2231L5.85737 11.2281L5.84879 11.4439L5.85131 11.454L5.85636 11.4606L5.9088 11.4979L5.91636 11.4999L5.92242 11.4979L5.97486 11.4606L5.98091 11.4525L5.98293 11.4439L5.97435 11.2286C5.97301 11.2232 5.97015 11.2202 5.96578 11.2195ZM6.09941 11.1626L6.09286 11.1636L5.99957 11.2105L5.99452 11.2155L5.99301 11.2211L6.00209 11.4379L6.00461 11.4439L6.00864 11.4475L6.11 11.4944C6.11639 11.496 6.12126 11.4947 6.12463 11.4903L6.12664 11.4833L6.1095 11.1737C6.10782 11.1676 6.10445 11.1639 6.09941 11.1626ZM5.73886 11.1636C5.73664 11.1622 5.73399 11.1618 5.73145 11.1623C5.72891 11.1629 5.72669 11.1644 5.72525 11.1666L5.72222 11.1737L5.70508 11.4833C5.70541 11.4893 5.70827 11.4934 5.71365 11.4954L5.72121 11.4944L5.82257 11.4475L5.82761 11.4434L5.82963 11.4379L5.8382 11.2211L5.83669 11.215L5.83165 11.21L5.73886 11.1636Z" fill="#C2C2C2" />
        <path d="M5.66666 0.5C8.4517 0.5 10.7093 2.75759 10.7093 5.54263C10.7093 8.32768 8.4517 10.5853 5.66666 10.5853C2.88161 10.5853 0.624023 8.32768 0.624023 5.54263C0.624023 2.75759 2.88161 0.5 5.66666 0.5ZM5.66666 2.51705C5.53292 2.51705 5.40466 2.57018 5.31009 2.66475C5.21552 2.75932 5.16239 2.88758 5.16239 3.02132V5.54263C5.16242 5.67636 5.21557 5.8046 5.31014 5.89915L6.82293 7.41194C6.91804 7.50379 7.04542 7.55462 7.17763 7.55347C7.30985 7.55232 7.43632 7.49929 7.52982 7.4058C7.62331 7.3123 7.67635 7.18582 7.67749 7.05361C7.67864 6.92139 7.62782 6.79401 7.53596 6.69891L6.17092 5.33387V3.02132C6.17092 2.88758 6.11779 2.75932 6.02322 2.66475C5.92866 2.57018 5.8004 2.51705 5.66666 2.51705Z" fill="#C2C2C2" />
      </svg>
    ),
    textStyle: {
      color: '#FFF',
      fontFamily: 'Inter',
      fontSize: '11px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: 'normal'
    },
    numberStyle: {
      color: '#FFF',
      fontFamily: 'Inter',
      fontSize: '32px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: 'normal'
    },
  },
  {
    title: 'Reminder for Today',
    value: dashboardStats.reminders_count || 7,
    label: 'Reminder for Today',
    containerStyle: {
      width: '150px',
      padding: '12px 12px 0px 12px',
      alignItems: 'center',
      borderRadius: '8px',
      background: '#FFF',
      gap: '12px'
    },
    iconStyle: {
      width: '26px',
      height: '26px',
      borderRadius: '100px',
      background: '#EFEFEF'
    },
    iconSvg: (
      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.3335 1.5V2.65789V1.5Z" fill="#C2C2C2" />
        <path d="M6.3335 1.5V2.65789" stroke="#C2C2C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.33373 2.65771C4.41741 2.65771 2.86004 4.21508 2.86004 6.1314V9.60508C2.2811 9.60508 1.70215 10.184 1.70215 10.763H6.33373M6.33373 2.65771C8.25004 2.65771 9.80741 4.21508 9.80741 6.1314V9.60508C10.3864 9.60508 10.9653 10.184 10.9653 10.763H6.33373" fill="#C2C2C2" />
        <path d="M6.33373 2.65771C4.41741 2.65771 2.86004 4.21508 2.86004 6.1314V9.60508C2.2811 9.60508 1.70215 10.184 1.70215 10.763H6.33373H10.9653C10.9653 10.184 10.3864 9.60508 9.80741 9.60508V6.1314C9.80741 4.21508 8.25004 2.65771 6.33373 2.65771Z" stroke="#C2C2C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.17578 11.3423C5.17578 11.9791 5.69683 12.5002 6.33368 12.5002C6.97052 12.5002 7.49157 11.9791 7.49157 11.3423" fill="#C2C2C2" />
        <path d="M5.17578 11.3423C5.17578 11.9791 5.69683 12.5002 6.33368 12.5002C6.97052 12.5002 7.49157 11.9791 7.49157 11.3423" stroke="#C2C2C2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    textStyle: {
      color: '#474747',
      fontFamily: 'Inter',
      fontSize: '11px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: 'normal'
    },
    numberStyle: {
      color: '#474747',
      fontFamily: 'Inter',
      fontSize: '32px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: 'normal'
    },
  }, {
    title: 'Start this Week',
    value: dashboardStats.start_this_week_count || 19,
    label: 'Start this Week',
    containerStyle: {
      width: '150px',
      padding: '12px 12px 0px 12px',
      alignItems: 'center',
      borderRadius: '8px',
      background: '#FFF',
      gap: '12px'
    },
    iconStyle: {
      width: '26px',
      height: '26px',
      borderRadius: '100px',
      background: '#EFEFEF'
    }, iconSvg: (
      <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0833 2.60733V2.5C10.0833 2.03587 9.89896 1.59075 9.57077 1.26256C9.24258 0.934375 8.79746 0.75 8.33333 0.75C7.8692 0.75 7.42408 0.934375 7.0959 1.26256C6.76771 1.59075 6.58333 2.03587 6.58333 2.5H5.41667C5.41667 2.03587 5.23229 1.59075 4.9041 1.26256C4.57591 0.934375 4.1308 0.75 3.66667 0.75C3.20254 0.75 2.75742 0.934375 2.42923 1.26256C2.10104 1.59075 1.91667 2.03587 1.91667 2.5V2.60733C1.57664 2.72755 1.28205 2.94989 1.07322 3.24393C0.864382 3.53797 0.751495 3.88935 0.75 4.25V9.5C0.75 10.4648 1.53517 11.25 2.5 11.25H9.5C10.4648 11.25 11.25 10.4648 11.25 9.5V4.25C11.2485 3.88935 11.1356 3.53797 10.9268 3.24393C10.7179 2.94989 10.4234 2.72755 10.0833 2.60733ZM7.75 2.5C7.75 2.34529 7.81146 2.19692 7.92085 2.08752C8.03025 1.97812 8.17862 1.91667 8.33333 1.91667C8.48804 1.91667 8.63642 1.97812 8.74581 2.08752C8.85521 2.19692 8.91667 2.34529 8.91667 2.5V3.66667C8.91667 3.82138 8.85521 3.96975 8.74581 4.07915C8.63642 4.18854 8.48804 4.25 8.33333 4.25C8.17862 4.25 8.03025 4.18854 7.92085 4.07915C7.81146 3.96975 7.75 3.82138 7.75 3.66667V2.5ZM3.08333 2.5C3.08333 2.34529 3.14479 2.19692 3.25419 2.08752C3.36358 1.97812 3.51196 1.91667 3.66667 1.91667C3.82138 1.91667 3.96975 1.97812 4.07915 2.08752C4.18854 2.19692 4.25 2.34529 4.25 2.5V3.66667C4.25 3.82138 4.18854 3.96975 4.07915 4.07915C3.96975 4.18854 3.82138 4.25 3.66667 4.25C3.51196 4.25 3.36358 4.18854 3.25419 4.07915C3.14479 3.96975 3.08333 3.82138 3.08333 3.66667V2.5ZM10.0833 9.5C10.0833 9.82142 9.822 10.0833 9.5 10.0833H2.5C2.178 10.0833 1.91667 9.82142 1.91667 9.5V6H10.0833V9.5Z" fill="#C2C2C2" />
      </svg>
    ),
    textStyle: {
      color: '#474747',
      fontFamily: 'Inter',
      fontSize: '11px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: 'normal'
    },
    numberStyle: {
      color: '#474747',
      fontFamily: 'Inter',
      fontSize: '32px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: 'normal'
    },
  },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={onLogout} onNavigate={onNavigate} activeTab="Dashboard" />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (<div className="min-h-screen bg-white font-inter">
    <Header user={user} onLogout={onLogout} onNavigate={onNavigate} activeTab="Dashboard" />      {/* Main Content */}
    <main style={{ maxWidth: '97%', margin: '0 auto', padding: '0 20px', background: 'white' }}>{/* Top Section: Title, Tabs, Date - All in one line */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            color: '#737373',
            fontFamily: 'Inter',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            marginRight: '20px'
          }}>UM Dashboard</div>

          <div style={{
            display: 'flex',
            background: '#FFF',
            border: '0.327px solid #E9E8EC',
            borderRadius: '6.545px',
            overflow: 'hidden'
          }}>
            {['My Tasks', 'My Cases', 'Risk Stratification'].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '3.273px 13.909px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: 'none',
                  borderRight: index < 2 ? '0.327px solid #E9E8EC' : 'none',
                  borderRadius: index === 0 ? '6.545px 0px 0px 6.545px' :
                    index === 2 ? '0px 6.545px 6.545px 0px' : '0px',
                  background: activeTab === tab ? '#838383' : '#FFF',
                  color: activeTab === tab ? '#FFFFFF' : '#727272',
                  fontFamily: 'Inter',
                  fontSize: '9.818px',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                  cursor: 'pointer',
                  outline: 'none',
                  minWidth: 'fit-content',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          color: '#11273D',
          fontFamily: 'Inter',
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: 'normal'
        }}>{'Thursday, May 2'}</div>        </div>

      {/* Main Content Container */}
      <div style={{
        borderRadius: '16px',
        background: '#F6F6F6',
        padding: '24px'
      }}>          {/* Stats Cards Row */}
        <div style={{ display: 'flex', gap: 24, marginTop: 0, marginBottom: 0 }}>
          {statsCards.map((card, idx) => (
            <div
              key={card.title}
              style={{
                ...card.containerStyle,
                display: 'flex',
                flexDirection: 'row',
                height: '60px',
                alignItems: 'center',
                padding: '12px'
              }}
            >
              {/* Left side: Icon and Text */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: '1' }}>
                {/* Icon Container - positioned to align with text */}
                <div
                  style={{
                    ...card.iconStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '4px',
                    marginLeft: '0px'
                  }}
                >
                  {card.iconSvg}
                </div>

                {/* Label - aligned with icon */}
                <div
                  style={{
                    ...card.textStyle,
                    textAlign: 'left',
                    lineHeight: '12px'
                  }}
                >
                  {card.label}
                </div>
              </div>

              {/* Right side: Number */}
              <div
                style={{
                  ...card.numberStyle,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '8px'
                }}
              >
                {card.value}
              </div>
            </div>
          ))}
        </div>          {/* Section Title Below Cards */}
        <div style={{ marginTop: 32, marginBottom: 0, color: '#737373', fontFamily: 'Inter', fontSize: '16px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Inpatient Tasks - Due Today (56)
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '17px', height: '17px', aspectRatio: '1/1' }}>
            <path d="M9.91667 2.125H14.875V7.08333M14.875 10.4387V13.8125C14.875 14.0943 14.7631 14.3645 14.5638 14.5638C14.3645 14.7631 14.0943 14.875 13.8125 14.875H3.1875C2.90571 14.875 2.63546 14.7631 2.4362 14.5638C2.23694 14.3645 2.125 14.0943 2.125 13.8125V3.1875C2.125 2.90571 2.23694 2.63546 2.4362 2.4362C2.63546 2.23694 2.90571 2.125 3.1875 2.125H6.375M9.1375 7.8625L14.5562 2.44375" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* ...existing code for table, etc... */}          {/* Table Section - Clean, Figma-aligned, no border container, no tab nav */}
        <div style={{ marginTop: 32, position: 'relative' }}>            {/* Blue arrow positioned to the left of the first table row */}
          {authorizations.length > 0 && (
            <div style={{
              position: 'absolute',
              left: '-18px',
              top: '87px',
              zIndex: 1000,
              width: '20px',
              height: '20px'
            }}>
              <svg width="16" height="20" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                <path d="M0 0.0908203V17.909L14 8.99991L0 0.0908203Z" fill="#03045E" />
              </svg>
            </div>
          )}            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: '5px' }}>
            <span style={{ color: '#737373', fontFamily: 'Inter', fontSize: '10px', fontStyle: 'italic', fontWeight: 500, lineHeight: 'normal' }}>Last Updated: 1 min ago</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '12px', height: '12px', aspectRatio: '1/1' }}>
              <g clipPath="url(#clip0_454_1258)">
                <path d="M10.5 6.00008C10.5 7.06161 10.1247 8.08896 9.44048 8.90055C8.75625 9.71214 7.80715 10.2557 6.76091 10.4352C5.71466 10.6147 4.63865 10.4186 3.72304 9.88143C2.80743 9.34431 2.11118 8.5008 1.75735 7.49997C1.40351 6.49915 1.41488 5.40547 1.78943 4.41221C2.16398 3.41896 2.87761 2.59009 3.80418 2.07211C4.73075 1.55413 5.81061 1.38038 6.85289 1.58157C7.89518 1.78277 8.83279 2.34595 9.5 3.17158" stroke="#737373" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.75 1.5L9.75 3.5L7.75 3.5" stroke="#737373" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_454_1258">
                  <rect width="12" height="12" fill="white" transform="translate(12) rotate(90)" />
                </clipPath>
              </defs>
            </svg>
          </div><div style={{ overflowX: 'auto', position: 'relative' }}>
            <table style={{ width: '100%', minWidth: 1400, borderCollapse: 'collapse', background: 'none', marginLeft: '0px' }}>
              <thead>                <tr style={{ height: 44, background: '#EDEDED' }}>
                <th style={{ padding: 0, width: 20, background: 'none', borderBottom: '2px solid #B5B7BA' }}></th>
                <th style={{ padding: '0 16px', color: '#737373', fontWeight: 700, fontSize: 10, textAlign: 'left', background: 'none', borderBottom: '2px solid #B5B7BA', position: 'relative' }}>Priority <span style={{ color: '#8C8C8C', fontWeight: 400, fontSize: 10, position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }}>↓</span></th>
                <th style={{ padding: '0 16px', color: '#737373', fontWeight: 700, fontSize: 10, textAlign: 'left', borderBottom: '2px solid #B5B7BA' }}>Authorization #</th>
                <th style={{ padding: '0 16px', color: '#737373', fontWeight: 700, fontSize: 10, textAlign: 'left', borderBottom: '2px solid #B5B7BA' }}>Received Date</th>
                <th style={{ padding: '0 16px', color: '#737373', fontWeight: 700, fontSize: 10, textAlign: 'left', borderBottom: '2px solid #B5B7BA' }}>Admission Date</th>
                <th style={{ padding: '0 16px', color: '#737373', fontWeight: 700, fontSize: 10, textAlign: 'left', borderBottom: '2px solid #B5B7BA' }}>Diagnosis</th>
                <th style={{ padding: '0 16px', color: '#737373', fontWeight: 700, fontSize: 10, textAlign: 'left', borderBottom: '2px solid #B5B7BA' }}>DRG</th>
                <th style={{ padding: '0 16px', color: '#737373', fontWeight: 700, fontSize: 10, textAlign: 'left', borderBottom: '2px solid #B5B7BA' }}>Request Type</th>
                <th style={{ padding: '0 16px', color: '#737373', fontWeight: 700, fontSize: 10, textAlign: 'left', borderBottom: '2px solid #B5B7BA' }}>POS</th>
                <th style={{ padding: '0 16px', color: '#737373', fontWeight: 700, fontSize: 10, textAlign: 'left', borderBottom: '2px solid #B5B7BA' }}>Type</th>
                <th style={{ padding: '0 16px', color: '#737373', fontWeight: 700, fontSize: 10, textAlign: 'left', borderBottom: '2px solid #B5B7BA' }}>Member Name</th>
                <th style={{ padding: '0 16px', color: '#737373', fontWeight: 700, fontSize: 10, textAlign: 'left', borderBottom: '2px solid #B5B7BA' }}>Approved Days</th>
                <th style={{ padding: '0 16px', color: '#737373', fontWeight: 700, fontSize: 10, textAlign: 'left', borderBottom: '2px solid #B5B7BA' }}>Next Review Date</th>
                <th style={{ padding: '0 16px', color: '#737373', fontWeight: 700, fontSize: 10, textAlign: 'left', borderBottom: '2px solid #B5B7BA' }}>Status</th>
                <th style={{ padding: '0 16px', background: 'none', borderBottom: '2px solid #B5B7BA', color: '#737373', fontWeight: 700, fontSize: 10 }}>Action</th>
              </tr>
              </thead>
              <tbody style={{ background: 'none' }}>                {authorizations.map((auth, idx) => (
                <tr
                  key={auth.authorization_number || auth.id}
                  style={{
                    cursor: 'pointer',
                    borderBottom: '1px solid #E9E9E9',
                    height: 48,
                    background: idx === 0 ? '#F8F9FB' : '#fff',
                    position: 'relative',
                  }}
                  onClick={() => handleRowClick(auth)}
                  onMouseOver={e => (e.currentTarget.style.background = '#F8F9FB')}
                  onFocus={e => (e.currentTarget.style.background = '#F8F9FB')}
                  onMouseOut={e => (e.currentTarget.style.background = idx === 0 ? '#F8F9FB' : '#fff')}
                  onBlur={e => (e.currentTarget.style.background = idx === 0 ? '#F8F9FB' : '#fff')}                >{/* Priority left strip - reduced width, no rounding */}                  <td style={{
                    padding: 0,
                    width: 20,
                    background: auth.priority === 'High' ? '#A8A8A8' :
                      auth.priority === 'Medium' ? '#8E8E8E' : '#E0E0E0',
                    position: 'relative'
                  }}>
                  </td>
                  <td style={{ padding: '0 16px', color: '#02060E', fontWeight: 600, fontSize: 10, verticalAlign: 'middle' }}>{auth.priority}</td>
                  <td style={{ padding: '0 16px', color: '#737373', fontSize: 10 }}>{auth.authorization_number}</td>
                  <td style={{ padding: '0 16px', color: '#02060E', fontSize: 10 }}>{formatDateTime(auth.received_date)}</td>
                  <td style={{ padding: '0 16px', color: '#02060E', fontSize: 10 }}>{formatDate(auth.admission_date)}</td>
                  <td style={{ padding: '0 16px', color: '#737373', fontSize: 10 }}>{auth.diagnosis_code}</td>
                  <td style={{ padding: '0 16px', color: '#737373', fontSize: 10 }}>{auth.drg_code}</td>
                  <td style={{ padding: '0 16px', color: '#737373', fontSize: 10 }}>{auth.request_type}</td>
                  <td style={{ padding: '0 16px', color: '#737373', fontSize: 10 }}>{auth.pos}</td>
                  <td style={{ padding: '0 16px', color: '#737373', fontSize: 10 }}>{auth.type}</td>
                  <td style={{ padding: '0 16px', color: '#737373', fontSize: 10 }}>{auth.member_name}</td>
                  <td style={{ padding: '0 16px', color: '#02060E', fontSize: 10 }}>{auth.approved_days}</td>
                  <td style={{ padding: '0 16px', color: '#02060E', fontSize: 10 }}>{formatDateTime(auth.next_review_date)}</td>
                  <td style={{ padding: '0 16px', color: '#02060E', fontSize: 10 }}>{auth.status}</td>                  <td style={{ padding: '0 16px', textAlign: 'right' }}>
                    <button style={{
                      borderRadius: '40px',
                      background: '#E7F8F3',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '6px 8px'
                    }}>
                      <svg width="20" height="5" viewBox="0 0 20 5" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="2.5" cy="2.5" r="2.5" fill="#02060E" /><circle cx="10" cy="2.5" r="2.5" fill="#02060E" /><circle cx="17.5" cy="2.5" r="2.5" fill="#02060E" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>            {/* Pagination and page size selector */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '16px 0 40px 0', gap: 12, fontFamily: 'Inter' }}>              {/* Items per page dropdown */}
              <div style={{ position: 'relative' }}>
                <select style={{
                  width: '112.6px',
                  height: '22px',
                  borderRadius: '2.794px',
                  border: '0.699px solid #DFE3E8',
                  background: '#FFF',
                  padding: '2.794px 2.441px 2.441px 11px',
                  fontSize: '9.779px',
                  fontFamily: 'Inter',
                  fontWeight: 400,
                  color: '#212B36',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                  lineHeight: '13.971px',
                  appearance: 'none',
                  cursor: 'pointer'
                }} defaultValue="10">
                  <option value="10">10 per page</option>
                  <option value="20">20 per page</option>
                  <option value="50">50 per page</option>
                </select>                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
                  position: 'absolute',
                  right: 10,
                  top: '60%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }}>
                  <path d="M1 1L6 6L11 1" stroke="#212B36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Pagination buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {/* Previous button (disabled) */}
                <button style={{
                  width: '22.353px',
                  height: '22.353px',
                  padding: '2.794px',
                  borderRadius: '2.794px',
                  opacity: 0.5,
                  background: '#919EAB',
                  border: 'none',
                  cursor: 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }} disabled>
                  <svg width="16.765" height="16.765" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="#C4CDD5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>                  {/* Page 1 (active) */}
                <button style={{
                  display: 'flex',
                  width: '22.353px',
                  height: '22.353px',
                  padding: '3.493px 2.794px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '2.794px',
                  border: '0.699px solid #737373',
                  background: '#FFF',
                  color: '#737373',
                  fontSize: '9.779px',
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}>
                  1
                </button>

                {/* Page 2 */}
                <button style={{
                  display: 'flex',
                  width: '22.353px',
                  height: '22.353px',
                  padding: '3.493px 2.794px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '2.794px',
                  border: '0.699px solid #737373',
                  background: '#FFF',
                  color: '#212B36',
                  fontSize: '9.779px',
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}>
                  2
                </button>

                {/* Ellipsis */}
                <button style={{
                  display: 'flex',
                  width: '22.353px',
                  height: '22.353px',
                  padding: '3.493px 2.794px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '2.794px',
                  border: '0.699px solid #737373',
                  background: '#FFF',
                  color: '#212B36',
                  fontSize: '9.779px',
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  cursor: 'default'
                }} disabled>
                  ...
                </button>

                {/* Page 8 */}
                <button style={{
                  display: 'flex',
                  width: '22.353px',
                  height: '22.353px',
                  padding: '3.493px 2.794px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '2.794px',
                  border: '0.699px solid #737373',
                  background: '#FFF',
                  color: '#212B36',
                  fontSize: '9.779px',
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}>
                  8
                </button>

                {/* Page 9 */}
                <button style={{
                  display: 'flex',
                  width: '22.353px',
                  height: '22.353px',
                  padding: '3.493px 2.794px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '2.794px',
                  border: '0.699px solid #737373',
                  background: '#FFF',
                  color: '#212B36',
                  fontSize: '9.779px',
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}>
                  9
                </button>

                {/* Next button (enabled) */}
                <button style={{
                  width: '22.353px',
                  height: '22.353px',
                  padding: '2.794px',
                  borderRadius: '2.794px',
                  border: '0.699px solid #DFE3E8',
                  background: '#FFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="16.765" height="16.765" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="#C4CDD5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Empty State */}
        {authorizations.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No authorizations</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new authorization.</p>
          </div>
        )}
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading dashboard</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>          </div>
        )}
      </div> {/* End of Main Content Container */}
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
