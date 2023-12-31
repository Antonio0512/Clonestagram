import { useState } from "react";
import { likePost, unlikePost } from "../../services/authServices";

export const Actions = ({ currentUser, postData, token, handleFocus }) => {
    const [isLiked, setIsLiked] = useState(postData.liked);
    const [likes, setLikes] = useState(postData.likes.length);

    const handleLike = async () => {
        try {
            await likePost(currentUser.id, postData.id, token);
            setIsLiked(true);
            setLikes((likes) => likes + 1);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUnlike = async () => {
        try {
            await unlikePost(currentUser.id, postData.id, token);
            setIsLiked(false);
            setLikes((likes) => likes - 1);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="flex justify-between p-4">
                <div className="flex">
                    <svg
                        onClick={isLiked ? handleUnlike : handleLike}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                isLiked ? handleUnlike() : handleLike();
                            }
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        tabIndex={0}
                        className={`w-8 mr-4 select-none cursor-pointer focus:outline-none ${
                            isLiked
                                ? "fill-red text-red-primary"
                                : "text-black-light"
                        }`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                    <svg
                        onClick={handleFocus}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleFocus();
                            }
                        }}
                        className="w-8 text-black-light select-none cursor-pointer focus:outline-none"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        tabIndex={0}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                </div>
            </div>
            <div className="p-4 py-0">
                <p className="font-bold">
                    {likes === 1 ? `${likes} like` : `${likes} likes`}
                </p>
            </div>
        </>
    );
};
