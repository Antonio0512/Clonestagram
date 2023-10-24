import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import * as authService from "../services/authServices";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", {});

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

    // const logout = () => {
        // setUser({});
    // };

    const userContextData = {
        user,
        userRegister,
        userLogin,
    };

    return (
        <UserContext.Provider value={userContextData}>
            {children}
        </UserContext.Provider>
    );
};
