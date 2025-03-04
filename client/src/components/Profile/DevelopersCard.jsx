import React from 'react';

const DeveloperCard = ({ developer, onClose, cardRef }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div ref={cardRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
                <button
                    className="absolute top-2 right-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                    onClick={onClose}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <img className="w-full h-48 object-contain rounded-lg mb-4" src={developer.avatar} alt={developer.name} />
                <h2 className="text-2xl font-bold mb-2">{developer.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{developer.role}</p>
                <p className="text-gray-800 dark:text-gray-200">{developer.description}</p>
            </div>
        </div>
    );
};

export default DeveloperCard;
