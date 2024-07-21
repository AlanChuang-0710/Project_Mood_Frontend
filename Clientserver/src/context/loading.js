import { createContext, useState } from 'react';
export const FetchingContext = createContext(null);
export function FetchingProvider({ children }) {
    const [loading, setLoading] = useState(false);

    return <FetchingContext.Provider value={{ loading, setLoading }}>
        {loading && <h1>I am loading</h1>}
        {children}
    </FetchingContext.Provider>;
};