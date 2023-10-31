import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../services/authServices";
import { UserContext } from "../contexts/userContext";

import { Header } from "../components/Header";

import { UserProfile } from "../components/profile/Index";

export const Profile = () => {
    const { token, user } = useContext(UserContext);
    const { userId } = useParams();

    const [targetUser, setTargetUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser(userId, token);
            setTargetUser(userData);
        };
        fetchUser();
    }, [token, userId]);

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                {targetUser && (
                    <UserProfile
                        user={user}
                        targetUser={targetUser}
                        token={token}
                    />
                )}
            </div>
        </div>
    );
};
