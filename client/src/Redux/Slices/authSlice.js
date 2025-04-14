
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

export const createUserAccountThunk = createAsyncThunk("/auth/register", async (data, {rejectWithValue}) => {
    try {
        const res = axiosInstance.post("user/register", data);
        toastHandler(res, "Creating your account..", "Account created successfully!");
        return (await res).data;
    } catch (err) {
        // console.error(`Error occurred in creating new account: ${err}`);
        const message = err?.response?.data?.message || "Something is wrong";
        return rejectWithValue(message);
    }
});

export const loginUserAccountThunk = createAsyncThunk("/auth/login", async(data, { rejectWithValue }) => {
    try{
        const res = axiosInstance.post("user/login", data);
        toastHandler(res, "Authenticating your credentials", "Authentication Successfully");
        return (await res).data;
    }catch(err){
        // console.log("Error :,,", err );
        const message = err?.response?.data?.message || "Something went wrong during login";
        return rejectWithValue(message); 
    }
})

export const logoutUserThunk = createAsyncThunk("/auth/logout", async( _, { rejectWithValue }) => {
    try{
        const res = axiosInstance.get("user/logout");
        toastHandler(res, "Logging out", "Log Out Successfully");
        return (await res).data;
    }catch(err){
        // console.error(`Error occurred while logging out user : ${err}`);
        const message = err?.response?.data?.message || "Something went wrong during logout";
        return rejectWithValue(message); 
    }
})

export const updateProfilePictureThunk = createAsyncThunk("/auth/profile-picture", async(data, {rejectWithValue}) => {
    try{
        
        const res = axiosInstance.post("user/update-picture", data);
        toastHandler(res, "Updating your profile picture...", "Successfully updated profile picture");
        return (await res).data;

    }catch(err){
        // console.error(`Error occurred while updating profile picture : ${err}`);
        const message = err?.response?.data?.message || "Something went wrong during updating profile picture";
        return rejectWithValue(message); 
    }
})

export const updateProfileThunk = createAsyncThunk("/auth/update-profile", async(data, {rejectWithValue}) => {
    try{
        const res = axiosInstance.patch("user/update-profile", data);
        toastHandler(res, "Updating your profile...", "Successfully updated profile");
        return (await res).data;
    }catch(err){    
        // console.error(`Error occurred while updating profile : ${err}`);
        const message = err?.response?.data?.message || "Something went wrong during updating profile details";
        return rejectWithValue(message); 
    }
})

export const updateUsernameThunk = createAsyncThunk("/auth/update-username", async(data, {rejectWithValue}) => {
    try{    
        const res = axiosInstance.patch("user/update-username", data);
        toastHandler(res, "Updating your username...", "Successfully updated username");
        return (await res).data;
    }catch(err){
        // console.error(`Error occurred while updating username  : ${err}`);
        const message = err?.response?.data?.message || "Something went wrong during updating username";
        return rejectWithValue(message); 
    }
})

export const deleteAccountThunk = createAsyncThunk("/auth/delete-account", async(data, { rejectWithValue }) =>{
    try{
        const res = axiosInstance.delete("user/delete-account");
        toastHandler(res, "Deleting your account...", "Account deleted successfully");
        return (await res).data;
    }catch(err){
        const message = err?.response?.data?.message || "Something went wrong during deleting account";
        return rejectWithValue(message);
    }
})

export const changePasswordThunk = createAsyncThunk("/auth/change-password", async(data, { rejectWithValue }) => {
    try{
        const res = axiosInstance.patch("user/change-password", data);
        toastHandler(res, "Changing your password", "Password Changed Successfully");
        return (await res).data;
    }catch(err){
        console.log(err);
        const message = err?.response?.data?.message || "Something went wrong during changing password";
        return rejectWithValue(message);
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
        .addCase(createUserAccountThunk.rejected, (state, action) => {
            localStorage.clear();
            state.userData = {};
            state.isLoggedIn = false;
            state.userRole = "";
            toast.error(action.payload || "Registration failed")
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
        .addCase(logoutUserThunk.rejected, (state, action) => {
            localStorage.clear();
            state.userData = {}
            state.isLoggedIn = false;
            state.userRole = "";
            // toast.error(action.payload || "Logout failed");
        })
        .addCase(updateProfilePictureThunk.fulfilled, (state, action) => {
            state.userData = action?.payload?.data;
            updateLocalStorage(action?.payload?.data);
        })
        .addCase(updateProfilePictureThunk.rejected, (state, action) => {
            toast.error(action.payload || "Profile picture update failed");
        })
        .addCase(updateProfileThunk.fulfilled, (state, action) => {
            state.userData = action?.payload?.data;
            updateLocalStorage(action?.payload?.data);
        })
        .addCase(updateProfileThunk.rejected, (state, action) => {
            toast.error(action.payload || "Profile update failed");
        })
        .addCase(updateUsernameThunk.fulfilled, (state, action) => {
            if(action.payload?.statusCode === 200){
                state.userData = action?.payload?.data;
                updateLocalStorage(action?.payload?.data);
            }
        })
        .addCase(updateUsernameThunk.rejected, (state, action) => {
            toast.error(action.payload || "Username update failed");
        })
        .addCase(deleteAccountThunk.fulfilled, (state, action) => {
            localStorage.clear();
            state.userData = {}
            state.isLoggedIn = false;
            state.userRole = "";
        })
        .addCase(deleteAccountThunk.rejected, (state, action) => {
            toast.error(action.payload || "Account deletion failed");
        })
        .addCase(changePasswordThunk.rejected, (_, action) => {
            toast.error(action.payload || "Password change failed");
        })
    }
})


export default authSlice.reducer;