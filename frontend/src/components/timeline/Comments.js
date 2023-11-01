import { useState } from "react";
import { Link } from "react-router-dom";
import { AddComment } from "./AddComment";

export const Comments = ({
    postId,
    allComments,
    postedDate,
    commentInput,
    token,
    currentUser,
}) => {
    const [comments, setComments] = useState(allComments);
    const [commentsSlice, setCommentsSlice] = useState(3);

    const showNextComments = () => {
        setCommentsSlice(commentsSlice + 3);
    };

    return (
        <>
            <div className="p-4 pt-1 pb-4">
                {comments?.slice(0, commentsSlice).map((item) => (
                    <p key={item.timestamp} className="mb-1">
                        <Link to={`/profile/${item.user.id}`}>
                            <span className="mr-1 font-bold">
                                {item.user.username}
                            </span>
                        </Link>
                        <span>{item.text}</span>
                    </p>
                ))}
                {comments.length >= 3 && commentsSlice < comments.length && (
                    <button
                        className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
                        type="button"
                        onClick={showNextComments}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                showNextComments();
                            }
                        }}
                    >
                        View more
                    </button>
                )}
                <p className="text-gray-base uppercase text-xs mt-2">
                    {postedDate}
                </p>
            </div>
            <AddComment
                currentUserId={currentUser.id}
                postId={postId}
                comments={comments}
                setComments={setComments}
                commentInput={commentInput}
                token={token}
            />
        </>
    );
};
