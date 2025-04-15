import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance.js";
import toast from "react-hot-toast";


const initialState = {
    allCollabs : [],
    recentCollab : null
}


const toastHandler = (promise, loadingMsg, successMsg) => {
    return toast.promise(promise, {
        loading: loadingMsg,
        success: (data) => data?.data?.message || successMsg,
    });
}


export const fetchAllCollabsThunk = createAsyncThunk("/collab/fetch-all", async (_, {rejectWithValue}) => {
    try{    
        const res = axiosInstance.get("collab/all-collabs");
        toastHandler(res, "Fetching all collabs", "Fetched all collabs successfully");
        return (await res).data;
    }catch(err){
        const message = err?.response?.data?.message || "Error occurred while fetching all collabs";
        return rejectWithValue(message);
    }
})

export const createNewCollabThunk = createAsyncThunk("/collab/create", async(data, {rejectWithValue}) => {
    try{
        const res = axiosInstance.post("collab/create", data);
        toastHandler(res, "Creating new collab", "Collab created successfully");
        return (await res).data;
    }catch(err){
        const message = err?.response?.data?.message || "Error occurred while creating a new collab";
        rejectWithValue(message);
    }
})


const collabSlice = createSlice({
    name : "collab",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(fetchAllCollabsThunk.fulfilled, (state, action) => {
                state.allCollabs = action?.payload?.data;
                state.recentCollab = action?.payload?.data[0] || null;
            })
            .addCase(fetchAllCollabsThunk.rejected, (state, action) => {
                state.allCollabs = [];
                toast.error(action?.payload || "Error occurred while fetching all collabs");
            })
            .addCase(createNewCollabThunk.fulfilled, (state, action) => {
                state.recentCollab = action?.payload?.data;
            })
            .addCase(createNewCollabThunk.rejected, (state, action) => {
                toast.error(action?.payload || "Error occurred while creating a new collab");
            })
    } 
})



export default collabSlice.reducer; 
