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
import leftArrowTriangleIcon from '../assets/authorizations/clinical_review/left-arrow-triangle.svg';
import caratLeftIcon from '../assets/authorizations/clinical_review/carat-left.svg';
import caratRightIcon from '../assets/authorizations/clinical_review/carat-right.svg';
import navNewTabIcon from '../assets/authorizations/clinical_review/nav-new-tab-icon.png';
import letterNIcon from '../assets/authorizations/clinical_review/letter-n-icon.png';
import plusIcon from '../assets/authorizations/clinical_review/plus-icon.png';

// Custom checkbox styles
const checkboxStyles = `
  .custom-checkbox {
    accent-color: #3276f6;
    width: 16px;
    height: 16px;
    position: relative;
  }
  
  /* Overlay a thinner tick mark */
  .custom-checkbox:checked::after {
    content: '✓';
    position: absolute;
    top: 0px;
    left: 2px;
    color: white;
    font-size: 9px;
    font-weight: 100;
    line-height: 14px;
    font-family: 'Arial', sans-serif;
    pointer-events: none;
    text-shadow: 0 0 1px rgba(0,0,0,0.3);
  }
`;

const Member = ({ user, memberData: propMemberData, onLogout, onBack, onNavigate }) => {
  const topRef = useRef(null); const authContentRef = useRef(null); const [activeTab, setActiveTab] = useState('Authorizations');
  const [activeAuthTab, setActiveAuthTab] = useState('Request Submitted');
  const [activeRequestTab, setActiveRequestTab] = useState('20250P000367'); const [clinicalReviewStep, setClinicalReviewStep] = useState(1);
  const [showClinicalIndicators, setShowClinicalIndicators] = useState([false, false, false]); const [selectedCriteria, setSelectedCriteria] = useState({
    dka: false,
    physInstability: false,
    hemodynamicInstability: false,
    severeDehydration: false,
    severeDKA: false,
    severeHypoglycemia: false,
    complicatingFactors: false,
    inadequateSupport: false,
    pediatricConsiderations: false
  });
  const [selectedGuidelineRows, setSelectedGuidelineRows] = useState(new Set());

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
  ];  // Handle auth tab click - simplified without animations
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

  // Handle clinical review step navigation
  const handleClinicalReviewNext = () => {
    if (clinicalReviewStep < 4) {
      setClinicalReviewStep(clinicalReviewStep + 1);

      // Reset indicators for step 2 animation
      if (clinicalReviewStep === 1) {
        setShowClinicalIndicators([false, false, false]);
        // Animate indicators one by one
        setTimeout(() => setShowClinicalIndicators([true, false, false]), 300);
        setTimeout(() => setShowClinicalIndicators([true, true, false]), 800);
        setTimeout(() => setShowClinicalIndicators([true, true, true]), 1300);
      }
    }
  };

  const handleClinicalReviewPrev = () => {
    if (clinicalReviewStep > 1) {
      setClinicalReviewStep(clinicalReviewStep - 1);
    }
  }; return (
    <div className="min-h-screen">
      <style>{checkboxStyles}</style>
      <div ref={topRef} id="top"></div><Header user={user} onLogout={onLogout} onNavigate={onNavigate} activeTab="Members" />      {/* Main Content */}
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
                <div className="flex items-center gap-2">                  <button
                  className="flex items-center justify-center"
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #D0D5DD',
                    borderRadius: '6px',
                    padding: '0',
                    cursor: 'pointer',
                    filter: 'grayscale(100%)'
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
                  </button>                  <button
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
                  </button>                  <button
                    className="flex items-center justify-center"
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #D0D5DD',
                      borderRadius: '3.523px',
                      padding: '0',
                      cursor: 'pointer',
                      background: `url(${medicalIcon}) lightgray 50% / cover no-repeat`,
                      filter: 'grayscale(100%)'
                    }}
                  >
                  </button></div>
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
                        )}                        {/* Clinical Review Content */}
                        {activeRequestTab === '20250P000367' && activeAuthTab === 'Clinical Review' && (
                          <div className="clinical-review-content" >                            {/* Medical Necessity Guidelines Section */}
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column'
                            }}>                              <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px'
                            }}>
                                <img src={leftArrowTriangleIcon} alt="Left Arrow Triangle Icon" style={{ width: 'auto', height: '73.982px' }} />
                                <div style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '4px'
                                }}>
                                  <span style={{
                                    color: '#000',
                                    fontFamily: 'Teachers',
                                    fontSize: '18px',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: 'normal',
                                    margin: 0
                                  }}>
                                    Medical
                                  </span>
                                  <span style={{
                                    color: '#000',
                                    fontFamily: 'Teachers',
                                    fontSize: '18px',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: 'normal',
                                    margin: 0
                                  }}>
                                    Necessity
                                  </span>
                                  <span style={{
                                    color: '#000',
                                    fontFamily: 'Teachers',
                                    fontSize: '18px',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: 'normal',
                                    margin: 0
                                  }}>
                                    Guidelines
                                  </span>                                </div>
                              </div>
                              <div style={{ height: '2px', background: '#CACACA', width: '100%', marginTop: '15px' }} />
                            </div>                            {/* Step 1: Guidelines Search and Selection */}
                            {clinicalReviewStep === 1 && (
                              <div style={{ marginTop: '20px' }}>
                                {/* Separator - adding vertical spacing */}
                                <div style={{ marginBottom: '24px', borderTop: '1px solid #E5E7EB' }}></div>

                                {/* Main Title */}
                                <h1 style={{
                                  color: '#212029',
                                  fontFamily: 'Inter',
                                  fontSize: '22.2px',
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  lineHeight: 'normal',
                                  marginBottom: '16px'
                                }}>
                                  Guidelines Search and Selection
                                </h1>

                                {/* Guideline Selection Checkboxes */}
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  marginBottom: '16px'
                                }}>
                                  <span style={{
                                    color: '#9C9D9C',
                                    fontFamily: 'Inter',
                                    fontSize: '14.069px',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal'
                                  }}>
                                    1st Edition
                                  </span>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <input
                                      type="checkbox" className="custom-checkbox"
                                      style={{
                                        width: '13.164px',
                                        height: '12.341px',
                                        border: '1px solid lightgray',
                                        borderRadius: '50%'
                                      }}
                                    />
                                    <span style={{
                                      color: '#646389',
                                      fontFamily: 'Inter',
                                      fontSize: '14.809px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal'
                                    }}>
                                      ACO
                                    </span>
                                  </label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <input
                                      type="checkbox" className="custom-checkbox"
                                      style={{
                                        width: '13.164px',
                                        height: '12.341px',
                                        border: '1px solid lightgray',
                                        borderRadius: '50%'
                                      }}
                                    />
                                    <span style={{
                                      color: '#646389',
                                      fontFamily: 'Inter',
                                      fontSize: '14.809px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal'
                                    }}>
                                      ISC
                                    </span>
                                  </label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <input
                                      type="checkbox" className="custom-checkbox"
                                      style={{
                                        width: '13.164px',
                                        height: '12.341px',
                                        border: '1px solid lightgray',
                                        borderRadius: '50%'
                                      }}
                                    />
                                    <span style={{
                                      color: '#646389',
                                      fontFamily: 'Inter',
                                      fontSize: '14.809px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal'
                                    }}>
                                      GRC
                                    </span>
                                  </label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <input
                                      type="checkbox" className="custom-checkbox"
                                      style={{
                                        width: '13.164px',
                                        height: '12.341px',
                                        border: '1px solid lightgray',
                                        borderRadius: '50%'
                                      }}
                                    />
                                    <span style={{
                                      color: '#646389',
                                      fontFamily: 'Inter',
                                      fontSize: '14.809px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal'
                                    }}>
                                      MCM
                                    </span>
                                  </label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <input
                                      type="checkbox" className="custom-checkbox"
                                      style={{
                                        width: '13.164px',
                                        height: '12.341px',
                                        border: '1px solid lightgray',
                                        borderRadius: '50%'
                                      }}
                                    />
                                    <span style={{
                                      color: '#646389',
                                      fontFamily: 'Inter',
                                      fontSize: '14.809px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal'
                                    }}>
                                      RFC
                                    </span>
                                  </label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <input
                                      type="checkbox" className="custom-checkbox"
                                      style={{
                                        width: '13.164px',
                                        height: '12.341px',
                                        border: '1px solid lightgray',
                                        borderRadius: '50%'
                                      }}
                                    />
                                    <span style={{
                                      color: '#646389',
                                      fontFamily: 'Inter',
                                      fontSize: '14.809px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal'
                                    }}>
                                      HHC
                                    </span>
                                  </label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <input
                                      type="checkbox" className="custom-checkbox"
                                      style={{
                                        width: '13.164px',
                                        height: '12.341px',
                                        border: '1px solid lightgray',
                                        borderRadius: '50%'
                                      }}
                                    />
                                    <span style={{
                                      color: '#646389',
                                      fontFamily: 'Inter',
                                      fontSize: '14.809px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal'
                                    }}>
                                      CCG
                                    </span>
                                  </label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <input
                                      type="checkbox" className="custom-checkbox"
                                      style={{
                                        width: '13.164px',
                                        height: '12.341px',
                                        border: '1px solid lightgray',
                                        borderRadius: '50%'
                                      }}
                                    />
                                    <span style={{
                                      color: '#646389',
                                      fontFamily: 'Inter',
                                      fontSize: '14.809px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal'
                                    }}>
                                      TC
                                    </span>
                                  </label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <input
                                      type="checkbox" className="custom-checkbox"
                                      style={{
                                        width: '13.164px',
                                        height: '12.341px',
                                        border: '1px solid lightgray',
                                        borderRadius: '50%'
                                      }}
                                    />
                                    <span style={{
                                      color: '#646389',
                                      fontFamily: 'Inter',
                                      fontSize: '14.809px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal'
                                    }}>
                                      DBHC
                                    </span>
                                  </label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <input
                                      type="checkbox" className="custom-checkbox"
                                      style={{
                                        width: '13.164px',
                                        height: '12.341px',
                                        border: '1px solid lightgray',
                                        borderRadius: '50%'
                                      }}
                                    />
                                    <span style={{
                                      color: '#646389',
                                      fontFamily: 'Inter',
                                      fontSize: '14.809px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal'
                                    }}>
                                      PIP
                                    </span>
                                  </label>
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <input
                                      type="checkbox" className="custom-checkbox"
                                      style={{
                                        width: '13.164px',
                                        height: '12.341px',
                                        border: '1px solid lightgray',
                                        borderRadius: '50%'
                                      }}
                                    />
                                    <span style={{
                                      color: '#646389',
                                      fontFamily: 'Inter',
                                      fontSize: '14.809px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal'
                                    }}>
                                      MCR
                                    </span>
                                  </label>
                                </div>                                {/* Quick Search */}
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '12px',
                                  marginBottom: '20px'
                                }}>
                                  <span style={{
                                    color: '#33333A',
                                    fontFamily: 'Inter',
                                    fontSize: '13.081px',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: 'normal'
                                  }}>
                                    Quick Search
                                  </span>                                  <input
                                    type="text"
                                    defaultValue="DKA"
                                    style={{
                                      width: '344px',
                                      height: '22px',
                                      border: '1px solid lightgray',
                                      background: '#FFFEFF',
                                      padding: '6px',
                                      color: '#444753',
                                      fontFamily: 'Inter',
                                      fontSize: '13.328px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal'
                                    }}
                                  />
                                  <button
                                    style={{
                                      width: '59.236px',
                                      height: '20px',
                                      borderRadius: '0.823px 0.617px 0px 0.617px',
                                      border: '0.823px solid #696669',
                                      background: '#EFEFED',
                                      color: '#4C4C51',
                                      fontFamily: 'Inter',
                                      fontSize: '12.176px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    Search
                                  </button>
                                </div>                                {/* Results Summary */}
                                <div style={{
                                  color: '#474952',
                                  fontFamily: 'Inter',
                                  fontSize: '12.752px',
                                  fontStyle: 'normal',
                                  fontWeight: 400,
                                  lineHeight: 'normal',
                                  marginBottom: '16px'
                                }}>
                                  6 results for DKA
                                  <span style={{
                                    float: 'right',
                                    color: '#3F4045',
                                    fontFamily: 'Inter',
                                    fontSize: '9.873px',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal'
                                  }}>(Results 1 - 6 of 6)</span>
                                </div>                                {/* Guidelines Table */}
                                <div style={{
                                  marginBottom: '24px'
                                }}>
                                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                      <tr>
                                        <th style={{
                                          padding: '4px 8px',
                                          textAlign: 'left',
                                          color: '#000',
                                          fontFamily: 'Inter',
                                          fontSize: '13.164px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: 'normal',
                                          textDecoration: 'underline',
                                          textDecorationStyle: 'solid',
                                          textDecorationSkipInk: 'auto',
                                          textDecorationThickness: 'auto',
                                          textUnderlineOffset: 'auto',
                                          textUnderlinePosition: 'from-font'
                                        }}>
                                          Guideline Code
                                        </th>
                                        <th style={{
                                          padding: '4px 8px',
                                          textAlign: 'left',
                                          color: '#000',
                                          fontFamily: 'Inter',
                                          fontSize: '13.164px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: 'normal',
                                          textDecoration: 'underline',
                                          textDecorationStyle: 'solid',
                                          textDecorationSkipInk: 'auto',
                                          textDecorationThickness: 'auto',
                                          textUnderlineOffset: 'auto',
                                          textUnderlinePosition: 'from-font'
                                        }}>
                                          Product
                                        </th>
                                        <th style={{
                                          padding: '4px 8px',
                                          textAlign: 'left',
                                          color: '#000',
                                          fontFamily: 'Inter',
                                          fontSize: '13.164px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: 'normal',
                                          textDecoration: 'underline',
                                          textDecorationStyle: 'solid',
                                          textDecorationSkipInk: 'auto',
                                          textDecorationThickness: 'auto',
                                          textUnderlineOffset: 'auto',
                                          textUnderlinePosition: 'from-font'
                                        }}>
                                          Type
                                        </th>
                                        <th style={{
                                          padding: '4px 8px',
                                          textAlign: 'left',
                                          color: '#000',
                                          fontFamily: 'Inter',
                                          fontSize: '13.164px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: 'normal',
                                          textDecoration: 'underline',
                                          textDecorationStyle: 'solid',
                                          textDecorationSkipInk: 'auto',
                                          textDecorationThickness: 'auto',
                                          textUnderlineOffset: 'auto',
                                          textUnderlinePosition: 'from-font'
                                        }}>
                                          Title
                                        </th>
                                        <th style={{
                                          padding: '4px 8px',
                                          textAlign: 'left',
                                          color: '#000',
                                          fontFamily: 'Inter',
                                          fontSize: '13.164px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: 'normal',
                                          textDecoration: 'underline',
                                          textDecorationStyle: 'solid',
                                          textDecorationSkipInk: 'auto',
                                          textDecorationThickness: 'auto',
                                          textUnderlineOffset: 'auto',
                                          textUnderlinePosition: 'from-font'
                                        }}>
                                          GLOS/MBLOS
                                        </th>
                                        <th style={{
                                          padding: '4px 8px',
                                          textAlign: 'left',
                                          color: '#000',
                                          fontFamily: 'Inter',
                                          fontSize: '13.164px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: 'normal',
                                          textDecoration: 'underline',
                                          textDecorationStyle: 'solid',
                                          textDecorationSkipInk: 'auto',
                                          textDecorationThickness: 'auto',
                                          textUnderlineOffset: 'auto',
                                          textUnderlinePosition: 'from-font'
                                        }}>
                                          Codes
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>                                      <tr>                                      <td style={{
                                      padding: '4px 8px',
                                      color: '#6B5722',
                                      fontFamily: 'Inter',
                                      fontSize: '13.904px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal',
                                      cursor: 'pointer',
                                      borderRadius: '0.617px 2.468px 0px 0px',
                                      backgroundColor: selectedGuidelineRows.has('M-130') ? '#e4de77' : 'transparent'
                                    }}
                                      onClick={() => {
                                        const newSelected = new Set(selectedGuidelineRows);
                                        if (newSelected.has('M-130')) {
                                          newSelected.delete('M-130');
                                        } else {
                                          newSelected.add('M-130');
                                        }
                                        setSelectedGuidelineRows(newSelected);
                                      }}
                                      onMouseEnter={(e) => {
                                        if (!selectedGuidelineRows.has('M-130')) {
                                          e.target.style.backgroundColor = '#e4de77';
                                        }
                                      }}
                                      onMouseLeave={(e) => {
                                        if (!selectedGuidelineRows.has('M-130')) {
                                          e.target.style.backgroundColor = 'transparent';
                                        }
                                      }}
                                    >
                                      M-130
                                    </td>
                                      <td style={{
                                        padding: '4px 8px',
                                        color: '#424149',
                                        fontFamily: 'Inter',
                                        fontSize: '12.176px',
                                        fontStyle: 'normal',
                                        fontWeight: 300,
                                        lineHeight: 'normal'
                                      }}>ISC</td>
                                      <td style={{
                                        padding: '4px 8px',
                                        color: '#424149',
                                        fontFamily: 'Inter',
                                        fontSize: '12.176px',
                                        fontStyle: 'normal',
                                        fontWeight: 300,
                                        lineHeight: 'normal'
                                      }}>ORG</td>
                                      <td style={{
                                        padding: '4px 8px',
                                        color: '#484C56',
                                        fontFamily: 'Inter',
                                        fontSize: '13.74px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal'
                                      }}>Diabetes</td>
                                      <td style={{
                                        padding: '4px 8px',
                                        color: '#B2B4BB',
                                        fontFamily: 'Inter',
                                        fontSize: '14.974px',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        lineHeight: 'normal'
                                      }}>(DS)</td>
                                      <td style={{
                                        padding: '4px 8px',
                                        color: '#4E4DA2',
                                        fontFamily: 'Inter',
                                        fontSize: '13.575px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal'
                                      }}>
                                        View Codes
                                      </td>
                                    </tr>                                      <tr>                                        <td style={{
                                      padding: '4px 8px',
                                      color: '#4444A2',
                                      fontFamily: 'Inter',
                                      fontSize: '13.904px',
                                      fontStyle: 'normal',
                                      fontWeight: 400,
                                      lineHeight: 'normal',
                                      cursor: 'pointer',
                                      borderRadius: '0.617px 2.468px 0px 0px',
                                      backgroundColor: selectedGuidelineRows.has('P-140') ? '#e4de77' : 'transparent'
                                    }}
                                      onClick={() => {
                                        const newSelected = new Set(selectedGuidelineRows);
                                        if (newSelected.has('P-140')) {
                                          newSelected.delete('P-140');
                                        } else {
                                          newSelected.add('P-140');
                                        }
                                        setSelectedGuidelineRows(newSelected);
                                      }}
                                      onMouseEnter={(e) => {
                                        if (!selectedGuidelineRows.has('P-140')) {
                                          e.target.style.backgroundColor = '#e4de77';
                                        }
                                      }}
                                      onMouseLeave={(e) => {
                                        if (!selectedGuidelineRows.has('P-140')) {
                                          e.target.style.backgroundColor = 'transparent';
                                        }
                                      }}
                                    >
                                      P-140
                                    </td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#424149',
                                          fontFamily: 'Inter',
                                          fontSize: '12.176px',
                                          fontStyle: 'normal',
                                          fontWeight: 300,
                                          lineHeight: 'normal'
                                        }}>ISC</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#424149',
                                          fontFamily: 'Inter',
                                          fontSize: '12.176px',
                                          fontStyle: 'normal',
                                          fontWeight: 300,
                                          lineHeight: 'normal'
                                        }}>ORG-P</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#484C56',
                                          fontFamily: 'Inter',
                                          fontSize: '13.74px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: 'normal'
                                        }}>Diabetes, Pediatric</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#B2B4BB',
                                          fontFamily: 'Inter',
                                          fontSize: '14.974px',
                                          fontStyle: 'normal',
                                          fontWeight: 600,
                                          lineHeight: 'normal'
                                        }}>(DS)</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#4E4DA2',
                                          fontFamily: 'Inter',
                                          fontSize: '13.575px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: 'normal'
                                        }}>
                                          View Codes
                                        </td>
                                      </tr>
                                      <tr>                                      <td style={{
                                        padding: '4px 8px',
                                        color: '#675786',
                                        fontFamily: 'Inter',
                                        fontSize: '13.904px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        cursor: 'pointer',
                                        borderRadius: '0.617px 2.468px 0px 0px',
                                        backgroundColor: selectedGuidelineRows.has('M-130-RRG') ? '#e4de77' : 'transparent'
                                      }}
                                        onClick={() => {
                                          const newSelected = new Set(selectedGuidelineRows);
                                          if (newSelected.has('M-130-RRG')) {
                                            newSelected.delete('M-130-RRG');
                                          } else {
                                            newSelected.add('M-130-RRG');
                                          }
                                          setSelectedGuidelineRows(newSelected);
                                        }}
                                        onMouseEnter={(e) => {
                                          if (!selectedGuidelineRows.has('M-130-RRG')) {
                                            e.target.style.backgroundColor = '#e4de77';
                                          }
                                        }}
                                        onMouseLeave={(e) => {
                                          if (!selectedGuidelineRows.has('M-130-RRG')) {
                                            e.target.style.backgroundColor = 'transparent';
                                          }
                                        }}
                                      >
                                        M-130-RRG
                                      </td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#424149',
                                          fontFamily: 'Inter',
                                          fontSize: '12.176px',
                                          fontStyle: 'normal',
                                          fontWeight: 300,
                                          lineHeight: 'normal'
                                        }}>ISC</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#424149',
                                          fontFamily: 'Inter',
                                          fontSize: '12.176px',
                                          fontStyle: 'normal',
                                          fontWeight: 300,
                                          lineHeight: 'normal'
                                        }}>RRG</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#484C56',
                                          fontFamily: 'Inter',
                                          fontSize: '13.74px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: 'normal'
                                        }}>Diabetes RRG</td>                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#B2B4BB',
                                          fontFamily: 'Inter',
                                          fontSize: '14.974px',
                                          fontStyle: 'normal',
                                          fontWeight: 600,
                                          lineHeight: 'normal'
                                        }}>2(DS)</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#4E4DA2',
                                          fontFamily: 'Inter',
                                          fontSize: '13.575px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: 'normal'
                                        }}>
                                          View Codes
                                        </td>
                                      </tr>
                                      <tr>                                        <td style={{
                                        padding: '4px 8px',
                                        color: '#4444A2',
                                        fontFamily: 'Inter',
                                        fontSize: '13.904px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        cursor: 'pointer',
                                        borderRadius: '0.617px 2.468px 0px 0px',
                                        backgroundColor: selectedGuidelineRows.has('P-140-RRG') ? '#e4de77' : 'transparent'
                                      }}
                                        onClick={() => {
                                          const newSelected = new Set(selectedGuidelineRows);
                                          if (newSelected.has('P-140-RRG')) {
                                            newSelected.delete('P-140-RRG');
                                          } else {
                                            newSelected.add('P-140-RRG');
                                          }
                                          setSelectedGuidelineRows(newSelected);
                                        }}
                                        onMouseEnter={(e) => {
                                          if (!selectedGuidelineRows.has('P-140-RRG')) {
                                            e.target.style.backgroundColor = '#e4de77';
                                          }
                                        }}
                                        onMouseLeave={(e) => {
                                          if (!selectedGuidelineRows.has('P-140-RRG')) {
                                            e.target.style.backgroundColor = 'transparent';
                                          }
                                        }}
                                      >
                                        P-140-RRG
                                      </td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#424149',
                                          fontFamily: 'Inter',
                                          fontSize: '12.176px',
                                          fontStyle: 'normal',
                                          fontWeight: 300,
                                          lineHeight: 'normal'
                                        }}>ISC</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#424149',
                                          fontFamily: 'Inter',
                                          fontSize: '12.176px',
                                          fontStyle: 'normal',
                                          fontWeight: 300,
                                          lineHeight: 'normal'
                                        }}>RRG-P</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#484C56',
                                          fontFamily: 'Inter',
                                          fontSize: '13.74px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: 'normal'
                                        }}>Diabetes, Pediatric RRG</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#C7C9C8',
                                          fontFamily: 'Inter',
                                          fontSize: '15.879px',
                                          fontStyle: 'normal',
                                          fontWeight: 600,
                                          lineHeight: 'normal'
                                        }}>(DS)</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#4E4DA2',
                                          fontFamily: 'Inter',
                                          fontSize: '13.575px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: 'normal'
                                        }}>
                                          View Codes
                                        </td>
                                      </tr>
                                      <tr>                                        <td style={{
                                        padding: '4px 8px',
                                        color: '#4444A2',
                                        fontFamily: 'Inter',
                                        fontSize: '13.904px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        cursor: 'pointer',
                                        borderRadius: '0.617px 2.468px 0px 0px',
                                        backgroundColor: selectedGuidelineRows.has('OC-014') ? '#e4de77' : 'transparent'
                                      }}
                                        onClick={() => {
                                          const newSelected = new Set(selectedGuidelineRows);
                                          if (newSelected.has('OC-014')) {
                                            newSelected.delete('OC-014');
                                          } else {
                                            newSelected.add('OC-014');
                                          }
                                          setSelectedGuidelineRows(newSelected);
                                        }}
                                        onMouseEnter={(e) => {
                                          if (!selectedGuidelineRows.has('OC-014')) {
                                            e.target.style.backgroundColor = '#e4de77';
                                          }
                                        }}
                                        onMouseLeave={(e) => {
                                          if (!selectedGuidelineRows.has('OC-014')) {
                                            e.target.style.backgroundColor = 'transparent';
                                          }
                                        }}
                                      >
                                        OC-014
                                      </td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#424149',
                                          fontFamily: 'Inter',
                                          fontSize: '12.176px',
                                          fontStyle: 'normal',
                                          fontWeight: 300,
                                          lineHeight: 'normal'
                                        }}>ISC</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#424149',
                                          fontFamily: 'Inter',
                                          fontSize: '12.176px',
                                          fontStyle: 'normal',
                                          fontWeight: 300,
                                          lineHeight: 'normal'
                                        }}>OCG</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#484C56',
                                          fontFamily: 'Inter',
                                          fontSize: '13.74px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: 'normal'
                                        }}>Diabetes: Observation Care</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#C7C9C8',
                                          fontFamily: 'Inter',
                                          fontSize: '15.879px',
                                          fontStyle: 'normal',
                                          fontWeight: 600,
                                          lineHeight: 'normal'
                                        }}></td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#4E4DA2',
                                          fontFamily: 'Inter',
                                          fontSize: '13.575px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: 'normal'
                                        }}>
                                          View Codes
                                        </td>
                                      </tr>
                                      <tr>                                        <td style={{
                                        padding: '4px 8px',
                                        color: '#4444A2',
                                        fontFamily: 'Inter',
                                        fontSize: '13.904px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal', cursor: 'pointer',
                                        borderRadius: '0.617px 2.468px 0px 0px',
                                        backgroundColor: selectedGuidelineRows.has('CCC-015') ? '#e4de77' : 'transparent'
                                      }}
                                        onClick={() => {
                                          const newSelected = new Set(selectedGuidelineRows);
                                          if (newSelected.has('CCC-015')) {
                                            newSelected.delete('CCC-015');
                                          } else {
                                            newSelected.add('CCC-015');
                                          }
                                          setSelectedGuidelineRows(newSelected);
                                        }}
                                        onMouseEnter={(e) => {
                                          if (!selectedGuidelineRows.has('CCC-015')) {
                                            e.target.style.backgroundColor = '#e4de77';
                                          }
                                        }}
                                        onMouseLeave={(e) => {
                                          if (!selectedGuidelineRows.has('CCC-015')) {
                                            e.target.style.backgroundColor = 'transparent';
                                          }
                                        }}
                                      >
                                        CCC-015
                                      </td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#424149',
                                          fontFamily: 'Inter',
                                          fontSize: '12.176px',
                                          fontStyle: 'normal',
                                          fontWeight: 300,
                                          lineHeight: 'normal'
                                        }}>ISC</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#424149',
                                          fontFamily: 'Inter',
                                          fontSize: '12.176px',
                                          fontStyle: 'normal',
                                          fontWeight: 300,
                                          lineHeight: 'normal'
                                        }}>CCC</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#484C56',
                                          fontFamily: 'Inter',
                                          fontSize: '13.74px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: 'normal'
                                        }}>Hyperglycemia and Diabetes Control: Common Complications and Conditions</td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#C7C9C8',
                                          fontFamily: 'Inter',
                                          fontSize: '15.879px',
                                          fontStyle: 'normal',
                                          fontWeight: 600,
                                          lineHeight: 'normal'
                                        }}></td>
                                        <td style={{
                                          padding: '4px 8px',
                                          color: '#4E4DA2',
                                          fontFamily: 'Inter',
                                          fontSize: '13.575px',
                                          fontStyle: 'normal',
                                          fontWeight: 400,
                                          lineHeight: 'normal'
                                        }}>
                                          View Codes
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}                            {/* Step 2: Clinical Indications for Admission to Inpatient Care */}
                            {clinicalReviewStep === 2 && (
                              <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                                {/* Separator - adding vertical spacing */}
                                <div style={{ marginBottom: '24px', borderTop: '1px solid #E5E7EB' }}></div>                                {/* Main Title */}
                                <h1 style={{
                                  color: '#212029',
                                  fontFamily: 'Inter',
                                  fontSize: '22.2px',
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  lineHeight: 'normal',
                                  marginBottom: '8px'
                                }}>
                                  Clinical Indications for Admission to Inpatient Care
                                </h1>                                {/* Subtitle Link */}                                <div style={{
                                  color: '#7C79A1',
                                  fontFamily: 'Inter',
                                  fontSize: '12.6px',
                                  fontStyle: 'normal',
                                  fontWeight: '400',
                                  lineHeight: 'normal',
                                  marginBottom: '16px',
                                  cursor: 'pointer',
                                  paddingLeft: '5px'
                                }}>
                                  Return to top of Diabetes - ISC
                                </div>                                {/* Note Section */}
                                <div style={{
                                  marginBottom: '15px',
                                  lineHeight: '1.5',
                                  paddingLeft: '7px'
                                }}>
                                  <span style={{
                                    color: '#3E3A40',
                                    fontFamily: 'Inter',
                                    fontSize: '14.9px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                  }}>Note: Some patients may be appropriate for </span>
                                  <span style={{
                                    color: '#605F9B', fontFamily: 'Inter',
                                    fontSize: '14.5px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                    cursor: 'pointer'
                                  }}>Observation care.</span>
                                  <span style={{
                                    color: '#3E3A40',
                                    fontFamily: 'Inter',
                                    fontSize: '14.3px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                  }}> For consideration of observation care, see </span>                                    <span style={{
                                    color: '#7976A7',
                                    fontFamily: 'Inter',
                                    fontSize: '14.5px',
                                    fontStyle: 'normal', fontWeight: '400',
                                    lineHeight: 'normal',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap'
                                  }}>
                                    Diabetes: Observation Care                                    <span style={{
                                      marginLeft: '10px',
                                      width: '14px',
                                      height: '14px',
                                      background: `url(${navNewTabIcon}) no-repeat center`,
                                      backgroundSize: 'contain',
                                      display: 'inline-block',
                                      verticalAlign: 'middle'
                                    }}></span>
                                    <span style={{
                                      color: '#4E536B',
                                      fontFamily: 'Inter',
                                      fontSize: '12.9px',
                                      fontStyle: 'normal',
                                      fontWeight: '400',
                                      lineHeight: 'normal',
                                      marginLeft: '4px'
                                    }}>ISC.</span>                                  </span></div>                              </div>
                            )}

                            {/* Expand/Collapse Controls - outside padded container */}
                            {clinicalReviewStep === 2 && (
                              <div>
                                {/* Expand/Collapse Controls */}
                                <div style={{
                                  color: '#474248',
                                  fontFamily: 'Inter',
                                  fontSize: '13.1px',
                                  fontStyle: 'normal',
                                  fontWeight: '400', lineHeight: 'normal',
                                  marginBottom: '8px'
                                }}>
                                  [Expand All / Collapse All]
                                </div>

                                {/* Admission Criteria */}
                                <div style={{
                                  fontSize: '14px',
                                  marginBottom: '16px',
                                  paddingLeft: '15px'
                                }}>
                                  <span style={{ marginRight: '8px' }}>●</span>
                                  <span style={{
                                    color: '#5D5356',
                                    fontFamily: 'Inter',
                                    fontSize: '13.2px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                  }}>Admission is indicated for </span>                                  <span style={{
                                    color: '#5C565E',
                                    fontFamily: 'Inter',
                                    fontSize: '13.1px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                  }}>1 or more of the following(1)(2)(3): </span>                                  <span style={{
                                    width: '13px',
                                    height: '14px',
                                    background: `url(${letterNIcon}) no-repeat center`,
                                    backgroundSize: 'contain',
                                    display: 'inline-block',
                                    marginLeft: '10px'
                                  }}></span>
                                </div>                                {/* Clinical Indicators with Animation */}
                                <div style={{ marginLeft: '36px' }}>
                                  {/* First Indicator */}
                                  <div
                                    style={{
                                      opacity: showClinicalIndicators[0] ? 1 : 0,
                                      transform: showClinicalIndicators[0] ? 'translateY(0)' : 'translateY(-10px)',
                                      transition: 'all 0.5s ease-in-out',
                                      marginBottom: '12px',
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      gap: '8px'
                                    }}
                                  >                                    <span style={{
                                    display: 'inline-block',
                                    width: '16px',
                                    height: '16px',
                                    background: `url(${plusIcon}) lightgray 50% / cover no-repeat`,
                                    marginTop: '2px'
                                  }}></span>                                    <span style={{
                                    color: '#5D595F',
                                    fontFamily: 'Inter',
                                    fontSize: '13.9px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                  }}>
                                      Diabetic ketoacidosis that requires inpatient management, as indicated by
                                    </span>
                                  </div>

                                  {/* Second Indicator */}
                                  <div
                                    style={{
                                      opacity: showClinicalIndicators[1] ? 1 : 0,
                                      transform: showClinicalIndicators[1] ? 'translateY(0)' : 'translateY(-10px)',
                                      transition: 'all 0.5s ease-in-out',
                                      marginBottom: '12px',
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      gap: '8px'
                                    }}
                                  >                                    <span style={{
                                    display: 'inline-block',
                                    width: '16px',
                                    height: '16px',
                                    background: `url(${plusIcon}) lightgray 50% / cover no-repeat`,
                                    marginTop: '2px'
                                  }}></span>                                    <span style={{
                                    color: '#5D595F',
                                    fontFamily: 'Inter',
                                    fontSize: '13.9px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                  }}>
                                      Hyperglycemic hyperosmolar state, as indicated by
                                    </span>
                                  </div>

                                  {/* Third Indicator */}
                                  <div
                                    style={{
                                      opacity: showClinicalIndicators[2] ? 1 : 0,
                                      transform: showClinicalIndicators[2] ? 'translateY(0)' : 'translateY(-10px)',
                                      transition: 'all 0.5s ease-in-out',
                                      marginBottom: '12px',
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      gap: '8px'
                                    }}
                                  >                                    <span style={{
                                    display: 'inline-block',
                                    width: '16px',
                                    height: '16px',
                                    background: `url(${plusIcon}) lightgray 50% / cover no-repeat`,
                                    marginTop: '2px'
                                  }}></span>                                    <span style={{
                                    color: '#5D595F',
                                    fontFamily: 'Inter',
                                    fontSize: '13.9px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                  }}>
                                      Hyperglycemia requiring inpatient care, as indicated by
                                    </span>
                                  </div>
                                </div>                              </div>
                            )}{/* Step 3: Care Planning - Inpatient Admission and Alternatives */}
                            {clinicalReviewStep === 3 && (
                              <div>
                                {/* Separator - adding vertical spacing */}
                                <div style={{ marginBottom: '24px', borderTop: '1px solid #E5E7EB' }}></div>

                                {/* Success Banner */}
                                <div style={{
                                  backgroundColor: '#10B981',
                                  color: 'white',
                                  padding: '12px 24px',
                                  borderRadius: '8px',
                                  marginBottom: '24px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between'
                                }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                      width: '20px',
                                      height: '20px',
                                      borderRadius: '50%',
                                      border: '2px solid white',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '12px',
                                      fontWeight: 'bold'
                                    }}>
                                      ✓
                                    </div>
                                    <span style={{
                                      fontFamily: 'Inter',
                                      fontSize: '14px',
                                      fontWeight: '600'
                                    }}>
                                      Selections Made, Criteria Met
                                    </span>
                                  </div>
                                  <div style={{ display: 'flex', gap: '12px' }}>
                                    <button style={{
                                      backgroundColor: 'white',
                                      color: '#10B981',
                                      border: 'none',
                                      borderRadius: '6px',
                                      padding: '8px 16px',
                                      fontSize: '12px',
                                      fontWeight: '600',
                                      cursor: 'pointer'
                                    }}>
                                      Save
                                    </button>
                                    <button style={{
                                      backgroundColor: 'transparent',
                                      color: 'white',
                                      border: '1px solid white',
                                      borderRadius: '6px',
                                      padding: '8px 16px',
                                      fontSize: '12px',
                                      fontWeight: '600',
                                      cursor: 'pointer'
                                    }}>
                                      Cancel
                                    </button>
                                  </div>
                                </div>

                                {/* Main Title */}
                                <h1 style={{
                                  color: '#212029',
                                  fontFamily: 'Inter',
                                  fontSize: '22.2px',
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  lineHeight: 'normal',
                                  marginBottom: '8px'
                                }}>
                                  Care Planning - Inpatient Admission and Alternatives
                                </h1>

                                {/* Subtitle */}
                                <h2 style={{
                                  color: '#212029',
                                  fontFamily: 'Inter',
                                  fontSize: '22.2px',
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  lineHeight: 'normal',
                                  marginBottom: '16px'
                                }}>
                                  Clinical Indications for Admission to Inpatient Care
                                </h2>

                                {/* Note Section */}
                                <div style={{
                                  marginBottom: '24px',
                                  fontSize: '13px',
                                  lineHeight: '1.5',
                                  color: '#374151'
                                }}>
                                  <div style={{ marginBottom: '8px' }}>
                                    <strong>Note:</strong>
                                  </div>
                                  <div style={{ marginBottom: '4px' }}>
                                    Some patients may be appropriate for Observation care.
                                  </div>
                                  <div>
                                    For consideration of observation care, see <span style={{ color: '#6366F1', textDecoration: 'underline', cursor: 'pointer' }}>Diabetes: Observation Care.</span>
                                  </div>
                                </div>

                                {/* Clinical Indications Section */}
                                <div style={{
                                  fontSize: '13px',
                                  lineHeight: '1.4',
                                  color: '#374151'
                                }}>
                                  <div style={{ marginBottom: '16px', fontWeight: '600' }}>
                                    Clinical Indications for Inpatient Admission - Diabetic Ketoacidosis (DKA)
                                  </div>

                                  <div style={{ marginBottom: '16px' }}>
                                    <strong>Confirmed diagnosis of DKA, typically with:</strong>
                                  </div>

                                  {/* DKA Criteria List */}                                  <ul style={{
                                    marginLeft: '20px',
                                    marginBottom: '20px',
                                    listStyleType: 'disc'
                                  }}>
                                    <li style={{ marginBottom: '4px' }}>Blood glucose &gt;250 mg/dL</li>
                                    <li style={{ marginBottom: '4px' }}>Arterial pH &lt;7.30</li>
                                    <li style={{ marginBottom: '4px' }}>Serum bicarbonate &lt;18 mEq/L</li>
                                    <li style={{ marginBottom: '4px' }}>Presence of ketones and moderate/severe ketosis</li>
                                    <li style={{ marginBottom: '4px' }}>Elevated anion gap metabolic acidosis</li>
                                  </ul>

                                  {/* Physiologic Instability Section */}
                                  <div style={{ marginBottom: '16px' }}>
                                    <strong>Physiologic Instability / Severity Indicators</strong>
                                  </div>
                                  <ul style={{
                                    marginLeft: '20px',
                                    marginBottom: '20px',
                                    listStyleType: 'disc'
                                  }}>
                                    <li style={{ marginBottom: '4px' }}>Altered mental status (e.g., confusion, stupor, coma)</li>
                                    <li style={{ marginBottom: '4px' }}>Hemodynamic instability (e.g., hypotension, tachycardia unresponsive to fluid resuscitation)</li>
                                    <li style={{ marginBottom: '4px' }}>Severe dehydration with poor oral intake or need for IV fluids</li>
                                    <li style={{ marginBottom: '4px' }}>Significant electrolyte disturbances, such as:</li>
                                    <ul style={{ marginLeft: '20px', listStyleType: 'circle' }}>
                                      <li style={{ marginBottom: '2px' }}>Severe hyponatremia</li>
                                      <li style={{ marginBottom: '2px' }}>Hyperkalemia with ECG changes</li>
                                      <li style={{ marginBottom: '2px' }}>Severe hypokalemia</li>
                                      <li style={{ marginBottom: '2px' }}>Severe hypophosphatemia</li>
                                    </ul>
                                    <li style={{ marginBottom: '4px' }}>Severe hyperglycemia (typically &gt;400 mg/dL despite initial treatment)</li>
                                    <li style={{ marginBottom: '4px' }}>Inability to tolerate oral intake due to nausea, vomiting, or ileus</li>
                                    <li style={{ marginBottom: '4px' }}>Respiratory distress or Kussmaul breathing</li>
                                  </ul>

                                  {/* Comorbidities Section */}
                                  <div style={{ marginBottom: '16px' }}>
                                    <strong>Comorbidities / Complicating Factors</strong>
                                  </div>
                                  <ul style={{
                                    marginLeft: '20px',
                                    marginBottom: '20px',
                                    listStyleType: 'disc'
                                  }}>
                                    <li style={{ marginBottom: '4px' }}>Renal insufficiency / acute kidney injury (AKI)</li>
                                    <li style={{ marginBottom: '4px' }}>Congestive heart failure</li>
                                    <li style={{ marginBottom: '4px' }}>History of recent stroke or cardiac event</li>
                                    <li style={{ marginBottom: '4px' }}>Sepsis or suspected infection</li>
                                    <li style={{ marginBottom: '4px' }}>Concurrent medical conditions requiring observation (e.g., pancreatitis, MI)</li>
                                  </ul>

                                  {/* Inadequate Outpatient Support Section */}
                                  <div style={{ marginBottom: '16px' }}>
                                    <strong>Inadequate Outpatient Support or Risk Factors:</strong>
                                  </div>
                                  <ul style={{
                                    marginLeft: '20px',
                                    marginBottom: '20px',
                                    listStyleType: 'disc'
                                  }}>
                                    <li style={{ marginBottom: '4px' }}>Inability to safely manage at home due to social or environmental factors</li>
                                    <li style={{ marginBottom: '4px' }}>History of noncompliance or poor follow-up</li>
                                    <li style={{ marginBottom: '4px' }}>No access to insulin or inability to administer insulin safely</li>
                                    <li style={{ marginBottom: '4px' }}>Lack of adequate support system</li>
                                    <li style={{ marginBottom: '4px' }}>Recent psychiatric illness or suicidal ideation</li>
                                  </ul>

                                  {/* Pediatric Considerations Section */}
                                  <div style={{ marginBottom: '16px' }}>
                                    <strong>Pediatric Considerations (if applicable)</strong>
                                  </div>
                                  <ul style={{
                                    marginLeft: '20px',
                                    marginBottom: '20px',
                                    listStyleType: 'disc'
                                  }}>
                                    <li style={{ marginBottom: '4px' }}>Age &lt;2 years</li>
                                    <li style={{ marginBottom: '4px' }}>Risk of cerebral edema, especially in pediatric patients</li>
                                    <li style={{ marginBottom: '4px' }}>Parental inability to manage condition at home</li>
                                  </ul>
                                </div>

                                {/* Bottom Success Banner */}
                                <div style={{
                                  backgroundColor: '#10B981',
                                  color: 'white',
                                  padding: '12px 24px',
                                  borderRadius: '8px',
                                  marginTop: '32px',
                                  marginBottom: '24px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between'
                                }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                      width: '20px',
                                      height: '20px',
                                      borderRadius: '50%',
                                      border: '2px solid white',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '12px',
                                      fontWeight: 'bold'
                                    }}>
                                      ✓
                                    </div>
                                    <span style={{
                                      fontFamily: 'Inter',
                                      fontSize: '14px',
                                      fontWeight: '600'
                                    }}>
                                      Selections Made, Criteria Met
                                    </span>
                                  </div>
                                  <div style={{ display: 'flex', gap: '12px' }}>
                                    <button style={{
                                      backgroundColor: 'white',
                                      color: '#10B981',
                                      border: 'none',
                                      borderRadius: '6px',
                                      padding: '8px 16px',
                                      fontSize: '12px',
                                      fontWeight: '600',
                                      cursor: 'pointer'
                                    }}>
                                      Save
                                    </button>
                                    <button style={{
                                      backgroundColor: 'transparent',
                                      color: 'white',
                                      border: '1px solid white',
                                      borderRadius: '6px',
                                      padding: '8px 16px',
                                      fontSize: '12px',
                                      fontWeight: '600',
                                      cursor: 'pointer'
                                    }}>
                                      Cancel
                                    </button>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div style={{
                                  display: 'flex',
                                  gap: '12px',
                                  marginBottom: '24px'
                                }}>
                                  <button style={{
                                    backgroundColor: '#F3F4F6',
                                    color: '#374151',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '6px',
                                    padding: '8px 16px',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                  }}>
                                    View Note History
                                  </button>
                                  <button style={{
                                    backgroundColor: '#F3F4F6',
                                    color: '#374151',
                                    border: '1px solid #D1D5DB',
                                    borderRadius: '6px',
                                    padding: '8px 16px',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    cursor: 'pointer'
                                  }}>
                                    Edit Note
                                  </button>
                                </div>
                              </div>
                            )}                            {/* Step 4: Medical Necessity Guidelines - Goal Length of Stay */}
                            {clinicalReviewStep === 4 && (
                              <div style={{ backgroundColor: '#FFFFFF', fontFamily: 'Arial, Helvetica, sans-serif' }}>
                                {/* Separator - adding vertical spacing */}
                                <div style={{ marginBottom: '24px', borderTop: '1px solid #E5E7EB' }}></div>

                                {/* Header Section */}
                                <div style={{
                                  padding: '24px 0',
                                  borderBottom: '1px solid #E5E7EB',
                                  marginBottom: '32px'
                                }}>
                                  <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start'
                                  }}>
                                    {/* Left Side */}
                                    <div>                                      <h1 style={{
                                      color: '#212029',
                                      fontFamily: 'Teachers',
                                      fontSize: '22.2px',
                                      fontStyle: 'normal',
                                      fontWeight: '500',
                                      lineHeight: 'normal',
                                      marginBottom: '8px',
                                      margin: '0 0 8px 0'
                                    }}>
                                      Medical Necessity Guidelines
                                    </h1>
                                      <p style={{
                                        color: '#333333',
                                        fontSize: '14px',
                                        margin: '0'
                                      }}>
                                        Informed Care Strategies
                                      </p>
                                    </div>

                                    {/* Right Side Navigation */}
                                    <div style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '8px',
                                      fontSize: '12px',
                                      textTransform: 'uppercase',
                                      color: '#333333'
                                    }}>
                                      <span style={{ cursor: 'pointer' }}>LOG OUT</span>
                                      <span>|</span>
                                      <span style={{ cursor: 'pointer' }}>SEARCH</span>
                                      <span>|</span>
                                      <span style={{ cursor: 'pointer' }}>MY PRODUCTS</span>
                                      <span>|</span>
                                      <span style={{ cursor: 'pointer' }}>CONTACT US</span>
                                      <span>|</span>
                                      <span style={{ cursor: 'pointer' }}>USER GUIDE</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Main Content */}
                                <div style={{ padding: '0 32px' }}>                                  {/* Primary Title */}
                                  <h2 style={{
                                    color: '#212029',
                                    fontFamily: 'Inter',
                                    fontSize: '22.2px',
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    lineHeight: 'normal',
                                    marginBottom: '32px',
                                    margin: '0 0 32px 0'
                                  }}>
                                    Goal Length of Stay : 2 Days
                                  </h2>

                                  {/* Section 1: Brief Stay */}
                                  <div style={{ marginBottom: '40px' }}>
                                    <h3 style={{
                                      color: '#333333',
                                      fontSize: '18px',
                                      fontWeight: 'bold',
                                      marginBottom: '16px',
                                      margin: '0 0 16px 0'
                                    }}>
                                      Brief Stay (1 to 3 Days) – Target LOS: 2 Days
                                    </h3>

                                    <ul style={{
                                      fontSize: '16px',
                                      color: '#333333',
                                      lineHeight: '1.5',
                                      marginBottom: '16px',
                                      paddingLeft: '20px'
                                    }}>
                                      <li style={{ marginBottom: '8px' }}>Initial stabilization within first 12-24 hours</li>
                                      <li style={{ marginBottom: '8px' }}>Transition from IV insulin to subcutaneous insulin regimen on Day 2</li>
                                      <li style={{ marginBottom: '8px' }}>
                                        Correction of:
                                        <ul style={{ marginTop: '4px', marginLeft: '20px' }}>
                                          <li>Acidosis</li>
                                          <li>Ketosis</li>
                                          <li>Electrolyte imbalances</li>
                                        </ul>
                                      </li>
                                      <li style={{ marginBottom: '8px' }}>Nutritional intake established with adequate PO hydration</li>
                                      <li style={{ marginBottom: '8px' }}>Ongoing monitoring of labs and vitals for stability</li>
                                      <li style={{ marginBottom: '8px' }}>
                                        Diabetes education and discharge planning initiated:
                                        <ul style={{ marginTop: '4px', marginLeft: '20px' }}>
                                          <li>Insulin use, glucose monitoring</li>
                                          <li>Sick-day management</li>
                                          <li>Social work consult as needed (e.g., cost of insulin, access to care)</li>
                                        </ul>
                                      </li>
                                      <li style={{ marginBottom: '8px' }}>Outpatient endocrinology follow-up arranged</li>
                                      <li style={{ marginBottom: '8px' }}>Documented improvement in mental status and vitals</li>
                                    </ul>

                                    <p style={{
                                      fontSize: '14px',
                                      color: '#333333',
                                      fontStyle: 'italic',
                                      marginTop: '16px',
                                      margin: '16px 0 0 0'
                                    }}>
                                      Represents a well-executed, protocol-based DKA management plan with effective interdisciplinary care coordination
                                    </p>
                                  </div>

                                  {/* Section 2: Moderate Stay */}
                                  <div style={{ marginBottom: '40px' }}>
                                    <h3 style={{
                                      color: '#333333',
                                      fontSize: '18px',
                                      fontWeight: 'bold',
                                      marginBottom: '16px',
                                      margin: '0 0 16px 0'
                                    }}>
                                      Moderate Stay (4 to 7 Days)
                                    </h3>

                                    <ul style={{
                                      fontSize: '16px',
                                      color: '#333333',
                                      lineHeight: '1.5',
                                      marginBottom: '16px',
                                      paddingLeft: '20px'
                                    }}>
                                      <li style={{ marginBottom: '8px' }}>Delayed response to treatment (e.g., persistent acidosis or ketosis)</li>
                                      <li style={{ marginBottom: '8px' }}>
                                        Complicating factors, such as:
                                        <ul style={{ marginTop: '4px', marginLeft: '20px' }}>
                                          <li>Infection requiring IV antibiotics</li>
                                          <li>Renal insufficiency delaying fluid or insulin management</li>
                                          <li>Nutrition or GI issues (e.g., nausea, gastroparesis) prolonging PO tolerance</li>
                                        </ul>
                                      </li>
                                      <li style={{ marginBottom: '8px' }}>Slow weaning off insulin drip due to rebound hyperglycemia</li>
                                      <li style={{ marginBottom: '8px' }}>Psychosocial or discharge barriers (e.g., homelessness, no caregiver)</li>
                                      <li style={{ marginBottom: '8px' }}>Diabetes education prolonged or not yet completed</li>
                                    </ul>

                                    <p style={{
                                      fontSize: '14px',
                                      color: '#333333',
                                      fontStyle: 'italic',
                                      marginTop: '16px',
                                      margin: '16px 0 0 0'
                                    }}>
                                      Indicates medical or social complexity requiring extended monitoring or coordination
                                    </p>
                                  </div>

                                  {/* Section 3: Prolonged Stay */}
                                  <div style={{ marginBottom: '40px' }}>
                                    <h3 style={{
                                      color: '#333333',
                                      fontSize: '18px',
                                      fontWeight: 'bold',
                                      marginBottom: '16px',
                                      margin: '0 0 16px 0'
                                    }}>
                                      Prolonged Stay (&gt; 7 Days)
                                    </h3>

                                    <ul style={{
                                      fontSize: '16px',
                                      color: '#333333',
                                      lineHeight: '1.5',
                                      marginBottom: '16px',
                                      paddingLeft: '20px'
                                    }}>
                                      <li style={{ marginBottom: '8px' }}>Severe or refractory DKA (e.g., pH &lt; 7.0 not improving)</li>
                                      <li style={{ marginBottom: '8px' }}>Major comorbidities (e.g., MI, stroke, sepsis, pancreatitis)</li>
                                      <li style={{ marginBottom: '8px' }}>ICU-level complications (e.g., cerebral edema, ARDS)</li>
                                      <li style={{ marginBottom: '8px' }}>Psychiatric decompensation or suicide risk requiring inpatient psych</li>
                                      <li style={{ marginBottom: '8px' }}>Lack of safe discharge plan or need for long-term placement</li>
                                      <li style={{ marginBottom: '8px' }}>Multidisciplinary involvement (e.g., case management, psychiatry, rehab)</li>
                                    </ul>

                                    <p style={{
                                      fontSize: '14px',
                                      color: '#333333',
                                      fontStyle: 'italic',
                                      marginTop: '16px',
                                      margin: '16px 0 0 0'
                                    }}>
                                      Represents a highly complex patient requiring extended inpatient resources beyond standard DKA care
                                    </p>
                                  </div>
                                </div>

                                {/* Footer / Action Buttons */}
                                <div style={{
                                  padding: '0 32px 32px 32px'
                                }}>
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                  }}>                                    <button
                                    onClick={handleClinicalReviewPrev}
                                    style={{
                                      width: '50px',
                                      height: '20px',
                                      padding: '2.443px 17.443px 2.898px 17.898px',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      borderRadius: '2.443px',
                                      border: '1px solid #BDBDBD',
                                      background: '#DEDEDE',
                                      cursor: 'pointer',
                                      display: 'flex'
                                    }}
                                  >
                                      <img
                                        src={caratLeftIcon}
                                        alt="Back"
                                        style={{
                                          width: 'auto',
                                          height: '12px'
                                        }}
                                      />
                                    </button>

                                    <button
                                      style={{
                                        backgroundColor: '#F0F0F0',
                                        border: '1px solid #CCCCCC',
                                        borderRadius: '4px',
                                        padding: '8px 12px',
                                        fontSize: '14px',
                                        color: '#333333',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}                            {/* Navigation Controls */}
                            <div style={{
                              display: 'flex',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              marginTop: '40px',
                              gap: '25px'
                            }}>                              <button
                              onClick={handleClinicalReviewPrev}
                              disabled={clinicalReviewStep === 1}
                              style={{
                                width: '50px',
                                height: '20px',
                                padding: '1px 15px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '2.443px',
                                border: '1px solid #BDBDBD',
                                background: '#DEDEDE',
                                cursor: clinicalReviewStep === 1 ? 'not-allowed' : 'pointer',
                                display: 'flex'
                              }}
                            >
                                <img
                                  src={caratLeftIcon}
                                  alt="Previous"
                                  style={{
                                    width: 'auto',
                                    height: '20px'
                                  }}
                                />
                              </button>                              <button
                                onClick={handleClinicalReviewNext}
                                disabled={clinicalReviewStep === 4}
                                style={{
                                  width: '50px',
                                  height: '20px',
                                  padding: '1px 15px',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: '2.443px',
                                  border: '1px solid #BDBDBD',
                                  background: '#DEDEDE',
                                  cursor: clinicalReviewStep === 4 ? 'not-allowed' : 'pointer',
                                  display: 'flex'
                                }}
                              >
                                <img
                                  src={caratRightIcon}
                                  alt="Next"
                                  style={{
                                    width: 'auto',
                                    height: '20px'
                                  }}
                                />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Other Auth Tab Contents */}
                        {activeRequestTab === '20250P000367' && activeAuthTab !== 'Request Submitted' && activeAuthTab !== 'Clinical Review' && (
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




