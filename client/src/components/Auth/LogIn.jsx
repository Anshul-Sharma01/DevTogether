import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUserAccountThunk } from '../../Redux/Slices/authSlice';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

function LogIn() {
    const [inputValue, setInputValue] = useState({
        input: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        toast.dismiss();
        if (!inputValue.input || !inputValue.password) {
            toast.error("Please fill in all fields!");
            return;
        }

        const res = await dispatch(loginUserAccountThunk({ inputValue: inputValue.input, password: inputValue.password }));
        console.log(res);
        if (res?.payload?.statusCode === 200) {
            navigate("/");
        }
    };

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            console.log("already logged in");
            window.alert("You are already logged in!");
            navigate("/");
        }
    }, []);

    return (
        <section className="flex justify-center items-center h-screen bg-white dark:bg-black transition-colors duration-300">
            <div className="dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 border dark:border-gray-700 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-8">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white">Log In</h1>

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Email / Username
                        </label>
                        <input
                            type="text"
                            value={inputValue.input}
                            onChange={(e) => setInputValue({ ...inputValue, input: e.target.value })}
                            className="mt-2 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400"
                            placeholder="Enter your email or username"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={inputValue.password}
                                onChange={(e) => setInputValue({ ...inputValue, password: e.target.value })}
                                className="mt-2 block w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 hover:dark:text-white transition-colors duration-200"
                            >
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                    >
                        Log In
                    </button>
                </form>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/auth/sign-up" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Register
                        </Link>
                    </p>
                    <Link to="/auth/forgot-password" className="text-blue-600 dark:text-blue-400 hover:underline text-center">
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default LogIn;
