
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from "../../helpers/axiosInstance.js";
import toast from 'react-hot-toast';

const updateLocalStorage = (user) => {
    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", user?.role);
};


const userDataRaw = localStorage.getItem("userData");

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    userRole: localStorage.getItem("userRole") || "",
    userData: userDataRaw && userDataRaw !== "undefined" ? JSON.parse(userDataRaw) : {},
};

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

export const logoutUserThunk = createAsyncThunk("/auth/logout", async() => {
    try{
        const res = axiosInstance.get("user/logout");
        toastHandler(res, "Logging out", "Log Out Successfully", "Failed to Logout");
        return (await res).data;
    }catch(err){
        console.error(`Error occurred while logging out user : ${err}`);
    }
})

export const updateProfilePictureThunk = createAsyncThunk("/auth/profile-picture", async(data) => {
    try{
        
        const res = axiosInstance.post("user/update-picture", data);
        toastHandler(res, "Updating your profile picture...", "Successfully updated profile picture", "Failed to update profile picture");
        return (await res).data;

    }catch(err){
        console.error(`Error occurred while updating profile picture : ${err}`);
    }
})

export const updateProfileThunk = createAsyncThunk("/auth/update-profile", async(data) => {
    try{
        const res = axiosInstance.patch("user/update-profile", data);
        toastHandler(res, "Updating your profile...", "Successfully updated profile", "Failed to update profile");
        return (await res).data;
    }catch(err){    
        console.error(`Error occurred while updating profile : ${err}`);
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
        .addCase(logoutUserThunk.fulfilled, (state, action) => {
            localStorage.clear();
            state.userData = {}
            state.isLoggedIn = false;
            state.userRole = "";
        })
        .addCase(updateProfilePictureThunk.fulfilled, (state, action) => {
            state.userData = action?.payload?.data;
            updateLocalStorage(action?.payload?.data);
        })
        .addCase(updateProfileThunk.fulfilled, (state, action) => {
            state.userData = action?.payload?.data;
            updateLocalStorage(action?.payload?.data);
        })
        
    }
})


export default authSlice.reducer;