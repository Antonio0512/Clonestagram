import { useState } from "react";
import { Link } from "react-router-dom";

export const SuggestedUser = ({ userData }) => {
    const [followed, setFollowed] = useState(false);

    return (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img
                    className="rounded-full w-8 flex mr-3"
                    src="/images/avatars/default.png"
                    alt="profile image"
                />
                <Link to={`/profile/${userData.id}`}>
                    <p className="font-bold text-sm">{userData.username}</p>
                </Link>
            </div>
            <div>
                <button className="text-xs font-bold text-blue-medium" type="button" onClick={() => console.log('Follow a user')}>Follow</button>
            </div>
        </div>
    );
};
