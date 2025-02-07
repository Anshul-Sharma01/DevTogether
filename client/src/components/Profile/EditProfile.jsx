import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const EditProfile = ({ showEditProfile, setShowEditProfile }) => {
    const userName = useSelector((state) => state?.auth?.userDetails?.userName);
    return (
        <>
            {showEditProfile && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Modal Background */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>

                    {/* Modal Container */}
                    <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 text-center z-50">
                        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                        <button onClick={() => setShowEditProfile(false)}>
                            <RxCross2 className="text-3xl absolute top-2 right-2"/>
                        </button>
                        <form>
                            <input
                                type="text"
                                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your updated info"
                                value={userName || "John Doe"}
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                        <button
                            onClick={() => setShowEditProfile(false)}
                            className="mt-3 text-black hover:text-white bg-gray-400 w-full px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfile;
