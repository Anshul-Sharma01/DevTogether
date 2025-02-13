import React, { useState } from "react";
import NavigationLayout from "../../layouts/NavigationLayout";
import { RxCross2 } from "react-icons/rx";

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

  return (
    <NavigationLayout>
      <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
        <div className="flex justify-between mb-6">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Sync / Refresh</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => setIsModalOpen(true)}>
            Create / Add Collab
          </button>
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded"
            onClick={() => setView(view === "grid" ? "list" : "grid")}
          >
            Toggle View
          </button>
        </div>

        <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col space-y-4"}>
          {collabs.map((collab) => (
            <div key={collab.id} className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-md">
              <h2 className="text-xl font-bold mb-2">{collab.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{collab.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Participants: {collab.participants}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Owner: {collab.collabOwner}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tech Stack: {collab.techStack.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-in-out"></div>
          <div className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center z-50 transform transition-transform duration-300 ease-in-out scale-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create Project</h2>
            <button onClick={() => setIsModalOpen(false)} aria-label="Close">
              <RxCross2 className="text-3xl absolute top-4 right-4 text-gray-700 dark:text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-90" />
            </button>
            <button className="block w-full px-4 py-2 bg-blue-500 hover:bg-blue-800  text-white rounded mb-2">Add Existing Project</button>
            <button className="block w-full px-4 py-2 bg-green-500 hover:bg-green-800 text-white rounded">Create New Project</button>
            <button className="mt-4 px-8 py-4 bg-red-500  text-white rounded-lg" onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </NavigationLayout>
  );
};

export default AllCollabs;
