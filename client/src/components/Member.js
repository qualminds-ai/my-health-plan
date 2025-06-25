import React, { useState, useRef } from 'react';
import Header from './Header';
import MemberHeader from './member/MemberHeader';
import MemberInfoBar from './member/MemberInfoBar';
import MemberTabs from './member/MemberTabs';
import MemberOverview from './member/MemberOverview';
import styles from './Member.module.css';

// Import authorization assets
import faxDocIcon from '../assets/authorizations/fax-doc-icon.png';
import pdfDocIcon from '../assets/authorizations/pdf-doc-icon.png';
import textDocIcon from '../assets/authorizations/text-doc-icon.png';
import leftArrowTriangleIcon from '../assets/authorizations/clinical_review/left-arrow-triangle.svg';
import caratLeftIcon from '../assets/authorizations/clinical_review/carat-left.svg';
import caratRightIcon from '../assets/authorizations/clinical_review/carat-right.svg';
import navNewTabIcon from '../assets/authorizations/clinical_review/nav-new-tab-icon.png';
import letterNIcon from '../assets/authorizations/clinical_review/letter-n-icon.png';
import plusIcon from '../assets/authorizations/clinical_review/plus-icon.png';

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
      <div className={styles.attachmentItem}>
        <div
          className={styles.attachmentIcon}
          style={{
            background: `url(${getAttachmentIcon(attachment.type, attachment.title)}) lightgray 50% / cover no-repeat`
          }}
        />
        <div className={styles.attachmentContent}>
          <div className={`${styles.attachmentTitle} ${isActive ? styles.attachmentTitleActive : styles.attachmentTitleInactive
            }`}>
            {attachment.title}
          </div>
          <div className={`${styles.attachmentMeta} ${isActive ? styles.attachmentMetaActive : styles.attachmentMetaInactive
            }`}>
            {attachment.date} · {attachment.size}.{attachment.type === 'fax' ? 'pdf' : attachment.type}
          </div>
        </div>
      </div>
    );
  };
  const getStatusBadgeClass = (status) => {
    const baseClass = styles.statusBadge;
    switch (status?.toLowerCase()) {
      case 'approved': return `${baseClass} ${styles.statusApproved}`;
      case 'pending': return `${baseClass} ${styles.statusPending}`;
      case 'in review': return `${baseClass} ${styles.statusInReview}`;
      case 'denied': return `${baseClass} ${styles.statusDenied}`;
      default: return `${baseClass} bg-gray-500`;
    }
  };

  const getPriorityBadgeClass = (priority) => {
    const baseClass = styles.priorityBadge;
    switch (priority?.toLowerCase()) {
      case 'high': return `${baseClass} ${styles.priorityHigh}`;
      case 'medium': return `${baseClass} ${styles.priorityMedium}`;
      case 'low': return `${baseClass} ${styles.priorityLow}`;
      default: return `${baseClass} bg-gray-500`;
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
      setClinicalReviewStep(clinicalReviewStep + 1);      // Reset indicators for step 2 animation
      if (clinicalReviewStep === 1) {
        setShowClinicalIndicators([false, false, false]);
        // Animate indicators one by one with slower timing and initial delay
        setTimeout(() => setShowClinicalIndicators([true, false, false]), 500);
        setTimeout(() => setShowClinicalIndicators([true, true, false]), 1200);
        setTimeout(() => setShowClinicalIndicators([true, true, true]), 1900);
      }
    }
  };

  const handleClinicalReviewPrev = () => {
    if (clinicalReviewStep > 1) {
      setClinicalReviewStep(clinicalReviewStep - 1);
    }
  };

  // Action button handlers
  const handleStarClick = () => {
    console.log('ðŸŒŸ Star button clicked');
  };

  const handleCallClick = () => {
    console.log('ðŸ“ž Call button clicked');
  };

  const handleTextChatClick = () => {
    console.log('ðŸ’¬ Text chat button clicked');
  };

  const handleMessageClick = () => {
    console.log('ðŸ“§ Message button clicked');
  };

  const handleWatchClick = () => {
    console.log('ðŸ‘ï¸ Watch button clicked');
  };

  const handleMedicalClick = () => {
    console.log('ðŸ¥ Medical button clicked');
  };

  return (
    <div className="min-h-screen">
      <div ref={topRef} id="top"></div><Header user={user} onLogout={onLogout} onNavigate={onNavigate} activeTab="Members" />      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Member Header Content */}
        <MemberHeader
          memberName={memberData.name}
          onStarClick={handleStarClick}
          onCallClick={handleCallClick}
          onTextChatClick={handleTextChatClick}
          onMessageClick={handleMessageClick}
          onWatchClick={handleWatchClick}
          onMedicalClick={handleMedicalClick}
        />

        {/* Member Info Bar */}
        <MemberInfoBar
          memberName="Robert Abbott"
          memberNumber={memberData.memberNumber}
          dateOfBirth="01/01/1974"
          age={51}
          gender="Male"
          eligibilityPeriod="10/01/2024-12/31/2025"
          language="English"
          programs="Care Coordination: ERM PH"
          bhpType="Large Group"
          optOut="No"
        />

        {/* Tab Navigation */}
        <MemberTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Tab Content */}
        <div className="tab-content bg-white">
          <div className={`${styles.tabContent} py-4`}>
            {activeTab === 'Overview' && (
              <MemberOverview memberData={propMemberData} />
            )}            {activeTab === 'Authorizations' && (
              <div className="w-full">
                <div className="w-full">
                  {/* Top Navigation Tabs */}

                  <div className="py-4">                      {/* Request Navigation */}
                    <div className="flex items-center mb-4" >
                      <div className={`flex ${styles.requestNavContainer}`}>                          <button
                        className={`px-4 py-2 transition-colors relative ${styles.requestTabButton} ${activeRequestTab === 'Request History' ? styles.requestTabButtonActive : styles.requestTabButtonInactive
                          }`}
                        onClick={() => setActiveRequestTab('Request History')}
                      >
                        Request History
                      </button>
                        <button
                          className={`px-4 py-2 transition-colors relative ${styles.requestTabButton} ${activeRequestTab === '20250P000367' ? styles.requestTabButtonActive : styles.requestTabButtonInactive
                            }`}
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
                              <div className={`flex ${styles.authSubNavContainer}`}>
                                {authTabs.map((authTab, index) => (
                                  <button
                                    key={authTab.id}
                                    className={`transition-colors relative ${styles.authSubTabButton} ${activeAuthTab === authTab.id ? styles.authSubTabButtonActive : styles.authSubTabButtonInactive
                                      }`}
                                    onClick={() => handleAuthTabClick(authTab.id)}
                                  >
                                    {authTab.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}                          {/* Authorization Request Summary */}                          {activeRequestTab === '20250P000367' && activeAuthTab === 'Request Submitted' && (
                          <div className={styles.authorizationContent}>
                            {/* Header */}
                            <h2 className={styles.authorizationHeader}>Authorization Request Summary</h2>{/* Content Area */}
                            <div>
                              {/* First Row - 4 data points + Status */}
                              <div className={styles.authGridLayout}>
                                <div className={styles.authGridItem}>
                                  <div className={styles.authGridLabel}>Authorization #</div>
                                  <div className={styles.authGridValue}>2025OP000367</div>
                                </div>
                                <div className={styles.authGridItem}>
                                  <div className={styles.authGridLabel}>Received Date</div>
                                  <div className={styles.authGridValue}>04/28/2025 03:47:01 AM</div>
                                </div>
                                <div className={styles.authGridItem}>
                                  <div className={styles.authGridLabel}>Admission Date</div>
                                  <div className={styles.authGridValue}>04/28/2025 02:58:09 AM</div>
                                </div>
                                <div className={styles.authGridItem}>
                                  <div className={styles.authGridLabel}>Request Type</div>
                                  <div className={styles.authGridValue}>Standard</div>
                                </div>
                                <div className={styles.authGridItem}>
                                  <div className={styles.authGridLabel}>Status</div>
                                  <div className={styles.flexCenterGap10}>                                    <select className={styles.authStatusSelect}>
                                    <option>Pending</option>
                                    <option>Approve</option>
                                    <option>Send to Review</option>
                                    <option>Deny</option>
                                  </select>
                                    <button
                                      className={`bg-gray-500 rounded hover:bg-gray-600 ${styles.actionButton}`}
                                    >
                                      Check Guidelines
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Second Row - 4 data points + Updated */}
                              <div className={styles.authGridLayout}>
                                <div className={styles.authGridItem}>
                                  <div className={styles.authGridLabel}>Place of Service</div>
                                  <div className={styles.authGridValue}>Inpatient Hospital</div>
                                </div>
                                <div className={styles.authGridItem}>
                                  <div className={styles.authGridLabel}>Diagnosis</div>
                                  <div className={styles.authGridValue}>DKA</div>
                                </div>
                                <div className={styles.authGridItem}>
                                  <div className={styles.authGridLabel}>Code Type</div>
                                  <div className={styles.authGridValue}>ICD 10</div>
                                </div>
                                <div className={styles.authGridItem}>
                                  <div className={styles.authGridLabel}>Code Number</div>
                                  <div className={styles.authGridValue}>A41</div>
                                </div>
                                <div className={styles.authGridItem}>
                                  <div className={styles.authGridLabel}>Updated</div>
                                  <div className={styles.authGridValue}>Initial Review</div>
                                </div>
                              </div>
                            </div>                              {/* Notes Section */}
                            <div className={`${styles.formContainer} mb-6`}>
                              <h3 className={styles.formTitle}>Notes</h3>
                              <div className={styles.formDescription}>
                                <p className={styles.formText}>
                                  Additional pertinent patient information from the BCBS AI Assistant:
                                </p>
                                <p className={styles.formText}>Other current patient diagnoses:</p>
                                <ul className={styles.formList}>
                                  <li>• CHF (ICD10: I50.9): 4/28/2025</li>
                                  <li>• DKA (DKA: E11.10): 4/28/2025</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}                          {/* Attachments Section - Outside Container */}
                        {activeRequestTab === '20250P000367' && activeAuthTab === 'Request Submitted' && (
                          <div>
                            <h3 className={styles.attachmentsTitle}>
                              Attachments
                            </h3>                              <div className={styles.attachmentsContainer}>
                              {attachments.map((attachment) => (
                                <AttachmentItem key={attachment.id} attachment={attachment} />
                              ))}
                            </div>
                          </div>
                        )}                        {/* Clinical Review Content */}
                        {activeRequestTab === '20250P000367' && activeAuthTab === 'Clinical Review' && (
                          <div className={styles.clinicalReviewContent}>                            {/* Medical Necessity Guidelines Section */}
                            <div className={styles.medicalGuidelinesContainer}>                              <div className={styles.guidelinesHeader}>
                              <div className={styles.guidelinesIconContainer}>
                                <img src={leftArrowTriangleIcon} alt="Left Arrow Triangle Icon" className={styles.guidelineIcon} />
                                <div className={styles.medicalGuidelinesTextContainer}>
                                  <span className={styles.medicalGuidelinesText}>
                                    Medical
                                  </span>
                                  <span className={styles.medicalGuidelinesText}>
                                    Necessity
                                  </span>
                                  <span className={styles.medicalGuidelinesText}>
                                    Guidelines                                    </span>                                  </div>                                </div>

                              {/* Stage 4 Navigation - Only visible in step 4, positioned on the right side of the same row */}
                              {clinicalReviewStep === 4 && (
                                <div className={styles.stage4Navigation}>
                                  <div className={styles.navigationHeader}>
                                    Informed Care Strategies
                                  </div>

                                  <div className={styles.navigationLinks}>
                                    <span className={styles.navigationLinksClickable}>LOG OUT</span>
                                    <span className={styles.navigationSeparator}>|</span>
                                    <span className={styles.navigationLinksClickable}>SEARCH</span>
                                    <span className={styles.navigationSeparator}>|</span>
                                    <span className={styles.navigationLinksClickable}>MY PRODUCTS</span>
                                    <span className={styles.navigationSeparator}>|</span>
                                    <span className={styles.navigationLinksClickable}>CONTACT US</span>
                                    <span className={styles.navigationSeparator}>|</span>
                                    <span className={styles.navigationLinksClickable}>USER GUIDE</span>
                                  </div>
                                </div>
                              )}
                            </div>
                              <div className={styles.navigationDivider} />
                            </div>                            {/* Step 1: Guidelines Search and Selection */}
                            {clinicalReviewStep === 1 && (
                              <div className={styles.navigationSection}>

                                {/* Guideline Selection Checkboxes */}
                                <div className={styles.guidelinesSelectionContainer}>
                                  <span className={styles.guidelinesEditionLabel}>
                                    1st Edition
                                  </span>
                                  <label className={styles.guidelinesCheckboxLabel}>
                                    <input
                                      type="checkbox"
                                      className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                                    />
                                    <span className={styles.guidelinesCheckboxText}>
                                      ACO
                                    </span>
                                  </label>
                                  <label className={styles.checkboxContainer}>
                                    <input
                                      type="checkbox" className={`${styles.customCheckbox} ${styles.checkboxInput}`}
                                    />
                                    <span className={styles.checkboxLabel}>
                                      ISC
                                    </span>
                                  </label>
                                  <label className={styles.guidelinesCheckboxLabel}>
                                    <input
                                      type="checkbox"
                                      className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                                    />
                                    <span className={styles.guidelinesCheckboxText}>
                                      GRC
                                    </span>
                                  </label>
                                  <label className={styles.guidelinesCheckboxLabel}>
                                    <input
                                      type="checkbox"
                                      className={`${styles.customCheckbox} ${styles.guidelinesCheckboxInput}`}
                                    />
                                    <span className={styles.guidelinesCheckboxText}>
                                      MCM
                                    </span>
                                  </label>
                                  <label className={styles.checkboxLabelFlex}>
                                    <input
                                      type="checkbox"
                                      className={`${styles.customCheckbox} ${styles.customCheckboxRound}`}
                                    />
                                    <span className={styles.checkboxTextSmall}>
                                      RFC
                                    </span>
                                  </label>
                                  <label className={styles.checkboxLabelFlex}>
                                    <input
                                      type="checkbox"
                                      className={`${styles.customCheckbox} ${styles.customCheckboxRound}`}
                                    />
                                    <span className={styles.checkboxTextSmall}>
                                      HHC
                                    </span>
                                  </label>
                                  <label className={styles.checkboxLabelFlex}>
                                    <input
                                      type="checkbox"
                                      className={`${styles.customCheckbox} ${styles.customCheckboxRound}`}
                                    />
                                    <span className={styles.checkboxTextSmall}>
                                      CCG
                                    </span>
                                  </label>
                                  <label className={styles.checkboxLabelFlex}>
                                    <input
                                      type="checkbox"
                                      className={`${styles.customCheckbox} ${styles.customCheckboxRound}`}
                                    />
                                    <span className={styles.checkboxTextSmall}>
                                      TC
                                    </span>
                                  </label>
                                  <label className={styles.checkboxLabelFlex}>
                                    <input
                                      type="checkbox"
                                      className={`${styles.customCheckbox} ${styles.customCheckboxRound}`}
                                    />
                                    <span className={styles.checkboxTextSmall}>
                                      DBHC
                                    </span>
                                  </label>
                                  <label className={styles.checkboxLabelFlex}>
                                    <input
                                      type="checkbox"
                                      className={`${styles.customCheckbox} ${styles.customCheckboxRound}`}
                                    />
                                    <span className={styles.checkboxTextSmall}>
                                      PIP
                                    </span>
                                  </label>
                                  <label className={styles.checkboxLabelFlex}>
                                    <input
                                      type="checkbox"
                                      className={`${styles.customCheckbox} ${styles.customCheckboxRound}`}
                                    />
                                    <span className={styles.checkboxTextSmall}>
                                      MCR
                                    </span>
                                  </label>
                                </div>                                {/* Quick Search */}
                                <div className={styles.quickSearchContainer}>
                                  <span className={styles.quickSearchLabel}>
                                    Quick Search
                                  </span>                                  <input
                                    type="text"
                                    defaultValue="DKA"
                                    className={styles.quickSearchInput}
                                  />
                                  <button className={styles.quickSearchButton}>
                                    Search
                                  </button>
                                </div>                                {/* Results Summary */}
                                <div className={styles.resultsContainer}>
                                  6 results for DKA
                                  <span className={styles.resultsFloatRight}>
                                    (Results 1 - 6 of 6)
                                  </span>
                                </div>                                {/* Guidelines Table */}
                                <div className={styles.guidelinesTableContainer}>
                                  <table className={styles.guidelinesTable}>
                                    <thead>
                                      <tr>
                                        <th className={styles.guidelinesTableHeaderCell}>
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
                            )}                            {/* Step 2: Clinical Indications for Admission to Inpatient Care */}                            {clinicalReviewStep === 2 && (
                              <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                                {/* Separator - adding vertical spacing */}
                                <div style={{ marginBottom: '24px', borderTop: '1px solid #E5E7EB', width: '95%' }}></div>                                {/* Main Title */}
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
                                  <span style={{ marginRight: '8px' }}>—</span>
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
                                <div style={{ marginLeft: '36px', marginBottom: '40px' }}>
                                  {/* First Indicator */}                                  <div
                                    style={{
                                      opacity: showClinicalIndicators[0] ? 1 : 0,
                                      transform: showClinicalIndicators[0] ? 'translateY(0)' : 'translateY(-10px)',
                                      transition: 'all 0.8s ease-in-out',
                                      marginBottom: '12px',
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      gap: '8px'
                                    }}
                                  ><span style={{
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

                                  {/* Second Indicator */}                                  <div
                                    style={{
                                      opacity: showClinicalIndicators[1] ? 1 : 0,
                                      transform: showClinicalIndicators[1] ? 'translateY(0)' : 'translateY(-10px)',
                                      transition: 'all 0.8s ease-in-out',
                                      marginBottom: '12px',
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      gap: '8px'
                                    }}
                                  ><span style={{
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

                                  {/* Third Indicator */}                                  <div
                                    style={{
                                      opacity: showClinicalIndicators[2] ? 1 : 0,
                                      transform: showClinicalIndicators[2] ? 'translateY(0)' : 'translateY(-10px)',
                                      transition: 'all 0.8s ease-in-out',
                                      marginBottom: '12px',
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      gap: '8px'
                                    }}
                                  ><span style={{
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
                            )}{/* Step 3: Care Planning - Inpatient Admission and Alternatives */}                            {clinicalReviewStep === 3 && (
                              <div>
                                {/* Separator - adding vertical spacing */}
                                <div style={{ marginBottom: '24px', borderTop: '1px solid #E5E7EB', width: '95%' }}></div>                                {/* Success Banner */}
                                <div style={{
                                  height: '56px',
                                  background: '#4ED55E',
                                  marginBottom: '24px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '0 24px'
                                }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                      width: '21px',
                                      height: '21px',
                                      borderRadius: '50%',
                                      border: '1.5px solid black',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '14px',
                                      fontWeight: 'bold',
                                      color: 'black'
                                    }}>
                                      œ“
                                    </div>
                                    <span style={{
                                      color: '#000',
                                      fontFamily: 'Inter',
                                      fontSize: '14px',
                                      fontStyle: 'normal',
                                      fontWeight: '500',
                                      lineHeight: 'normal'
                                    }}>
                                      Selections Made, Criteria Met
                                    </span>
                                  </div>
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '25px',
                                    marginLeft: '50px'
                                  }}>
                                    <button style={{
                                      width: '82px',
                                      height: '32px',
                                      background: '#D9D9D9',
                                      color: '#000',
                                      fontFamily: 'Inter',
                                      fontSize: '13.2px',
                                      fontStyle: 'normal',
                                      fontWeight: '500',
                                      lineHeight: 'normal',
                                      border: 'none',
                                      cursor: 'pointer'
                                    }}>
                                      Save
                                    </button>
                                    <button style={{
                                      background: 'transparent',
                                      color: '#000',
                                      fontFamily: 'Inter',
                                      fontSize: '14px',
                                      fontStyle: 'normal',
                                      fontWeight: '500',
                                      lineHeight: 'normal',
                                      textDecorationLine: 'underline',
                                      textDecorationStyle: 'solid',
                                      textDecorationSkipInk: 'auto',
                                      textDecorationThickness: 'auto',
                                      textUnderlineOffset: 'auto',
                                      textUnderlinePosition: 'from-font',
                                      border: 'none',
                                      cursor: 'pointer'
                                    }}>
                                      Cancel
                                    </button>
                                  </div>                                </div>

                                {/* Content Container with custom padding */}
                                <div style={{ padding: '5px 30px' }}>                                  {/* Main Title */}
                                  <h1 style={{
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '20px',
                                    fontStyle: 'normal',
                                    fontWeight: '700',
                                    lineHeight: 'normal',
                                    marginBottom: '19px'
                                  }}>
                                    Care Planning - Inpatient Admission and Alternatives
                                  </h1>                                  {/* Subtitle */}
                                  <h2 style={{
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '700',
                                    lineHeight: 'normal',
                                    marginBottom: '19px'
                                  }}>
                                    Clinical Indications for Admission to Inpatient Care
                                  </h2>                                  {/* Note Section */}
                                  <div style={{
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '16px',
                                    fontStyle: 'italic',
                                    fontWeight: '400',
                                    lineHeight: 'normal',
                                    marginBottom: '19px'
                                  }}>
                                    <div style={{ marginBottom: '8px' }}>
                                      Note:
                                    </div>
                                    <div style={{ marginBottom: '4px' }}>
                                      Some patients may be appropriate for Observation care.
                                    </div>
                                    <div>
                                      For consideration of observation care, see Diabetes: Observation Care.
                                    </div>
                                  </div>                                  {/* Clinical Indications Section */}
                                  <div style={{
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '13px',
                                    fontStyle: 'normal',
                                    fontWeight: '400',
                                    lineHeight: 'normal'
                                  }}>
                                    <div>Clinical Indications for Inpatient Admission - Diabetic Ketoacidosis (DKA)</div>
                                    <ul style={{
                                      marginLeft: '20px',
                                      listStyleType: 'disc'
                                    }}>                                      <li>Confirmed diagnosis of DKA, typically with:
                                        <ul style={{ marginLeft: '20px', listStyleType: 'disc' }}>
                                          <li>Blood glucose &gt;250 mg/dL</li>
                                          <li>Arterial pH &lt;7.30</li>
                                          <li>Serum bicarbonate &lt;18 mEq/L</li>
                                          <li>Presence of ketones and moderate/severe ketosis</li>
                                          <li>Elevated anion gap metabolic acidosis</li>
                                        </ul>
                                      </li>
                                    </ul>

                                    <div>Physiologic Instability / Severity Indicators</div>
                                    <ul style={{
                                      marginLeft: '20px',
                                      listStyleType: 'disc'
                                    }}>
                                      <li>Altered mental status (e.g., confusion, stupor, coma)</li>
                                      <li>Hemodynamic instability (e.g., hypotension, tachycardia unresponsive to fluid resuscitation)</li>
                                      <li>Severe dehydration with poor oral intake or need for IV fluids</li>                                      <li>Significant electrolyte disturbances, such as:
                                        <ul style={{ marginLeft: '20px', listStyleType: 'disc' }}>
                                          <li>Severe hyponatremia</li>
                                          <li>Hyperkalemia with ECG changes</li>
                                          <li>Severe hypokalemia</li>
                                          <li>Severe hypophosphatemia</li>
                                        </ul>
                                      </li>
                                      <li>Severe hyperglycemia (typically &gt;400 mg/dL despite initial treatment)</li>
                                      <li>Inability to tolerate oral intake due to nausea, vomiting, or ileus</li>
                                      <li>Respiratory distress or Kussmaul breathing</li>
                                    </ul>

                                    <div>Comorbidities / Complicating Factors</div>
                                    <ul style={{
                                      marginLeft: '20px',
                                      listStyleType: 'disc'
                                    }}>
                                      <li>Renal insufficiency / acute kidney injury (AKI)</li>
                                      <li>Congestive heart failure</li>
                                      <li>History of recent stroke or cardiac event</li>
                                      <li>Sepsis or suspected infection</li>
                                      <li>Concurrent medical conditions requiring observation (e.g., pancreatitis, MI)</li>
                                    </ul>

                                    <div>Inadequate Outpatient Support or Risk Factors:</div>
                                    <ul style={{
                                      marginLeft: '20px',
                                      listStyleType: 'disc'
                                    }}>
                                      <li>Inability to safely manage at home due to social or environmental factors</li>
                                      <li>History of noncompliance or poor follow-up</li>
                                      <li>No access to insulin or inability to administer insulin safely</li>
                                      <li>Lack of adequate support system</li>
                                      <li>Recent psychiatric illness or suicidal ideation</li>
                                    </ul>

                                    <div>Pediatric Considerations (if applicable)</div>
                                    <ul style={{
                                      marginLeft: '20px',
                                      listStyleType: 'disc'
                                    }}>
                                      <li>Age &lt;2 years</li>
                                      <li>Risk of cerebral edema, especially in pediatric patients</li>
                                      <li>Parental inability to manage condition at home</li>
                                    </ul>
                                  </div>
                                </div>{/* Bottom Success Banner */}
                                <div style={{
                                  height: '56px',
                                  background: '#4ED55E',
                                  marginTop: '32px',
                                  marginBottom: '15px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '0 24px'
                                }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                      width: '21px',
                                      height: '21px',
                                      borderRadius: '50%',
                                      border: '1.5px solid black',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '14px',
                                      fontWeight: 'bold',
                                      color: 'black'
                                    }}>
                                      œ“
                                    </div>
                                    <span style={{
                                      color: '#000',
                                      fontFamily: 'Inter',
                                      fontSize: '14px',
                                      fontStyle: 'normal',
                                      fontWeight: '500',
                                      lineHeight: 'normal'
                                    }}>
                                      Selections Made, Criteria Met
                                    </span>
                                  </div>
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '25px',
                                    marginLeft: '50px'
                                  }}>
                                    <button style={{
                                      width: '82px',
                                      height: '32px',
                                      background: '#D9D9D9',
                                      color: '#000',
                                      fontFamily: 'Inter',
                                      fontSize: '13.2px',
                                      fontStyle: 'normal',
                                      fontWeight: '500',
                                      lineHeight: 'normal',
                                      border: 'none',
                                      cursor: 'pointer'
                                    }}>
                                      Save
                                    </button>
                                    <button style={{
                                      background: 'transparent',
                                      color: '#000',
                                      fontFamily: 'Inter',
                                      fontSize: '14px',
                                      fontStyle: 'normal',
                                      fontWeight: '500',
                                      lineHeight: 'normal',
                                      textDecorationLine: 'underline',
                                      textDecorationStyle: 'solid',
                                      textDecorationSkipInk: 'auto',
                                      textDecorationThickness: 'auto',
                                      textUnderlineOffset: 'auto',
                                      textUnderlinePosition: 'from-font',
                                      border: 'none',
                                      cursor: 'pointer'
                                    }}>
                                      Cancel
                                    </button>
                                  </div>
                                </div>                                {/* Action Buttons */}
                                <div style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '15px',
                                  marginBottom: '24px'
                                }}>
                                  <button style={{
                                    display: 'flex',
                                    width: '146px',
                                    height: '26px',
                                    padding: '8px 25px',
                                    gap: '10px',
                                    background: '#D9D9D9',
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '11px',
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    lineHeight: 'normal',
                                    border: 'none',
                                    cursor: 'pointer',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}>
                                    View Note History
                                  </button>
                                  <button style={{
                                    display: 'flex',
                                    width: '114px',
                                    height: '26px',
                                    padding: '8px 25px',
                                    gap: '10px',
                                    background: '#D9D9D9',
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '11px',
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    lineHeight: 'normal',
                                    border: 'none',
                                    cursor: 'pointer',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}>
                                    Edit Note
                                  </button>
                                </div>
                              </div>
                            )}                            {/* Step 4: Medical Necessity Guidelines - Goal Length of Stay */}                            {clinicalReviewStep === 4 && (
                              <div style={{
                                backgroundColor: '#FFFFFF',
                                fontFamily: 'Arial, Helvetica, sans-serif',
                                padding: '0',
                                margin: '0'
                              }}>
                                {/* Separator - adding vertical spacing */}
                                <div style={{ marginBottom: '24px', borderTop: '1px solid #E5E7EB', width: '95%' }}></div>

                                {/* Main Content */}
                                <div style={{ padding: '7px 42px' }}>                                  {/* Title */}
                                  <h1 style={{
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '20px',
                                    fontStyle: 'normal',
                                    fontWeight: '700',
                                    lineHeight: 'normal',
                                    marginBottom: '19px',
                                    margin: '0 0 19px 0'
                                  }}>
                                    Goal Length of Stay: 2 Days
                                  </h1>

                                  {/* Brief Stay Section */}
                                  <div style={{ marginBottom: '25px' }}>                                    <h2 style={{
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '700',
                                    lineHeight: '150%',
                                    marginBottom: '12px',
                                    margin: '0 0 5px 0'
                                  }}>                                      Brief Stay (1 to 3 Days) €“ Target LOS: 2 Days
                                  </h2>

                                    <ul style={{
                                      margin: '0 0 5px 0',
                                      paddingLeft: '20px',
                                      fontSize: '13px',
                                      fontStyle: 'normal',
                                      fontWeight: '400',
                                      lineHeight: '150%',
                                      color: '#000',
                                      fontFamily: 'Inter',
                                      listStyleType: 'disc'
                                    }}>
                                      <li style={{ marginBottom: '6px' }}>Initial stabilization within first 12€“24 hours</li>
                                      <li style={{ marginBottom: '6px' }}>Transition from IV insulin to subcutaneous insulin regimen on Day 2</li>                                      <li style={{ marginBottom: '6px' }}>
                                        Correction of:
                                        <ul style={{
                                          marginTop: '3px',
                                          marginLeft: '15px',
                                          marginBottom: '3px',
                                          listStyleType: 'disc'
                                        }}>
                                          <li>Acidosis</li>
                                          <li>Keto sis</li>
                                          <li>Electrolyte imbalances</li>
                                        </ul>
                                      </li>
                                      <li style={{ marginBottom: '6px' }}>Nutritional intake established with adequate PO hydration</li>
                                      <li style={{ marginBottom: '6px' }}>Ongoing monitoring of labs and vitals for stability</li>                                      <li style={{ marginBottom: '6px' }}>
                                        Diabetes education and discharge planning initiated:
                                        <ul style={{
                                          marginTop: '3px',
                                          marginLeft: '15px',
                                          marginBottom: '3px',
                                          listStyleType: 'disc'
                                        }}>
                                          <li>Insulin use, glucose monitoring</li>
                                          <li>Sick-day management</li>
                                        </ul>
                                      </li>
                                      <li style={{ marginBottom: '6px' }}>Social work consult as needed (e.g., cost of insulin, access to care)</li>
                                      <li style={{ marginBottom: '6px' }}>Outpatient endocrinology follow-up arranged</li>                                      <li style={{ marginBottom: '6px' }}>Documented improvement in mental status and vitals</li>
                                    </ul>

                                    <p style={{
                                      fontSize: '13px',
                                      fontStyle: 'normal',
                                      fontWeight: '400',
                                      lineHeight: '150%',
                                      color: '#000',
                                      fontFamily: 'Inter'
                                    }}>
                                      Represents a well-executed, protocol-based DKA management plan with effective interdisciplinary care coordination
                                    </p>
                                  </div>

                                  {/* Moderate Stay Section */}
                                  <div style={{ marginBottom: '25px' }}>                                    <h2 style={{
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '700',
                                    lineHeight: '150%',
                                    marginBottom: '12px',
                                    margin: '0 0 5px 0'
                                  }}>                                      Moderate Stay (4 to 7 Days)
                                  </h2>

                                    <ul style={{
                                      margin: '0 0 5px 0',
                                      paddingLeft: '20px',
                                      fontSize: '13px',
                                      fontStyle: 'normal',
                                      fontWeight: '400',
                                      lineHeight: '150%',
                                      color: '#000',
                                      fontFamily: 'Inter',
                                      listStyleType: 'disc'
                                    }}>
                                      <li style={{ marginBottom: '6px' }}>Delayed response to treatment (e.g., persistent acidosis or ketosis)</li>                                      <li style={{ marginBottom: '6px' }}>
                                        Complicating factors, such as:
                                        <ul style={{
                                          marginTop: '3px',
                                          marginLeft: '15px',
                                          marginBottom: '3px',
                                          listStyleType: 'disc'
                                        }}>
                                          <li>Infection requiring IV antibiotics</li>
                                          <li>Renal insufficiency delaying fluid or insulin management</li>
                                        </ul>
                                      </li>
                                      <li style={{ marginBottom: '6px' }}>Nutrition or GI issues (e.g., nausea, gastroparesis) prolonging PO tolerance</li>
                                      <li style={{ marginBottom: '6px' }}>Slow weaning off insulin drip due to rebound hyperglycemia</li>
                                      <li style={{ marginBottom: '6px' }}>Psychosocial or discharge barriers (e.g., homelessness, no caregiver)</li>                                      <li style={{ marginBottom: '6px' }}>Diabetes education prolonged or not yet completed</li>
                                    </ul>

                                    <p style={{
                                      fontSize: '13px',
                                      fontStyle: 'normal',
                                      fontWeight: '400',
                                      lineHeight: '150%',
                                      color: '#000',
                                      fontFamily: 'Inter'
                                    }}>
                                      Indicates medical or social complexity requiring extended monitoring or coordination
                                    </p>
                                  </div>

                                  {/* Prolonged Stay Section */}
                                  <div style={{ marginBottom: '25px' }}>                                    <h2 style={{
                                    color: '#000',
                                    fontFamily: 'Inter',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: '700',
                                    lineHeight: '150%',
                                    marginBottom: '12px',
                                    margin: '0 0 5px 0'
                                  }}>                                      Prolonged Stay (&gt;7 Days)
                                  </h2>

                                    <ul style={{
                                      margin: '0 0 5px 0',
                                      paddingLeft: '20px',
                                      fontSize: '13px',
                                      fontStyle: 'normal',
                                      fontWeight: '400',
                                      lineHeight: '150%',
                                      color: '#000',
                                      fontFamily: 'Inter',
                                      listStyleType: 'disc'
                                    }}>
                                      <li style={{ marginBottom: '6px' }}>Severe or refractory DKA (e.g., pH &lt;7.0 not improving)</li>
                                      <li style={{ marginBottom: '6px' }}>Major comorbidities (e.g., MI, stroke, sepsis, pancreatitis)</li>
                                      <li style={{ marginBottom: '6px' }}>ICU-level complications (e.g., cerebral edema, ARDS)</li>
                                      <li style={{ marginBottom: '6px' }}>Psychiatric decompensation or suicide risk requiring inpatient psych</li>
                                      <li style={{ marginBottom: '6px' }}>Lack of safe discharge plan or need for long-term placement</li>                                      <li style={{ marginBottom: '6px' }}>Multidisciplinary involvement (e.g., case management, psychiatry, rehab)</li>
                                    </ul>

                                    <p style={{
                                      fontSize: '13px',
                                      fontStyle: 'normal',
                                      fontWeight: '400',
                                      lineHeight: '150%',
                                      color: '#000',
                                      fontFamily: 'Inter'
                                    }}>
                                      Represents a highly complex patient requiring extended inpatient resources beyond standard DKA care
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}                            {/* Navigation Controls */}
                            <div style={{
                              display: 'flex',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              marginTop: '20px',
                              marginLeft: clinicalReviewStep === 4 ? '42px' : '0px',
                              gap: '25px'
                            }}>
                              <button
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
                                onClick={clinicalReviewStep === 4 ? () => setActiveAuthTab('Closed') : handleClinicalReviewNext}
                                disabled={false}
                                style={{
                                  width: clinicalReviewStep === 4 ? 'auto' : '50px',
                                  height: '20px',
                                  padding: clinicalReviewStep === 4 ? '6px 12px' : '1px 15px',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: '2.443px',
                                  border: '1px solid #BDBDBD',
                                  background: '#DEDEDE',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  fontSize: clinicalReviewStep === 4 ? '12px' : 'inherit',
                                  fontFamily: clinicalReviewStep === 4 ? 'Arial' : 'inherit',
                                  color: clinicalReviewStep === 4 ? '#000' : 'inherit'
                                }}
                              >
                                {clinicalReviewStep === 4 ? (
                                  'Close'
                                ) : (
                                  <img
                                    src={caratRightIcon}
                                    alt="Next"
                                    style={{
                                      width: 'auto',
                                      height: '20px'
                                    }}
                                  />)}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Other Auth Tab Contents */}                        {/* Closed Tab Content - Duplicate of Request Submitted with modifications */}
                        {activeRequestTab === '20250P000367' && activeAuthTab === 'Closed' && (
                          <div className={styles.authorizationContent}>
                            {/* Header */}
                            <h2 className={styles.authorizationHeader}>Authorization Request Summary</h2>
                            {/* Content Area */}
                            <div>
                              {/* First Row - 4 data points + Status */}
                              <div className={styles.authGridLayout}>
                                <div className={styles.authGridItem}>
                                  <div className={styles.authGridLabel}>Authorization #</div>
                                  <div className={styles.authGridValue}>2025OP000367</div>
                                </div>
                                <div className={styles.authGridItem}>
                                  <div className={styles.authGridLabel}>Received Date</div>
                                  <div className={styles.authGridValue}>04/28/2025 03:47:01 AM</div>
                                </div>
                                <div className={styles.authGridItem}>
                                  <div className={styles.authGridLabel}>Admission Date</div>
                                  <div className={styles.authGridValue}>04/28/2025 02:58:09 AM</div>
                                </div>
                                <div className={styles.authGridItem}>
                                  <div className={styles.authGridLabel}>Request Type</div>
                                  <div className={styles.authGridValue}>Standard</div>
                                </div>
                                <div className={styles.authGridItem}>
                                  <div className={styles.authGridLabel}>Status</div>
                                  <div className={styles.flexCenterGap10}>                                    <select className={styles.authStatusSelectClosed}>
                                    <option>Pending</option>
                                    <option>Approve</option>
                                    <option>Send to Review</option>
                                    <option>Deny</option>
                                  </select>
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
                                </div>                                <div>
                                  <div style={{ fontSize: '11px', fontWeight: '500', color: '#787878', marginBottom: '4px' }}>Updated</div>
                                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#787878' }}>Concurrent Review</div>
                                </div>
                              </div>
                            </div>
                            {/* Notes Section */}
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
                              <div style={{ width: '659px' }}>
                                <p style={{
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
                        )}

                        {/* Attachments Section for Closed Tab */}
                        {activeRequestTab === '20250P000367' && activeAuthTab === 'Closed' && (
                          <div>
                            <h3 className={styles.attachmentsTitle}>
                              Attachments
                            </h3>
                            <div className={styles.attachmentsContainer}>
                              {attachments.map((attachment) => (
                                <AttachmentItem key={attachment.id} attachment={attachment} />
                              ))}
                            </div>
                          </div>
                        )}

                        {activeRequestTab === '20250P000367' && activeAuthTab !== 'Request Submitted' && activeAuthTab !== 'Clinical Review' && activeAuthTab !== 'Closed' && (
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
    </div >
  );
};

export default Member;





