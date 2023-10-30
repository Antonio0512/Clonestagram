import { User } from "./User";
import { Suggestions } from "./Suggestions";

export const Sidebar = ({ user, token }) => {
    return (
        <div className="p-4">
            <User user={user} />
            <Suggestions userId={user?.id} token={token} />
        </div>
    );
};
