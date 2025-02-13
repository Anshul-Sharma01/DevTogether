import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa'; // Icon for the loader

const SearchFriends = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e) => {
        // We will be using debouncing
        const query = e.target.value;
        setSearchQuery(query);

        if (query) {
            setIsLoading(true);
            // Simulate an API call with a delay
            setTimeout(() => {
                setIsLoading(false);
                // Here you would normally update the friends list based on the search query
            }, 2000); // 2 seconds delay for demonstration purposes
        } else {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md px-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for friends..."
                        value={searchQuery}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-blue-600"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                </div>
                {isLoading && (
                    <div className="flex justify-center mt-4">
                        <FaSpinner className="animate-spin w-6 h-6 text-blue-500 dark:text-blue-400" />
                    </div>
                )}
                {!isLoading && searchQuery && (
                    <div className="mt-4">
                        {/* Here you would normally render the list of friends based on the search query */}
                        <p className="text-gray-700 dark:text-gray-200">Friends will be shown here...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchFriends;
