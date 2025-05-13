import { useState, createContext } from "react";

const AppContext = createContext();

function Context({ children }) {
    const API_URL = "http://localhost:8000"
    return (
        <AppContext.Provider value={{API_URL}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, Context}