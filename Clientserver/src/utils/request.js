import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { setCredentials, logout } from "../store/reducer/authSlice";

//指定查詢的基礎信息，發信請求的工具
const baseQuery = (url) => fetchBaseQuery({
    baseUrl: url,
    credentials: "include", // 即便跨域也會攜帶上cookie
    mode: 'cors',
    timeout: 10000,
    // 統一修改請求頭 參數包括(headers && redux store倉庫)
    prepareHeaders: (headers, { getState }) => {
        const accessToken = getState().auth.accessToken;
        if (accessToken) {
            headers.set("accessToken", accessToken);
        }
        return headers;
    }
});

export const baseQueryWithReauth = (baseURL, targetURLSuffix, refreshURLSuffix) => async (args, api, extraOptions) => {
    const preRequest = async () => await baseQuery(`${baseURL}${targetURLSuffix}`)(args, api, extraOptions);
    let result = await preRequest();
    /* refresh token */
    if (result?.data?.errorMessage === "jwt expired") {
        const refreshResult = await fetchBaseQuery({ baseURL, credentials: "include", mode: 'cors' })(`${baseURL}${refreshURLSuffix}`, api, extraOptions);
        if (refreshResult?.data?.data?.accessToken) {
            const authData = api.getState().auth;
            api.dispatch(setCredentials({ ...authData, accessToken: refreshResult.data.data.accessToken })); // store new token
            result = await preRequest(); // retry original query with new access token
        } else {
            api.dispatch(logout());
        }
    }
    return result;
};

