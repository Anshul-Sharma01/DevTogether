import React, { useEffect, useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { AiOutlineExpandAlt, AiOutlineCode, AiOutlineFileText, AiOutlineLayout } from "react-icons/ai";
import socket from '../socket.js';
import axios from "axios";

const HtmlCssJsEditor = () => {
  const [tab, setTab] = useState("html");
  const [count, setCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const iframeRef = useRef(null);
  
  useEffect(() => {
    const getFileContent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/file-content/htmlcssjs`);
        const { html, css, js } = response.data;
        setHtmlCode(html);
        setCssCode(css);
        setJsCode(js);
      } catch (error) {
        console.error("Failed to fetch file content:", error);
      }
    };
    getFileContent();
  }, []);

  // Debounced run function to prevent flickering
  const debouncedRun = (html, css, js) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    
    setDebounceTimeout(setTimeout(() => {
      const iframe = iframeRef.current;
      if (iframe) {
        const styleTag = `<style>${css}</style>`;
        const scriptTag = `<script>${js}</script>`;
        
        // Create a blob to avoid flickering
        const blob = new Blob([html + styleTag + scriptTag], { type: 'text/html' });
        const blobURL = URL.createObjectURL(blob);
        
        // Only update source if iframe exists
        if (iframe) {
          // If this is not the first render, emit to socket
          if (count !== 0) {
            socket.emit("html-css-js", {
              html: html,
              css: css,
              js: js
            });
          }
          
          iframe.src = blobURL;
          setCount(count + 1);
          
          // Clean up the blob URL after the iframe loads
          iframe.onload = () => {
            URL.revokeObjectURL(blobURL);
          };
        }
      }
    }, 300)); // 300ms debounce delay
  };

  useEffect(() => {
    debouncedRun(htmlCode, cssCode, jsCode);
  }, [htmlCode, cssCode, jsCode, isExpanded]);

  const handleTabClick = (selectedTab) => {
    setTab(selectedTab);
  };

  const getActiveTabClass = (tabName) => {
    return tab === tabName 
      ? "tab cursor-pointer p-2 bg-[#2D2D2D] px-4 text-white  border-b-2 border-white font-medium" 
      : "tab cursor-pointer p-2 bg-[#1E1E1E] px-4 text-gray-400  rounded hover:text-white transition-colors";
  };

  const getTabIcon = (tabName) => {
    switch(tabName) {
      case 'html': return <AiOutlineLayout className="mr-1" />;
      case 'css': return <AiOutlineFileText className="mr-1" />;
      case 'js': return <AiOutlineCode className="mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-50px)]">
      <div className="flex relative h-full">
        <div 
          className="left bg-[#1E1E1E] overflow-hidden" 
          style={{ width: isExpanded ? '100%' : '50%' }}
        >
          <div className="tabs flex items-center justify-between w-full bg-[#1A1919] h-12 px-4 border-b border-gray-800">
            <div className="tabs flex items-center">
              {['html', 'css', 'js'].map((tabName) => (
                <div 
                  key={tabName}
                  onClick={() => handleTabClick(tabName)} 
                  className={`${getActiveTabClass(tabName)} flex items-center mx-1`}
                >
                  {getTabIcon(tabName)}
                  {tabName.toUpperCase()}
                </div>
              ))}
            </div>

            <div className="flex items-center">
              <button 
                className="text-xl p-2 rounded hover:bg-gray-700 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Show Preview" : "Full Editor"}
              >
                <AiOutlineExpandAlt />
              </button>
            </div>
          </div>

          <div className="h-[calc(100%-48px)]">
            {tab === "html" && (
              <Editor
                onChange={(value) => setHtmlCode(value || "")}
                height="100%"
                theme="vs-dark"
                language="html"
                value={htmlCode}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true
                }}
              />
            )}
            {tab === "css" && (
              <Editor
                onChange={(value) => setCssCode(value || "")}
                height="100%"
                theme="vs-dark"
                language="css"
                value={cssCode}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true
                }}
              />
            )}
            {tab === "js" && (
              <Editor
                onChange={(value) => setJsCode(value || "")}
                height="100%"
                theme="vs-dark"
                language="javascript"
                value={jsCode}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true
                }}
              />
            )}
          </div>
        </div>

        {!isExpanded && (
          <>
            <div className="divider bg-gray-700 w-1" />
            
            <div className="right bg-white" style={{ width: '50%' }}>
              <div className="bg-[#1A1919] h-12 font-bold flex items-center px-4 border-b border-gray-800">
                <span className="tracking-wider bg-[#1E1E1E] text-gray-200 rounded-md h-10 p-2">Preview</span>
              </div>
              <iframe
                ref={iframeRef}
                className="w-full h-[calc(100%-32px)] bg-white"
                title="output"
                sandbox="allow-scripts"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HtmlCssJsEditor;