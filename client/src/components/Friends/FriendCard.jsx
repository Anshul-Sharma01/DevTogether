import React from 'react';

const FriendCard = ({ friendData }) => {
    return (
        <div className="flex items-center p-4 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 w-full max-w-md mx-auto transition-transform transform hover:scale-105">
            <img
                className="w-16 h-16 rounded-full object-cover mr-4"
                src={friendData?.avatar?.secure_url}
                alt={`${friendData?.name}'s avatar`}
            />
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{friendData?.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">@{friendData?.username}</p>
                <p className="text-gray-500 dark:text-gray-400">{friendData?.email}</p>
            </div>
        </div>
    );
};

export default FriendCard;
