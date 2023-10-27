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
