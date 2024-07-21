import { useContext, useEffect } from "react";
import { FetchingContext } from "@/context/loading";
export let count = 0;
export const useFetch = (url, option) => {
    const { loading, setLoading } = useContext(FetchingContext);
    async function fetchHandler() {
        const res = await fetch(url, option);
        setLoading((prev) => !prev);
        count++;
        return res;
    }
    return [fetchHandler];
};
