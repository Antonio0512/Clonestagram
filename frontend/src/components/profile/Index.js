import { Header } from "../profile/Header";

export const UserProfile = ({ user, targetUser, token }) => {
    return (
        <>
            <Header user={user} targetUser={targetUser} token={token} />
            {/* <Photos photos={photosCollection} /> */}
        </>
    );
};
