import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NAV_ITEMS } from '../constants';
import styles from './Header.module.css';
import LogoIcon from '../assets/header/Logo.svg';
import FileIcon from '../assets/header/mdi_file.svg';
import ExpandIcon from '../assets/header/fluent_arrow-expand-24-filled.svg';
import GlobeIcon from '../assets/header/ion_earth-sharp.svg';
import QuestionIcon from '../assets/header/mingcute_question-fill.svg';
import ArrowIcon from '../assets/header/weui_arrow-filled.svg';

const Header = ({
  user,
  onLogout,
  onNavigate,
  activeTab = 'Dashboard',
  // Persona props
  availablePersonas = [],
  activePersona = null,
  onPersonaSwitch = () => { }
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navItems = NAV_ITEMS.map(item => ({
    ...item,
    active: activeTab === item.name
  }));

  const handleNavClick = (navItem) => {
    if (onNavigate) {
      onNavigate(navItem);
    }
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    if (onLogout) onLogout();
  };

  const handlePersonaSwitch = (personaId) => {
    console.log('🔄 Persona switch clicked - ID:', personaId);
    setShowUserMenu(false);
    if (onPersonaSwitch) {
      console.log('✅ Calling onPersonaSwitch with persona ID:', personaId);
      onPersonaSwitch(personaId);
    } else {
      console.log('❌ No onPersonaSwitch handler provided');
    }
  };

  // Get display name and role
  const displayName = user?.full_name || user?.fullName || user?.name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'User';
  const displayRole = user?.displayRole || user?.role || '';

  return (
    <header
      id="main-header"
      className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo and Brand */}
        <div id="header-logo-brand" className={styles.logoBrand}>
          <img
            id="header-logo-image"
            src={LogoIcon}
            alt="Logo"
            className={styles.logoImage}
          />
          <span
            id="header-brand-text"
            className={styles.brandText}>
            MyHealthPlan
          </span>
        </div>

        {/* Navigation */}
        <nav id="main-navigation" className={styles.navigation}>
          {navItems.map((item, idx) => (
            <button
              key={item.name}
              id={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => handleNavClick(item.name)}
              className={`${styles.navButton} ${item.active ? styles.navButtonActive : styles.navButtonInactive}`}
              style={{ marginRight: idx !== navItems.length - 1 ? 22 : 0 }}
            >
              {item.name === 'Dashboard' ? 'My Dashboard' : item.name}
            </button>
          ))}
        </nav>

        {/* Right icons and user */}
        <div id="header-actions" className={styles.headerActions}>
          <img
            id="header-file-icon"
            src={FileIcon}
            alt="File"
            className={styles.headerIcon}
          />
          <img
            id="header-expand-icon"
            src={ExpandIcon}
            alt="Expand"
            className={styles.headerIcon}
          />

          {/* Globe + arrow */}
          <span id="header-globe-dropdown" className={styles.headerDropdown}>
            <img src={GlobeIcon} alt="Globe" className={styles.headerIcon} />
            <img src={ArrowIcon} alt="Arrow" className={styles.headerDropdownArrow} />
          </span>

          {/* Question + arrow */}
          <span id="header-help-dropdown" className={styles.headerDropdown}>
            <img src={QuestionIcon} alt="Help" className={styles.headerIcon} />
            <img src={ArrowIcon} alt="Arrow" className={styles.headerDropdownArrow} />
          </span>
          {/* User dropdown */}
          <div id="header-user-dropdown" className={styles.userDropdown}>
            <button
              id="user-menu-button"
              className={styles.userMenuButton}
              onClick={() => {
                console.log('🔄 User menu button clicked, current state:', showUserMenu);
                setShowUserMenu((v) => !v);
              }}
            >
              {displayName}{displayRole ? ` (${displayRole})` : ''}
              <span style={{
                marginLeft: '6px',
                fontSize: '10px',
                opacity: 0.8,
                transition: 'transform 0.2s ease',
                transform: showUserMenu ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>
                ▼
              </span>
            </button>
            <div
              id="user-menu-dropdown"
              className={`${styles.userMenuDropdown} ${showUserMenu ? styles.userMenuVisible : styles.userMenuHidden}`}
            >
              {/* Always render persona options for programmatic access */}
              <div className={styles.menuSection}>
                <div className={styles.menuSectionTitle}>Switch User</div>
                {/* Always render all 3 persona buttons */}
                <button
                  id="persona-switch-um"
                  onClick={() => handlePersonaSwitch('maria.hartsell')}
                  className={`${styles.personaButton} ${(activePersona?.email === 'maria.hartsell@myhealthplan.com' || activePersona?.full_name === 'Maria Hartsell') ? styles.activePersona : ''}`}
                >
                  Maria Hartsell (UM)
                </button>
                <button
                  id="persona-switch-um-snf"
                  onClick={() => handlePersonaSwitch('elise.tran')}
                  className={`${styles.personaButton} ${(activePersona?.email === 'elise.tran@myhealthplan.com' || activePersona?.full_name === 'Elise Tran') ? styles.activePersona : ''}`}
                >
                  Elise Tran (UM, SNF)
                </button>
                <button
                  id="persona-switch-cm"
                  onClick={() => handlePersonaSwitch('karen.white')}
                  className={`${styles.personaButton} ${(activePersona?.email === 'karen.white@myhealthplan.com' || activePersona?.full_name === 'Karen White') ? styles.activePersona : ''}`}
                >
                  Karen White (CM)
                </button>
              </div>
              <div className={styles.menuDivider}></div>
              <button
                id="logout-button"
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    fullName: PropTypes.string,
    full_name: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    role: PropTypes.string,
    displayRole: PropTypes.string,
    email: PropTypes.string
  }),
  onLogout: PropTypes.func,
  onNavigate: PropTypes.func,
  activeTab: PropTypes.string,
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
  onPersonaSwitch: PropTypes.func
};

export default Header;
