import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import * as authService from "../services/authServices";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("auth", null);

    const userRegister = async (credentials) => {
        try {
            return await authService.register(credentials);
        } catch (error) {
            throw error;
        }
    };

    const userLogin = async (credentials) => {
        try {
            const user = await authService.login(credentials);
            setUser(user);
        } catch (error) {
            throw error;
        }
    };

    const userLogout = () => {
        setUser(null);
    };
    
    const userContextData = {
        user: user?.user,
        token: user?.token,
        isAuthenticated: user?.token,   
        userRegister,
        userLogin,
        userLogout,
    };

    return (
        <UserContext.Provider value={userContextData}>
            {children}
        </UserContext.Provider>
    );
};
