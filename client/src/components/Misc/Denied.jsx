import React from "react";
import { FaLock, FaHome } from "react-icons/fa";

const Denied = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-500 dark:bg-red-900 text-white transition-colors duration-300">
            <div className="text-center">
                <FaLock className="text-8xl mb-4 text-white" />
                <h1 className="text-6xl font-bold mb-4">Access Denied</h1>
                <p className="text-2xl mb-8">You do not have permission to view this page.</p>
                <p className="text-lg mb-12">
                    Please contact the administrator if you believe this is an error.
                </p>
                <a
                    href="/"
                    className="flex items-center px-6 py-3 bg-white text-red-500 dark:bg-gray-800 dark:text-red-300 rounded-full shadow-lg hover:bg-red-100 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                <FaHome className="mr-2" />
                    Go Back Home
                </a>
            </div>
            <div className="mt-12">
                <img
                    src="https://i.imgur.com/uNGdWHi.png"
                    alt="Denied Illustration"
                    className="w-64 h-64 object-contain"
                />
            </div>
        </div>
    );
};

export default Denied;



