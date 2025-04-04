import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileThunk } from "../../Redux/Slices/authSlice";

const UpdateProfile = ({ showBioModal, setShowBioModal }) => {
    const userData = useSelector((state) => state?.auth?.userData);

    const dispatch = useDispatch();

    
    const [bioField, setBioField] = useState(userData?.bio || "Enter your bio...");
    const [nameField, setNameField] = useState(userData?.name || "Enter your name..."); 

    // Handle form submission (e.g., send to API)
    const handleSubmit = async(event) => {
        event.preventDefault();
        toast.dismiss();
        if(userData?.bio === bioField && userData?.name === nameField){
            toast.error("No changes made to the profile.");
            setShowBioModal(false);
            return;
        }

        const res = await dispatch(updateProfileThunk({ bio: bioField, name: nameField }));
        if (res?.payload?.statusCode === 200) {
            setShowBioModal(false);
        } 
        // Reset the fields after submission
        setBioField(userData?.bio || "Enter your bio...");
        setNameField(userData?.name || "Enter your name...");

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

                            <input
                                type="text"
                                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                placeholder="Update your name..."
                                value={nameField}
                                onChange={(e) => setNameField(e.target.value)}
                            />

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

export default UpdateProfile;
