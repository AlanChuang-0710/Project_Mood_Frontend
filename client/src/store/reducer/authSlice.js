import { createSlice } from "@reduxjs/toolkit";
import { removeCookie } from "../../utils/public";

const getUserInformation = () => {
    const userInfo = sessionStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : { username: null, accessToken: null, id: null, email: null };
};

const authSlice = createSlice({
    name: "auth",
    initialState: getUserInformation(),
    reducers: {
        setCredentials: (state, action) => {
            const { username, accessToken, id, email } = action.payload;
            state.username = username;
            state.accessToken = accessToken;
            state.email = email;
            state.id = id;
            sessionStorage.setItem("userInfo", JSON.stringify({ username, accessToken, id, email }));
        },
        logout: (state, action) => {
            state.username = null;
            state.accessToken = null;
            state.email = null;
            state.id = null;
            sessionStorage.removeItem("userInfo");
            removeCookie("refreshToken");
        }
    }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice;
export const selectCurrentUsername = (state) => state.auth.username;
export const selectCurrentAccessToken = (state) => state.auth.accessToken;
export const selectCurrentUserId = (state) => state.auth.id;
export const selectCurrentUserInfo = (state) => state.auth;