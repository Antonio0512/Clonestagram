import { useContext, useState, useEffect } from "react";
import { Post } from "./Post";
import { UserContext } from "../../contexts/userContext";
import { getAllPosts } from "../../services/postService";

export const Timeline = () => {
    const { token } = useContext(UserContext);
    const [posts, setPosts] = useState(null);

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
                    className="flex justify-center font-bold"
                    type="button"
                >
                    For you
                </button>
                <button
                    className="flex justify-center font-bold ml-3"
                    type="button"
                >
                    Following
                </button>
            </div> 
            <hr className="mb-5"/>
            
            {posts?.map((post) => (
                <Post key={post.id} userData={post.user} postData={post}/>
            ))}
        </div>
    );
};
