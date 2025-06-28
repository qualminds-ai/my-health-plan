import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Member from './components/Member';
import memberService from './services/memberService';
import { useAuth } from './hooks/useAuth';
import { ROUTES } from './constants';
import './App.css';

/**
 * Member Page Component
 * Handles member detail view
 */
const MemberPage = ({
  user,
  onLogout,
  onNavigate,
  activeMode,
  scenarios,
  availablePersonas,
  activePersona,
  onPersonaSwitch,
  getMemberSepsisInfo,
  hasScenario
}) => {
  const { memberNumber } = useParams();
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchMemberData = useCallback(async () => {
    if (!memberNumber) {
      setError('Member number not provided in URL.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Fetching member data...');
      console.log('Current user:', user);
      console.log('Current activePersona:', activePersona);
      console.log('Current scenarios:', scenarios);

      const data = await memberService.getMemberByNumber(memberNumber);

      if (data) {
        // Apply persona/scenario-specific member data modifications if needed
        let modifiedData = data;

        // Apply sepsis modifications if scenario is active and user is appropriate
        if (getMemberSepsisInfo && scenarios.includes('sepsis')) {
          const sepsisInfo = getMemberSepsisInfo(data.memberNumber || memberNumber);
          if (sepsisInfo) {
            modifiedData = {
              ...data,
              ...sepsisInfo,
              originalData: data // Keep original for reference
            };
            console.log('🦠 Applied sepsis modifications to member data:', sepsisInfo);
          }
        }

        setMemberData(modifiedData);
        console.log('👤 Member data loaded successfully');
      } else {
        setError('Member not found.');
      }
    } catch (err) {
      console.error('Error fetching member data:', err);
      setError(err.message || 'Failed to load member data.');
    } finally {
      setLoading(false);
    }
  }, [memberNumber, user, activePersona, scenarios, getMemberSepsisInfo]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (user && token) {
      fetchMemberData();
    }
  }, [user, scenarios, activePersona, fetchMemberData]); // Re-fetch when persona/scenarios change

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" aria-label="Loading"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-20 px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
      </div>
    );
  }

  if (!memberData) {
    return (
      <div className="max-w-4xl mx-auto mt-20 px-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">Member data not available.</div>
      </div>
    );
  }

  return (
    <Member
      user={user}
      memberData={memberData}
      onLogout={onLogout}
      onBack={() => navigate(ROUTES.DASHBOARD)}
      onNavigate={onNavigate}
      // Pass user mode props
      activeMode={activeMode}
      scenarios={scenarios}
      // Pass persona props
      availablePersonas={availablePersonas}
      activePersona={activePersona}
      onPersonaSwitch={onPersonaSwitch}
      // Pass sepsis scenario functions
      getMemberSepsisInfo={getMemberSepsisInfo}
      hasScenario={hasScenario}
    />
  );
};

MemberPage.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
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
  getMemberSepsisInfo: PropTypes.func,
  hasScenario: PropTypes.func
};

/**
 * Main Application Component
 */
function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      await auth.login(credentials);
      // Navigation is handled inside auth.login()
    } catch (error) {
      console.error('Login error:', error);
      // Error is handled by the auth hook
    }
  };

  const handleLogout = () => {
    auth.logout();
  };

  const handleMemberClick = (memberData) => {
    if (memberData?.memberNumber) {
      navigate(`/member/${memberData.memberNumber}`);
    } else {
      console.error('Member data does not have a memberNumber property:', memberData);
    }
  };

  const handleNavigation = (viewPath) => {
    const path = viewPath.toLowerCase();
    if (path === 'dashboard') {
      navigate(ROUTES.DASHBOARD);
    } else if (path.startsWith('member/')) {
      navigate(`/${path}`);
    } else {
      console.log(`Navigation to ${viewPath} requested`);
    }
  };

  if (auth.loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" aria-label="Loading">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login onLogin={handleLogin} />} />
        {auth.isAuthenticated() ? (
          <>
            <Route path="/" element={<Dashboard
              user={auth.user}
              onLogout={handleLogout}
              onMemberClick={handleMemberClick}
              onNavigate={handleNavigation}
              // Pass user mode props
              activeMode={auth.activeMode}
              scenarios={auth.scenarios}
              availableModes={auth.availableModes}
              switchUserMode={auth.switchUserMode}
              toggleScenario={auth.toggleScenario}
              // Pass persona props
              availablePersonas={auth.availablePersonas}
              activePersona={auth.activePersona}
              onPersonaSwitch={auth.switchPersona}
              // Pass sepsis scenario functions
              applySepsisModifications={auth.applySepsisModifications}
              getSepsisModifiedStats={auth.getSepsisModifiedStats}
              shouldHideArrow={auth.shouldHideArrow}
              hasScenario={auth.hasScenario}
            />} />
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <Dashboard
                  user={auth.user}
                  onLogout={handleLogout}
                  onMemberClick={handleMemberClick}
                  onNavigate={handleNavigation}
                  // Pass user mode props
                  activeMode={auth.activeMode}
                  scenarios={auth.scenarios}
                  availableModes={auth.availableModes}
                  switchUserMode={auth.switchUserMode}
                  toggleScenario={auth.toggleScenario}
                  // Pass persona props
                  availablePersonas={auth.availablePersonas}
                  activePersona={auth.activePersona}
                  onPersonaSwitch={auth.switchPersona}
                  // Pass sepsis scenario functions
                  applySepsisModifications={auth.applySepsisModifications}
                  getSepsisModifiedStats={auth.getSepsisModifiedStats}
                  shouldHideArrow={auth.shouldHideArrow}
                  hasScenario={auth.hasScenario}
                />
              }
            />
            <Route
              path="/member/:memberNumber"
              element={
                <MemberPage
                  user={auth.user}
                  onLogout={handleLogout}
                  onNavigate={handleNavigation}
                  // Pass user mode props
                  activeMode={auth.activeMode}
                  scenarios={auth.scenarios}
                  // Pass persona props
                  availablePersonas={auth.availablePersonas}
                  activePersona={auth.activePersona}
                  onPersonaSwitch={auth.switchPersona}
                  // Pass sepsis scenario functions
                  getMemberSepsisInfo={auth.getMemberSepsisInfo}
                  hasScenario={auth.hasScenario}
                />
              }
            />
            <Route
              path="*"
              element={
                <Dashboard
                  user={auth.user}
                  onLogout={handleLogout}
                  onMemberClick={handleMemberClick}
                  onNavigate={handleNavigation}
                  // Pass user mode props
                  activeMode={auth.activeMode}
                  scenarios={auth.scenarios}
                  availableModes={auth.availableModes}
                  switchUserMode={auth.switchUserMode}
                  toggleScenario={auth.toggleScenario}
                  // Pass persona props
                  availablePersonas={auth.availablePersonas}
                  activePersona={auth.activePersona}
                  onPersonaSwitch={auth.switchPersona}
                  // Pass sepsis scenario functions
                  applySepsisModifications={auth.applySepsisModifications}
                  getSepsisModifiedStats={auth.getSepsisModifiedStats}
                  shouldHideArrow={auth.shouldHideArrow}
                  hasScenario={auth.hasScenario}
                />
              }
            />
          </>
        ) : (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
