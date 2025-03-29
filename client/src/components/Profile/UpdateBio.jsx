import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const UpdateBio = ({ showBioModal, setShowBioModal }) => {
    const bioFromStore = useSelector((state) => state?.auth?.userData?.bio);

    // State for editable bio input
    const [bioField, setBioField] = useState(bioFromStore || "Enter your bio...");

    // Handle form submission (e.g., send to API)
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Updated Bio:", bioField);
        // API call to update the user profile (not implemented here)
    };

    return (
        <>
            {showBioModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Modal Background */}
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-in-out"></div>

                    {/* Modal Container */}
                    <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center z-50 transform transition-transform duration-300 ease-in-out scale-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                            Edit Bio
                        </h2>

                        {/* Close Button */}
                        <button onClick={() => setShowBioModal(false)} aria-label="Close">
                            <RxCross2 className="text-3xl absolute top-4 right-4 text-gray-700 dark:text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-90" />
                        </button>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <textarea
                                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
                                placeholder="Update your bio..."
                                value={bioField}
                                onChange={(e) => setBioField(e.target.value)}
                                rows="6"
                            ></textarea>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
                            >
                                Submit
                            </button>
                        </form>

                        {/* Cancel Button */}
                        <button
                            onClick={() => setShowBioModal(false)}
                            className="mt-4 text-black dark:text-white hover:text-white bg-gray-400 w-full px-6 py-3 rounded-full hover:bg-gray-700 transition duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateBio;
