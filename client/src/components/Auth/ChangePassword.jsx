import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePasswordThunk } from "../../Redux/Slices/authSlice.js";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword = ({ showPasswordModal, setShowPasswordModal }) => {
    const dispatch = useDispatch();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (currentPassword.trim() === "" || newPassword.trim() === "") {
            toast.error("Please fill both the fields");
            return;
        }

        try {
            const res = await dispatch(changePasswordThunk({ currentPassword, newPassword }));
            console.log(res);

            if (res?.payload?.statusCode === 200) {
                setShowPasswordModal(false);
                setCurrentPassword("");
                setNewPassword("");
            }
        } catch (error) {
            console.error("Error changing password:", error);
            // toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            {showPasswordModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Modal Background */}
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-in-out"></div>

                    {/* Modal Container */}
                    <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center z-50 transform transition-transform duration-300 ease-in-out scale-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                            Change Password
                        </h2>

                        {/* Close Button */}
                        <button onClick={() => setShowPasswordModal(false)} aria-label="Close">
                            <RxCross2 className="text-3xl absolute top-4 right-4 text-gray-700 dark:text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-90" />
                        </button>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Current Password Input */}
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                    placeholder="Enter your current Password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                                <span
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-xl text-gray-600 dark:text-white"
                                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                                >
                                    {showCurrentPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </span>
                            </div>

                            {/* New Password Input */}
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                                    placeholder="Enter your new Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <span
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-xl text-gray-600 dark:text-white"
                                    onClick={() => setShowNewPassword((prev) => !prev)}
                                >
                                    {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </span>
                            </div>

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
                            onClick={() => setShowPasswordModal(false)}
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

export default ChangePassword;
