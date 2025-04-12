import React, { useState, useEffect } from "react";
import NavigationLayout from "../../layouts/NavigationLayout";
import { RxCross2 } from "react-icons/rx";
import { FiRefreshCcw } from "react-icons/fi";
import { Link } from "react-router-dom";
import NewCollab from "./NewCollab";
import AddCollab from "./AddCollab";

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
  {
    id: 3,
    title: "Street Cafe",
    description: "A scalable e-commerce solution for online businesses.",
    participants: 2,
    collabOwner: "Vansh Patial",
    techStack: ["Next.js", "TailwindCSS", "MongoDB"],
  },
];

const AllCollabs = () => {
  const [view, setView] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewCollabOpen, setIsNewCollabOpen] = useState(false);
  const [isAddCollabOpen, setIsAddCollabOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      const timer = setTimeout(() => setIsSpinning(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isSpinning]);

  const handleSyncClick = () => setIsSpinning(true);

  return (
    <NavigationLayout>
      <div className="pt-24 px-4 md:px-8 bg-white dark:bg-black min-h-screen text-gray-900 dark:text-white transition-all duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <button
            onClick={handleSyncClick}
            className="px-4 py-2 flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow transition-all"
          >
            <FiRefreshCcw className={`${isSpinning ? "animate-spin" : ""}`} />
            <span>Sync / Refresh</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow transition-all"
          >
            Create / Add Collab
          </button>

          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl shadow transition-all"
          >
            Toggle View
          </button>
        </div>

        <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
          {collabs.map((collab) => (
            <Link
              key={collab.id}
              to={`/collab/${collab.id}`}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow hover:shadow-lg transition-all p-6 flex flex-col gap-4"
            >
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:underline">
                {collab.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{collab.description}</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>👥 Participants: {collab.participants}</p>
                <p>👤 Owner: {collab.collabOwner}</p>
                <p>🛠️ Tech Stack: {collab.techStack.join(", ")}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Modal for create / add */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative z-50 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md text-center">
            <h2 className="text-2xl font-semibold mb-6">Create Collab</h2>
            <button onClick={() => setIsModalOpen(false)} aria-label="Close">
              <RxCross2 className="absolute top-4 right-4 text-2xl text-gray-600 dark:text-white hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsAddCollabOpen(true);
              }}
              className="w-full py-2 mb-3 border border-gray-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
            >
              Add Existing Collab
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsNewCollabOpen(true);
              }}
              className="w-full py-2 border border-gray-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
            >
              Create New Collab
            </button>
          </div>
        </div>
      )}

      {isNewCollabOpen && (
        <NewCollab showNewCollabModal={isNewCollabOpen} setShowNewCollabModel={setIsNewCollabOpen} />
      )}
      {isAddCollabOpen && (
        <AddCollab showAddProject={isAddCollabOpen} setShowAddProject={setIsAddCollabOpen} />
      )}
    </NavigationLayout>
  );
};

export default AllCollabs;
