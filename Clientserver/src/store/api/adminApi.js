import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const adminApi = createApi({

    //Api的標示，不能跟其他Api或是reducer重複
    reducerPath: "admin",

    //指定查詢的基礎信息，發信請求的工具
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:3002/admin",
        credentials: "include", // 即便跨域也會攜帶上cookie
        mode: 'cors',
    }),

    tagTypes: ["getAllBuryPointData"], //用來指定Api中的標籤類型

    endpoints(build) {
        //build是請求的構建器，通過build來設置請求的相關信息
        return {
            getAllBuryPointData: build.query({
                query() {
                    return {
                        url: `/bp/all`,
                        method: "get",
                    };
                },
                keepUnusedDataFor: 0, // 設置數據緩存的時間，單位為秒，默認60s
                providesTags: [{
                    type: "getAllBuryPointData",
                }]
            }),
            addBuryPoint: build.mutation({
                query(data) {
                    return {
                        url: `bp`,
                        method: `post`,
                        body: data
                    };
                },
                invalidatesTags: ["getAllBuryPointData"]
            }),
            editBuryPoint: build.mutation({
                query({ bp_id, ...data }) {
                    return {
                        url: `bp/${bp_id}`,
                        method: `put`,
                        body: data,
                    };
                },
                invalidatesTags: ["getAllBuryPointData"]
            }),
            deleteBuryPoint: build.mutation({
                query(bp_id) {
                    return {
                        url: `bp/${bp_id}`,
                        method: `delete`,
                    };
                },
                invalidatesTags: ["getAllBuryPointData"]
            })
        };
    }
});


// 自動生成的鉤子函數的命名規則 getStudents ---> useGetStudentsQuery (use表示鉤子函數 Query表示查詢)
export const { useGetAllBuryPointDataQuery, useAddBuryPointMutation, useEditBuryPointMutation, useDeleteBuryPointMutation } = adminApi;
export default adminApi;