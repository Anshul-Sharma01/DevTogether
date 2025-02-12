import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaHtml5, FaReact, FaNodeJs } from "react-icons/fa";
import { FaDev } from "react-icons/fa6";
import toast from "react-hot-toast";

const NewCollab = ({ showNewCollabModal, setShowNewCollabModel }) => {
    const [collabName, setCollabName] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        { id: 1, label: "HTML + CSS + JS", icon: <FaHtml5 /> },
        { id: 2, label: "ReactJS", icon: <FaReact /> },
        { id: 3, label: "NodeJS", icon: <FaNodeJs /> },
        { id: 4, label: "Custom", icon: <FaDev /> },
    ];

    const handleOptionClick = (id) => {
        setSelectedOption(id);
    };

    const handleSubmit = () => {
        toast.dismiss();
        if(collabName === ""){
            toast.error("Please enter the collab title");
            return;
        }
    }

    return (
        <>
            {showNewCollabModal && (
                <section className="fixed inset-0 flex flex-col justify-center items-center h-screen z-50">
                    {/* For blurry background */}
                    <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-in-out"></div>

                    {/* Modal Container */}
                    <div className="relative bg-white p-6 dark:bg-gray-900 rounded-2xl shadow-lg w-full max-w-md text-center z-50 transform transition-transform duration-300 ease-in-out scale-100">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Create a new <span className="text-red-500 dark:text-blue-500">Collab</span>
                        </h2>
                        {/* Close Button */}
                        <button onClick={() => setShowNewCollabModel(false)} aria-label="Close">
                            <RxCross2 className="text-3xl absolute top-4 right-4 text-gray-700 dark:text-white cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-90" />
                        </button>
                        <form noValidate className="space-y-4">
                            <input
                                type="text"
                                id="collabName"
                                value={collabName}
                                onChange={(e) => setCollabName(e.target.value)}
                                placeholder="Enter your collab name"
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition duration-300"
                            />
                            <div className="flex flex-wrap flex-row justify-center gap-4 dark:text-white">
                                {options.map((option) => (
                                    <div
                                        key={option.id}
                                        onClick={() => handleOptionClick(option.id)}
                                        className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform flex-1 min-w-[100px] max-w-[150px] ${
                                            selectedOption === option.id
                                                ? "bg-blue-500 text-white border-blue-500 shadow-lg hover:scale-105"
                                                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105"
                                        }`}
                                    >
                                        <div className="text-2xl mb-2">{option.icon}</div>
                                        <div className="text-sm text-center">{option.label}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-row justify-center items-center gap-4">
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg"
                                >
                                    Create Collab
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowNewCollabModel(false)}
                                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow-md hover:shadow-lg"
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
