import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket.js";

const FileTreeNode = ({ treeName, nodes, path, setSelectedFolder, setSelectedFile, selectedFile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDir = !!nodes;
  const isSelected = selectedFile === path;

  const handleToggle = () => {
    if (isDir) {
      setIsOpen(!isOpen);
      setSelectedFolder(path);
    } else {
      setSelectedFile(path);
    }
  };

  return (
    <div className="ml-2 pl-2 py-0.5">
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
        className={`cursor-pointer flex items-center text-sm ${
          isSelected 
            ? "text-white font-medium" 
            : "text-[#e0e0e0] hover:text-white"
        }`}
      >
        {treeName !== "user" && (
          <span className="mr-1.5 flex items-center">
            {isDir ? (
              isOpen ? (
                <svg 
                  className="w-3.5 h-3.5" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke={isSelected ? "#ffffff" : "#e0e0e0"}
                  strokeWidth="2"
                >
                  <path d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                </svg>
              ) : (
                <svg 
                  className="w-3.5 h-3.5" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke={isSelected ? "#ffffff" : "#e0e0e0"}
                  strokeWidth="2"
                >
                  <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              )
            ) : (
              <svg 
                className="w-3.5 h-3.5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={isSelected ? "#ffffff" : "#e0e0e0"}
                strokeWidth="2"
              >
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )}
          </span>
        )}
        <span className="truncate">{treeName}</span>
      </div>
      {isOpen && nodes && (
        <ul className="border-l border-[#37373d]">
          {Object.keys(nodes).map((child) => (
            <li key={child}>
              <FileTreeNode
                treeName={child}
                nodes={nodes[child]}
                setSelectedFile={setSelectedFile}
                path={path + "/" + child}
                setSelectedFolder={setSelectedFolder}
                selectedFile={selectedFile}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FileTree = ({ setSelectedFile, setSelectedFolder, selectedFile, roomId, language }) => {
  const [fileTree, setFileTree] = useState({});
  console.log(language);
  
  const getFileTree = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/file-path?language=${language}`);
      setFileTree(response.data.tree);
    } catch (error) {
      console.error("Error fetching file tree:", error);
    }
  };

  useEffect(() => {
    getFileTree();
    
    // Listen for file refresh events from the server
    const handleRefresh = () => {
      getFileTree();
    };

    socket.on("file:refresh", handleRefresh);
    
    return () => {
      socket.off("file:refresh", handleRefresh);
    };
  }, []);

  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#444444] scrollbar-track-[#252525]">
      <FileTreeNode
        treeName="user"
        nodes={fileTree}
        path=""
        setSelectedFolder={setSelectedFolder}
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
      />
    </div>
  );
};

export default FileTree;