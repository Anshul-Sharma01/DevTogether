
import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from "../../helpers/axiosInstance.js";

const initialState = {
    isLoggedIn : localStorage.getItem("isLoggedIn") === "true",
    userRole : localStorage.getItem("userRole") !== undefined ? localStorage.getItem("userRole") : "",
    userData : JSON.parse(localStorage.getItem("userData")) !== undefined ? JSON.parse(localStorage.getItem("userData")) : {},
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {},
})


export default authSlice.reducer;