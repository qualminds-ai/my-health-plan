import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NAV_ITEMS } from '../constants';
import LogoIcon from '../assets/header/Logo.svg';
import FileIcon from '../assets/header/mdi_file.svg';
import ExpandIcon from '../assets/header/fluent_arrow-expand-24-filled.svg';
import GlobeIcon from '../assets/header/ion_earth-sharp.svg';
import QuestionIcon from '../assets/header/mingcute_question-fill.svg';
import ArrowIcon from '../assets/header/weui_arrow-filled.svg';

const Header = ({ user, onLogout, onNavigate, activeTab = 'Dashboard' }) => {
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
  return (
    <header style={{ background: '#898989', height: '60px', minHeight: '60px', width: '100%' }} className="flex items-center">
      <div className="flex items-center w-full px-6" style={{ minHeight: '60px' }}>
        {/* Logo and Brand */}
        <div className="flex items-center" style={{ minWidth: 180 }}>
          <img src={LogoIcon} alt="Logo" style={{ width: '34px', height: '34px' }} />
          <span style={{ color: '#fff', fontWeight: 700, fontSize: '32px', marginLeft: 14, letterSpacing: 0.2, height: '38px', lineHeight: '38px', display: 'flex', alignItems: 'center' }}>MyHealthPlan</span>
        </div>
        {/* Navigation */}
        <nav className="flex" style={{ flex: 1, marginLeft: 60 }}>
          {navItems.map((item, idx) => (<button
            key={item.name}
            onClick={() => handleNavClick(item.name)}
            style={{
              color: item.active ? '#E1E1E1' : '#E1E1E1',
              fontWeight: item.active ? 700 : 400,
              fontSize: '13.089px',
              fontStyle: 'normal',
              lineHeight: 'normal',
              background: 'none',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              padding: 0,
              marginRight: idx !== navItems.length - 1 ? 22 : 0,
              letterSpacing: 0.1,
              transition: 'color 0.2s',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {item.name === 'Dashboard' ? 'My Dashboard' : item.name}
          </button>
          ))}
        </nav>
        {/* Right icons and user */}
        <div className="flex items-center" style={{ minWidth: 320, justifyContent: 'flex-end', gap: 14 }}>
          <img src={FileIcon} alt="File" style={{ width: '18px', height: '18px', aspectRatio: '1/1', filter: 'brightness(0) invert(1)' }} />
          <img src={ExpandIcon} alt="Expand" style={{ width: '18px', height: '18px', aspectRatio: '1/1', filter: 'brightness(0) invert(1)' }} />
          {/* Globe + arrow */}
          <span style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src={GlobeIcon} alt="Globe" style={{ width: '18px', height: '18px', aspectRatio: '1/1', filter: 'brightness(0) invert(1)' }} />
            <img src={ArrowIcon} alt="Arrow" style={{ width: '18px', height: '18px', aspectRatio: '1/1', marginLeft: -2, filter: 'brightness(0) invert(1)' }} />
          </span>
          {/* Question + arrow */}
          <span style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src={QuestionIcon} alt="Help" style={{ width: '18px', height: '18px', aspectRatio: '1/1', filter: 'brightness(0) invert(1)' }} />
            <img src={ArrowIcon} alt="Arrow" style={{ width: '18px', height: '18px', aspectRatio: '1/1', marginLeft: -2, filter: 'brightness(0) invert(1)' }} />
          </span>
          {/* User dropdown */}
          <div style={{ position: 'relative', marginLeft: 14 }}>
            <button
              style={{
                color: '#fff',
                fontWeight: 600,
                fontSize: '13.09px',
                fontStyle: 'normal',
                lineHeight: 'normal',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
              }} onClick={() => setShowUserMenu((v) => !v)}
            >
              {user?.fullName || user?.full_name || user?.name || `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || 'User'}{user?.role ? ` (${user.role})` : ''}
            </button>
            {showUserMenu && (
              <div style={{ position: 'absolute', right: 0, top: '110%', background: '#fff', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', minWidth: 120, zIndex: 100 }}>
                <button
                  onClick={handleLogout}
                  style={{ width: '100%', padding: '8px 16px', background: 'none', border: 'none', color: '#333', textAlign: 'left', fontSize: 15, cursor: 'pointer', borderRadius: 6 }}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string
  }),
  onLogout: PropTypes.func,
  onNavigate: PropTypes.func,
  activeTab: PropTypes.string
};

export default Header;
