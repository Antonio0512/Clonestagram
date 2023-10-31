import { useContext, useEffect } from "react";
import { Timeline } from "../components/timeline/Timeline";
import { Header } from "../components/Header";
import { Sidebar } from "../components/sidebar/Sidebar";
import { UserContext } from "../contexts/userContext";

export const Dashboard = () => {
    const { token, user, userLogout, isAuthenticated } =
        useContext(UserContext);

    useEffect(() => {
        document.title = "Clonestagram";
    }, []);

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                <Timeline token={token} user={user} />
                <Sidebar token={token} user={user} />
            </div>
        </div>
    );
};
