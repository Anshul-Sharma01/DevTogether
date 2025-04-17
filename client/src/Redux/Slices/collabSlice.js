import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance.js";
import toast from "react-hot-toast";


const initialState = {
    allCollabs : [],
    recentCollab: (() => {
        try {
            const item = localStorage.getItem("recentCollab");
            return item ? JSON.parse(item) : null;
        } catch {
            return null;
        }
    })()    
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

export const deleteCollabThunk = createAsyncThunk("/collab/delete-collab", async({roomId}, { rejectWithValue }) => {
    try{
        const res = axiosInstance.delete(`collab/delete-collab/${roomId}`);
        toastHandler(res, "Deleting the collab", "Collab Deleted Successfully");
        return (await res).data;
    }catch(err){
        const message = err?.response?.data?.message || "Error occurred while deleting a collab";
        rejectWithValue(message);
    }
})

export const startPlayGroundThunk = createAsyncThunk("/collab/start-playground", async({roomId}, {rejectWithValue}) => {
    try{
        const res = axiosInstance.post(`collab/playground/${roomId}`);
        toastHandler(res, "Starting Collab Playground", "PlayGround Started Successfully");
        return (await res).data;
    }catch(err){
        const message = err?.response?.data?.messaege || "Error occurred while starting playing a collab";
        rejectWithValue(message);
    }
})

export const stopCollabThunk = createAsyncThunk("/collab/stop-collab", async({roomId}, {rejectWithValue}) => {
    try{
        const res = axiosInstance.post(`collab/stop-collab/${roomId}`);
        return (await res).data;
    }catch(err){
        const message = err?.response?.data?.message || "Error occurred while stopping collab";
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
                localStorage.setItem("recentCollab", JSON.stringify(state.recentCollab));
            })
            .addCase(createNewCollabThunk.rejected, (_, action) => {
                toast.error(action?.payload || "Error occurred while creating a new collab");
            })
            .addCase(deleteCollabThunk.fulfilled, (state, action) => {
                const deletedRoomId = action?.payload?.data?.roomId;
                state.allCollabs = state.allCollabs.filter((collab) => collab.roomId != deletedRoomId);
            })
            .addCase(deleteCollabThunk.rejected, (_, action) => {
                toast.error(action?.payload || "Error occurred while deleting the collab");
            })
            .addCase(startPlayGroundThunk.rejected, (_, action) => {
                toast.error(action?.payload || "Error occurred ");
            })
            .addCase(stopCollabThunk.rejected, (_, action) => {
                toast.error(action?.payload);
            })
    } 
})



export default collabSlice.reducer; 
