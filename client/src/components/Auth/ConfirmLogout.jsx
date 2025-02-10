import React from "react";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

const ConfirmLogout = ({ showLogoutModal, setShowLogoutModal }) => {

    const handleLogout = (event) => {
        event.preventDefault();  // Prevent default form submission
        toast.success("Logged out successfully!");  // Example toast notification
        setShowLogoutModal(false);
        // Implement actual logout logic here
    };

    return (
        <>
            {showLogoutModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Modal Background */}
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md"></div>

                    {/* Modal Container */}
                    <div className="relative bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg w-96 text-center z-50">
                        <p className="text-xl mt-8 text-gray-900 dark:text-white">
                            Are you sure you want to logout?
                        </p>

                        {/* Close Button */}
                        <button onClick={() => setShowLogoutModal(false)}>
                            <RxCross2 className="text-3xl absolute top-2 right-2 text-gray-700 dark:text-white cursor-pointer"/>
                        </button>

                        {/* Buttons Row */}
                        <div className="flex justify-center gap-4 mb-4">
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-300"
                            >
                                Logout
                            </button>

                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="bg-gray-400 text-black dark:text-white px-6 py-2 rounded-md hover:bg-gray-700 hover:text-white transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConfirmLogout;
