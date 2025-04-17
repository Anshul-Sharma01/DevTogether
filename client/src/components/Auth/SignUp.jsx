import React, { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createUserAccountThunk } from "../../Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import generateBio from "../Profile/GenerateBio.js";
import { RiAiGenerate, RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { FaSpinner } from "react-icons/fa";

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

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    return (
        <section className="flex flex-col items-center min-h-screen bg-gradient-to-r dark:bg-black transition-colors duration-300">
            <div className="w-full max-w-2xl p-8">
                <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-6 relative">
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"}`}>1</div>
                            <div className={`w-24 h-1 ${step > 1 ? "bg-blue-500" : "bg-gray-300"}`}></div>
                        </div>
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"}`}>2</div>
                            <div className={`w-24 h-1 ${step > 2 ? "bg-blue-500" : "bg-gray-300"}`}></div>
                        </div>
                        <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"}`}>3</div>
                        </div>
                        <div className="absolute left-0 w-full h-1 bg-gray-300 top-1/2 transform -translate-y-1/2"></div>
                    </div>
                </div>

                <div className="bg-white dark:bg-black/60 dark:backdrop-blur-md border-white border-solid border-2 p-8 rounded-xl shadow-xl">
                    <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-8">Register</h1>

                    {step === 1 && (
                        <div>
                            {/* Avatar Upload */}
                            <div className="flex justify-center mb-6">
                                <label htmlFor="avatar" className="relative cursor-pointer group">
                                    <div className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-md flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-700">
                                        {state.previewAvatar ? (
                                            <img src={state.previewAvatar} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <svg
                                                className="w-12 h-12 text-gray-500 dark:text-gray-400"
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
                                    <div className="absolute bottom-0 right-0 w-7 h-7 bg-gray-600 dark:bg-gray-500 text-white text-sm flex items-center justify-center rounded-full border-2 border-white group-hover:bg-blue-500 transition-all">
                                        📷
                                    </div>
                                </label>
                                <input type="file" id="avatar" className="hidden" onChange={handleAvatarChange} />
                            </div>

                            {/* Step 1 Form */}
                            <form className="space-y-4">
                                {[
                                    { label: "Name", type: "text", value: state.name, setValue: (value) => dispatchState({ type: "SET_NAME", payload: value }) },
                                    { label: "Username", type: "text", value: state.username, setValue: (value) => dispatchState({ type: "SET_USERNAME", payload: value }) },
                                    { label: "Email", type: "email", value: state.email, setValue: (value) => dispatchState({ type: "SET_EMAIL", payload: value }) },
                                ].map((field, index) => (
                                    <div key={index}>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type}
                                            value={field.value}
                                            onChange={(e) => field.setValue(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                                            required
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                                >
                                    Next
                                </button>
                            </form>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            {/* Step 2 Form */}
                            <form className="space-y-4">
                                {[
                                    {
                                        label: "Password",
                                        type: showPassword ? "text" : "password",
                                        value: state.password,
                                        setValue: (value) => dispatchState({ type: "SET_PASSWORD", payload: value }),
                                        icon: showPassword ? RiEyeOffFill : RiEyeFill,
                                        toggle: () => setShowPassword(!showPassword),
                                    },
                                    {
                                        label: "Confirm Password",
                                        type: showConfirmPassword ? "text" : "password",
                                        value: state.confirmPassword,
                                        setValue: (value) => dispatchState({ type: "SET_CONFIRM_PASSWORD", payload: value }),
                                        icon: showConfirmPassword ? RiEyeOffFill : RiEyeFill,
                                        toggle: () => setShowConfirmPassword(!showConfirmPassword),
                                    },
                                ].map((field, index) => (
                                    <div key={index} className="relative">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type}
                                            value={field.value}
                                            onChange={(e) => field.setValue(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                                            required
                                        />
                                        {field.icon && (
                                            <field.icon
                                                onClick={field.toggle}
                                                className="text-xl hover:text-blue-500 cursor-pointer absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 dark:text-white"
                                            />
                                        )}
                                    </div>
                                ))}
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-300"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                                    >
                                        Next
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            {/* Step 3 Form */}
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Bio
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            value={state.bio}
                                            onChange={(e) => dispatchState({ type: "SET_BIO", payload: e.target.value })}
                                            className="w-full pr-12 py-3 pl-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder="Enter your bio"
                                            required
                                            rows={10}
                                        />
                                        <div className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center">
                                            {loading ? (
                                                <FaSpinner className="text-xl animate-spin text-gray-500 dark:text-white" />
                                            ) : (
                                                <RiAiGenerate
                                                    onClick={handleBioGeneration}
                                                    className="text-xl hover:text-blue-500 cursor-pointer text-gray-500 dark:text-white"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-300"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default SignUp;
