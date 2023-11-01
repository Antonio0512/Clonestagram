import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../helpers/routes";

export const User = ({ user }) => {
    return (
        <Link
            to={`/profile/${user.id}`}
            className="grid grid-cols-4 gap-3 mb-6 items-center h-16"
        >
            <div className="flex items-center justify-between col-span-1">
                <img
                    className="rounded-full w-16 h-16"
                    src={
                        user.image
                            ? IMAGE_URL + user.image
                            : "/images/avatars/default.png"
                    }
                    alt={user.username}
                />
            </div>
            <div className="col-span-3">
                <p className="font-bold text-sm">{user.username}</p>
                <p className="text-sm">{user.full_name}</p>
            </div>
        </Link>
    );
};
