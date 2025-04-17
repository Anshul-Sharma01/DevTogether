import React, { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createUserAccountThunk } from "../../Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import generateBio from "../Profile/GenerateBio.js";
import { RiAiGenerate, RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { FaSpinner } from "react-icons/fa";
import { FiCheck, FiX } from "react-icons/fi";

const initialState = {
    avatar: null,
    previewAvatar: null,
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_AVATAR":
            return { ...state, avatar: action.payload };
        case "SET_PREVIEW_AVATAR":
            return { ...state, previewAvatar: action.payload };
        case "SET_NAME":
            return { ...state, name: action.payload };
        case "SET_USERNAME":
            return { ...state, username: action.payload };
        case "SET_EMAIL":
            return { ...state, email: action.payload };
        case "SET_PASSWORD":
            return { ...state, password: action.payload };
        case "SET_CONFIRM_PASSWORD":
            return { ...state, confirmPassword: action.payload };
        case "SET_BIO":
            return { ...state, bio: action.payload };
        default:
            return state;
    }
}

function SignUp() {
    const [state, dispatchState] = useReducer(reducer, initialState);
    const [loading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Password validation states
    const [passwordValidation, setPasswordValidation] = useState({
        length: false,
        uppercase: false,
        number: false,
        special: false
    });

    // Update password validation on password change
    useEffect(() => {
        setPasswordValidation({
            length: state.password.length >= 8,
            uppercase: /[A-Z]/.test(state.password),
            number: /[0-9]/.test(state.password),
            special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(state.password)
        });
    }, [state.password]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatchState({ type: "SET_AVATAR", payload: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatchState({ type: "SET_PREVIEW_AVATAR", payload: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.dismiss();
        if (!state.avatar || !state.name || !state.username || !state.email || !state.password || !state.bio) {
            toast.error("All fields are required");
            return;
        }
        if (state.confirmPassword !== state.password) {
            toast.error("Password and confirm Password do not match !!");
            return;
        }

        // Check if all password requirements are met
        const allRequirementsMet = Object.values(passwordValidation).every(value => value === true);
        if (!allRequirementsMet) {
            toast.error("Password does not meet all requirements");
            return;
        }

        const formData = new FormData();
        formData.append("name", state.name);
        formData.append("username", state.username);
        formData.append("email", state.email);
        formData.append("avatar", state.avatar);
        formData.append("password", state.password);
        formData.append("bio", state.bio);

        const res = await dispatch(createUserAccountThunk(formData));
        console.log("SignUp-response : ", res);

        if (res?.payload?.statusCode === 201) {
            navigate("/");
        }
    };

    const handleBioGeneration = async () => {
        if (state.bio === "") {
            toast.error("First enter the unstructured bio to enhance it from AI");
            return;
        }
        setIsLoading(true);
        const res = await generateBio(state.bio);
        setIsLoading(false);
        dispatchState({ type: "SET_BIO", payload: res });
    };

    const nextStep = () => {
        if (step === 1 && (!state.avatar || !state.name || !state.username || !state.email)) {
            toast.error("Please fill in all fields before proceeding");
            return;
        }
        if (step === 2 && (!state.password || !state.confirmPassword)) {
            toast.error("Please fill in all fields before proceeding");
            return;
        }

        // Check password requirements before proceeding from step 2
        if (step === 2) {
            const allRequirementsMet = Object.values(passwordValidation).every(value => value === true);
            if (!allRequirementsMet) {
                toast.error("Password does not meet all requirements");
                return;
            }
            
            if (state.password !== state.confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
        }
        
        setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setStep((prev) => prev - 1);
    };

    useEffect(() => {
        if (isLoggedIn) {
            console.log("already logged in");
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    // Password match check
    const passwordsMatch = state.password === state.confirmPassword;
    const showPasswordMatch = state.confirmPassword.length > 0;

    // New simplified step labels
    const stepLabels = ["Profile", "Security", "Bio"];

    return (
        <section className="flex flex-col items-center min-h-screen w-full bg-gradient-to-r from-gray-50 to-white dark:from-gray-950 dark:to-black transition-colors duration-300 py-10">
            <div className="w-full max-w-2xl p-4 md:p-8">
                {/* Simplified Step Indicator */}
                <div className="flex justify-center mb-10">
                    <div className="flex gap-6 md:gap-12">
                        {[1, 2, 3].map((stepNumber) => (
                            <div key={stepNumber} className="flex flex-col items-center">
                                <div 
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-medium shadow-md transition-all duration-300 ${
                                        step === stepNumber 
                                            ? "bg-blue-500 text-white scale-110" 
                                            : step > stepNumber
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                                    }`}
                                >
                                    {step > stepNumber ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        stepNumber
                                    )}
                                </div>
                                <span className={`mt-2 text-sm font-medium ${
                                    step >= stepNumber 
                                        ? "text-blue-600 dark:text-blue-400" 
                                        : "text-gray-500 dark:text-gray-500"
                                }`}>
                                    {stepLabels[stepNumber - 1]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8">Create Your Account</h1>

                    {step === 1 && (
                        <div className="animate-fadeIn">
                            {/* Avatar Upload */}
                            <div className="flex justify-center mb-8">
                                <label htmlFor="avatar" className="relative cursor-pointer group">
                                    <div className="w-28 h-28 rounded-full border-4 border-gray-200 dark:border-gray-700 shadow-md flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-800 transition-transform group-hover:scale-105 duration-300">
                                        {state.previewAvatar ? (
                                            <img src={state.previewAvatar} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <svg
                                                className="w-14 h-14 text-gray-400 dark:text-gray-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 text-white text-sm flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900 shadow-lg group-hover:bg-blue-600 transition-all duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </label>
                                <input type="file" id="avatar" className="hidden" onChange={handleAvatarChange} />
                            </div>

                            {/* Step 1 Form */}
                            <form className="space-y-5">
                                {[
                                    { label: "Full Name", type: "text", value: state.name, setValue: (value) => dispatchState({ type: "SET_NAME", payload: value }) },
                                    { label: "Username", type: "text", value: state.username, setValue: (value) => dispatchState({ type: "SET_USERNAME", payload: value }) },
                                    { label: "Email Address", type: "email", value: state.email, setValue: (value) => dispatchState({ type: "SET_EMAIL", payload: value }) },
                                ].map((field, index) => (
                                    <div key={index} className="group">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type}
                                            value={field.value}
                                            onChange={(e) => field.setValue(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-300 group-hover:border-blue-400 dark:group-hover:border-gray-600"
                                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                                            required
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:translate-y-[-2px] font-medium text-sm"
                                >
                                    Continue to Security
                                </button>
                            </form>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-fadeIn">
                            {/* Step 2 Form */}
                            <form className="space-y-5">
                                {/* Password field with live validation */}
                                <div className="relative group">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={state.password}
                                            onChange={(e) => dispatchState({ type: "SET_PASSWORD", payload: e.target.value })}
                                            onFocus={() => setPasswordFocused(true)}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-300 group-hover:border-blue-400 dark:group-hover:border-gray-600"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        {showPassword ? (
                                            <RiEyeOffFill
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="text-xl text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-gray-300 cursor-pointer absolute top-1/2 right-3.5 transform -translate-y-1/2 transition-colors duration-200"
                                            />
                                        ) : (
                                            <RiEyeFill
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="text-xl text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-gray-300 cursor-pointer absolute top-1/2 right-3.5 transform -translate-y-1/2 transition-colors duration-200"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Confirm Password field with live validation */}
                                <div className="relative group">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={state.confirmPassword}
                                            onChange={(e) => dispatchState({ type: "SET_CONFIRM_PASSWORD", payload: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-300 group-hover:border-blue-400 dark:group-hover:border-gray-600"
                                            placeholder="Confirm your password"
                                            required
                                        />
                                        {showConfirmPassword ? (
                                            <RiEyeOffFill
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="text-xl text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-gray-300 cursor-pointer absolute top-1/2 right-3.5 transform -translate-y-1/2 transition-colors duration-200"
                                            />
                                        ) : (
                                            <RiEyeFill
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="text-xl text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-gray-300 cursor-pointer absolute top-1/2 right-3.5 transform -translate-y-1/2 transition-colors duration-200"
                                            />
                                        )}
                                    </div>
                                    
                                    {/* Password match indicator - only shown when confirm password has content */}
                                    {showPasswordMatch && (
                                        <div className={`flex items-center mt-2 ml-1 text-sm ${passwordsMatch ? 'text-green-500' : 'text-red-500'}`}>
                                            {passwordsMatch ? (
                                                <>
                                                    <FiCheck className="mr-1" />
                                                    <span>Passwords match</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FiX className="mr-1" />
                                                    <span>Passwords don't match</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                                
                                {/* Password requirements - only shown when password field has content */}
                                {(state.password.length > 0 || passwordFocused) && (
                                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-xs">
                                        <p className="font-medium mb-2 text-gray-700 dark:text-gray-300">Password requirements:</p>
                                        <ul className="space-y-1 ml-1">
                                            {[
                                                { id: 'length', label: 'At least 8 characters long', valid: passwordValidation.length },
                                                { id: 'uppercase', label: 'Contains at least one uppercase letter', valid: passwordValidation.uppercase },
                                                { id: 'number', label: 'Contains at least one number', valid: passwordValidation.number },
                                                { id: 'special', label: 'Contains at least one special character', valid: passwordValidation.special }
                                            ].map((req) => (
                                                <li key={req.id} className="flex items-center">
                                                    {req.valid ? (
                                                        <FiCheck className="text-green-500 mr-2 flex-shrink-0" />
                                                    ) : (
                                                        <FiX className="text-red-500 mr-2 flex-shrink-0" />
                                                    )}
                                                    <span className={req.valid ? 'text-green-500' : 'text-gray-600 dark:text-gray-400'}>
                                                        {req.label}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                
                                <div className="flex justify-between pt-4">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-300 font-medium"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:translate-y-[-2px] font-medium"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fadeIn">
                            {/* Step 3 Form */}
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                                            Your Bio
                                        </label>
                                        <button
                                            type="button"
                                            onClick={handleBioGeneration}
                                            disabled={loading || !state.bio}
                                            className="flex items-center justify-center space-x-1.5 text-xs bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 py-1 px-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 dark:border-gray-700"
                                        >
                                            {loading ? (
                                                <FaSpinner className="animate-spin mr-1" />
                                            ) : (
                                                <RiAiGenerate className="mr-1" />
                                            )}
                                            <span>Enhance with AI</span>
                                        </button>
                                    </div>
                                    <textarea
                                        value={state.bio}
                                        onChange={(e) => dispatchState({ type: "SET_BIO", payload: e.target.value })}
                                        className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-gray-600"
                                        placeholder="Tell us about yourself..."
                                        required
                                        rows={8}
                                    />
                                </div>
                                
                                <div className="flex justify-between pt-4">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-300 font-medium"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-3.5 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:translate-y-[-2px] font-medium shadow-lg"
                                    >
                                        Complete Registration
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    
                    {/* Sign in link */}
                    <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <a href="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
                            Sign in
                        </a>
                    </div>
                </div>
            </div>
            
            {/* Add custom animation styles */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </section>
    );
}

export default SignUp;