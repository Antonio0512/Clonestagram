import { useState } from "react";
import { Link } from "react-router-dom";
import {
    followUser,
    unfollowUser,
} from "../../services/authServices";

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
                    className="rounded-full w-8 flex mr-3"
                    src="/images/avatars/default.png"
                    alt="profile image"
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
