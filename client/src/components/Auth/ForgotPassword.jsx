import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordThunk } from '../../Redux/Slices/authSlice';

const ForgotPassword = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleForgotPassword = async(e) => {
        e.preventDefault();
        const res = await dispatch(forgotPasswordThunk({ email }));
        console.log("res : ", res);
        setEmail("");
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black transition-colors duration-300">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">Forgot Password</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                    Please provide your registered email, and we will send you a reset token.
                </p>
                <form onSubmit={handleForgotPassword}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your registered email"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 font-medium transition-colors duration-300"
                    >
                        Send Reset Email
                    </button>
                </form>
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full p-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300 font-medium"
                    >
                        Go Back
                    </button>
                </div>
                <p className="text-sm text-center mt-6 text-gray-500 dark:text-gray-400 transition-colors duration-300">
                    Remember your password? <Link to="/auth/login" className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;