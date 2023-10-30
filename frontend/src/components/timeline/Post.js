import { useRef } from "react";
import { Actions } from "./Actions";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Image } from "./Image";
import { Comments } from "./Comments";

export const Post = ({ userData, postData, token, currentUser }) => {
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();

    return (
        <>
            <div className="rounded col-span-4 border bg-white border-gray-primary">
                <Header
                    userData={userData}
                    timeSincePosted={postData.created_at}
                />
                <Image src={postData.image} caption={postData.username} />
                <Actions
                    currentUser={currentUser}
                    postData={postData}
                    token={token}
                    handleFocus={handleFocus}
                />
                <Footer
                    username={userData.username}
                    caption={postData.caption}
                />
                <Comments
                    postId={postData.id}
                    allComments={postData.comments}
                    postedDate={postData.date_created}
                    commentInput={commentInput}
                    token={token}
                    currentUser={currentUser}
                />
            </div>
            <hr className="m-5" />
        </>
    );
};
