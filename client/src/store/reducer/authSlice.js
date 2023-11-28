import { createSlice } from "@reduxjs/toolkit";

const getUserInformation = () => {
    const userInfo = sessionStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : { username: null, accessToken: null, id: null };
};

const authSlice = createSlice({
    name: "auth",
    initialState: getUserInformation(),
    reducers: {
        setCredentials: (state, action) => {
            const { username, accessToken, id } = action.payload;
            state.username = username;
            state.accessToken = accessToken;
            state.id = id;
            sessionStorage.setItem("userInfo", JSON.stringify({ username, accessToken, id }));
        },
        logout: (state, action) => {
            state.username = null;
            state.accessToken = null;
            state.id = null;
            sessionStorage.removeItem("userInfo");
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice;
export const selectCurrentUsername = (state) => state.auth.username;
export const selectCurrentAccessToken = (state) => state.auth.accessToken;
export const selectCurrentUserId = (state) => state.auth.id;