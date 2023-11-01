import { useState } from "react";
import { DEFAULT_IMAGE } from "../../helpers/routes";
import { unfollowUser, followUser } from "../../services/authServices";

export const Header = ({ user, targetUser, token }) => {
    const [isFollowingProfile, setIsFollowingProfile] = useState(
        targetUser.is_followed
    );

    const handleFollow = async () => {
        try {
            await followUser(user.id, targetUser.id, token);
            setIsFollowingProfile(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUnfollow = async () => {
        try {
            await unfollowUser(user.id, targetUser.id, token);
            setIsFollowingProfile(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center items-center">
                <img
                    className="rounded-full h-40 w-40 flex"
                    src={targetUser.image || DEFAULT_IMAGE}
                    alt={`${targetUser.username}`}
                />
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{targetUser.username}</p>
                    {targetUser.id === user.id ? (
                        <button
                            className="bg-gray-primary font-semibold text-sm rounded text-black w-24 h-8 p-1"
                            type="button"
                        >
                            Edit Profile
                        </button>
                    ) : !isFollowingProfile ? (
                        <button
                            className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                            type="button"
                            onClick={handleFollow}
                        >
                            Follow
                        </button>
                    ) : (
                        <button
                            className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                            type="button"
                            onClick={handleUnfollow}
                        >
                            Unfollow
                        </button>
                    )}
                </div>
                <div className="container flex mt-4">
                    <>
                        <p className="mr-10">
                            <span className="font-bold">
                                {targetUser.posts?.length}
                            </span>{" "}
                            posts
                        </p>
                        <p className="mr-10">
                            <span className="font-bold">
                                {targetUser.followers.length}
                            </span>{" "}
                            followers
                        </p>
                        <p className="mr-10">
                            <span className="font-bold">
                                {targetUser.following.length}
                            </span>{" "}
                            following
                        </p>
                    </>
                </div>
                <div className="container mt-4">
                    <p className="font-medium">
                        {targetUser.first_name} {targetUser.last_name}
                    </p>
                </div>
            </div>
        </div>
    );
};
