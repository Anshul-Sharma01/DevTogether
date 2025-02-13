import React from "react";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 transition-colors duration-300 text-black dark:text-white">
            <div className="text-center">
                <FaExclamationTriangle className="text-8xl mb-4 text-yellow-500" />
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-2xl mb-8">Oops! Page Not Found</p>
                <p className="text-lg mb-12">
                    It seems like you've found a glitch in the matrix.
                </p>
                <a
                    href="/"
                    className="flex items-center px-6 py-3 bg-white text-blue-500 dark:bg-gray-800 dark:text-blue-300 rounded-full shadow-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                <FaHome className="mr-2" />
                    Go Back Home
                </a>
            </div>
            <div className="mt-12">
                <img
                    src="https://i.imgur.com/uNGdWHi.png"
                    alt="404 Illustration"
                    className="w-64 h-64 object-contain"
                />
            </div>
        </div>
    );
};

export default NotFound;
