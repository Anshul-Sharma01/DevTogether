import { RxCross2 } from 'react-icons/rx';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ChangeAvatar = ({ showEditAvatar }) => {
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
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md"></div>

                    {/* Modal Container */}
                    <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96 text-center z-50">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Edit Profile Avatar</h2>
                        
                        {/* Close Button */}
                        <button onClick={() => showEditAvatar(false)}>
                            <RxCross2 className="text-3xl absolute top-2 right-2 text-gray-700 dark:text-white cursor-pointer"/>
                        </button>

                        {/* Avatar Preview */}
                        <div className="mb-4 flex justify-center">
                            <img 
                                src={previewAvatar || "/default-avatar.png"} 
                                alt="User Avatar" 
                                className="w-24 h-24 rounded-full border-2 border-gray-300 dark:border-gray-700 object-cover"
                            />
                        </div>

                        {/* Upload Avatar Input */}
                        <form onSubmit={handleSubmit}>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                id="avatarUpload"
                                onChange={handleAvatarChange}
                            />
                            <label 
                                htmlFor="avatarUpload" 
                                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 block w-full"
                            >
                                Upload Avatar
                            </label>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 mt-4"
                                disabled={!selectedFile}
                            >
                                Submit
                            </button>
                        </form>

                        {/* Cancel Button */}
                        <button
                            onClick={() => showEditAvatar(false)}
                            className="mt-3 text-black dark:text-white hover:text-white bg-gray-400 w-full px-4 py-2 rounded-lg hover:bg-gray-700"
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
