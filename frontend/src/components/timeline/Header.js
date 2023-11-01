import { Link } from "react-router-dom";
import {IMAGE_URL} from "../../helpers/routes"

export const Header = ({ userData, timeSincePosted }) => {

    return (
        <div className="flex border-b border-gray-primary h-4 p-4 py-8">
            <div className="flex items-center">
                <Link
                    to={`/profile/${userData.id}`}
                    className="flex items-center"
                >
                    <img
                        className="rounded-full h-8 w-8 flex mr-3"
                        src={userData.image ? IMAGE_URL + userData.image : "/images/avatars/default.png"}
                        alt={userData.username}
                    />
                    <div className="flex items-center">
                        <p className="font-semibold">{userData.username}</p>
                        <p className="text-sm ml-2">{timeSincePosted}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};
