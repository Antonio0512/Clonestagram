import { Header } from "./Header";
import { Image } from "./Image";

export const Post = ({ userData, postData }) => {
    return (
        <>
            <div className="rounded col-span-4 border bg-white border-gray-primary">
                <Header
                    userData={userData}
                    timeSincePosted={postData.time_since_posted}
                />
                <Image src={`${postData.image}`} caption={postData.username} />
            </div>
            <hr className="m-5" />
        </>
    );
};
