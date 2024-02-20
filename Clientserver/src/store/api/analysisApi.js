import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReauth } from "@/utils/request";
const HOST = process.env.REACT_APP_SERVER_HOST;
const APIPort = process.env.REACT_APP_API_PORT;

const analysisApi = createApi({

    //Api的標示，不能跟其他Api或是reducer重複
    reducerPath: "analysis",

    //指定查詢的基礎信息，發信請求的工具
    baseQuery: baseQueryWithReauth(`${HOST}:${APIPort}`, "/report", "/users/refresh"),

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

            getDreamKeywordData: build.query({
                query({ id, startTime, endTime }) {
                    return {
                        url: `/${id}/dream_keyword_chart`,
                        method: "get",
                        params: { startTime, endTime }
                    };
                },
                keepUnusedDataFor: 0, // 設置數據緩存的時間，單位為秒，默認60s
                providesTags: [{
                    type: "getDreamKeywordData",
                }]
            }),

            getMemoKeywordData: build.query({
                query({ id, startTime, endTime }) {
                    return {
                        url: `/${id}/memo_keyword_chart`,
                        method: "get",
                        params: { startTime, endTime }
                    };
                },
                keepUnusedDataFor: 0, // 設置數據緩存的時間，單位為秒，默認60s
                providesTags: [{
                    type: "getMemoKeywordData",
                }]
            }),

            getTagsScoreData: build.query({
                query({ id, startTime, endTime }) {
                    return {
                        url: `/${id}/tags_score_chart`,
                        method: "get",
                        params: { startTime, endTime }
                    };
                },
                keepUnusedDataFor: 0, // 設置數據緩存的時間，單位為秒，默認60s
                providesTags: [{
                    type: "getTagsScoreData",
                }]
            }),

            getKOLScoreData: build.query({
                query({ id, startTime, endTime }) {
                    return {
                        url: `/${id}/kol_score_chart`,
                        method: "get",
                        params: { startTime, endTime }
                    };
                },
                keepUnusedDataFor: 0, // 設置數據緩存的時間，單位為秒，默認60s
                providesTags: [{
                    type: "getKOLScoreData",
                }]
            })
        };
    }
});


// 自動生成的鉤子函數的命名規則 getStudents ---> useGetStudentsQuery (use表示鉤子函數 Query表示查詢)
export const { useGetScorePieChartDataQuery, useGetScoreLineChartDataQuery, useGetScoreDayBarDataQuery, useGetSleepLineChartDataQuery, useGetDreamKeywordDataQuery, useGetMemoKeywordDataQuery, useGetTagsScoreDataQuery, useGetKOLScoreDataQuery } = analysisApi;
export default analysisApi;
