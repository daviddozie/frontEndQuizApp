import { createContext, useContext, useState } from "react"

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userName, setUserName] = useState('');

    const setUser = (name) => {
        setUserName(name);
    }

    return (
        <UserContext.Provider value={{userName, setUser}}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser = () => {
    return useContext(UserContext)
};