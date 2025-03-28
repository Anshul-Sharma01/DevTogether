import React from "react";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logoutUserThunk } from "../../Redux/Slices/authSlice";

const ConfirmLogout = ({ showLogoutModal, setShowLogoutModal }) => {

    const dispatch = useDispatch();

    const handleLogout = async (event) => {
        event.preventDefault();
        const res = await dispatch(logoutUserThunk()); // Prevent default form submission
        toast.success("Logged out successfully!");  // Example toast notification
        setShowLogoutModal(false);
        // Implement actual logout logic here
    };

    return (
        <>
            {showLogoutModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Modal Background */}
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-in-out"></div>

                    {/* Modal Container */}
                    <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center z-50 transform transition-transform duration-300 ease-in-out scale-100">
                        <p className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">
                            Are you sure you want to logout?
                        </p>

                        {/* Close Button */}
                        <button onClick={() => setShowLogoutModal(false)}>
                            <RxCross2 className="text-3xl absolute top-4 right-4 text-gray-700 dark:text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-90" />
                        </button>

                        {/* Buttons Row */}
                        <div className="flex justify-center gap-6 mt-8 mb-4">
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                Logout
                            </button>

                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="bg-gray-400 text-black dark:text-white px-8 py-3 rounded-full hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
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
