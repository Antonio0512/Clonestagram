import { useContext, useState, useEffect } from "react";
import { Post } from "./Post";
import { UserContext } from "../../contexts/userContext";
import { getAllPosts, getFollowingPosts } from "../../services/postService";

export const Timeline = () => {
    const { token, user } = useContext(UserContext);
    const [isForYouButtonActive, setIsForYouButtonActive] = useState(true);
    const [posts, setPosts] = useState(null);

    const onForYouHandle = async () => {
        try {
            const fetchData = await getAllPosts(token);
            setPosts(fetchData);
            setIsForYouButtonActive(true);
        } catch (error) {
            console.error(error);
        }
    };

    const onFollowingHandle = async () => {
        try {
            const fetchData = await getFollowingPosts(token);
            setPosts(fetchData);
            setIsForYouButtonActive(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const postsData = await getAllPosts(token);
                setPosts(postsData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, [token]);

    return (
        <div className="container col-span-2">
            <div className="flex mb-3">
                <button
                    className={`flex justify-center font-bold ${
                        isForYouButtonActive ? "text-black" : "text-gray-400"
                    }`}
                    type="button"
                    onClick={onForYouHandle}
                >
                    For you
                </button>
                <button
                    className={`flex justify-center font-bold ml-3 ${
                        !isForYouButtonActive ? "text-black" : "text-gray-400"
                    }`}
                    type="button"
                    onClick={onFollowingHandle}
                >
                    Following
                </button>
            </div>
            <hr className="mb-5" />

            {posts?.map((post) => (
                <Post
                    key={post.id}
                    userData={post.user}
                    postData={post}
                    token={token}
                    currentUser={user}
                />
            ))}
        </div>
    );
};
