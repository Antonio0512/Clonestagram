import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { LOGIN } from "../helpers/routes";

export const AuthRouteGuard = ({ children }) => {
    const { isAuthenticated } = useContext(UserContext);

    if (!isAuthenticated) {
        return <Navigate to={LOGIN} />;
    }

    return children ? children : <Outlet />;
};
