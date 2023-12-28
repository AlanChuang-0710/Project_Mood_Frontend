import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReauth } from "../../utils/request";


const commonApi = createApi({

    //Api的標示，不能跟其他Api或是reducer重複
    reducerPath: "common",

    //指定查詢的基礎信息，發信請求的工具
    baseQuery: baseQueryWithReauth("http://127.0.0.1:3000", "/common", "/users/refresh"),

    tagTypes: ["getCommonData"], //用來指定Api中的標籤類型

    endpoints(build) {
        //build是請求的構建器，通過build來設置請求的相關信息
        return {
            getCommonEssayData: build.query({
                query({ id }) {
                    return {
                        url: `/${id}/essay`,
                        method: "get",
                    };
                },
                keepUnusedDataFor: 0, // 設置數據緩存的時間，單位為秒，默認60s
                providesTags: [{
                    type: "getCommonData",
                }]
            }),

        };
    }
});


// 自動生成的鉤子函數的命名規則 getStudents ---> useGetStudentsQuery (use表示鉤子函數 Query表示查詢)
export const { useGetCommonEssayDataQuery } = commonApi;
export default commonApi;
