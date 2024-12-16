import { useContext, useRef, useState } from "react";
import "./EditorContainer.scss";
import {Editor} from "@monaco-editor/react";

import "./Index.jsx";
import { PlaygroundContext } from "../../Providers/PlaygroundProvider.jsx";
import { makeSubmission } from "./Service.jsx";

const editorOptions = {
  fontSize: 18,
  wordwrap: "on",
};

const fileExtensionMapping = {
  cpp: "cpp",
  javascript: "js",
  java: "java",
  python: "py",
};

export const EditorContainer = ({ fileId, folderId ,runCode}) => {
  const { getDefaultCode, getLanguage, updateLanguage,saveCode } =
    useContext(PlaygroundContext);
  const [Code, setCode] = useState(() => {
    return getDefaultCode(fileId, folderId);
  });

  const [showLoader,setShowLoader]=useState(false)
  const [language, setLanguage] = useState(() => getLanguage(fileId, folderId));
  const [theme, setTheme] = useState("vs-dark");
  const [isFullScreen,setIsFullScreen]=useState(false)
  const codeRef = useRef(Code);
  console.log({ theme }, { language });

  const onChangeCode = (newCode) => {
    //Todo
    //    console.log(newCode);
    codeRef.current = newCode;
  };

  const exportCode = () => {
    //extract the code
    console.log(codeRef.current);
    const codeValue = codeRef.current?.trim();

    if (!codeValue) {
      alert("Please Type Some Code in the Editor Before Exporting");
    }

    //create a blob /instant file in the memory

    const codeBlob = new Blob([codeValue], { type: "text/plain" });

    //create the downloadable link with blob data
    const downloadUrl = URL.createObjectURL(codeBlob);

    //create a clickable link to download blob/file
    const link = document.createElement("a");
    link.href = downloadUrl;

    link.download = `Code.${fileExtensionMapping[language]}`;
    link.click();
  };

  const onChangeLanguage = (newLanguage) => {
    updateLanguage(fileId, folderId, newLanguage.target.value);
    setCode(getDefaultCode(fileId,folderId))
    setLanguage(newLanguage.target.value);
  };

  const onChangeTheme = (newTheme) => {
    setTheme(newTheme.target.value);
  };

  const importCode = (event) => {
    const file = event.target.files[0];
    const fileType = file.type.includes("text");

    if (fileType) {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function (value) {
        const importedCode = value.target.result;
        setCode(importedCode);
        codeRef.current = importedCode;
      };
    } else {
      alert("please choose a program file");
    }
  };

  const onSaveCode =()=>{
     saveCode(fileId,folderId,codeRef.current);
     alert("Code Saved Successfully")
  }

  const fullScreen =()=>{
    setIsFullScreen(!isFullScreen)
  }

  const onRunCode=()=>{
    runCode({code:codeRef.current,language})
  }

  return (
    <div className="root-editor-container" style={isFullScreen ? styles.fullScreen:{}}>
      <div className="editor-header">
        <div className="editor-left-container">
          <b className="title">{"title of the card"}</b>
          <span className="material-icons">edit</span>
          <button onClick={onSaveCode}>Save Code</button>
        </div>

        <div className="editor-right-container">
          <select onChange={onChangeLanguage} value={language}>
            <option value="cpp">cpp</option>
            <option value="python">Python</option>
            <option value="javascript">Javascript</option>
            <option value="Java">Java</option>
          </select>
          <select onChange={onChangeTheme} value={theme}>
            <option value="vs-dark">vs-dark</option>
            <option value="vs-light">vs-light</option>
          </select>
        </div>
      </div>
      <div className="editor-body">
        <Editor
          width={"100%"}
          height={"100%"}
          language={language}
          options={editorOptions}
          theme={theme}
          onChange={onChangeCode}
          value={Code}
        />
      </div>
      <div className="editor-footer">
        <button className="btn" onClick={fullScreen}>
          <span className="material-icons">fullscreen</span>
          <span>{isFullScreen?"Minimize":"Full Screen"}</span>
        </button>
        <label htmlFor="import-code" className="btn">
          <span className="material-icons">upload_file</span>
          <span> Import Code</span>
        </label>
        <input
          type="file"
          id="import-code"
          style={{ display: "none" }}
          onChange={importCode}
        />
        <button className="btn" onClick={exportCode}>
          <span className="material-icons">cloud_download</span>
          <span>Export Code</span>
        </button>
        <button className="btn" onClick={onRunCode}>
          <span className="material-icons">play_arrow</span>
          <span>Run Code</span>
        </button>
      </div>

      
      
    </div>
  );
};

const styles={
    fullScreen:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        zIndex:10,
    }
}
