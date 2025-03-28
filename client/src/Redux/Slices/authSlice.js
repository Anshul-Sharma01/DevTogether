
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from "../../helpers/axiosInstance.js";
import toast from 'react-hot-toast';

const updateLocalStorage = (user) => {
    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", user?.role);
};


const initialState = {
    isLoggedIn : localStorage.getItem("isLoggedIn") === "true",
    userRole : localStorage.getItem("userRole") !== undefined ? localStorage.getItem("userRole") : "",
    userData : JSON.parse(localStorage.getItem("userData")) !== undefined ? JSON.parse(localStorage.getItem("userData")) : {},
}

const toastHandler = (promise, loadingMsg, successMsg, errorMsg) => {
    return toast.promise(promise, {
        loading: loadingMsg,
        success: (data) => data?.data?.message || successMsg,
        error: errorMsg,
    });
};

export const createUserAccountThunk = createAsyncThunk("/auth/register", async (data) => {
    try {
        const res = axiosInstance.post("user/register", data);
        toastHandler(res, "Creating your account..", "Account created successfully!", "Failed to create a new account!");
        return (await res).data;
    } catch (err) {
        console.error(`Error occurred in creating new account: ${err}`);
    }
});

export const loginUserAccountThunk = createAsyncThunk("/auth/login", async(data) => {
    try{
        const res = axiosInstance.post("user/login", data);
        toastHandler(res, "Authenticating your credentials", "Authentication Successfully", "Failed to Authenticate User, Wrong Credentials");
        return (await res).data;
    }catch(err){
        console.error(`Error occurred while logging in : ${err}`);
    }
})

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createUserAccountThunk.fulfilled, (state, action) => {
            if (action?.payload?.statusCode === 201) {
                const user = action?.payload?.data;
                updateLocalStorage(user);
                state.isLoggedIn = true;
                state.userData = user;
                state.userRole = user?.role;
            }
        })
        .addCase(createUserAccountThunk.rejected, (state) => {
            localStorage.clear();
            state.userData = {};
            state.isLoggedIn = false;
            state.userRole = "";
        })
        .addCase(loginUserAccountThunk.fulfilled, (state, action) => {
            if (action?.payload?.statusCode === 200) {
                const user = action?.payload?.data;
                updateLocalStorage(user);
                state.isLoggedIn = true;
                state.userData = user;
                state.userRole = user?.role;
            }
        })
        .addCase(loginUserAccountThunk.rejected, (state) => {
            localStorage.clear();
            state.userData = {};
            state.isLoggedIn = false;
            state.userRole = "";
        })
    }
})


export default authSlice.reducer;