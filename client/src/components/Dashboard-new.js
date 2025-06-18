import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import apiService from '../services/apiService';

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
    const [viewMode, setViewMode] = useState('table'); // table or card

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

    const getCurrentDate = () => {
        const now = new Date();
        return now.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-800',
            'In Review': 'bg-blue-100 text-blue-800',
            'Appeal': 'bg-purple-100 text-purple-800',
            'Approved': 'bg-green-100 text-green-800',
            'Denied': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getPriorityColor = (priority) => {
        const colors = {
            'High': 'text-red-600',
            'Medium': 'text-yellow-600',
            'Low': 'text-green-600'
        };
        return colors[priority] || 'text-gray-600';
    };

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

    const statsCards = [
        {
            title: 'Due Today',
            value: dashboardStats.due_today_count,
            icon: 'clock',
            color: 'bg-red-500',
            textColor: 'text-red-600'
        },
        {
            title: 'High Priority',
            value: dashboardStats.high_priority_count,
            icon: 'alert',
            color: 'bg-orange-500',
            textColor: 'text-orange-600'
        },
        {
            title: 'Reminders',
            value: dashboardStats.reminders_count,
            icon: 'bell',
            color: 'bg-blue-500',
            textColor: 'text-blue-600'
        },
        {
            title: 'Start This Week',
            value: dashboardStats.start_this_week_count,
            icon: 'calendar',
            color: 'bg-green-500',
            textColor: 'text-green-600'
        }
    ];

    const getIcon = (iconName) => {
        const icons = {
            clock: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            alert: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            ),
            bell: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            ),
            calendar: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            )
        };
        return icons[iconName] || icons.clock;
    };

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

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <Header user={user} onLogout={onLogout} onNavigate={onNavigate} activeTab="Dashboard" />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">UM Dashboard</h1>
                            <p className="text-gray-600 mt-1">{getCurrentDate()}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <svg className="w-4 h-4 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Export
                            </button>
                            <button className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700">
                                <svg className="w-4 h-4 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                New Authorization
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">          {statsCards.map((stat) => (
                    <div key={stat.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center">
                            <div className={`${stat.color} p-3 rounded-lg text-white mr-4`}>
                                {getIcon(stat.icon)}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6">
                            {['My Tasks', 'My Cases', 'Risk Stratification'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {/* View Toggle */}
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-sm text-gray-500">
                                Showing {authorizations.length} authorizations
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`p-2 rounded-lg ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 6h18m-9 8h9" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setViewMode('card')}
                                    className={`p-2 rounded-lg ${viewMode === 'card' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Table View */}
                        {viewMode === 'table' && (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Member
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Authorization
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Priority
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Provider
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">                    {authorizations.map((auth) => (
                                        <tr
                                            key={auth.authorization_number || auth.id}
                                            className="hover:bg-gray-50 cursor-pointer"
                                            onClick={() => handleRowClick(auth)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <span className="text-sm font-medium text-gray-600">
                                                            {auth.member_name ? auth.member_name.charAt(0) : 'M'}
                                                        </span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {auth.member_name || 'Robert Abbott'}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {auth.member_number || 'M1000020000'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{auth.authorization_number}</div>
                                                <div className="text-sm text-gray-500">{auth.diagnosis_code}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(auth.status)}`}>
                                                    {auth.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`text-sm font-medium ${getPriorityColor(auth.priority)}`}>
                                                    {auth.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {auth.provider_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(auth.received_date)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-blue-600 hover:text-blue-900">
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

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
                    </div>
                </div>

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
                        </div>
                    </div>
                )}
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
