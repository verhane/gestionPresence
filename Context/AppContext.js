import React, { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Create a provider component to wrap your app
export const AppProvider = ({ children }) => {
    const [globalVariable, setGlobalVariable] = useState(false);

    // Provide the global variable and any functions to modify it
    const contextValue = {
        globalVariable,
        setGlobalVariable,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};