import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaHtml5, FaReact, FaNodeJs } from "react-icons/fa";
import { FaDev } from "react-icons/fa6";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { createNewCollabThunk } from "../../Redux/Slices/collabSlice";
import { RiAiGenerate2 } from "react-icons/ri";
import axios from "axios";
import Loader from "../Misc/Loader";

const NewCollab = ({ showNewCollabModal, setShowNewCollabModel }) => {
  const [collabName, setCollabName] = useState("");
  const [collabDescription, setCollabDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 1, label: "HTML + CSS + JS", icon: <FaHtml5 />, lang: "html" },
    { id: 2, label: "ReactJS", icon: <FaReact />, lang: "react" },
    { id: 3, label: "NodeJS", icon: <FaNodeJs />, lang: "node" },
    { id: 4, label: "Custom", icon: <FaDev />, lang: "custom" },
  ];


  const generateRandomName = async () => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
  
    const examplesList = [
      "CodeSync, DevNest, CollabCrate, HackHive, BuildFlow, DevDrop",
      "IdeaBridge, CodeWeld, CollabDrift, CloudCraze, DevWorx, ProjectPulse",
      "CodeTunnel, TeamForge, DevNova, IdeaLoop, SyncFlick, CodeWarp",
      "DevLoop, CodeSpring, HiveCloud, CollabForge, SyncNest, FlowBay",
      "CodePond, HackOrbit, DevMint, ProjectZen, CollabBloom, LaunchNest",
      "CodeRush, DevChain, HackNest, TeamSpark, CodeLift, DevBloom",
      "CloudCircuit, TaskPulse, CodeRise, ThinkLift, DevSparks, MergeMind",
      "HackBranch, CollabPulse, CodeSway, ProjectCore, DevBrew, TeamBay",
      "FusionLab, CodeTrail, IdeaNexus, CodeCrave, ThinkStorm, CollabVibe",
      "DevCore, SyncCrate, CodePing, LaunchLink, HiveFlow, TeamStream"
    ];
  
    // Join examples into a context string
    const exampleNames = examplesList.flatMap(item => item.split(',')).map(name => name.trim());
    const exampleText = exampleNames.map(name => `- ${name}`).join('\n');
  
    const prompt = `
You are a professional product naming expert working at a top branding agency. Your task is to generate **a single, creative, catchy, short, and unique name** for a new-age product or developer-focused collaboration platform. The name should be **modern, one to two words**, preferably a **portmanteau** or a **newly invented word**, that feels **techy, brandable, and futuristic** — suitable for startups, SaaS platforms, or devtools.

Below are example names for inspiration. These were previously generated and should NOT be repeated, reused, or used as a base.

**Existing Names (Do NOT use or remix):**
- CodeSync
- DevNest
- CollabCrate
- HackHive
- BuildFlow
- DevDrop
- IdeaBridge
- CodeWeld
- CollabDrift
- CloudCraze
- ProjectPulse
- CodeTunnel
- TeamForge
- DevNova
- SyncFlick
- CodeWarp
- CodeRush
- DevChain
- HackNest
- TeamSpark
- MergeMind
- ThinkStorm
- CodeLift
- HiveCloud
- DevMint
- ProjectZen
- DevSparks
- CodeTrail
- IdeaNexus
- CodeCrave
- CollabVibe
- LaunchLink

⚠️ Your job is to generate a **completely new** name that:
- Sounds futuristic and original
- Is short and easy to remember
- Feels like a brand or company name (e.g., Zoom, Slack, Notion, Figma)
- Could realistically be available as a domain or app name
-If u can try to add a suffix such as  "collab", "container", "group", "team" creatively in name or the terms related to these words
🎯 Output: Return **just one name**, not a list, with no explanations or extra text.

Make it pop. Make it clever. Make it memorable.

  `;
  
    try {
      const response = await axios.post(url, {
        contents: [{ parts: [{ text: prompt }] }]
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      const modelOutput = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No name generated.";
      const randomName = modelOutput.trim();
  
      console.log("✨ Gemini Generated Name:", randomName);
      setCollabName(randomName); // Assuming you have this setter from useState
      return randomName;
  
    } catch (error) {
      console.error("❌ Error generating name via Gemini:", error.message);
      return null;
    }
  };
  
  
  
  
  

  const handleOptionClick = (id) => {
    setSelectedOption(id);
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (collabName === "" || collabDescription === "") {
      toast.error("Please enter the collab title & description");
      return;
    }

    if (!selectedOption) {
      toast.error("Please select a collab type");
      return;
    }

    const language = options.find((opt) => opt.id === selectedOption)?.lang || "javascript";
    const roomId = uuidv4(); // generate unique roomId

    const res = await dispatch(createNewCollabThunk({
      title: collabName,
      roomId,
      language,
      description: collabDescription
    }));
    console.log("Res after creating a new collab : ", res);
    if(res?.payload?.statusCode === 200){
      setCollabName("");
      setSelectedOption(null);
      setShowNewCollabModel(false);

      setTimeout(() => {
        window.location.href = `http://localhost:${res?.payload?.data?.frontendPort}/language/${res?.payload?.data?.language}/room/${roomId}`;
      }, 200);
      // window.location.href = `http://localhost:${5174}/room/${roomId}`;
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
              <div className="relative">
                <input
                  type="text"
                  value={collabName}
                  onChange={(e) => setCollabName(e.target.value)}
                  placeholder="Enter your collab name"
                  required
                  className="w-full dark:bg-gray-800 dark:text-white px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                />
                <span
                  onClick={generateRandomName}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-blue-500"
                  title="Generate funky name"
                >
                  <RiAiGenerate2 size={20} />
                </span>
              </div>
              <textarea
                  className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none"
                  placeholder="Enter Collab Description..."
                  value={collabDescription}
                  onChange={(e) => setCollabDescription(e.target.value)}
                  rows="3"
              ></textarea>


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
