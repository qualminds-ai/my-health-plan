import React, { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import MemberHeader from './member/MemberHeader';
import MemberInfoBar from './member/MemberInfoBar';
import MemberTabs from './member/MemberTabs';
import CMAlert from './member/CMAlert';
import CMOverview from './member/CMOverview';
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

// Member Component with hash-based routing for deep linking and browser navigation

const Member = ({
  user,
  memberData: propMemberData,
  onLogout,
  onBack,
  onNavigate,
  activeMode,
  scenarios,
  availablePersonas,
  activePersona,
  onPersonaSwitch,
  hasScenario
}) => {
  const topRef = useRef(null);
  const authContentRef = useRef(null);
  const animationTimeoutsRef = useRef([]);

  // Listen for user/persona changes and apply any necessary data modifications
  const [modifiedMemberData, setModifiedMemberData] = useState(propMemberData);

  // Update modified member data when props change or scenarios change
  useEffect(() => {
    if (propMemberData) {
      let updatedData = { ...propMemberData };

      // Apply scenario-specific modifications if needed
      if (scenarios.includes('sepsis') && (activeMode === 'UM' || activeMode === 'UM-SNF')) {
        // Future: Add other sepsis-related modifications here without alert
        console.log('🦠 Sepsis scenario active for', activeMode, 'mode');
      }

      // Apply persona-specific modifications if needed
      // (Future: different personas might see different data or have different permissions)

      setModifiedMemberData(updatedData);
      console.log('👤 Member data updated for user/persona/scenario changes');
    }
  }, [propMemberData, scenarios, activeMode, activePersona]);

  // Define the tabs - memoized to prevent useEffect re-runs
  const tabs = useMemo(() => ['Overview', 'Eligibility & Benefits', 'Care Plans', 'Discharge Plans', 'Concierge Care', 'Authorizations', 'Notes', 'Medications', 'Cases', 'Assessments'], []);

  // Define authorization sub-tabs - memoized to prevent useEffect re-runs
  const authTabs = useMemo(() => [
    { id: 'Request Submitted', label: 'Request Submitted', status: 'active' },
    { id: 'Clinical Review', label: 'Clinical Review', status: 'pending' },
    { id: 'Request Decision Appeal', label: 'Request Decision Appeal', status: 'pending' },
    { id: 'MD Review', label: 'MD Review', status: 'pending' },
    { id: 'Concurrent Review', label: 'Concurrent Review', status: 'pending' },
    { id: 'Closed', label: 'Closed', status: 'pending' }
  ], []);

  // Helper function to parse hash and extract tab info - ADAPTED FOR HASHROUTER
  const parseHashForTabs = (userMode = 'UM') => {
    const hash = window.location.hash; // Full hash including route

    // Dynamic default authorization number based on the user mode
    const defaultAuthNumber = userMode === 'UM-SNF' ? '2025OP000390' : '2025OP000389';

    // With HashRouter, hash format is: #/member/MEM001?tab=Authorizations&authTab=Clinical%20Review&step=2
    // Split by '?' to separate route from query parameters
    const hashParts = hash.split('?');

    if (hashParts.length < 2) {
      // No query parameters, return defaults
      return { mainTab: 'Authorizations', authTab: 'Request Submitted', requestTab: defaultAuthNumber, clinicalStep: 1 };
    }

    const queryString = hashParts[1]; // Everything after the '?'

    // Parse the query parameters
    const params = new URLSearchParams(queryString);
    const mainTab = params.get('tab') || 'Authorizations';
    const authTab = params.get('authTab') || 'Request Submitted';
    const requestTab = params.get('requestTab') || defaultAuthNumber;
    const clinicalStep = parseInt(params.get('step')) || 1;

    // Validate that the main tab exists
    const validMainTab = tabs.includes(mainTab) ? mainTab : 'Authorizations';
    const validAuthTab = authTabs.find(tab => tab.id === authTab) ? authTab : 'Request Submitted';
    const validClinicalStep = (clinicalStep >= 1 && clinicalStep <= 4) ? clinicalStep : 1;

    return { mainTab: validMainTab, authTab: validAuthTab, requestTab, clinicalStep: validClinicalStep };
  };

  // Helper function to update hash - ADAPTED FOR HASHROUTER
  const updateHash = (mainTab, authTab = null, requestTab = null, clinicalStep = null) => {
    const params = new URLSearchParams();
    params.set('tab', mainTab);

    if (mainTab === 'Authorizations') {
      if (authTab) params.set('authTab', authTab);
      if (requestTab) params.set('requestTab', requestTab);
      // Add clinical review step to URL only when in Clinical Review tab
      if (authTab === 'Clinical Review' && clinicalStep) {
        params.set('step', clinicalStep.toString());
      }
    }

    const tabHash = params.toString();

    // HASHROUTER FIX: Preserve the route path and append our tab hash
    // With HashRouter, window.location.hash contains the route (e.g., '#/member/MEM001')
    // We need to append our tab parameters to this route hash
    let currentRouteHash = window.location.hash;

    // If there's no hash, we shouldn't be here, but default to member page
    if (!currentRouteHash || currentRouteHash === '#') {
      currentRouteHash = '#/member/M1000020000'; // fallback
    }

    // Remove any existing tab parameters from the route hash
    const routePart = currentRouteHash.split('?')[0]; // Keep only the route part

    // Combine route with tab parameters
    const newHash = `${routePart}?${tabHash}`;

    // Update the hash (this preserves the route)
    window.location.hash = newHash;
  };

  // Initialize state from hash
  const initialTabState = parseHashForTabs(activeMode);
  const [activeTab, setActiveTab] = useState(initialTabState.mainTab);
  const [activeAuthTab, setActiveAuthTab] = useState(initialTabState.authTab);
  const [activeRequestTab, setActiveRequestTab] = useState(initialTabState.requestTab);
  const [clinicalReviewStep, setClinicalReviewStep] = useState(initialTabState.clinicalStep);
  const [showClinicalIndicators, setShowClinicalIndicators] = useState([false, false, false]);
  const [selectedGuidelineRows, setSelectedGuidelineRows] = useState(new Set());
  // Set initial hash on component mount if none exists
  useEffect(() => {
    // CRITICAL FIX: Handle incorrect URL format for HashRouter
    // With HashRouter, ALL routes should be in the hash, not in pathname
    if (window.location.pathname !== '/') {
      // Extract member info from pathname
      const pathname = window.location.pathname;
      const currentHash = window.location.hash;

      // Build correct HashRouter URL
      let correctHash;
      if (currentHash && currentHash.startsWith('#')) {
        // If there's already a hash, preserve any tab parameters
        const hashParts = currentHash.split('?');
        if (hashParts.length > 1) {
          // There are tab parameters, preserve them
          correctHash = `#${pathname}?${hashParts[1]}`;
        } else {
          // No tab parameters, just the route
          correctHash = `#${pathname}`;
        }
      } else {
        // No hash, just move pathname to hash
        correctHash = `#${pathname}`;
      }

      // Use history.replaceState instead of window.location.href to prevent page reload
      window.history.replaceState(null, '', `/${correctHash}`);
      return; // Exit early, let component handle the new URL
    }

    const hash = window.location.hash;
    const hashParts = hash.split('?');

    if (hashParts.length < 2) {
      // No query parameters, set initial hash with current state - but don't cause flickering
      setTimeout(() => {
        updateHash(initialTabState.mainTab, initialTabState.authTab, initialTabState.requestTab, initialTabState.clinicalStep);
      }, 50);
    }
  }, [initialTabState.mainTab, initialTabState.authTab, initialTabState.requestTab, initialTabState.clinicalStep]);

  // Listen for hash changes - ADAPTED FOR HASHROUTER
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      // Split by '?' to separate route from query parameters
      const hashParts = hash.split('?');

      if (hashParts.length < 2) {
        // No query parameters, set defaults
        const defaultAuthNumber = activeMode === 'UM-SNF' ? '2025OP000390' : '2025OP000389';
        setActiveTab('Authorizations');
        setActiveAuthTab('Request Submitted');
        setActiveRequestTab(defaultAuthNumber);
        setClinicalReviewStep(1);
        return;
      }

      const queryString = hashParts[1];

      // Parse the query parameters
      const params = new URLSearchParams(queryString);
      const defaultAuthNumber = activeMode === 'UM-SNF' ? '2025OP000390' : '2025OP000389';
      const mainTab = params.get('tab') || 'Authorizations';
      const authTab = params.get('authTab') || 'Request Submitted';
      const requestTab = params.get('requestTab') || defaultAuthNumber;
      const clinicalStep = parseInt(params.get('step')) || 1;

      // Validate that the main tab exists
      const validMainTab = tabs.includes(mainTab) ? mainTab : 'Authorizations';
      const validAuthTab = authTabs.find(tab => tab.id === authTab) ? authTab : 'Request Submitted';
      const validClinicalStep = (clinicalStep >= 1 && clinicalStep <= 4) ? clinicalStep : 1;

      setActiveTab(validMainTab);
      setActiveAuthTab(validAuthTab);
      setActiveRequestTab(requestTab);
      setClinicalReviewStep(validClinicalStep);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [tabs, authTabs, activeMode]);

  // Handle Clinical Review Step 2 animation whenever step changes to 2
  useEffect(() => {
    // Clear any existing timeouts
    animationTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    animationTimeoutsRef.current = [];

    if (activeAuthTab === 'Clinical Review' && clinicalReviewStep === 2) {
      // Reset and animate clinical indicators for step 2
      setShowClinicalIndicators([false, false, false]);

      // Animate indicators one by one with staggered timing
      animationTimeoutsRef.current = [
        setTimeout(() => setShowClinicalIndicators([true, false, false]), 500),
        setTimeout(() => setShowClinicalIndicators([true, true, false]), 1200),
        setTimeout(() => setShowClinicalIndicators([true, true, true]), 1900)
      ];

      // Cleanup function to clear timeouts if component unmounts or step changes
      return () => {
        animationTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
        animationTimeoutsRef.current = [];
      };
    } else {
      // Reset indicators when not in step 2
      setShowClinicalIndicators([false, false, false]);
    }
  }, [clinicalReviewStep, activeAuthTab]);

  // Enhanced tab change handler
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    // Reset clinical review step when switching away from Clinical Review
    if (newTab !== 'Authorizations' || activeAuthTab !== 'Clinical Review') {
      setClinicalReviewStep(1);
    }
    updateHash(newTab, newTab === 'Authorizations' ? activeAuthTab : null, newTab === 'Authorizations' ? activeRequestTab : null, newTab === 'Authorizations' && activeAuthTab === 'Clinical Review' ? clinicalReviewStep : null);
  };

  // Use modified member data if available, otherwise use prop data or static demo data
  const memberData = modifiedMemberData || propMemberData || {
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
  // Dynamic title for Summary of Attachments based on authorization number
  const getSummaryTitle = () => {
    return `${activeRequestTab} Summary`;
  };

  const attachments = [
    { id: 1, title: getSummaryTitle(), date: 'Apr 28, 2025', size: '3KB', type: 'pdf', isSummary: true },
    { id: 2, title: 'Authorization request (original fax)', date: 'Apr 28, 2025', size: '31KB', type: 'fax' },
    { id: 3, title: 'Medical History - Robert Abbott', date: 'Apr 28, 2025', size: '6KB', type: 'pdf' },
    { id: 4, title: 'Specialist Notes', date: 'Apr 28, 2025', size: '6KB', type: 'pdf' },
    { id: 5, title: 'Physical and Labs - Robert Abbott', date: 'Apr 28, 2025', size: '31KB', type: 'text' },
    { id: 6, title: 'Physician notes', date: 'Apr 28, 2025', size: '90KB', type: 'text' },
    { id: 7, title: 'Nursing notes', date: 'Apr 28, 2025', size: '99KB', type: 'text' },
    { id: 8, title: 'Referral: infectious disease physician', date: 'Apr 28, 2025', size: '31KB', type: 'pdf' },
    { id: 9, title: 'Referral: discharge planner', date: 'Apr 28, 2025', size: '3KB', type: 'pdf' },
  ];  // Function to get attachment icon based on type
  const getAttachmentIcon = (type, title) => {
    // Special cases based on title
    if (title === 'Authorization request (original fax)' || title === 'Physical and Labs - Robert Abbott') {
      return faxDocIcon;
    }
    if (title === 'Referral: infectious disease physician' || title === 'Referral: discharge planner') {
      return pdfDocIcon;
    }
    // Check for dynamic summary title (format: "2025OP000389 Summary" or "2025OP000390 Summary")
    if (title.includes(' Summary') || title === 'Medical History - Robert Abbott' || title === 'Specialist Notes') {
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
  // Enhanced auth tab click handler
  const handleAuthTabClick = (tabId) => {
    setActiveAuthTab(tabId);
    // Reset clinical review step when switching away from Clinical Review
    if (tabId !== 'Clinical Review') {
      setClinicalReviewStep(1);
    }
    updateHash(activeTab, tabId, activeRequestTab, tabId === 'Clinical Review' ? clinicalReviewStep : null);

    // Simple scroll to top
    if (authContentRef.current) {
      const rect = authContentRef.current.getBoundingClientRect();
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const targetScrollY = currentScrollY + rect.top - 20;
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  // Enhanced request tab change handler
  const handleRequestTabChange = (requestTab) => {
    setActiveRequestTab(requestTab);
    updateHash(activeTab, activeAuthTab, requestTab, activeAuthTab === 'Clinical Review' ? clinicalReviewStep : null);
  };
  // Handle clinical review step navigation with URL updates
  const handleClinicalReviewNext = () => {
    if (clinicalReviewStep < 4) {
      const nextStep = clinicalReviewStep + 1;
      setClinicalReviewStep(nextStep);
      updateHash(activeTab, activeAuthTab, activeRequestTab, nextStep);
    }
  };

  const handleClinicalReviewPrev = () => {
    if (clinicalReviewStep > 1) {
      const prevStep = clinicalReviewStep - 1;
      setClinicalReviewStep(prevStep);
      updateHash(activeTab, activeAuthTab, activeRequestTab, prevStep);
    }
  };

  // Enhanced handler for closing clinical review (step 4 → Closed tab)
  const handleClinicalReviewClose = () => {
    setActiveAuthTab('Closed');
    setClinicalReviewStep(1); // Reset for next time
    updateHash(activeTab, 'Closed', activeRequestTab, null);
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

  // Handle navigation from header - prevent navigation away from member page for non-critical actions
  const handleHeaderNavigation = (navItem) => {
    // Only allow logout and dashboard navigation, ignore others to prevent accidental navigation
    if (navItem === 'Dashboard' && onNavigate) {
      onNavigate(navItem);
    }
    // For other nav items, just log for now to prevent accidental navigation away from member
    else {
      console.log('Ignoring header navigation to:', navItem, 'to stay on member page');
    }
  };

  return (
    <div className="min-h-screen">
      <div ref={topRef} id="top"></div>
      <Header
        user={user}
        onLogout={onLogout}
        onNavigate={handleHeaderNavigation}
        activeTab="Members"
        availablePersonas={availablePersonas}
        activePersona={activePersona}
        onPersonaSwitch={onPersonaSwitch}
      />      {/* Main Content */}
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
          memberNumber="M1000020000"
          dateOfBirth="01/01/1974"
          age={51}
          gender="Male"
          eligibilityPeriod="10/01/2024-12/31/2025"
          language="English"
          programs="Care Coordination: ERM PH"
          bhpType="Large Group"
          optOut="No"
        />

        {/* CM Alert Section - Only for CM users */}
        <CMAlert activeMode={activeMode} />

        {/* Tab Navigation */}
        <MemberTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {/* Tab Content */}
        <div className={`${styles.tabContent} py-4`}>
          {activeTab === 'Overview' && (
            <div className="w-full">
              {activeMode === 'CM' ? (
                <CMOverview memberData={memberData} activeMode={activeMode} />
              ) : (
                <div className="w-full">
                  <div className="bg-white border-0 shadow-sm rounded-lg">
                    <div className="p-6 text-center py-12">
                      <i className="bi bi-construction text-gray-600 text-5xl"></i>
                      <h5 className="text-gray-600 mt-3 text-lg font-semibold">Member Overview</h5>
                      <p className="text-gray-600">This section is under development</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}            {activeTab === 'Authorizations' && (
            <div className="w-full">
              <div className="w-full">
                <div className="py-4">
                  {/* Request Navigation */}
                  <AuthorizationRequestNavTabs
                    activeRequestTab={activeRequestTab}
                    setActiveRequestTab={handleRequestTabChange}
                  />

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
                  {(activeRequestTab === '2025OP000389' || activeRequestTab === '2025OP000390') && (
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
                          handleClinicalReviewClose={handleClinicalReviewClose}
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
                          activeRequestTab={activeRequestTab}
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

Member.propTypes = {
  user: PropTypes.object.isRequired,
  memberData: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  onNavigate: PropTypes.func,
  activeMode: PropTypes.string,
  scenarios: PropTypes.arrayOf(PropTypes.string),
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
  hasScenario: PropTypes.func
};

Member.defaultProps = {
  memberData: null,
  onBack: null,
  onNavigate: null,
  activeMode: 'UM',
  scenarios: []
};

export default Member;











