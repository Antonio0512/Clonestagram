import { useEffect } from "react";
import { Timeline } from "../components/Timeline";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export const Dashboard = () => {
    useEffect(() => {
        document.title = "Clonestagram";
    }, []);

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                <Timeline />
                <Sidebar />
            </div>
        </div>
    );
};
