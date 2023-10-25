import { useEffect, useState } from "react";
import { getAll } from "../../services/authServices";

export const Suggestions = ({userId, token}) => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getAll(userId, token);
                setUsers(usersData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, [userId, token]);

    return "";
};
