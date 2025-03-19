
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from "../../helpers/axiosInstance.js";

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
        const res = axiosInstance.post("users/register", data);
        toastHandler(res, "Creating your account..", "Account created successfully!", "Failed to create a new account!");
        return (await res).data;
    } catch (err) {
        console.error(`Error occurred in creating new account: ${err}`);
    }
});

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {},
})


export default authSlice.reducer;