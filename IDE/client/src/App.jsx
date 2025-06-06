import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import socket from './socket.js';
import LoadingScreen from './components/LoadingScreen';
import InviteCollaborator from './components/InviteCollaborator';
import Editor from './components/Editor.jsx';
import HtmlCssJsEditor from './components/HtmlCssJsEditor.jsx';
import { Route, Routes, } from 'react-router-dom';
import Output  from './components/Output.jsx';

// Lazy-loaded components
const FileTree = lazy(() => import('./components/FileTree'));
const TerminalManager = lazy(() => import('./components/TerminalManager'));
const VideoCall = lazy(() => import('./components/VideoCall'));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [terminalHeight, setTerminalHeight] = useState(180);
  const sidebarRef = useRef(null);
  const terminalRef = useRef(null);
  const [isDraggingSidebar, setIsDraggingSidebar] = useState(false);
  const [isDraggingTerminal, setIsDraggingTerminal] = useState(false);
  const [language, setLanguage] = useState("");
  const [isRoomOwner, setIsRoomOwner] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [clientRoomId, setClientRoomId] = useState("");
  const [video, setVideo] = useState("")
  const [roomId, setRoomId] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlRoomId = urlParams.get('roomId');
    setIsRoomOwner(!urlRoomId);
    return urlRoomId || Math.random().toString(36).substring(2, 8);
  });

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    setClientRoomId(lastPart);
  }, []);

  useEffect(() => {
    socket.emit('join-room', roomId);

    const languagePart = window.location.pathname.split("/");
    const thirdPath = languagePart[languagePart.length - 3]
    setLanguage(thirdPath)

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, [roomId]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const addFile = () => {
    const fileName = prompt("Enter file name (with extension):");
    if (fileName) {
      const filePath = selectedFolder ? `${selectedFolder}/${fileName}` : fileName;
      socket.emit("file:create", { path: filePath, type: "file", roomId });
    }
  };

  const addFolder = () => {
    const folderName = prompt("Enter folder name:");
    if (folderName) {
      const folderPath = selectedFolder ? `${selectedFolder}/${folderName}` : folderName;
      socket.emit("file:create", { path: folderPath, type: "folder", roomId });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDraggingSidebar) {
        const newWidth = e.clientX;
        if (newWidth > 160 && newWidth < 500) {
          setSidebarWidth(newWidth);
        }
      }

      if (isDraggingTerminal) {
        const newHeight = window.innerHeight - e.clientY;
        if (newHeight > 100 && newHeight < 500) {
          setTerminalHeight(newHeight);
          window.dispatchEvent(new Event('resize'));
        }
      }
    };

    const handleMouseUp = () => {
      setIsDraggingSidebar(false);
      setIsDraggingTerminal(false);
    };

    if (isDraggingSidebar || isDraggingTerminal) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingSidebar, isDraggingTerminal]);

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const firstPart = pathParts[1].split("-")[1];
    const queryParams = new URLSearchParams(window.location.search);
    const isHost = !queryParams.has("roomId");
  
    if (!isHost) return;
  
    const url = `${import.meta.env.VITE_API_URL}/api/stop-collab/${firstPart}`;
  
    const handleBeforeUnload = () => {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({ date: firstPart }),
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      });
      const data = JSON.stringify({ date: firstPart });
      const blob = new Blob([data], { type: "application/json" });
      navigator.sendBeacon(url, blob);
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  
  

  if (isLoading) {
    return <LoadingScreen onLoadComplete={handleLoadComplete} />;
  }
  
  const videoHandler = async () => {
    let id = video;

  if (id === "") {
    id = Math.random().toString(36).substring(2, 8);
    setVideo(id); // update state if needed elsewhere
  }

  window.open(`/video/${id}`, '_blank');

  }

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-[#e0e0e0] overflow-hidden select-none font-[consolas,'Courier New',monospace] cursor-default">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
      {language != "html" && <div
        ref={sidebarRef}
        className="flex flex-col bg-[#1e1e1e] border-r border-[#333333]"
        style={{ width: `${sidebarWidth}px` }}
      >
        <div className="flex items-center bg-[#252525] border-b border-[#333333] text-xs text-[#ffffff] font-medium h-11 px-4">
          <div className="p-1"><span className="uppercase tracking-wider">EXPLORER</span></div>
          <div className="flex-1"></div>
          <div className="flex space-x-2">
            <button onClick={addFile} className="text-[#aaaaaa] hover:text-white p-1 hover:bg-[#333333] rounded-md border border-transparent hover:border-[#ffffff] transition-all" title="New File">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            <button onClick={addFolder} className="text-[#aaaaaa] hover:text-white p-1 hover:bg-[#333333] rounded-md border border-transparent hover:border-[#ffffff] transition-all" title="New Folder">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#444444] scrollbar-track-[#252525] p-1">
          <Suspense fallback={<div className="p-4 text-sm text-gray-400">Loading File Tree...</div>}>
            <FileTree
              setSelectedFile={setSelectedFile}
              setSelectedFolder={setSelectedFolder}
              selectedFile={selectedFile}
              roomId={roomId}
              language={language}
            />
          </Suspense>
        </div>
      </div>}

        {/* Resize handle */}
        {language != "html" && 
          <div className="w-1 bg-[#121212] hover:bg-[#ffffff] cursor-col-resize transition-all" onMouseDown={() => setIsDraggingSidebar(true)} />
         }

        {/* Main content area with editor and output side by side */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#121212]">
          <div className="bg-[#252525] px-4 py-1 text-xs border-b border-[#333333] flex justify-between items-center">
            {selectedFile ? (
              <span className="text-[#ffffff] p-1 tracking-wider ">{selectedFile.replaceAll("/", " > ")}</span>
            ) : (
              <div className="flex justify-center flex-1">
                <span className="text-[#ffffff] p-1 tracking-wider font-medium text-lg">DevTogether IDE</span>
              </div>
            )}
            
            <div className="flex items-center">
              {language != "html" && (
                <button
                  onClick={() => setShowOutput(!showOutput)}
                  className="px-3 py-1 rounded bg-[#333333] hover:bg-[#444444] text-white text-sm border border-[#555555] transition mr-4"
                >
                  {showOutput ? "Hide Output" : "Show Output"}
                </button>
              )}
              
              {language != "html" && isRoomOwner && (
                <InviteCollaborator roomId={roomId} />
              )}
            </div>
          </div>
         
          {/* This div contains both editor and output side by side */}
          <div className="flex-1 flex overflow-hidden relative bg-[#121212]">
            {/* Editor area */}
            <div className={`${language!== "html" ? (showOutput ? 'w-1/2' : 'w-full') : "w-full"} flex flex-col relative`}>
              {language !== "html" ? (
                selectedFile ? (
                  <Editor selectedFile={selectedFile} roomId={roomId} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center max-w-md p-6">
                      <svg
                        className="w-32 h-32 mx-auto text-[#333333]"
                        viewBox="0 0 100 100"
                        fill="currentColor"
                      >
                        <path d="M75.7,50.4L99,34.2l-23.3-4v-12L30.1,1.4L0.8,18.2v64.4l29.3,16.6l45.5-16.4l23.3-11.4V17.2L75.7,50.4z M30.1,83.4L8.8,70.8V28.8l21.3,9.4V83.4z M30.1,31.4L9.6,22.5l20.5-11L70.3,25L30.1,31.4z M91.5,67.8L76.5,75V36.7l-37.8,15v31.8l-1.7,0.6l-0.1-0.3V39.7L91.5,23V67.8z" />
                      </svg>
                      <h1 className="mt-6 text-[#ffffff] text-2xl font-medium">DevTogether IDE</h1>
                      <p className="text-[#aaaaaa] text-base mt-3">
                        Select a file from the sidebar or create a new one to begin editing
                      </p>
                      <div className="mt-6 flex justify-center space-x-4">
                        <button
                          onClick={addFile}
                          className="px-4 py-2 bg-[#333333] hover:bg-[#444444] text-white rounded-md border border-[#555555] transition-all"
                        >
                          New File
                        </button>
                        <button
                          onClick={addFolder}
                          className="px-4 py-2 bg-[#333333] hover:bg-[#444444] text-white rounded-md border border-[#555555] transition-all"
                        >
                          New Folder
                        </button>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <HtmlCssJsEditor />
              )}
            </div>
            
            {/* Output area */}
            {language != "html" && showOutput && (
              <div className="w-1/2 border-l border-[#333333]">
                <Output language = {language}/>
              </div>
            )}
          </div>

          {/* Terminal section */}
          {language != "html" && <> 
            <div className="h-1 bg-[#121212] hover:bg-[#ffffff] cursor-row-resize transition-all" onMouseDown={() => setIsDraggingTerminal(true)} />
            <div ref={terminalRef} className="flex flex-col bg-[#121212] border-t border-[#333333] overflow-hidden" style={{ height: `${terminalHeight}px` }}>
              <Suspense fallback={<div className="p-4 text-gray-400">Loading Terminal...</div>}>
                <TerminalManager terminalHeight={terminalHeight} />
              </Suspense>
            </div> 
          </>}
        </div>
      </div>
      <Routes>
        <Route path="/video/:videoId" element={<VideoCall/>} />
      </Routes>
      {language != "html" && isRoomOwner && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg"
            title="Start Video Call"
            onClick={videoHandler}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;