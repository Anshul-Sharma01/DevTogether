import React, { useState, useEffect, useRef } from 'react';
import DevelopersCard from "../components/Profile/DevelopersCard.jsx";

const developers = [
    {
        name: 'Anshul Sharma',
        role: 'Team Lead, Frontend, Backend',
        avatar: 'https://s3.amazonaws.com/cbrig-assets/csoethp/resources/Student/S10rV4i.JPG',
        description: 'Anshul is the team lead and handles both frontend and backend development. He has extensive experience in full-stack development and ensures the team delivers high-quality software solutions.'
    },
    {
        name: 'Shaishav',
        role: 'Frontend, UI Designer, Database Schema Designer',
        avatar: 'https://s3.amazonaws.com/cbrig-assets/csoethp/resources/Student/S46cYSh.JPG',
        description: 'Shaishav is responsible for frontend development, UI design, and database schema design. He creates intuitive and visually appealing user interfaces and ensures the database is optimized for performance.'
    },
    {
        name: 'Chirag Bhatia',
        role: 'Backend, API Designing',
        avatar: 'https://s3.amazonaws.com/cbrig-assets/csoethp/resources/Student/S17thYj.JPG',
        description: 'Chirag focuses on backend development and API design. He builds robust and scalable server-side applications and designs efficient APIs that power our applications.'
    },
    {
        name: 'Abhinav Sharma',
        role: 'Authentication Manager and API Handler',
        avatar: 'https://static.vecteezy.com/system/resources/previews/020/911/739/large_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png',
        description: 'Abhinav manages authentication and handles API integration. He ensures secure user authentication and seamless communication between our applications and external services.'
    }
];

const DevelopersTeam = () => {
    const [selectedDeveloper, setSelectedDeveloper] = useState(null);
    const cardRef = useRef(null);

    const handleClickOutside = (event) => {
        if (cardRef.current && !cardRef.current.contains(event.target)) {
            setSelectedDeveloper(null);
        }
    };

    useEffect(() => {
        if (selectedDeveloper) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedDeveloper]);

    return (
        <div className=" bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold text-center mb-8">Developers Team</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 cursor-pointer">
                    {developers.map((developer, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                            onClick={() => setSelectedDeveloper(developer)}
                        >
                            <img className="w-full h-48 object-contain" src={developer.avatar} alt={developer.name} />
                            <div className="p-4">
                                <h2 className="text-2xl font-bold">{developer.name}</h2>
                                <p className="text-gray-600 dark:text-gray-400">{developer.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedDeveloper && (
                    <DevelopersCard developer={selectedDeveloper} onClose={() => setSelectedDeveloper(null)} cardRef={cardRef} />
                )}
            </div>
        </div>
    );
};

export default DevelopersTeam;
