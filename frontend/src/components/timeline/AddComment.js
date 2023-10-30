import { commentPost } from "../../services/postService";
import { useState } from "react";

export const AddComment = ({
    currentUserId,
    postId,
    setComments,
    commentInput,
    token,
}) => {
    const [comment, setComment] = useState("");

    const handleSubmitComment = async (event) => {
        event.preventDefault();
    
        try {
            const result = await commentPost(currentUserId, postId, comment, token);
            setComments((comments) => [...comments, result]);
            setComment("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="border-t border-gray-primary">
            <form
                className="flex justify-between pl-0 pr-5"
                method="POST"
                onSubmit={(event) =>
                    comment.length >= 1
                        ? handleSubmitComment(event)
                        : event.preventDefault()
                }
            >
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                />
                <button
                    className={`text-sm font-bold text-blue-medium ${
                        !comment && "opacity-25"
                    }`}
                    type="button"
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    );
};
