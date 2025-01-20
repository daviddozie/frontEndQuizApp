import React, { createContext, useContext, useState } from "react";

const PointsContext = createContext();

// PointsProvider component to wrap around children components
export const PointsProvider = ({ children }) => {
    const [points, setPoints] = useState(0);
    const [userName, setUserName] = useState("");

    // Function to add points
    const addPoints = (pointsToAdd) => {
        setPoints((prevPoints) => prevPoints + pointsToAdd);
    };

    // Function to reset points
    const resetPoints = () => {
        setPoints(0);
    };

    return (
        <PointsContext.Provider value={{ points, setPoints, addPoints, resetPoints, userName, setUserName }}>
            {children}
        </PointsContext.Provider>
    );
};

// Custom hook to use the PointsContext
export const usePoints = () => {
    const context = useContext(PointsContext);
    if (!context) {
        throw new Error("usePoints must be used within a PointsProvider");
    }
    return context;
};
