import React from 'react';
import styles from '../../Member.module.css';

const AuthorizationRequestHistory = ({ recentAuthorizations, setActiveRequestTab, getStatusBadgeClass, getPriorityBadgeClass }) => (
    <div className="request-history-content">
        <div className="flex items-center mb-4">
            <div className={styles.requestHistoryHeaderIcon}>
                <i className="bi bi-clock-history text-blue-600 text-xl"></i>
            </div>
            <div>
                <h5 className={styles.requestHistoryHeaderTitle}>Authorization Request History</h5>
                <p className={styles.requestHistoryHeaderDesc}>Complete history of all authorization requests for this member</p>
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
);

export default AuthorizationRequestHistory;
