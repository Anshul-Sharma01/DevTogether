import React from 'react';
import { useSelector } from 'react-redux';
import { RxCross1 } from 'react-icons/rx';
import { FaEnvelope, FaUserAlt, FaCalendarAlt } from 'react-icons/fa';

const Profile = ({ onClose }) => {
    const userData = useSelector((state) => state?.auth?.userData);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-80 transition-all duration-300 z-10">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 max-w-md w-full relative transform transition-all duration-300 scale-95 hover:scale-100">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400 transition duration-200"
                >
                    <RxCross1 size={24} />
                </button>
                <div className="flex flex-col items-center">
                    <img
                        src={userData?.avatar?.secure_url || "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"}
                        alt="Avatar"
                        className="w-32 h-32 rounded-full mb-6 border-4 border-gray-200 dark:border-gray-700 shadow-lg object-cover transition-all duration-200 hover:scale-105"
                    />
                    <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {userData?.name}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 flex items-center">
                        <FaUserAlt className="mr-2 text-gray-500 dark:text-gray-300" />
                        @{userData?.username}
                    </p>

                    <div className="flex flex-col w-full mt-4 space-y-4">
                        <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-md">
                            <FaEnvelope className="mr-2 text-gray-500 dark:text-gray-300" />
                            <input
                                type="text"
                                value={userData?.email}
                                disabled
                                className="bg-transparent w-full text-gray-700 dark:text-gray-300 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-md">
                            <FaCalendarAlt className="mr-2 text-gray-500 dark:text-gray-300" />
                            <input
                                type="text"
                                value={`Member Since: ${new Date(userData?.createdAt).toLocaleDateString()}`}
                                disabled
                                className="bg-transparent w-full text-gray-700 dark:text-gray-300 focus:outline-none"
                            />
                        </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mt-4 text-center">{userData?.bio}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
