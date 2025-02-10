import { RxCross2 } from 'react-icons/rx';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ChangeAvatar = ({ showEditAvatar, setShowEditAvatar }) => {
    const userAvatar = useSelector((state) => state?.auth?.userDetails?.userAvatar);
    const [previewAvatar, setPreviewAvatar] = useState(userAvatar);
    const [selectedFile, setSelectedFile] = useState(null);

    // Handle avatar change
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewAvatar(reader.result);
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }
    };

    // Handle submit (You might need to integrate with backend)
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Uploaded Avatar:", selectedFile);
        // Implement API call to upload the selectedFile
    };

    return (
        <>
            {showEditAvatar && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Modal Background */}
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-in-out"></div>

                    {/* Modal Container */}
                    <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center z-50 transform transition-transform duration-300 ease-in-out scale-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Edit Profile Avatar</h2>

                        {/* Close Button */}
                        <button onClick={() => setShowEditAvatar(false)} aria-label="Close">
                            <RxCross2 className="text-3xl absolute top-4 right-4 text-gray-700 dark:text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-90" />
                        </button>

                        {/* Avatar Preview */}
                        <div className="mb-6 flex justify-center">
                            <img
                                src={previewAvatar || "/default-avatar.png"}
                                alt="User Avatar"
                                className="w-32 h-32 rounded-full border-4 border-gray-300 dark:border-gray-700 object-cover"
                            />
                        </div>

                        {/* Upload Avatar Input */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="avatarUpload"
                                onChange={handleAvatarChange}
                            />
                            <label
                                htmlFor="avatarUpload"
                                className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 block w-full text-center"
                            >
                                Upload Avatar
                            </label>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300"
                                disabled={!selectedFile}
                            >
                                Submit
                            </button>
                        </form>

                        {/* Cancel Button */}
                        <button
                            onClick={() => setShowEditAvatar(false)}
                            className="mt-4 text-black dark:text-white hover:text-white bg-gray-400 w-full px-6 py-3 rounded-full hover:bg-gray-700 transition duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChangeAvatar;
