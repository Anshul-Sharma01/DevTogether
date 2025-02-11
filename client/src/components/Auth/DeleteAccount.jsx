import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

const DeleteAccount = ({ showDeleteAccountModal, setShowDeleteAccountModal }) => {
    const [deleteText, setDeleteText] = useState("");

    const handleDeleteAccount = () => {
        toast.dismiss();
        if (deleteText === "") {
            toast.error("Please enter 'DELETE' to confirm deletion.");
            return;
        }
        if (deleteText !== "DELETE") {
            toast.error("Please enter 'DELETE' to confirm deletion.");
            return;
        }
        toast.success("Account deleted successfully!");
        setShowDeleteAccountModal(false); // Close the modal after successful deletion
    };

    return (
        <>
            {showDeleteAccountModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Modal Background */}
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-in-out"></div>

                    {/* Modal Container */}
                    <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center z-50 transform transition-transform duration-300 ease-in-out scale-100">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Delete Account</h2>
                        <p className="mb-4 text-gray-700 dark:text-gray-300">Are you sure you want to delete your account? This action cannot be undone.</p>
                        <input
                            type="text"
                            value={deleteText}
                            onChange={(e) => setDeleteText(e.target.value)}
                            placeholder="Type DELETE"
                            className={`w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${deleteText === "DELETE" ? "text-red-500 focus:ring-red-400" : "text-gray-800 focus:ring-blue-400"} dark:bg-gray-800 dark:text-white`}
                        />

                        {/* Close Button */}
                        <button
                            onClick={() => setShowDeleteAccountModal(false)}
                            aria-label="Close"
                            className="absolute top-4 right-4 text-gray-700 dark:text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-90"
                        >
                            <RxCross2 className="text-3xl" />
                        </button>

                        {/* Buttons Row */}
                        <div className="flex justify-center gap-6 mt-8 mb-4">
                            <button
                                onClick={handleDeleteAccount}
                                className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteAccountModal(false)}
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

export default DeleteAccount;
