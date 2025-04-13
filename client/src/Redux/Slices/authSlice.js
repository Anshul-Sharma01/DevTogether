
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

const toastHandler = (promise, loadingMsg, successMsg) => {
    return toast.promise(promise, {
        loading: loadingMsg,
        success: (data) => data?.data?.message || successMsg,
    });
};

export const createUserAccountThunk = createAsyncThunk("/auth/register", async (data) => {
    try {
        const res = axiosInstance.post("user/register", data);
        toastHandler(res, "Creating your account..", "Account created successfully!");
        return (await res).data;
    } catch (err) {
        console.error(`Error occurred in creating new account: ${err}`);
    }
});

export const loginUserAccountThunk = createAsyncThunk("/auth/login", async(data, { rejectWithValue }) => {
    try{
        const res = axiosInstance.post("user/login", data);
        toastHandler(res, "Authenticating your credentials", "Authentication Successfully");
        return (await res).data;
    }catch(err){
        console.log("Error :,,", err );
        const message = err?.response?.data?.message || "Something went wrong during login";
        return rejectWithValue(message); 
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

export const updateUsernameThunk = createAsyncThunk("/auth/update-username", async(data) => {
    try{    
        const res = axiosInstance.patch("user/update-username", data);
        toastHandler(res, "Updating your username...", "Successfully updated username", "Failed to update username");
        return (await res).data;
    }catch(err){
        console.error(`Error occurred while updating username  : ${err}`);
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
        .addCase(loginUserAccountThunk.rejected, (state, action) => {
            localStorage.clear();
            state.userData = {};
            state.isLoggedIn = false;
            state.userRole = "";
            toast.error(action.payload || "Login failed");
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
        .addCase(updateUsernameThunk.fulfilled, (state, action) => {
            if(action.payload?.statusCode === 200){
                state.userData = action?.payload?.data;
                updateLocalStorage(action?.payload?.data);
            }
        })
    }
})


export default authSlice.reducer;