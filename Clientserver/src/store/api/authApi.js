import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
const HOST = process.env.REACT_APP_SERVER_HOST;
const APIPort = process.env.REACT_APP_API_PORT;

const authApi = createApi({

    //Api的標示，不能跟其他Api或是reducer重複
    reducerPath: "authApi",

    baseQuery: fetchBaseQuery({
        baseUrl: `${HOST}:${APIPort}/users`,
        credentials: "include", // 即便跨域也會攜帶上cookie
        mode: 'cors',
    }),

    // tagTypes: ["login", "register"], //用來指定Api中的標籤類型

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

            refresh: build.query({
                query() {
                    return {
                        url: "/refresh",
                        method: "get",
                    };
                },
                providesTags: ["refresh"]
            })

        };
    }
});


// 自動生成的鉤子函數的命名規則 getStudents ---> useGetStudentsQuery (use表示鉤子函數 Query表示查詢)
export const { useLoginMutation, useRegisterMutation, } = authApi;
export default authApi;
