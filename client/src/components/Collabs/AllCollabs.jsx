import React, { useState, useEffect } from "react";
import NavigationLayout from "../../layouts/NavigationLayout";
import { RxCross2 } from "react-icons/rx";
import { FiRefreshCcw } from "react-icons/fi";
import { Link } from "react-router-dom";

const collabs = [
  {
    id: 1,
    title: "AI Chatbot",
    description: "An AI-powered chatbot for customer support.",
    participants: 5,
    collabOwner: "John Doe",
    techStack: ["React", "Node.js", "TensorFlow"],
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A scalable e-commerce solution for online businesses.",
    participants: 8,
    collabOwner: "Jane Smith",
    techStack: ["Next.js", "TailwindCSS", "MongoDB"],
  },
];

const AllCollabs = () => {
  const [view, setView] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      const timer = setTimeout(() => {
        setIsSpinning(false);
      }, 1000); // Spin for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [isSpinning]);

  const handleSyncClick = () => {
    setIsSpinning(true);
    // Add your sync logic here
  };

  return (
    <NavigationLayout>
      <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
        <div className="flex justify-between mb-6 space-x-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded shadow-md hover:bg-gray-700 transition-colors duration-300 flex items-center space-x-2 group"
            onClick={handleSyncClick}
          >
            <FiRefreshCcw className={`text-lg ${isSpinning ? "animate-spin" : ""}`} />
            <span>Sync / Refresh</span>
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600 transition-colors duration-300" onClick={() => setIsModalOpen(true)}>
            Create / Add Collab
          </button>
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded shadow-md hover:bg-gray-800 transition-colors duration-300"
            onClick={() => setView(view === "grid" ? "list" : "grid")}
          >
            Toggle View
          </button>
        </div>

        <Link to={"/collab/:collabId"} className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col space-y-4"}>
          {collabs.map((collab) => (
            <div key={collab.id} className="p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">{collab.title}</h2>
              <p className="mb-4 text-green-700 dark:text-green-500">{collab.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">Participants: {collab.participants}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">Owner: {collab.collabOwner}</p>
              <p className="text-sm text-gray-500 dark:text-gray-300">Tech Stack: {collab.techStack.join(", ")}</p>
            </div>
          ))}
        </Link>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-in-out"></div>
          <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center z-50 transform transition-transform duration-300 ease-in-out scale-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create Project</h2>
            <button onClick={() => setIsModalOpen(false)} aria-label="Close">
              <RxCross2 className="text-3xl absolute top-4 right-4 text-gray-700 dark:text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-90" />
            </button>
            <button className="block w-full px-4 py-2 bg-white text-black hover:bg-blue-600 border-solid border-2 border-gray-400 hover:text-white rounded-xl mb-2 transition-colors duration-300">Add Existing Project</button>
            <button className="block w-full px-4 py-2 border-solid border-2 border-gray-400 text-black hover:bg-blue-600 hover:text-white rounded-xl transition-colors duration-300">Create New Project</button>
          </div>
        </div>
      )}
    </NavigationLayout>
  );
};

export default AllCollabs;
