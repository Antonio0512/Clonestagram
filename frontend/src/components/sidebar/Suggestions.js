import { useEffect, useState } from "react";
import { getSuggestedUsers } from "../../services/authServices";
import { SuggestedUser } from "./SuggestedUser";

export const Suggestions = ({ userId, token }) => {
    const [suggestedUsers, setSuggestedUsers] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getSuggestedUsers(token);
                setSuggestedUsers(usersData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, [userId, token]);

    return (
        <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-items justify-between mb-2">
                <p className="font-bold text-gray-base">Suggested for you</p>
            </div>
            <div className="mt-4 grid gap-5">
                {suggestedUsers?.map((user) => (
                    <SuggestedUser key={user.id} userData={user} />
                ))}
            </div>
        </div>
    );
};
