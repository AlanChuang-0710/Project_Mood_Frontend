import { configureStore, } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authApi from "./api/authApi";
import feelingApi from "./api/feelingApi";
import commonApi from "./api/commonApi";
import authSlice from "./reducer/authSlice";
import analysisApi from "./api/analysisApi";

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [feelingApi.reducerPath]: feelingApi.reducer,
        [commonApi.reducerPath]: commonApi.reducer,
        [analysisApi.reducerPath]: analysisApi.reducer,
        auth: authSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware, feelingApi.middleware, commonApi.middleware, analysisApi.middleware)
});

// 為了支援refetchOnFocus 或 refetchOnReconnect 的方法
setupListeners(store.dispatch);
export default store;