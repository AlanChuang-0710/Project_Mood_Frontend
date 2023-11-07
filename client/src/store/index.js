import { configureStore, } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authApi from "./api/authApi";
import feelingApi from "./api/feelingApi";
import commonApi from "./api/commonApi";
import authSlice from "./reducer/authSlice";

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [feelingApi.reducerPath]: feelingApi.reducer,
        [commonApi.reducerPath]: commonApi.reducer,
        auth: authSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware, feelingApi.middleware, commonApi.middleware)
});

// 為了支援refetchOnFocus 或 refetchOnReconnect 的方法
setupListeners(store.dispatch);
export default store;