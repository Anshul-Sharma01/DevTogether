import { useSelector } from "react-redux";
import NavigationLayout from "../../layouts/NavigationLayout";
import FriendCard from "./FriendCard";
import SearchFriends from "./SearchFriends";

const UserFriends = () => {
    // const userFriendsData = useSelector((state) => state?.friends?.allFriends) || [];
    const userFriendsData = [
        {
            username : "johndoes",
            name : "John Doe",
            email : "john@doe.in",
            avatar : {
                secure_url : "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
                public_id : 1234567890
            }
        },
        {
            username : "johndoes",
            name : "John Doe",
            email : "john@doe.in",
            avatar : {
                secure_url : "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
                public_id : 1234567890
            }
        },
        {
            username : "johndoes",
            name : "John Doe",
            email : "john@doe.in",
            avatar : {
                secure_url : "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
                public_id : 1234567890
            }
        },
        {
            username : "johndoes",
            name : "John Doe",
            email : "john@doe.in",
            avatar : {
                secure_url : "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
                public_id : 1234567890
            }
        },
        {
            username : "johndoes",
            name : "John Doe",
            email : "john@doe.in",
            avatar : {
                secure_url : "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
                public_id : 1234567890
            }
        },
        {
            username : "johndoes",
            name : "John Doe",
            email : "john@doe.in",
            avatar : {
                secure_url : "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
                public_id : 1234567890
            }
        },
        {
            username : "johndoes",
            name : "John Doe",
            email : "john@doe.in",
            avatar : {
                secure_url : "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
                public_id : 1234567890
            }
        },
        {
            username : "johndoes",
            name : "John Doe",
            email : "john@doe.in",
            avatar : {
                secure_url : "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
                public_id : 1234567890
            }
        }
    ]


    return (
        <NavigationLayout>
            <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center">
                <div className="w-full sticky top-0 bg-gray-100 dark:bg-gray-900 p-4 shadow-md">
                    <SearchFriends />
                </div>
                {userFriendsData?.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                        You don't have any friends yet
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 p-4 w-full">
                        {userFriendsData?.map((ele, index) => (
                            <FriendCard key={index} friendData={ele} />
                        ))}
                    </div>
                )}
            </div>
        </NavigationLayout>
    );
};

export default UserFriends;
