import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createUserAccountThunk } from "../../Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    const [avatar, setAvatar] = useState(null);
    const [ previewAvatar, setPreviewAvatar] = useState(null);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");

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

    const handleSubmit = async(e) => {
        e.preventDefault();
        toast.dismiss();
        if(!avatar || !name || !username || !email || !password || !bio){
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
        if(res?.payload?.statusCode === 201){
            navigate("/");
        }

    };

    useEffect(() => {
        if(isLoggedIn){
            console.log("already logged in");
            window.alert("You are already logged in!");
            navigate("/");
        }
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white text-center">
                    Register
                </h2>

                {/* Avatar Upload */}
                <div className="flex justify-center mb-5">
                    <label htmlFor="avatar" className="relative cursor-pointer">
                        <div className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-md flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-700">
                        {previewAvatar ? (
                            <img src={previewAvatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <svg
                            className="w-12 h-12 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            ></path>
                            </svg>
                        )}
                        </div>
                        <div className="absolute bottom-0 right-0 w-7 h-7 bg-gray-600 dark:bg-gray-500 text-white flex items-center justify-center rounded-full border-2 border-white">
                        📷
                        </div>
                    </label>
                    <input type="file" id="avatar" className="hidden" onChange={handleAvatarChange} />
                </div>

                {/* Form Fields */}
                <form noValidate onSubmit={handleSubmit}>
                    {[
                        { label: "Name", type: "text", value: name, setValue: setName },
                        { label: "Username", type: "text", value: username, setValue: setUsername },
                        { label: "Email", type: "email", value: email, setValue: setEmail },
                        { label: "Password", type: "password", value: password, setValue: setPassword },
                        { label : "Bio", type: "textarea", value: bio, setValue: setBio }
                    ].map((field, index) => (
                        <div className="mb-4" key={index}>
                        <label className="block text-gray-700 dark:text-gray-300 font-medium">
                            {field.label}
                        </label>
                        {
                            (field.type === "textarea") ? 
                                ( <textarea
                                    value={field.value}
                                    onChange={(e) => field.setValue(e.target.value)}
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                    required
                                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                                /> )
                            : (
                                <input
                                    type={field.type}
                                    value={field.value}
                                    onChange={(e) => field.setValue(e.target.value)}
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                    required
                                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                                />
                            )
                        }
                        </div>
                    ))}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-3 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition-all duration-200"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
