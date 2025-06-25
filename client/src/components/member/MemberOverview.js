import React from 'react';
import PropTypes from 'prop-types';

const MemberOverview = ({ memberData }) => {
    return (
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
                                        <th className="font-bold py-2 text-left">Full Name:</th>
                                        <td className="py-2">Robert Abbott</td>
                                    </tr>
                                    <tr>
                                        <th className="font-bold py-2 text-left">Date of Birth:</th>
                                        <td className="py-2">01/01/1974 (51 Years)</td>
                                    </tr>
                                    <tr>
                                        <th className="font-bold py-2 text-left">Gender:</th>
                                        <td className="py-2">Male</td>
                                    </tr>
                                    <tr>
                                        <th className="font-bold py-2 text-left">MRN:</th>
                                        <td className="py-2">M1000020000</td>
                                    </tr>
                                    <tr>
                                        <th className="font-bold py-2 text-left">Primary Language:</th>
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
                                        <th className="font-bold py-2 text-left">Eligibility Period:</th>
                                        <td className="py-2">10/01/2024 - 12/31/2025</td>
                                    </tr>
                                    <tr>
                                        <th className="font-bold py-2 text-left">Plan Type:</th>
                                        <td className="py-2">Large Group</td>
                                    </tr>
                                    <tr>
                                        <th className="font-bold py-2 text-left">Programs:</th>
                                        <td className="py-2">Care Coordination: ERM PH</td>
                                    </tr>
                                    <tr>
                                        <th className="font-bold py-2 text-left">Opt Out Status:</th>
                                        <td className="py-2"><span className="bg-green-500 text-white px-2 py-1 rounded text-xs">No</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

MemberOverview.propTypes = {
    memberData: PropTypes.object
};

export default MemberOverview;
