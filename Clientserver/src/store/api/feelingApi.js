import { createApi, } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReauth } from "../../utils/request";
const HOST = process.env.REACT_APP_SERVER_HOST;
const APIPort = process.env.REACT_APP_API_PORT;

const feelingApi = createApi({

    //Api的標示，不能跟其他Api或是reducer重複
    reducerPath: "feelingApi",

    //指定查詢的基礎信息，發信請求的工具
    baseQuery: baseQueryWithReauth(`${HOST}:${APIPort}`, "/feeling", "/users/refresh"),

    tagTypes: ["getFeeling", "addFeeling", "deleteFeeling"], //用來指定Api中的標籤類型

    endpoints(build) {
        //build是請求的構建器，通過build來設置請求的相關信息
        return {
            getUserFeeling: build.query({
                query({ id, startTime, endTime }) {
                    return {
                        url: `/${id}`,
                        method: "get",
                        params: { startTime, endTime }
                    };
                },
                keepUnusedDataFor: 50, // 設置數據緩存的時間，單位為秒，默認60s
                providesTags: ["getFeeling"]
            }),

            updateUserFeeling: build.mutation({
                query({ id, data }) {
                    return {
                        url: `/${id}`,
                        method: "post",
                        body: data,
                    };
                },
                //     用來轉換響應數據的格式，可以設定返回的data數據格式
                //     transformResponse(baseQueryReturnValue) {
                //         return baseQueryReturnValue.data;
                //     },
                providesTags: [{
                    type: "addFeeling",
                }],
                invalidatesTags: ["getFeeling"]
            }),

            deleteFeeling: build.mutation({
                query({ id, feelingId }) {
                    return {
                        url: `/${id}/${feelingId}`,
                        method: "delete",
                    };
                },
                providesTags: [{
                    type: "deleteFeeling",
                }],
                invalidatesTags: ["getFeeling"]
            }),

            getUserKOLTagsOptions: build.query({
                query({ id, type }) {
                    return {
                        url: `/${id}/options`,
                        method: "get",
                        params: {
                            type
                        }
                    };
                },
                keepUnusedDataFor: 0, // 設置數據緩存的時間，單位為秒，默認60s
                providesTags: ["getUserKOLTagsOptions"]
            }),

            updateUserKOLTagsOptions: build.mutation({
                query({ id, type, data }) {
                    return {
                        url: `/${id}/options/${type}`,
                        method: "post",
                        body: data,
                    };
                },
                providesTags: ["updateUserKOLTagsOptions"],
                invalidatesTags: ["getUserKOLTagsOptions"]
            }),
        };
    }
});


// 自動生成的鉤子函數的命名規則 getStudents ---> useGetStudentsQuery (use表示鉤子函數 Query表示查詢)
export const { useGetUserFeelingQuery, useUpdateUserFeelingMutation, useDeleteFeelingMutation, useGetUserKOLTagsOptionsQuery, useUpdateUserKOLTagsOptionsMutation } = feelingApi;
export default feelingApi;
