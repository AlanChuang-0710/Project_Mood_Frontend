import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { username: null, accessToken: null, id: null },
    reducers: {
        setCredentials: (state, action) => {
            const { username, accessToken, id } = action.payload;
            state.username = username;
            state.accessToken = accessToken;
            state.id = id;
        },
        logout: (state, action) => {
            state.username = null;
            state.accessToken = null;
            state.id = null;
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice;
export const selectCurrentUsername = (state) => state.auth.username;
export const selectCurrentAccessToken = (state) => state.auth.accessToken;
export const selectCurrentUserId = (state) => state.auth.id;