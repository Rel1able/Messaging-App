import { useState, createContext } from "react";

const AppContext = createContext();

function Context({ children }) {
    const API_URL = "https://messaging-app-api-gkax.onrender.com"
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    return (
        <AppContext.Provider value={{token, setToken, API_URL, refreshTrigger, setRefreshTrigger, isRunning, setIsRunning}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, Context}