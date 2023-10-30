import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { DASHBOARD } from "../helpers/routes";

export const NoAuthRouteGuard = ({ children }) => {
    const { isAuthenticated } = useContext(UserContext);

    if (isAuthenticated) {
        return <Navigate to={DASHBOARD} />;
    }
    return children ? children : <Outlet />;
};
