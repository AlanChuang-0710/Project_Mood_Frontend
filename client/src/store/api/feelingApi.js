import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { setCredentials, logout } from "../reducer/authSlice";

//指定查詢的基礎信息，發信請求的工具
const baseQuery = fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/users",
    // credentials: "include", // 即便跨域也會攜帶上cookie
    // 統一修改請求頭 參數包括(headers && redux store倉庫)
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("Authorization", `Bearer token`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.msg === "token expires") {
        // Send refresh token to get new access token
        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        if (refreshResult?.data) {
            const username = api.getState().auth.username;
            // store new token
            api.dispatch(setCredentials({ ...refreshResult.data, username }));
            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }
    return result;
};

const feelingApi = createApi({

    //Api的標示，不能跟其他Api或是reducer重複
    reducerPath: "feelingApi",

    //指定查詢的基礎信息，發信請求的工具
    baseQuery: baseQueryWithReauth,

    tagTypes: ["getFeeling"], //用來指定Api中的標籤類型

    endpoints(build) {
        //build是請求的構建器，通過build來設置請求的相關信息
        return {
            getUserFeeling: build.query({
                query(time) {
                    return {
                        url: `/${"getUserId()"}`,
                        method: "get",
                        params: time
                    };
                },
                providesTags: [{
                    type: "getFeeling",
                }]
            }),

            addUserFeeling: build.mutation({
                query(data) {
                    return {
                        url: `/${"getUserId()"}`,
                        method: "post",
                        body: data,
                    };
                },
                providesTags: [{
                    type: "addFeeling",
                    id: ""
                }]
            })
        };
    }
});


// 自動生成的鉤子函數的命名規則 getStudents ---> useGetStudentsQuery (use表示鉤子函數 Query表示查詢)
export const { useGetUserFeelingQuery, useAddUserFeelingMutation } = feelingApi;
export default feelingApi;
