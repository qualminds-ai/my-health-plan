import React, { useState, useRef } from 'react';
import Header from './Header';

// Import authorization assets
import faxDocIcon from '../assets/authorizations/fax-doc-icon.png';
import medicalIcon from '../assets/authorizations/medical-icon.png';
import pdfDocIcon from '../assets/authorizations/pdf-doc-icon.png';
import textDocIcon from '../assets/authorizations/text-doc-icon.png';
import starIcon from '../assets/authorizations/star-icon.png';
import callIcon from '../assets/authorizations/call-icon.png';
import textChatIcon from '../assets/authorizations/text-chat-icon.png';
import messageIcon from '../assets/authorizations/message-icon.png';
import watchIcon from '../assets/authorizations/watch-icon.png';
import userIcon from '../assets/authorizations/mingcute_user-x-fill.svg';

const Member = ({ user, memberData: propMemberData, onLogout, onBack, onNavigate }) => {
  const topRef = useRef(null);
  const authContentRef = useRef(null); const [activeTab, setActiveTab] = useState('Authorizations');
  const [activeAuthTab, setActiveAuthTab] = useState('Request Submitted');
  const [activeRequestTab, setActiveRequestTab] = useState('20250P000367');

  // Use prop data if available, otherwise use static demo data
  const memberData = propMemberData || {
    id: 'M001234',
    name: 'Robert Abbott',
    memberNumber: 'M1000020000',
    dateOfBirth: '1985-03-15',
    gender: 'Female',
    insuranceGroup: 'BCBS Premium',
    effectiveDate: '2024-01-01',
    status: 'Active',
    phone: '(555) 123-4567',
    email: 'sarah.johnson@email.com',
    address: '123 Main St, Springfield, IL 62701',
    primaryCarePhysician: 'Dr. Michael Chen',
    emergencyContact: 'John Johnson (Spouse) - (555) 987-6543'
  };  // Static authorization data for overview
  const recentAuthorizations = [
    {
      id: 1,
      authNumber: 'AUTH-2024-001',
      status: 'Approved',
      service: 'Cardiac Catheterization',
      provider: 'Springfield Medical Center',
      requestDate: '2024-05-15',
      approvedDays: 3,
      priority: 'High'
    },
    {
      id: 2,
      authNumber: 'AUTH-2024-002',
      status: 'Pending',
      service: 'Physical Therapy',
      provider: 'Rehab Solutions',
      requestDate: '2024-05-20',
      approvedDays: null,
      priority: 'Medium'
    },
    {
      id: 3,
      authNumber: 'AUTH-2024-003',
      status: 'In Review',
      service: 'MRI - Brain',
      provider: 'Diagnostic Imaging Inc',
      requestDate: '2024-05-25',
      approvedDays: null,
      priority: 'High'
    }
  ];

  // Attachments data
  const attachments = [
    { id: 1, title: 'Summary of Attachments', date: 'Apr 28, 2025', size: '3KB', type: 'pdf', isSummary: true },
    { id: 2, title: 'Authorization request (original fax)', date: 'Apr 28, 2025', size: '31KB', type: 'fax' },
    { id: 3, title: 'Medical History - Robert Abbott', date: 'Apr 28, 2025', size: '6KB', type: 'pdf' },
    { id: 4, title: 'Specialist Notes', date: 'Apr 28, 2025', size: '6KB', type: 'pdf' },
    { id: 5, title: 'Physical and Labs - Robert Abbott', date: 'Apr 28, 2025', size: '31KB', type: 'text' },
    { id: 6, title: 'ED Notes', date: 'Apr 28, 2025', size: '3KB', type: 'text' },
    { id: 7, title: 'Physician notes', date: 'Apr 28, 2025', size: '90KB', type: 'text' },
    { id: 8, title: 'Nursing notes', date: 'Apr 28, 2025', size: '99KB', type: 'text' },
    { id: 9, title: 'Referral: infectious disease physician', date: 'Apr 28, 2025', size: '31KB', type: 'pdf' },
    { id: 10, title: 'Referral: discharge planner', date: 'Apr 28, 2025', size: '3KB', type: 'pdf' },
  ];  // Function to get attachment icon based on type
  const getAttachmentIcon = (type, title) => {
    // Special cases based on title
    if (title === 'Authorization request (original fax)' || title === 'Physical and Labs - Robert Abbott') {
      return faxDocIcon;
    }
    if (title === 'Referral: infectious disease physician' || title === 'Referral: discharge planner') {
      return pdfDocIcon;
    }
    if (title === 'Summary of Attachments' || title === 'Medical History - Robert Abbott' || title === 'Specialist Notes') {
      return textDocIcon;
    }

    // Default cases based on type
    switch (type) {
      case 'pdf':
        return pdfDocIcon;
      case 'fax':
        return faxDocIcon;
      case 'text':
        return textDocIcon;
      default:
        return textDocIcon;
    }
  };
  // Function to render attachment item
  const AttachmentItem = ({ attachment }) => {
    const isActive = attachment.id === 1; // First item (Summary) is active

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <div
          style={{
            width: '25px',
            height: '33px',
            flexShrink: 0,
            aspectRatio: '25/33',
            background: `url(${getAttachmentIcon(attachment.type, attachment.title)}) lightgray 50% / cover no-repeat`,
            marginRight: '12px'
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{
            color: isActive ? '#000' : '#787878',
            fontFamily: 'Inter',
            fontSize: '11.219px',
            fontStyle: 'normal',
            fontWeight: isActive ? '700' : '500',
            lineHeight: 'normal',
            marginBottom: '2px'
          }}>
            {attachment.title}
          </div>
          <div style={{
            color: isActive ? '#000' : '#AEACAB',
            fontFamily: 'Inter',
            fontSize: '11px',
            fontStyle: 'normal',
            fontWeight: isActive ? '700' : '400',
            lineHeight: 'normal'
          }}>
            {attachment.date} · {attachment.size}.{attachment.type === 'fax' ? 'pdf' : attachment.type}
          </div>
        </div>
      </div>
    );
  };
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'in review': return 'bg-blue-500';
      case 'denied': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  // Define the tabs
  const tabs = ['Overview', 'Eligibility & Benefits', 'Care Plans', 'Discharge Plans', 'Concierge Care', 'Authorizations', 'Notes', 'Medications', 'Cases', 'Assessments'];

  // Define authorization sub-tabs - simplified
  const authTabs = [
    { id: 'Request Submitted', label: 'Request Submitted', status: 'active' },
    { id: 'Clinical Review', label: 'Clinical Review', status: 'pending' },
    { id: 'Request Decision Appeal', label: 'Request Decision Appeal', status: 'pending' },
    { id: 'MD Review', label: 'MD Review', status: 'pending' },
    { id: 'Concurrent Review', label: 'Concurrent Review', status: 'pending' },
    { id: 'Closed', label: 'Closed', status: 'pending' }
  ];
  // Handle auth tab click - simplified without animations
  const handleAuthTabClick = (tabId) => {
    setActiveAuthTab(tabId);

    // Simple scroll to top
    if (authContentRef.current) {
      const rect = authContentRef.current.getBoundingClientRect();
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const targetScrollY = currentScrollY + rect.top - 20;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };
  return (
    <div className="min-h-screen">
      <div ref={topRef} id="top"></div>      <Header user={user} onLogout={onLogout} onNavigate={onNavigate} activeTab="Members" />      {/* Main Content */}
      <div className="main-content" style={{ width: '97%', margin: '0px auto', padding: '0px 20px', background: 'white' }}>        {/* Member Header Content */}
        <div style={{ width: '100%' }}>
          <div className="flex items-center py-3">
            <div className="flex-1">
              <div className="flex items-center justify-between">                <div className="flex flex-col">                  <h3 style={{
                fontFamily: 'Inter',
                fontSize: '20px',
                fontWeight: '590',
                lineHeight: '28px',
                color: '#1D2939',
                margin: '0'
              }}>
                Member Overview: {memberData.name}
              </h3>
              </div>
                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #D0D5DD',
                      borderRadius: '6px',
                      padding: '0',
                      cursor: 'pointer'
                    }}
                  >
                    <img src={starIcon} alt="Star" />
                  </button>
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #D0D5DD',
                      borderRadius: '6px',
                      padding: '0',
                      cursor: 'pointer'
                    }}
                  >
                    <img src={callIcon} alt="Call" />
                  </button>
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #D0D5DD',
                      borderRadius: '6px',
                      padding: '0',
                      cursor: 'pointer'
                    }}
                  >
                    <img src={textChatIcon} alt="Chat" />
                  </button>
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #D0D5DD',
                      borderRadius: '6px',
                      padding: '0',
                      cursor: 'pointer'
                    }}
                  >
                    <img src={messageIcon} alt="Message" />
                  </button>
                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #D0D5DD',
                      borderRadius: '6px',
                      padding: '0',
                      cursor: 'pointer'
                    }}
                  >
                    <img src={watchIcon} alt="Watch" />
                  </button>                  </div>
              </div>
            </div>
          </div>
        </div>        {/* Member Info Bar */}
        <div style={{
          backgroundColor: '#F7F7F7',
          borderRadius: '13.091px',
          height: '72px',
          marginBottom: '20px'
        }}>
          <div style={{ width: '100%' }} className="px-4">
            <div className="flex py-3 items-center" style={{ height: '72px' }}>
              {/* Icon Column (Far Left) */}
              <div className="flex items-center justify-center mr-4">
                <img src={userIcon} alt="User" style={{ width: '24px', height: '24px' }} />
              </div>              {/* Member Details Column */}
              <div className="mr-6 flex flex-col" style={{ gap: '5px' }}>
                <div style={{
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1D2939',
                  lineHeight: 'normal'
                }}>
                  Robert Abbott
                </div>
                <div style={{
                  fontFamily: 'Inter',
                  fontSize: '11px',
                  fontWeight: '400',
                  color: '#667085',
                  lineHeight: 'normal'
                }}>
                  01/01/1974, 51 Years, Male
                </div>
              </div>{/* Data Columns */}
              <div className="flex-1 flex justify-between">
                {/* Eligibility Column */}
                <div className="flex flex-col" style={{ gap: '5px' }}>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '9px',
                    fontWeight: '400',
                    color: '#667085',
                    lineHeight: 'normal'
                  }}>
                    Eligibility
                  </div>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '11px',
                    fontWeight: '500',
                    color: '#1D2939',
                    lineHeight: 'normal'
                  }}>
                    10/01/2024-12/31/2025
                  </div>
                </div>

                {/* MRIN Column */}
                <div className="flex flex-col" style={{ gap: '5px' }}>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '9px',
                    fontWeight: '400',
                    color: '#667085',
                    lineHeight: 'normal'
                  }}>
                    MRIN
                  </div>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '11px',
                    fontWeight: '500',
                    color: '#1D2939',
                    lineHeight: 'normal'
                  }}>
                    {memberData.memberNumber}
                  </div>
                </div>

                {/* Language Column */}
                <div className="flex flex-col" style={{ gap: '5px' }}>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '9px',
                    fontWeight: '400',
                    color: '#667085',
                    lineHeight: 'normal'
                  }}>
                    Language (1st)
                  </div>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '11px',
                    fontWeight: '500',
                    color: '#1D2939',
                    lineHeight: 'normal'
                  }}>
                    English
                  </div>
                </div>

                {/* Programs Column */}
                <div className="flex flex-col" style={{ gap: '5px' }}>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '9px',
                    fontWeight: '400',
                    color: '#667085',
                    lineHeight: 'normal'
                  }}>
                    Programs
                  </div>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '11px',
                    fontWeight: '500',
                    color: '#1D2939',
                    lineHeight: 'normal'
                  }}>
                    Care Coordination: ERM PH
                  </div>
                </div>

                {/* BHP Column */}
                <div className="flex flex-col" style={{ gap: '5px' }}>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '9px',
                    fontWeight: '400',
                    color: '#667085',
                    lineHeight: 'normal'
                  }}>
                    BHP
                  </div>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '11px',
                    fontWeight: '500',
                    color: '#1D2939',
                    lineHeight: 'normal'
                  }}>
                    Large Group
                  </div>
                </div>

                {/* Opt Out Column */}
                <div className="flex flex-col" style={{ gap: '5px' }}>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '9px',
                    fontWeight: '400',
                    color: '#667085',
                    lineHeight: 'normal'
                  }}>
                    Opt out
                  </div>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '11px',
                    fontWeight: '500',
                    color: '#1D2939',
                    lineHeight: 'normal'
                  }}>
                    No
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        {/* Tab Navigation */}
        <div className="member-tabs" style={{ backgroundColor: '#FEFEFE' }}>
          <div style={{ width: '100%' }} >
            <ul className="flex border-0" style={{ marginBottom: '0', gap: '30px', borderBottom: '4px solid #EDEDED' }}>
              {tabs.map((tab, index) => (
                <li className="nav-item" key={index}>                  <button
                  className="px-4 py-2 transition-colors relative"
                  style={{
                    color: activeTab === tab ? '#000' : '#727272',
                    fontFamily: 'Inter',
                    fontSize: '11.455px',
                    fontStyle: 'normal',
                    fontWeight: activeTab === tab ? '700' : '400',
                    lineHeight: 'normal',
                    backgroundColor: activeTab === tab ? '#EDEDED' : 'transparent',
                    borderRadius: activeTab === tab ? '6.545px 6.545px 0px 0px' : '0',
                    border: 'none',
                    borderBottom: activeTab === tab ? '4px solid #EDEDED' : 'none',
                    marginBottom: '-4px'
                  }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
                </li>
              ))}
            </ul>
          </div>        </div>{/* Tab Content */}
        <div className="tab-content bg-white">
          <div style={{ width: '100%' }} className="py-4">
            {activeTab === 'Overview' && (
              <div className="w-full">
                <div className="w-full">
                  <div className="p-6">
                    <h5 className="text-lg font-semibold mb-4">Member Overview</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h6 className="text-gray-600 mb-3 font-semibold">Personal Information</h6>
                        <table className="w-full text-sm">
                          <tbody>
                            <tr>
                              <td className="font-bold py-2">Full Name:</td>
                              <td className="py-2">Robert Abbott</td>
                            </tr>
                            <tr>
                              <td className="font-bold py-2">Date of Birth:</td>
                              <td className="py-2">01/01/1974 (51 Years)</td>
                            </tr>
                            <tr>
                              <td className="font-bold py-2">Gender:</td>
                              <td className="py-2">Male</td>
                            </tr>
                            <tr>
                              <td className="font-bold py-2">MRN:</td>
                              <td className="py-2">M1000020000</td>
                            </tr>
                            <tr>
                              <td className="font-bold py-2">Primary Language:</td>
                              <td className="py-2">English</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <h6 className="text-gray-600 mb-3 font-semibold">Coverage Information</h6>
                        <table className="w-full text-sm">
                          <tbody>
                            <tr>
                              <td className="font-bold py-2">Eligibility Period:</td>
                              <td className="py-2">10/01/2024 - 12/31/2025</td>
                            </tr>
                            <tr>
                              <td className="font-bold py-2">Plan Type:</td>
                              <td className="py-2">Large Group</td>
                            </tr>
                            <tr>
                              <td className="font-bold py-2">Programs:</td>
                              <td className="py-2">Care Coordination: ERM PH</td>
                            </tr>
                            <tr>
                              <td className="font-bold py-2">Opt Out Status:</td>
                              <td className="py-2"><span className="bg-green-500 text-white px-2 py-1 rounded text-xs">No</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}            {activeTab === 'Authorizations' && (
              <div className="w-full">
                <div className="w-full">
                  {/* Top Navigation Tabs */}

                  <div className="py-4">                      {/* Request Navigation */}
                    <div className="flex items-center mb-4" >
                      <div className="flex" style={{ backgroundColor: '#FEFEFE', borderBottom: '4px solid #EDEDED', gap: '30px' }}>                          <button
                        className="px-4 py-2 transition-colors relative"
                        style={{
                          color: activeRequestTab === 'Request History' ? '#000' : '#727272',
                          fontFamily: 'Inter',
                          fontSize: '11.455px',
                          fontStyle: 'normal',
                          fontWeight: activeRequestTab === 'Request History' ? '700' : '400',
                          lineHeight: 'normal',
                          backgroundColor: activeRequestTab === 'Request History' ? '#EDEDED' : 'transparent',
                          borderRadius: activeRequestTab === 'Request History' ? '6.545px 6.545px 0px 0px' : '0',
                          border: 'none',
                          borderBottom: activeRequestTab === 'Request History' ? '4px solid #EDEDED' : 'none',
                          marginBottom: '-4px'
                        }}
                        onClick={() => setActiveRequestTab('Request History')}
                      >
                        Request History
                      </button>
                        <button
                          className="px-4 py-2 transition-colors relative"
                          style={{
                            color: activeRequestTab === '20250P000367' ? '#000' : '#727272',
                            fontFamily: 'Inter',
                            fontSize: '11.455px',
                            fontStyle: 'normal',
                            fontWeight: activeRequestTab === '20250P000367' ? '700' : '400',
                            lineHeight: 'normal',
                            backgroundColor: activeRequestTab === '20250P000367' ? '#EDEDED' : 'transparent',
                            borderRadius: activeRequestTab === '20250P000367' ? '6.545px 6.545px 0px 0px' : '0',
                            border: 'none',
                            borderBottom: activeRequestTab === '20250P000367' ? '4px solid #EDEDED' : 'none',
                            marginBottom: '-4px'
                          }}
                          onClick={() => setActiveRequestTab('20250P000367')}
                        >
                          20250P000367
                        </button>
                      </div>
                    </div>
                    {/* Request Tab Content */}
                    {activeRequestTab === 'Request History' && (
                      <div className="request-history-content">
                        <div className="flex items-center mb-4">
                          <div className="bg-blue-100 p-3 rounded-full mr-3">
                            <i className="bi bi-clock-history text-blue-600 text-xl"></i>
                          </div>
                          <div>
                            <h5 className="mb-1 text-lg font-semibold">Authorization Request History</h5>
                            <p className="text-gray-600 mb-0">Complete history of all authorization requests for this member</p>
                          </div>
                        </div>
                        <div className="overflow-x-auto rounded-xl shadow-md">
                          <table className="w-full bg-white">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                              <tr>
                                <th className="border-b-2 border-gray-300 font-semibold text-xs text-gray-600 p-3 text-left">Request ID</th>
                                <th className="border-b-2 border-gray-300 font-semibold text-xs text-gray-600 p-3 text-left">Service</th>
                                <th className="border-b-2 border-gray-300 font-semibold text-xs text-gray-600 p-3 text-left">Provider</th>
                                <th className="border-b-2 border-gray-300 font-semibold text-xs text-gray-600 p-3 text-left">Request Date</th>
                                <th className="border-b-2 border-gray-300 font-semibold text-xs text-gray-600 p-3 text-left">Status</th>
                                <th className="border-b-2 border-gray-300 font-semibold text-xs text-gray-600 p-3 text-left">Priority</th>
                                <th className="border-b-2 border-gray-300 font-semibold text-xs text-gray-600 p-3 text-left">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {recentAuthorizations.map((auth) => (
                                <tr key={auth.id} className="hover:bg-gray-50">
                                  <td className="p-3 font-semibold text-blue-600 cursor-pointer"
                                    onClick={() => setActiveRequestTab('20250P000367')}>
                                    {auth.authNumber}
                                  </td>
                                  <td className="p-3">{auth.service}</td>
                                  <td className="p-3">{auth.provider}</td>
                                  <td className="p-3">{auth.requestDate}</td>                                    <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs text-white ${getStatusBadgeClass(auth.status)}`}>
                                      {auth.status}
                                    </span>
                                  </td>
                                  <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs text-white ${getPriorityBadgeClass(auth.priority)}`}>
                                      {auth.priority}
                                    </span>
                                  </td>
                                  <td className="p-3">
                                    <button
                                      className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors"
                                      onClick={() => setActiveRequestTab('20250P000367')}
                                    >
                                      View Details
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}                      {activeRequestTab === '20250P000367' && (
                      <div className="request-detail-content">                          {/* Authorization Workflow Progress */}
                        {activeRequestTab === '20250P000367' && (
                          <div className="authorization-workflow mb-6">
                            <div className="flex items-center mb-4">
                              <div className="flex" style={{ backgroundColor: '#FEFEFE', borderBottom: '1px solid #A8A8A8', width: '99%' }}>
                                {authTabs.map((authTab, index) => (
                                  <button
                                    key={authTab.id}
                                    className="transition-colors relative"
                                    style={{
                                      color: activeAuthTab === authTab.id ? '#FFF' : '#727272',
                                      textAlign: 'center',
                                      fontFamily: 'Inter',
                                      fontSize: '11px',
                                      fontStyle: 'normal',
                                      fontWeight: activeAuthTab === authTab.id ? '700' : '400',
                                      lineHeight: 'normal',
                                      flex: '1',
                                      borderRadius: activeAuthTab === authTab.id ? '10px 10px 0px 0px' : '0',
                                      border: activeAuthTab === authTab.id ? '1px solid #A2A2A2' : 'none',
                                      background: activeAuthTab === authTab.id ? '#9B9B9B' : 'transparent',
                                      padding: '12px 16px',
                                      marginBottom: '-1px'
                                    }}
                                    onClick={() => handleAuthTabClick(authTab.id)}
                                  >
                                    {authTab.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}                          {/* Authorization Request Summary */}                          {activeRequestTab === '20250P000367' && activeAuthTab === 'Request Submitted' && (
                          <div className="authorization-content" style={{ padding: '24px 0', width: '75%' }}>
                            {/* Header */}
                            <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#7D8181', marginBottom: '24px' }}>Authorization Request Summary</h2>{/* Content Area */}
                            <div>
                              {/* First Row - 4 data points + Status */}
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(150px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                                <div>
                                  <div style={{ fontSize: '11px', fontWeight: '500', color: '#787878', marginBottom: '4px' }}>Authorization #</div>
                                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#787878' }}>2025OP000367</div>
                                </div>
                                <div>
                                  <div style={{ fontSize: '11px', fontWeight: '500', color: '#787878', marginBottom: '4px' }}>Received Date</div>
                                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#787878' }}>04/28/2025 03:47:01 AM</div>
                                </div>
                                <div>
                                  <div style={{ fontSize: '11px', fontWeight: '500', color: '#787878', marginBottom: '4px' }}>Admission Date</div>
                                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#787878' }}>04/28/2025 02:58:09 AM</div>
                                </div>
                                <div>
                                  <div style={{ fontSize: '11px', fontWeight: '500', color: '#787878', marginBottom: '4px' }}>Request Type</div>
                                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#787878' }}>Standard</div>
                                </div>
                                <div>
                                  <div style={{ fontSize: '11px', fontWeight: '500', color: '#787878', marginBottom: '4px' }}>Status</div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <select
                                      className="border border-gray-300 rounded bg-white"
                                      style={{
                                        width: '115px',
                                        padding: '5px 10px',
                                        alignItems: 'center',
                                        color: '#787878',
                                        fontFamily: 'Inter',
                                        fontSize: '11px',
                                        fontStyle: 'normal',
                                        fontWeight: '700',
                                        lineHeight: 'normal'
                                      }}
                                    >
                                      <option>Pending</option>
                                      <option>Approved</option>
                                      <option>Denied</option>
                                    </select>
                                    <button
                                      className="bg-gray-500 rounded hover:bg-gray-600"
                                      style={{
                                        display: 'flex',
                                        width: '96px',
                                        height: '23px',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        flexShrink: '0',
                                        color: '#FFF',
                                        textAlign: 'center',
                                        fontFamily: 'Inter',
                                        fontSize: '10.235px',
                                        fontStyle: 'normal',
                                        fontWeight: '500',
                                        lineHeight: 'normal',
                                        border: 'none'
                                      }}
                                    >
                                      Check Guidelines
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Second Row - 4 data points + Updated */}
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(150px, 1fr))', gap: '20px' }}>
                                <div>
                                  <div style={{ fontSize: '11px', fontWeight: '500', color: '#787878', marginBottom: '4px' }}>Place of Service</div>
                                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#787878' }}>Inpatient Hospital</div>
                                </div>
                                <div>
                                  <div style={{ fontSize: '11px', fontWeight: '500', color: '#787878', marginBottom: '4px' }}>Diagnosis</div>
                                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#787878' }}>DKA</div>
                                </div>
                                <div>
                                  <div style={{ fontSize: '11px', fontWeight: '500', color: '#787878', marginBottom: '4px' }}>Code Type</div>
                                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#787878' }}>ICD 10</div>
                                </div>
                                <div>
                                  <div style={{ fontSize: '11px', fontWeight: '500', color: '#787878', marginBottom: '4px' }}>Code Number</div>
                                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#787878' }}>A41</div>
                                </div>
                                <div>
                                  <div style={{ fontSize: '11px', fontWeight: '500', color: '#787878', marginBottom: '4px' }}>Updated</div>
                                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#787878' }}>Initial Review</div>
                                </div>
                              </div>
                            </div>                              {/* Notes Section */}
                            <div className="mb-6" style={{ marginTop: '48px' }}>
                              <h3 style={{
                                color: '#7D8181',
                                fontFamily: 'Inter',
                                fontSize: '14px',
                                fontStyle: 'normal',
                                fontWeight: '500',
                                lineHeight: 'normal',
                                marginBottom: '12px'
                              }}>Notes</h3>
                              <div style={{ width: '659px' }}>                                  <p style={{
                                color: '#343E49',
                                fontFamily: 'Inter',
                                fontSize: '11px',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                lineHeight: 'normal',
                                marginBottom: '2px'
                              }}>
                                Additional pertinent patient information from the BCBS AI Assistant:
                              </p>
                                <p style={{
                                  color: '#343E49',
                                  fontFamily: 'Inter',
                                  fontSize: '11px',
                                  fontStyle: 'normal',
                                  fontWeight: '400',
                                  lineHeight: 'normal',
                                  marginBottom: '4px'
                                }}>Other current patient diagnoses:</p>
                                <ul style={{
                                  color: '#343E49',
                                  fontFamily: 'Inter',
                                  fontSize: '11px',
                                  fontStyle: 'normal',
                                  fontWeight: '400',
                                  lineHeight: 'normal',
                                  marginLeft: '16px'
                                }}>
                                  <li>• CHF (ICD10: I50.9): 4/28/2025</li>
                                  <li>• DKA (DKA: E11.10): 4/28/2025</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}                          {/* Attachments Section - Outside Container */}
                        {activeRequestTab === '20250P000367' && activeAuthTab === 'Request Submitted' && (
                          <div>
                            <h3 style={{
                              color: '#7D8181',
                              fontFamily: 'Inter',
                              fontSize: '14px',
                              fontStyle: 'normal',
                              fontWeight: '500',
                              lineHeight: 'normal',
                              marginBottom: '20px'
                            }}>
                              Attachments
                            </h3>                              <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(4, 1fr)',
                              gap: '10px'
                            }}>
                              {attachments.map((attachment) => (
                                <AttachmentItem key={attachment.id} attachment={attachment} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Other Auth Tab Contents */}
                        {activeRequestTab === '20250P000367' && activeAuthTab !== 'Request Submitted' && (
                          <div className="authorization-content">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">{activeAuthTab}</h2>
                            <div className="bg-gray-50 border border-gray-200 rounded p-6 text-center">
                              <div className="text-gray-500 mb-2">
                                <i className="bi bi-construction text-4xl"></i>
                              </div>
                              <p className="text-gray-600">Content for {activeAuthTab} is under development</p>
                            </div>
                          </div>
                        )}

                        {/* Request History Content */}
                        {activeRequestTab === 'Request History' && (
                          <div className="request-history-content">
                            <div className="flex items-center mb-4">
                              <div className="bg-blue-100 p-3 rounded-full mr-3">
                                <i className="bi bi-clock-history text-blue-600 text-xl"></i>
                              </div>
                              <div>
                                <h5 className="mb-1 text-lg font-semibold">Authorization Request History</h5>
                                <p className="text-gray-600 mb-0">Complete history of all authorization requests for this member</p>
                              </div>
                            </div>
                            <div className="overflow-x-auto rounded-xl shadow-md">
                              <table className="w-full bg-white">
                                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                  <tr>
                                    <th className="border-b-2 border-gray-300 font-semibold text-xs text-gray-600 p-3 text-left">Request ID</th>
                                    <th className="border-b-2 border-gray-300 font-semibold text-xs text-gray-600 p-3 text-left">Service</th>
                                    <th className="border-b-2 border-gray-300 font-semibold text-xs text-gray-600 p-3 text-left">Provider</th>
                                    <th className="border-b-2 border-gray-300 font-semibold text-xs text-gray-600 p-3 text-left">Request Date</th>
                                    <th className="border-b-2 border-gray-300 font-semibold text-xs text-gray-600 p-3 text-left">Status</th>
                                    <th className="border-b-2 border-gray-300 font-semibold text-xs text-gray-600 p-3 text-left">Priority</th>
                                    <th className="border-b-2 border-gray-300 font-semibold text-xs text-gray-600 p-3 text-left">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {recentAuthorizations.map((auth) => (
                                    <tr key={auth.id} className="hover:bg-gray-50">
                                      <td className="p-3 font-semibold text-blue-600 cursor-pointer"
                                        onClick={() => setActiveRequestTab('20250P000367')}>
                                        {auth.authNumber}
                                      </td>
                                      <td className="p-3">{auth.service}</td>
                                      <td className="p-3">{auth.provider}</td>
                                      <td className="p-3">{auth.requestDate}</td>
                                      <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-xs text-white ${getStatusBadgeClass(auth.status)}`}>
                                          {auth.status}
                                        </span>
                                      </td>
                                      <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-xs text-white ${getPriorityBadgeClass(auth.priority)}`}>
                                          {auth.priority}
                                        </span>
                                      </td>
                                      <td className="p-3">
                                        <button
                                          className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors"
                                          onClick={() => setActiveRequestTab('20250P000367')}
                                        >
                                          View Details
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs content - placeholder */}
            {activeTab !== 'Overview' && activeTab !== 'Authorizations' && (
              <div className="w-full">
                <div className="w-full">
                  <div className="bg-white border-0 shadow-sm rounded-lg">
                    <div className="p-6 text-center py-12">
                      <i className="bi bi-construction text-gray-600 text-5xl"></i>
                      <h5 className="text-gray-600 mt-3 text-lg font-semibold">{activeTab} Content</h5>
                      <p className="text-gray-600">This section is under development</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Member;
