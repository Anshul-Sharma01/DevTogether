import React, { useState, useEffect } from "react";
import NavigationLayout from "../../layouts/NavigationLayout";
import { RxCross2 } from "react-icons/rx";
import { FaReact, FaTrash } from 'react-icons/fa';
import { FaNodeJs } from "react-icons/fa";
import { FaDev } from "react-icons/fa";
import { SiHtml5 } from 'react-icons/si';
import { BsCodeSlash } from 'react-icons/bs';
import { Link } from "react-router-dom";
import NewCollab from "./NewCollab";
import AddCollab from "./AddCollab";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCollabsThunk, startPlayGroundThunk } from "../../Redux/Slices/collabSlice";
import DeleteCollab from "./DeleteCollab";



const AllCollabs = () => {

  const dispatch = useDispatch();
  const allCollabs = useSelector((state) => state?.collab?.allCollabs);

  const [view, setView] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewCollabOpen, setIsNewCollabOpen] = useState(false);
  const [isAddCollabOpen, setIsAddCollabOpen] = useState(false);

  const startPlayGround = async(collab) => {
    const res = await dispatch(startPlayGroundThunk({ roomId : collab.roomId }));
    console.log("Res : ", res);
    if(res?.payload?.statusCode === 200){
      console.log("Successfully started the playground");
      setTimeout(() => {
        window.location.href = `http://localhost:${res?.payload?.data?.frontendPort}/language/${res?.payload?.data?.language}/room/${res?.payload?.data?.roomId}`;
        console.log("Redirecting ??");
      }, 500);
    }
  }

  useEffect(() => {
    async function fetchCollabs(){
      const res = await dispatch(fetchAllCollabsThunk());
      console.log("res : ", res);
    }

    fetchCollabs();
  }, [])
  console.log("all-collabs:", allCollabs);


  return (
    <NavigationLayout>
      <div className="pt-24 px-4 md:px-8 bg-white dark:bg-black min-h-screen text-gray-900 dark:text-white transition-all duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        
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

        {allCollabs?.map((collab) => (
          <div key={collab._id} className="relative group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow hover:shadow-lg transition-all p-6 flex flex-col gap-4">
            <DeleteCollab collab={collab}/>
            <button
              className="flex flex-col gap-4"
              onClick={() => startPlayGround(collab)}
            >
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:underline">
                {collab.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{collab.description}</p>
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <p>🛠️ Tech Stack:</p>
                {collab.language === 'react' && <FaReact className="text-blue-500" />}
                {collab.language === 'html' && <SiHtml5 className="text-orange-500" />}
                {collab.language === 'custom' && <FaDev className="text-purple-500" />}
                {collab.language === 'node' && <FaNodeJs className="text-green-800"/>} 
              </div>
            </button>
          </div>
        ))}

        </div>
      </div>

      {/* Modal for create / add */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative z-50 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md text-center">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Create Collab</h2>
            <button onClick={() => setIsModalOpen(false)} aria-label="Close">
              <RxCross2 className="absolute top-4 right-4 text-2xl text-gray-600 dark:text-white hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsAddCollabOpen(true);
              }}
              className="w-full py-2 mb-3 border border-gray-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all dark:text-white"
            >
              Add Existing Collab
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsNewCollabOpen(true);
              }}
              className="w-full py-2 border border-gray-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all dark:text-white"
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
