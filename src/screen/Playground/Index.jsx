import React from "react";
import { useParams } from "react-router-dom";
import "./index.scss";
import { EditorContainer } from "./EditorContainer";
function Playground() {
  const params = useParams();
  const { fileId, folderId } = params;
  console.log(params);

  return (
    <div className="playground-container">
      <div className="header-container">
        <img src="/logoCP.png" className="logo" />
      </div>
      <div className="content-container">
        
        <div className="editor-container"><EditorContainer/></div>
        <div className="input-container">
          <div className="input-header">
            <b>Input:</b>
            <label htmlFor="input" className="icon-container">
              <span className="material-icons">upload_file</span>
              <b className="">Import Input</b>
            </label>
            <input type="file" id="input" style={{ display: "none" }} />
          </div>
          <textarea name="" id=""></textarea>
        </div>
        <div className="input-container">
          <div className="input-header">
            <b>Output:</b>
            <button className="icon-container">
            <span className="material-icons">cloud_download</span>
            <b>Export Output</b>
            </button>
            
          </div>
          <textarea readOnly name="" id=""></textarea>
        </div>
        

      </div>
    </div>
  );
}

export default Playground;
