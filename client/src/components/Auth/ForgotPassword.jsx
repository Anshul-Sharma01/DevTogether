import React from 'react';

const ForgotPassword = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Forgot Password</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Please provide your registered email, and we will send you a reset token.
                </p>
                <form>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Enter your registered email"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Send Reset Email
                    </button>
                </form>
                <button
                    className="w-full p-2 mt-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
