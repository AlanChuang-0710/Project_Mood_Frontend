import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { setCredentials, logout } from "../reducer/authSlice";

//指定查詢的基礎信息，發信請求的工具
const baseQuery = fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000/report",
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

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.data?.data?.message === "jwt expired") {
        const refreshResult = await fetchBaseQuery({ baseUrl: "http://127.0.0.1:3000", credentials: "include", mode: 'cors' })('/users/refresh', api, extraOptions);
        if (refreshResult?.data?.data?.accessToken) {
            const authData = api.getState().auth;
            api.dispatch(setCredentials({ ...authData, accessToken: refreshResult.data.data.accessToken })); // store new token
            result = await baseQuery(args, api, extraOptions); // retry original query with new access token
        } else {
            api.dispatch(logout());
        }
    }
    return result;
};

const analysisApi = createApi({

    //Api的標示，不能跟其他Api或是reducer重複
    reducerPath: "analysis",

    //指定查詢的基礎信息，發信請求的工具
    baseQuery: baseQueryWithReauth,

    tagTypes: ["getScorePieChartData"], //用來指定Api中的標籤類型

    endpoints(build) {
        //build是請求的構建器，通過build來設置請求的相關信息
        return {
            getScorePieChartData: build.query({
                query({ id, startTime, endTime }) {
                    return {
                        url: `/${id}/score_pie_chart`,
                        method: "get",
                        params: { startTime, endTime }
                    };
                },
                keepUnusedDataFor: 0, // 設置數據緩存的時間，單位為秒，默認60s
                providesTags: [{
                    type: "getScorePieChartData",
                }]
            }),

            getScoreLineChartData: build.query({
                query({ id, startTime, endTime }) {
                    return {
                        url: `/${id}/score_line_chart`,
                        method: "get",
                        params: { startTime, endTime }
                    };
                },
                keepUnusedDataFor: 0, // 設置數據緩存的時間，單位為秒，默認60s
                providesTags: [{
                    type: "getScoreLineChartData",
                }]
            }),

            getScoreDayBarData: build.query({
                query({ id, startTime, endTime }) {
                    return {
                        url: `/${id}/score_day_bar`,
                        method: "get",
                        params: { startTime, endTime }
                    };
                },
                keepUnusedDataFor: 0, // 設置數據緩存的時間，單位為秒，默認60s
                providesTags: [{
                    type: "getScoreDayBarData",
                }]
            }),

            getSleepLineChartData: build.query({
                query({ id, startTime, endTime }) {
                    return {
                        url: `/${id}/sleep_line_chart`,
                        method: "get",
                        params: { startTime, endTime }
                    };
                },
                keepUnusedDataFor: 0, // 設置數據緩存的時間，單位為秒，默認60s
                providesTags: [{
                    type: "getSleepLineChartData",
                }]
            }),
        };
    }
});


// 自動生成的鉤子函數的命名規則 getStudents ---> useGetStudentsQuery (use表示鉤子函數 Query表示查詢)
export const { useGetScorePieChartDataQuery, useGetScoreLineChartDataQuery, useGetScoreDayBarDataQuery, useGetSleepLineChartDataQuery } = analysisApi;
export default analysisApi;
