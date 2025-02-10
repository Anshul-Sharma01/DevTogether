import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const UpdateBio = ({ showBioModal, setShowBioModal }) => {
    const bioFromStore = useSelector((state) => state?.auth?.userDetails?.bio);
    
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
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md"></div>

                    {/* Modal Container */}
                    <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 text-center z-50">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                            Edit Bio
                        </h2>

                        {/* Close Button */}
                        <button onClick={() => setShowBioModal(false)}>
                            <RxCross2 className="text-3xl absolute top-2 right-2 text-gray-700 dark:text-white cursor-pointer"/>
                        </button>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <textarea
                                className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                placeholder="Update your bio..."
                                value={bioField}
                                onChange={(e) => setBioField(e.target.value)}
                                rows="4"
                            ></textarea>
                            
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Submit
                            </button>
                        </form>

                        {/* Cancel Button */}
                        <button
                            onClick={() => setShowBioModal(false)}
                            className="mt-3 text-black dark:text-white hover:text-white bg-gray-400 w-full px-4 py-2 rounded-lg hover:bg-gray-700"
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
