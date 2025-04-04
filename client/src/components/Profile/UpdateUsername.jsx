import React, { useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { updateUsernameThunk } from "../../Redux/Slices/authSlice";

const UpdateUsername = ({ showUserNameModal, setshowUserNameModal }) => {
    const userData = useSelector((state) => state?.auth?.userData);

    const dispatch = useDispatch();

    

    const [usernameField, setUserNameField] = useState(userData?.username || "Enter your username..."); 

    // Handle form submission (e.g., send to API)
    const handleSubmit = async(event) => {
        event.preventDefault();
        toast.dismiss();
        if(userData?.username === usernameField){
            toast.error("No changes made to the username .");
            setshowUserNameModal(false);
            return;
        }

        const res = await dispatch(updateUsernameThunk({ username : usernameField }));
        console.log(res);
        if (res?.payload?.statusCode === 200) {
            setshowUserNameModal(false);
        } 
        // Reset the fields after submission
        setUserNameField(userData?.username || "Enter your name...");

        // API call to update the user profile (not implemented here)
    };

    return (
        <>
            {showUserNameModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Modal Background */}
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-in-out"></div>

                    {/* Modal Container */}
                    <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center z-50 transform transition-transform duration-300 ease-in-out scale-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                            Edit Username
                        </h2>

                        {/* Close Button */}
                        <button onClick={() => setshowUserNameModal(false)} aria-label="Close">
                            <RxCross2 className="text-3xl absolute top-4 right-4 text-gray-700 dark:text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-90" />
                        </button>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">

                            <input
                                type="text"
                                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                placeholder="Update your username..."
                                value={usernameField}
                                onChange={(e) => setUserNameField(e.target.value)}
                            />

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
                            onClick={() => setshowUserNameModal(false)}
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

export default UpdateUsername;
