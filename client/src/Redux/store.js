import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice.js";
import collabSliceReducer from "./Slices/collabSlice.js";

const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        collab : collabSliceReducer
    }
});

export default store;


