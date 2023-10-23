import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { getToken, getUserId } from "../../utils/auth";

const feelingApi = createApi({

    //Api的標示，不能跟其他Api或是reducer重複
    reducerPath: "feelingApi",

    //指定查詢的基礎信息，發信請求的工具
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:3000/feeling",
        // 統一修改請求頭 + 獲取redux store倉庫
        prepareHeaders: (headers, { getState }) => {
            const token = getToken();
            if (token) {
                // headers.set("Authorization", `Bearer ${token}`);
                headers.set("token", `${token}`);
            }
            return headers;
        }
    }),

    tagTypes: ["getFeeling"], //用來指定Api中的標籤類型

    endpoints(build) {
        //build是請求的構建器，通過build來設置請求的相關信息
        return {
            getUserFeeling: build.query({
                query(time) {
                    return {
                        url: `/${getUserId()}`,
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
                        url: `/${getUserId()}`,
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
