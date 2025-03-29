import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const EditProfile = ({ showEditProfile, setShowEditProfile }) => {
    const userNameFromStore = useSelector((state) => state?.auth?.userData?.name);

    // State for editable input
    const [userName, setUserName] = useState(userNameFromStore || "John Doe");

    // Handle form submission (e.g., send to API)
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Updated Name:", userName);
        // API call to update the user profile (not implemented here)
    };

    return (
        <>
            {showEditProfile && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Modal Background */}
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-in-out"></div>

                    {/* Modal Container */}
                    <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center z-50 transform transition-transform duration-300 ease-in-out scale-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                            Edit Profile
                        </h2>

                        {/* Close Button */}
                        <button onClick={() => setShowEditProfile(false)} aria-label="Close">
                            <RxCross2 className="text-3xl absolute top-4 right-4 text-gray-700 dark:text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-90" />
                        </button>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-center"
                                placeholder="Enter your updated name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />

                            {/* Submit Button */}
                            <div className="flex flex-row justify-center items-center gap-4">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Submit
                                </button>
                                <button
                                    onClick={() => setShowEditProfile(false)}
                                    className=" text-black dark:text-white hover:text-white bg-gray-400 w-full px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300"
                                >
                                    Cancel
                                </button>

                            </div>
                        </form>

                        {/* Cancel Button */}
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfile;
