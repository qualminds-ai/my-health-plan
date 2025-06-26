import React, { useState, useRef } from 'react';
import Header from './Header';
import MemberHeader from './member/MemberHeader';
import MemberInfoBar from './member/MemberInfoBar';
import MemberTabs from './member/MemberTabs';
import styles from './Member.module.css';
import AuthorizationWorkflowTabs from './member/authorization/AuthorizationWorkflowTabs';
import AuthorizationRequestNavTabs from './member/authorization/AuthorizationRequestNavTabs';
import AuthorizationRequestSubmitted from './member/authorization/AuthorizationRequestSubmitted';
import AuthorizationClosed from './member/authorization/AuthorizationClosed';
import AuthorizationClinicalReview from './member/authorization/AuthorizationClinicalReview';

// Import authorization assets
import faxDocIcon from '../assets/authorizations/fax-doc-icon.png';
import pdfDocIcon from '../assets/authorizations/pdf-doc-icon.png';
import textDocIcon from '../assets/authorizations/text-doc-icon.png';

const Member = ({ user, memberData: propMemberData, onLogout, onBack, onNavigate }) => {
  const topRef = useRef(null); const authContentRef = useRef(null); const [activeTab, setActiveTab] = useState('Authorizations');
  const [activeAuthTab, setActiveAuthTab] = useState('Request Submitted');
  const [activeRequestTab, setActiveRequestTab] = useState('20250P000367'); const [clinicalReviewStep, setClinicalReviewStep] = useState(1);
  const [showClinicalIndicators, setShowClinicalIndicators] = useState([false, false, false]);
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
  };

  // Static authorization data for attachments and clinical review only
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
    const dynamicBgStyle = { backgroundImage: `url(${getAttachmentIcon(attachment.type, attachment.title)})` };
    return (
      <div className={styles.attachmentItem}>
        <div
          className={`${styles.attachmentIcon} ${styles.attachmentIconBg} ${styles.attachmentIconDynamicBg}`}
          style={dynamicBgStyle}
        />
        <div className={styles.attachmentContent}>
          <div className={`${styles.attachmentTitle} ${isActive ? styles.attachmentTitleActive : styles.attachmentTitleInactive}`}>{attachment.title}</div>
          <div className={`${styles.attachmentMeta} ${isActive ? styles.attachmentMetaActive : styles.attachmentMetaInactive}`}>
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
      <div ref={topRef} id="top"></div>
      <Header user={user} onLogout={onLogout} onNavigate={onNavigate} activeTab="Members" />      {/* Main Content */}
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
        <div className={`${styles.tabContent} py-4`}>
          {activeTab === 'Overview' && (
            <div className="w-full">
              <div className="w-full">
                <div className="bg-white border-0 shadow-sm rounded-lg">
                  <div className="p-6 text-center py-12">
                    <i className="bi bi-construction text-gray-600 text-5xl"></i>
                    <h5 className="text-gray-600 mt-3 text-lg font-semibold">Member Overview</h5>
                    <p className="text-gray-600">This section is under development</p>
                  </div>
                </div>
              </div>
            </div>
          )}            {activeTab === 'Authorizations' && (
            <div className="w-full">
              <div className="w-full">
                <div className="py-4">
                  {/* Request Navigation */}
                  <AuthorizationRequestNavTabs activeRequestTab={activeRequestTab} setActiveRequestTab={setActiveRequestTab} />

                  {/* Request History Tab Content - Placeholder */}
                  {activeRequestTab === 'Request History' && (
                    <div className="w-full">
                      <div className="bg-white border-0 shadow-sm rounded-lg">
                        <div className="p-6 text-center py-12">
                          <i className="bi bi-construction text-gray-600 text-5xl"></i>
                          <h5 className="text-gray-600 mt-3 text-lg font-semibold">Authorization Request History</h5>
                          <p className="text-gray-600">This section is under development</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Request Tab Content - Only show the specific authorization */}
                  {activeRequestTab === '20250P000367' && (
                    <div className="request-detail-content">
                      {/* Authorization Workflow Progress */}
                      <div className="authorization-workflow mb-6">
                        <AuthorizationWorkflowTabs
                          authTabs={authTabs}
                          activeAuthTab={activeAuthTab}
                          handleAuthTabClick={handleAuthTabClick}
                        />
                      </div>

                      {/* Authorization Request Summary */}
                      {activeAuthTab === 'Request Submitted' && (
                        <AuthorizationRequestSubmitted
                          getStatusBadgeClass={getStatusBadgeClass}
                          getPriorityBadgeClass={getPriorityBadgeClass}
                          attachments={attachments}
                          AttachmentItem={AttachmentItem}
                        />
                      )}

                      {/* Clinical Review Content */}
                      {activeAuthTab === 'Clinical Review' && (
                        <AuthorizationClinicalReview
                          styles={styles}
                          clinicalReviewStep={clinicalReviewStep}
                          showClinicalIndicators={showClinicalIndicators}
                          selectedGuidelineRows={selectedGuidelineRows}
                          handleClinicalReviewNext={handleClinicalReviewNext}
                          handleClinicalReviewPrev={handleClinicalReviewPrev}
                          setShowClinicalIndicators={setShowClinicalIndicators}
                          setSelectedGuidelineRows={setSelectedGuidelineRows}
                          setActiveAuthTab={setActiveAuthTab}
                        />
                      )}

                      {/* Closed Tab Content */}
                      {activeAuthTab === 'Closed' && (
                        <AuthorizationClosed
                          attachments={attachments}
                          AttachmentItem={AttachmentItem}
                        />
                      )}

                      {/* Other Auth Tab Contents */}
                      {activeAuthTab !== 'Request Submitted' && activeAuthTab !== 'Clinical Review' && activeAuthTab !== 'Closed' && (
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
    </div >
  );
};

export default Member;





