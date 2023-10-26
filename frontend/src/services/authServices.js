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
        const response = await axios.get(`${BASE_URL}/api/accounts/suggested-users`, {
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
