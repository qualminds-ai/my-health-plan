import React, { useState } from 'react';
import authService from '../services/authService';
import { NAV_ITEMS } from '../constants';

const Header = ({ user, onLogout, onNavigate, activeTab = 'Dashboard' }) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleNavClick = (navItem) => {
        if (onNavigate) {
            onNavigate(navItem);
        }
    };

    const handleLogoutConfirm = async () => {
        setLoggingOut(true);

        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setLoggingOut(false);
            setShowLogoutModal(false);
            onLogout();
        }
    };

    const handleLogoutCancel = () => {
        setShowLogoutModal(false);
    };

    const navItems = NAV_ITEMS.map(item => ({
        ...item,
        active: activeTab === item.name
    }));

    return (
        <>
            {/* Modern Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo and Brand */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-xl font-bold text-gray-900">MyHealthPlan</span>
                                </div>
                            </div>

                            {/* Navigation Menu */}
                            <nav className="hidden md:ml-10 md:flex md:space-x-8">
                                {navItems.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => handleNavClick(item)}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${item.active
                                                ? 'text-blue-600 bg-blue-50'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Right side actions */}
                        <div className="flex items-center space-x-4">
                            {/* Search */}
                            <div className="hidden lg:block">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Search members, authorizations..."
                                    />
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                                        <span className="text-xs text-white font-bold">3</span>
                                    </span>
                                </button>

                                {/* Notifications Dropdown */}
                                {showNotifications && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                        <div className="py-1">
                                            <div className="px-4 py-2 text-sm font-medium text-gray-900 border-b border-gray-200">
                                                Notifications
                                            </div>
                                            <div className="px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
                                                <div className="font-medium">Authorization Review Due</div>
                                                <div className="text-gray-500">Member #12345 - Due today</div>
                                            </div>
                                            <div className="px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
                                                <div className="font-medium">High Priority Case</div>
                                                <div className="text-gray-500">Urgent review required</div>
                                            </div>
                                            <div className="px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
                                                <div className="font-medium">System Update</div>
                                                <div className="text-gray-500">New features available</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowProfile(!showProfile)}
                                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                                        <span className="text-sm font-medium text-white">
                                            {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
                                        </span>
                                    </div>
                                </button>

                                {/* Profile Dropdown Menu */}
                                {showProfile && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                        <div className="py-1">
                                            <div className="px-4 py-2 text-sm text-gray-900 border-b border-gray-200">
                                                <div className="font-medium">{user?.name || 'User'}</div>
                                                <div className="text-gray-500">{user?.email}</div>
                                            </div>
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Your Profile
                                            </button>
                                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Settings
                                            </button>
                                            <button
                                                onClick={handleLogoutClick}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile menu button */}
                            <div className="md:hidden">
                                <button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Logout</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to log out of your account?
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={handleLogoutCancel}
                                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                disabled={loggingOut}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogoutConfirm}
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
                                disabled={loggingOut}
                            >
                                {loggingOut ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Logging out...
                                    </div>
                                ) : (
                                    'Log out'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Click outside to close dropdowns */}
            {(showNotifications || showProfile) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setShowNotifications(false);
                        setShowProfile(false);
                    }}
                />
            )}
        </>
    );
};

export default Header;
