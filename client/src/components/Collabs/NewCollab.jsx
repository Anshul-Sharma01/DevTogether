import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaHtml5, FaReact, FaNodeJs } from "react-icons/fa";
import { FaDev } from "react-icons/fa6";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const NewCollab = ({ showNewCollabModal, setShowNewCollabModel }) => {
  const [collabName, setCollabName] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 1, label: "HTML + CSS + JS", icon: <FaHtml5 />, lang: "html" },
    { id: 2, label: "ReactJS", icon: <FaReact />, lang: "react" },
    { id: 3, label: "NodeJS", icon: <FaNodeJs />, lang: "node" },
    { id: 4, label: "Custom", icon: <FaDev />, lang: "custom" },
  ];

  const handleOptionClick = (id) => {
    setSelectedOption(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (collabName === "") {
      toast.error("Please enter the collab title");
      return;
    }

    if (!selectedOption) {
      toast.error("Please select a collab type");
      return;
    }

    const language = options.find((opt) => opt.id === selectedOption)?.lang || "javascript";
    const roomId = uuidv4(); // generate unique roomId

    try {
      const response = await fetch("http://localhost:5000/api/v1/collab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: collabName,
          roomId,
          language,
          description: "", // optional
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Collab created successfully");
        window.location.href = `http://localhost:5174/?room=${roomId}`;
      } else {
        toast.error(data.message || "Failed to create collab");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <>
      {showNewCollabModal && (
        <section className="fixed inset-0 flex flex-col justify-center items-center h-screen z-50">
          {/* Blurred background */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-in-out"></div>

          {/* Modal Container */}
          <div className="relative bg-white p-6 dark:bg-gray-900 rounded-2xl shadow-lg w-full max-w-md text-center z-50">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create a new <span className="text-red-500 dark:text-blue-500">Collab</span>
            </h2>

            {/* Close Button */}
            <button onClick={() => setShowNewCollabModel(false)} aria-label="Close">
              <RxCross2 className="text-3xl absolute top-4 right-4 text-gray-700 dark:text-white cursor-pointer hover:scale-110 hover:rotate-90" />
            </button>

            <form noValidate className="space-y-4">
              <input
                type="text"
                value={collabName}
                onChange={(e) => setCollabName(e.target.value)}
                placeholder="Enter your collab name"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              />

              <div className="flex flex-wrap flex-row justify-center gap-4 dark:text-white">
                {options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleOptionClick(option.id)}
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transform transition duration-300 ${
                      selectedOption === option.id
                        ? "bg-blue-500 text-white border-blue-500 shadow-lg scale-105"
                        : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105"
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="text-sm">{option.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-row justify-center gap-4">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-md"
                >
                  Create Collab
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewCollabModel(false)}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md"
                >
                  Discard Collab
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default NewCollab;
