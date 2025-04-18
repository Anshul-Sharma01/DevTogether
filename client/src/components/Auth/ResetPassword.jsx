import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordThunk } from '../../Redux/Slices/authSlice';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { resetToken } = useParams();
    
    // Password validation states
    const [requirements, setRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        match: false
    });

    const dispatch = useDispatch();

    // Check password requirements
    useEffect(() => {
        setRequirements({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            match: password === confirmPassword && password !== ''
        });
    }, [password, confirmPassword]);

    const handleSubmitNewPassword = async(e) => {
        e.preventDefault();
        // Logic to submit new password would go here
        // Check if all requirements are met
        const allRequirementsMet = Object.values(requirements).every(Boolean);
        
        if (allRequirementsMet) {
            const res = await dispatch(resetPasswordThunk({ resetToken, password }));
            console.log("res : ", res);
            if(res?.payload?.statusCode == 200){
                navigate("/auth/login");
            };
            setPassword("");
            setConfirmPassword("");
        } else {
            // Show error message
            console.log("Please meet all password requirements");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black transition-colors duration-300">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">Enter Your New Password</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                    Please create a strong password for your account.
                </p>
                <form onSubmit={handleSubmitNewPassword}>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">New Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Enter your new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                            />
                            <button 
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400"
                            >
                                {passwordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Confirm New Password</label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={confirmPasswordVisible ? "text" : "password"}
                                placeholder="Confirm your new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                            />
                            <button 
                                type="button"
                                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400"
                            >
                                {confirmPasswordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    
                    {/* Password requirements */}
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password Requirements:</h3>
                        <ul className="space-y-1 text-sm">
                            <li className={`flex items-center ${requirements.length ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                <span className="mr-2">{requirements.length ? '✓' : '✗'}</span>
                                At least 8 characters
                            </li>
                            <li className={`flex items-center ${requirements.uppercase ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                <span className="mr-2">{requirements.uppercase ? '✓' : '✗'}</span>
                                At least one uppercase letter
                            </li>
                            <li className={`flex items-center ${requirements.lowercase ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                <span className="mr-2">{requirements.lowercase ? '✓' : '✗'}</span>
                                At least one lowercase letter
                            </li>
                            <li className={`flex items-center ${requirements.number ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                <span className="mr-2">{requirements.number ? '✓' : '✗'}</span>
                                At least one number
                            </li>
                            <li className={`flex items-center ${requirements.match ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                                <span className="mr-2">{requirements.match ? '✓' : '✗'}</span>
                                Passwords match
                            </li>
                        </ul>
                    </div>
                    
                    <button
                        type="submit"
                        className={`w-full p-3 rounded-lg font-medium transition-colors duration-300 ${
                            Object.values(requirements).every(Boolean)
                                ? 'bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                : 'bg-blue-300 cursor-not-allowed text-white'
                        }`}
                        disabled={!Object.values(requirements).every(Boolean)}
                    >
                        Update Password
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
                    Remember your password? <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300">Log in</a>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;