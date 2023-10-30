import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const login = async (credentials) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/accounts/login`,
            JSON.stringify(credentials),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (credentials) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/accounts/register`,
            JSON.stringify(credentials),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSuggestedUsers = async (token) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/api/accounts/suggested-users`,
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

export const getFollowedUsers = async (token) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/api/accounts/followed-users`,
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

export const getUser = async (userId, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/accounts/${userId}`, {
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

export const followUser = async (userId, targetUserId, token) => {
    try {
        await axios.post(
            `${BASE_URL}/api/accounts/${userId}/follow-unfollow/${targetUserId}`,
            {},
            {
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        throw error;
    }
};

export const unfollowUser = async (userId, targetUserId, token) => {
    try {
        await axios.delete(
            `${BASE_URL}/api/accounts/${userId}/follow-unfollow/${targetUserId}`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        throw error;
    }
};

export const likePost = async (userId, postId, token) => {
    try {
        await axios.post(
            `${BASE_URL}/api/accounts/${userId}/like-dislike/${postId}`,
            {},
            {
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        throw error;
    }
};

export const unlikePost = async (userId, postId, token) => {
    try {
        await axios.delete(
            `${BASE_URL}/api/accounts/${userId}/like-dislike/${postId}`,
            {
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        throw error;
    }
};
