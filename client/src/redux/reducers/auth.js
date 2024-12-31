import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loader: true
}

export const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        userExists: (state, action) => {
            state.user = action.payload;
            state.loader = false;
        },
        userDoesNotExist: (state) => {
            state.user = null;
            state.loader = false;
        }
    }
});

export const { userExists, userDoesNotExist } = authSlice.actions;