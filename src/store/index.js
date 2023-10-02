import { configureStore, } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authApi from "./api/authApi";
import feelingApi from "./api/feelingApi";

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [feelingApi.reducerPath]: feelingApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware, feelingApi.middleware)
});

setupListeners(store.dispatch);
export default store;