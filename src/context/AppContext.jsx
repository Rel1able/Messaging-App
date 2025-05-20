import { useState, createContext } from "react";

const AppContext = createContext();

function Context({ children }) {
    const API_URL = "http://localhost:8000"
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    return (
        <AppContext.Provider value={{API_URL, refreshTrigger, setRefreshTrigger}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, Context}