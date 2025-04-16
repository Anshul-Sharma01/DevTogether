import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createUserAccountThunk } from "../../Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import generateBio from "../Profile/GenerateBio.js";
import { RiAiGenerate2 } from "react-icons/ri";
import { FaSpinner } from "react-icons/fa";

function SignUp() {

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const [avatar, setAvatar] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");

    const [loading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.dismiss();
        if (!avatar || !name || !username || !email || !password || !bio) {
            toast.error("All fields are required");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("avatar", avatar);
        formData.append("password", password);
        formData.append("bio", bio);

        const res = await dispatch(createUserAccountThunk(formData));
        console.log("SignUp-response : ", res);

        if (res?.payload?.statusCode === 201) {
            navigate("/");
        }
    };

    const handleBioGeneration = async() => {
        if(bio == ""){
            toast.error("First enter the unstrucutred bio to enhance it from ai");
            return;
        }
        setIsLoading(true);
        const res = await generateBio(bio);
        setIsLoading(false);
        setBio(res);
    }

    useEffect(() => {
        if (isLoggedIn) {
            console.log("already logged in");
            window.alert("You are already logged in!");
            navigate("/");
        }
    }, []);

    return (
        <section className="flex justify-center items-center min-h-screen bg-gradient-to-r dark:bg-black transition-colors duration-300">
            <div className="bg-white dark:bg-black/60 dark:backdrop-blur-md border-white border-solid border-2 p-8 rounded-xl shadow-xl w-full max-w-md space-y-8">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100">Register</h1>

                {/* Avatar Upload */}
                <div className="flex justify-center">
                    <label htmlFor="avatar" className="relative cursor-pointer group">
                        <div className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-md flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-700">
                            {previewAvatar ? (
                                <img src={previewAvatar} alt="Avatar" className="w-full h-full object-cover" />
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

                {/* Sign Up Form */}
                <form className="space-y-4" noValidate onSubmit={handleSubmit}>
                    {[
                        { label: "Name", type: "text", value: name, setValue: setName },
                        { label: "Username", type: "text", value: username, setValue: setUsername },
                        { label: "Email", type: "email", value: email, setValue: setEmail },
                        { label: "Password", type: "password", value: password, setValue: setPassword },
                        { label: "Bio", type: "textarea", value: bio, setValue: setBio },
                    ].map((field, index) => (
                        <div key={index}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {field.label}
                            </label>
                            {field.type === "textarea" ? (
                                    <div className="relative">
                                        <textarea
                                            value={field.value}
                                            onChange={(e) => field.setValue(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                                            required
                                        />
                                        {
                                            loading ? (
                                                    <FaSpinner className="text-xl animate-spin absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-white" />
                                                ) : (
                                                    <RiAiGenerate2
                                                        onClick={handleBioGeneration}
                                                        className="text-xl hover:text-blue-500 cursor-pointer absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-white"
                                                />
                                            )
                                        }
                                    </div>
                            ) : (
                                <input
                                    type={field.type}
                                    value={field.value}
                                    onChange={(e) => field.setValue(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                                    required
                                />
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </section>
    );
}

export default SignUp;
