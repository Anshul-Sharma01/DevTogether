import React from 'react';
import { useSelector } from 'react-redux';
import { RxCross1 } from 'react-icons/rx';
import { FaEnvelope, FaUserAlt, FaCalendarAlt } from 'react-icons/fa';

const Profile = ({ onClose }) => {
    const userData = useSelector((state) => state?.auth?.userData);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-80 backdrop-blur-sm transition-all duration-300 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full relative transform transition-all duration-300 scale-100 hover:scale-[1.01] border border-gray-300 dark:border-gray-700">
                
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition duration-300"
                >
                    <RxCross1 size={24} />
                </button>

                {/* Avatar and Name */}
                <div className="flex flex-col items-center">
                    <img
                        src={userData?.avatar?.secure_url || "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"}
                        alt="Avatar"
                        className="w-32 h-32 rounded-full mb-4 border-4 border-gray-200 dark:border-gray-600 shadow-lg object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {userData?.name}
                    </h2>
                    <p className="text-md text-gray-500 dark:text-gray-400 flex items-center mb-4 italic">
                        <FaUserAlt className="mr-2" />
                        @{userData?.username}
                    </p>
                </div>

                {/* Info Cards */}
                <div className="flex flex-col w-full mt-2 space-y-4">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-inner transition duration-200 hover:ring-2 hover:ring-blue-400">
                        <FaEnvelope className="mr-3 text-gray-500 dark:text-gray-300" />
                        <input
                            type="text"
                            value={userData?.email}
                            disabled
                            className="bg-transparent w-full text-gray-700 dark:text-gray-200 font-medium focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-inner transition duration-200 hover:ring-2 hover:ring-blue-400">
                        <FaCalendarAlt className="mr-3 text-gray-500 dark:text-gray-300" />
                        <input
                            type="text"
                            value={`Member Since: ${new Date(userData?.createdAt).toLocaleDateString()}`}
                            disabled
                            className="bg-transparent w-full text-gray-700 dark:text-gray-200 font-medium focus:outline-none"
                        />
                    </div>
                </div>

                {/* Bio Section */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Bio</h3>
                    <p className="text-gray-700 dark:text-gray-300 overflow-y-auto h-48 px-4 py-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl leading-relaxed scrollbar-thin scrollbar-thumb-blue-400 hover:scrollbar-thumb-blue-500 transition-all duration-300">
                        {userData?.bio  || "No bio available"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
