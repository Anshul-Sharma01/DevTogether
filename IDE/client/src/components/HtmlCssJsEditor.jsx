import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { AiOutlineExpandAlt } from "react-icons/ai";
import socket from '../socket.js';
import axios from "axios"



const HtmlCssJsEditor = () => {
  const [tab, setTab] = useState("html");
  const [count, setCount] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false);
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  useEffect(() => {
    const getFileContent = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/file-content/htmlcssjs`)
        const { html, css, js} = response.data
        setHtmlCode(html)
        setCssCode(css)
        setJsCode(js)
    }
    getFileContent()
}, [])


  const run = () => {

    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}</script>`;
    const iframe = document.getElementById("iframe");

    if(count !== 0){ 
    socket.emit("html-css-js",{
        html:htmlCode,
        css:cssCode,
        js:jsCode
    })
 }
     setCount(count + 1)
    if (iframe) {
      iframe.srcdoc = html + css + js;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      run();
    }, 0);
  }, [htmlCode, cssCode, jsCode, isExpanded]);

  

  return (
    <>
      <div className="flex">
        <div className={`left w-[${isExpanded ? "100%" : "50%"}]`}>
          <div className="tabs flex items-center justify-between gap-2 w-full bg-[#1A1919] h-[50px] px-[40px]">
            <div className="tabs flex items-center gap-2">
              <div onClick={() => { setTab("html"); }} className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]">HTML</div>
              <div onClick={() => { setTab("css"); }} className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]">CSS</div>
              <div onClick={() => { setTab("js"); }} className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]">JavaScript</div>
            </div>

            <div className="flex items-center gap-2">
              <i className="text-[20px] cursor-pointer" onClick={() => { setIsExpanded(!isExpanded); }}><AiOutlineExpandAlt /></i>
            </div>
          </div>

          {tab === "html" ? (
            <Editor
              onChange={(value) => {
                setHtmlCode(value);
                run();
              }}
              height="82vh"
              theme= "vs-dark"
              language="html"
              value={htmlCode}
            />
          ) : tab === "css" ? (
            <Editor
              onChange={(value) => {
                setCssCode(value);
                run();
              }}
              height="82vh"
              theme="vs-dark"
              language="css"
              value={cssCode}
            />
          ) : (
            <Editor
              onChange={(value) => {
                setJsCode(value);
                run();
              }}
              height="82vh"
              theme="vs-dark"
              language="javascript"
              value={jsCode}
            />
          )}
        </div>

        {!isExpanded && (
          <iframe
            id="iframe"
            className="w-[50%] min-h-[82vh] bg-[#fff] text-black"
            title="output"
          />
        )}
      </div>
    </>
  );
};

export default HtmlCssJsEditor;