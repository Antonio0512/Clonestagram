import { useState } from "react";
import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../../services/authServices";
import { DEFAULT_IMAGE } from "../../helpers/routes";

export const SuggestedUser = ({ loggedInUserId, userData, token }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFollow = async () => {
        try {
            await followUser(loggedInUserId, userData.id, token);
            setIsFollowing(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUnfollow = async () => {
        try {
            await unfollowUser(loggedInUserId, userData.id, token);
            setIsFollowing(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img
                    className="rounded-full w-11 h-11 flex mr-3"
                    src={userData.image || DEFAULT_IMAGE}
                    alt={userData.username}
                />
                <Link to={`/profile/${userData.id}`}>
                    <p className="font-bold text-sm">{userData.username}</p>
                </Link>
            </div>
            <div>
                {!isFollowing ? (
                    <button
                        className="text-xs font-bold text-blue-medium"
                        type="button"
                        onClick={handleFollow}
                    >
                        Follow
                    </button>
                ) : (
                    <button
                        className="text-xs font-bold text-blue-medium"
                        type="button"
                        onClick={handleUnfollow}
                    >
                        Unfollow
                    </button>
                )}
            </div>
        </div>
    );
};
