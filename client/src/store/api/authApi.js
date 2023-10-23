import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const authApi = createApi({

    //Api的標示，不能跟其他Api或是reducer重複
    reducerPath: "authApi",

    //指定查詢的基礎信息，發信請求的工具
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:3000/users",
        // 統一修改請求頭 + 獲取redux store倉庫
        // prepareHeaders: (headers, { getState }) => {
        //     const token = getState().XXX;
        //     if (token) {
        //         headers.set("Authorization", `Bearer token`);
        //     }
        //     return headers;
        // }
    }),

    tagTypes: ["login", "register"], //用來指定Api中的標籤類型

    endpoints(build) {
        //build是請求的構建器，通過build來設置請求的相關信息
        return {
            login: build.mutation({
                query(data) {
                    return {
                        url: `/login`,
                        method: "post",
                        body: data
                    };
                },
                providesTags: ["login"]
            }),

            register: build.mutation({
                query(data) {
                    return {
                        url: `/register`,
                        method: "post",
                        body: data
                    };
                },
                providesTags: ["register"]
            }),


            // getStudentById: build.query({
            //     query(id) { //調用鉤子函數時會傳入參數
            //         return `students/id`;
            //     },
            //     // 用來轉換響應數據的格式，可以設定返回的data數據格式
            //     transformResponse(baseQueryReturnValue) {
            //         return baseQueryReturnValue.data;
            //     },
            //     // keepUnusedDataFor: 2, // 設置數據緩存的時間，單位為秒，默認60s
            //     providesTags: [{
            //         type: "ATags",
            //         id: "XXX"
            //     }]
            // }),

            // updateStudent: build.mutation({
            //     query(stu) {
            //         return {
            //             url: `students/${stu.id}`,
            //             method: "put",
            //             body: {
            //                 data: stu.attributes
            //             }
            //         };
            //     },
            //     invalidatesTags: [{
            //         type: "ATags",
            //         id: "XXX"
            //     }]
            // })
        };
    }
});


// 自動生成的鉤子函數的命名規則 getStudents ---> useGetStudentsQuery (use表示鉤子函數 Query表示查詢)
export const { useLoginMutation, useRegisterMutation, useGetStudentByIdQuery, useUpdateStudentMutation } = authApi;
export default authApi;
