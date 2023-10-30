import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../services/authServices";
import { UserContext } from "../contexts/userContext";

import { Header } from "../components/profile/Header";

export const Profile = () => {
    const { token } = useContext(UserContext);
    const { userId } = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser(userId, token);
            setUser(userData);
        };
        fetchUser();
    }, [token, userId]);

    return (
        <div className="bg-gray-background">
            <Header />
            {/* <div className="mx-auto max-w-screen-lg"> */}
            {/* <UserProfile user={user} /> */}
            {/* </div> */}
        </div>
    );
};
