import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteAccountThunk, deactivateAccountThunk } from "../../Redux/Slices/authSlice";

const DeleteAccount = ({ showDeleteAccountModal, setShowDeleteAccountModal }) => {
    const [deleteText, setDeleteText] = useState("");
    const [selectedTab, setSelectedTab] = useState("delete");
    const dispatch = useDispatch();

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        toast.dismiss();
        if (deleteText !== "DELETE") {
            toast.error("Please enter 'DELETE' to confirm deletion.");
            return;
        }

        const res = await dispatch(deleteAccountThunk());
        console.log("Account Deletion Response:", res);
        toast.success("Account permanently deleted.");
        setShowDeleteAccountModal(false);
    };

    const handleDeactivateAccount = async (e) => {
        e.preventDefault();
        toast.dismiss();
        const res = await dispatch(deactivateAccountThunk());
        console.log("Account Deactivation Response:", res);
        toast.success("Account deactivated for 7 days.");
        setShowDeleteAccountModal(false);
    };

    return (
        <>
            {showDeleteAccountModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"></div>

                    <form
                        onSubmit={selectedTab === "delete" ? handleDeleteAccount : handleDeactivateAccount}
                        className="relative bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl w-[90%] max-w-lg text-center z-50 transform transition-all duration-300"
                    >
                        {/* Tabs */}
                        <div className="flex justify-around mb-6 border-b border-gray-300 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={() => setSelectedTab("delete")}
                                className={`w-1/2 pb-3 text-lg font-semibold transition-colors duration-200 ${selectedTab === "delete"
                                    ? "border-b-4 border-red-500 text-red-600"
                                    : "text-gray-500 dark:text-gray-300 hover:text-red-400"
                                    }`}
                            >
                                Delete Account
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedTab("deactivate")}
                                className={`w-1/2 pb-3 text-lg font-semibold transition-colors duration-200 ${selectedTab === "deactivate"
                                    ? "border-b-4 border-yellow-400 text-yellow-500"
                                    : "text-gray-500 dark:text-gray-300 hover:text-yellow-400"
                                    }`}
                            >
                                Deactivate Account
                            </button>
                        </div>

                        {selectedTab === "delete" ? (
                            <>
                                <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Delete Account</h2>
                                <p className="mb-4 text-gray-700 dark:text-gray-300">
                                    Are you sure you want to <span className="font-semibold text-red-600">permanently</span> delete your account? This action cannot be undone.
                                </p>
                                <input
                                    type="text"
                                    value={deleteText}
                                    onChange={(e) => setDeleteText(e.target.value)}
                                    placeholder="Type DELETE"
                                    className={`w-full p-3 mb-4 text-sm rounded-md border focus:outline-none transition-all duration-300 ${
                                        deleteText === "DELETE"
                                            ? "border-red-500 text-red-600 focus:ring-2 focus:ring-red-400"
                                            : "border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-400"
                                        } dark:bg-gray-800 dark:text-white`}
                                />
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Deactivate Account</h2>
                                <p className="mb-4 text-gray-700 dark:text-gray-300">
                                    Your account will be <span className="font-semibold text-yellow-500">temporarily</span> deactivated for 7 days.
                                    You can log in again at any time to reactivate it.
                                </p>
                            </>
                        )}

                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setShowDeleteAccountModal(false)}
                            className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:scale-110 hover:rotate-90 transition-transform"
                        >
                            <RxCross2 className="text-2xl" />
                        </button>

                        {/* Action buttons */}
                        <div className="flex justify-center gap-4 mt-8">
                            <button
                                type="submit"
                                className={`px-6 py-3 rounded-full font-semibold text-white shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 ${
                                    selectedTab === "delete"
                                        ? "bg-red-500 hover:bg-red-600 focus:ring-red-400"
                                        : "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400"
                                    }`}
                            >
                                {selectedTab === "delete" ? "Delete" : "Deactivate"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowDeleteAccountModal(false)}
                                className="px-6 py-3 rounded-full font-semibold text-gray-700 dark:text-white bg-gray-200 dark:bg-gray-700 shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default DeleteAccount;
