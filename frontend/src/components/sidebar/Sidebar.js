import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { User } from "./User";
import { Suggestions } from "./Suggestions";

export const Sidebar = () => {
    const { user, token } = useContext(UserContext);

    return (
        <div className="p-4">
            <User user={user} />
            <Suggestions userId={user?.id} token={token} />
        </div>
    );
};
