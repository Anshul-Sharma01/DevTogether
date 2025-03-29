import React, { useEffect, useState } from 'react';  // ✅ Import useState
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUserAccountThunk } from '../../Redux/Slices/authSlice';

function LogIn() {

    
    const [inputValue, setInputValue] = useState({
        input: '',
        password: ''
    });
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        toast.dismiss();
        if(!inputValue.input || !inputValue.password) {
            toast.error("Please fill in all fields!");
            return;
        }
        
        
        const res = await dispatch(loginUserAccountThunk({ username : inputValue.input, password : inputValue.password }));
        console.log(res);
        if(res?.payload?.statusCode === 200){
            navigate("/");
        }
        
    };
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    useEffect(() => {
        if(isLoggedIn){
            console.log("already logged in");
            window.alert("You are already logged in!");
            navigate("/");
        }
    }, [])

    return (
        <section className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-900 transition-colors duration-300">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md space-y-8">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100">Sign In</h1>

                {/* ✅ Ensure form submission calls handleLogin */}
                <form className="space-y-6" onSubmit={handleLogin}>   
                    {/* Email/Username Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email / Username
                        </label>
                        <input
                            type="text"
                            value={inputValue.input}
                            onChange={(e) => setInputValue({ ...inputValue, input: e.target.value })}  // ✅ Correctly updates state
                            className="mt-2 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                            placeholder="Enter your email or username"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            value={inputValue.password}  // ✅ Use inputValue.password, not setInputValue.password
                            onChange={(e) => setInputValue({ ...inputValue, password: e.target.value })}  // ✅ Correct syntax
                            className="mt-2 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                    >
                        Sign In
                    </button>
                </form>

                {/* Links for Sign Up and Forgot Password */}
                <div className='flex flex-col justify-center items-center gap-2'>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        Don't have an account? <Link to={"/auth/sign-up"} className="text-blue-500 dark:text-red-500 hover:underline">Sign Up</Link>
                    </p>
                    <Link to={"/auth/forgot-password"} className='text-blue-500 dark:text-red-500 text-center hover:underline'>
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default LogIn;
