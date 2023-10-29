import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const getAllPosts = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/posts/`, {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getFollowingPosts = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/posts/following`, {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const likePost = async (userId, postId, token) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/users/${userId}/like-dislike/${postId}`,
            {},
            {
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
