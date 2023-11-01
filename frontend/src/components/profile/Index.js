import { Header } from "../profile/Header";
import { Posts } from "./Posts";

export const UserProfile = ({ user, targetUser, token }) => {
    return (
        <>
            <Header user={user} targetUser={targetUser} token={token} />
            <Posts targetUser={targetUser} />
        </>
    );
};
