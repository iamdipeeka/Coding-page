import { createContext, useContext, useState, useEffect } from "react";
import { stringify, v4 } from "uuid";


export const PlaygroundContext = createContext();

const initialData = [
  {
    id: v4(),
    title: "spring boot",
    files: [
      {
        id: v4(),
        title: "index",
        // language: "cpp",
        language: "cpp" || "Unknown",
        code: `cout<<"hello";`,
      },
    ],
  },
  {
    id: v4(),
    title: "DevOps",
    files: [
      {
        id: v4(),
        title: "Basics",
        // language: "Python",
        language: "python" || "Unknown",
        code: `cout<<"hello";`,
      },
    ],
  },
];

export const defaultCode = {
  "cpp": `#include <iostream>
  using namespace std;
 

 int main(){
      cout << "Hello World";
      return 0;
  }`,
  "java": `public class Main {
    public static void main(String[] args) {
    System.out.println("Hello World");
      }
    }`,
  "javascript": `console.log("hello world")`,
  "python": `print('Hello, world!')`,
};

export const PlaygroundProvider = ({ children }) => {
  const [folders, setFolders] = useState(() => {
    const localData = localStorage.getItem("data");
    try {
      return localData ? JSON.parse(localData) : initialData;
    } catch (error) {
      return initialData;
    }
  });

  const CreateNewPlayground = (NewPlayground) => {
    const { fileName, folderName, language } = NewPlayground;
    const newFolders = [
      ...folders,
      {
        id: v4(),
        title: folderName,
        files: [
          {
            id: v4(),
            title: fileName,
            language: language,
            code: defaultCode[language] ,
          },
        ],
      },
    ];
    localStorage.setItem("data", JSON.stringify(newFolders));
    setFolders(newFolders);
  };

  const CreateNewFolder = (folderName) => {
    const newFolder = {
      id: v4(),
      title: folderName,
      files: [],
    };

    const allFolders = [...folders, newFolder];
    folders.push(newFolder);
    localStorage.setItem("data", JSON.stringify(allFolders));
    setFolders(allFolders);
  };

  const deleteFolder = (id) => {
    //first del then update the folder also for local storage

    const updatedFoldersList = folders.filter((folderItem) => {
      return folderItem.id !== id;
    });
    localStorage.setItem("data", JSON.stringify(updatedFoldersList));
    setFolders(updatedFoldersList);
  };

  const deleteFile = (folderId, fileId) => {
    const copiedFolders = [...folders];
    for (let i = 0; i < copiedFolders.length; i++) {
      if (copiedFolders[i].id === folderId) {
        const files = [...copiedFolders[i].files];
        copiedFolders[i].files = files.filter((File) => {
          return File.id !== fileId;
        });
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(copiedFolders));
    setFolders(copiedFolders);
  };

  const editFolderTitle = (newFolderName, id) => {
    const updatedFoldersList = folders.map((folderItem) => {
      if (folderItem.id === id) {
        folderItem.title = newFolderName;
      }
      return folderItem;
    });
    localStorage.setItem("data", JSON.stringify(updatedFoldersList));
    setFolders(updatedFoldersList);
  };

  const editFileTitle = (newFileName, folderId, fileId) => {
    const copiedFolders = [...folders];
    for (let i = 0; i < copiedFolders.length; i++) {
      if (folderId === copiedFolders[i].id) {
        const files = copiedFolders[i].files;
        for (let j = 0; j < files.length; j++) {
          if (files[j].id === fileId) {
            files[j].title = newFileName;
            break;
          }
        }
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(copiedFolders));
    setFolders(copiedFolders);
  };

  const createPlayground = (folderId, file) => {
    const copiedFolders = [...folders];
    for (let i = 0; i < copiedFolders.length; i++) {
      if (copiedFolders[i].id === folderId) {
        copiedFolders[i].files.push(file);
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(copiedFolders));
    setFolders(copiedFolders);
  };

  const getDefaultCode = (fileId, folderId) => {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === folderId) {
        for (let j = 0; j < folders[i].files.length; j++) {
          const currentFile = folders[i].files[j];
          if (fileId === currentFile.id) {
            return currentFile.code;
          }
        }
      }
    }
  };

  const updateLanguage = (fileId,folderId,language)=>{
    const newFolders = [...folders];
    for (let i = 0; i < newFolders.length; i++) {
      if (newFolders[i].id === folderId) {
        for (let j = 0; j < newFolders[i].files.length; j++) {
          const currentFile = newFolders[i].files[j];
          if (fileId === currentFile.id) {
            newFolders[i].files[j].code=defaultCode[language];
            newFolders[i].files[j].language=language;
          }
        }
      }
    }
    localStorage.setItem('data',JSON.stringify(newFolders));
    setFolders(newFolders)
  }

  const getLanguage = (fileId, folderId) => {

    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === folderId) {
        for (let j = 0; j < folders[i].files.length; j++) {
          const currentFile = folders[i].files[j];
          if (fileId === folders[i].files[j].id) {
            return currentFile.language;
          }
        }
      }
    }
  };

  const saveCode =(fileId,folderId,newCode)=>{
    const newFolders = [...folders];
    for (let i = 0; i < newFolders.length; i++) {
      if (newFolders[i].id === folderId) {
        for (let j = 0; j < newFolders[i].files.length; j++) {
          const currentFile = newFolders[i].files[j];
          if (fileId === currentFile.id) {
            newFolders[i].files[j].code = newCode;
          }
        }
      }
      localStorage.setItem('data',JSON.stringify(newFolders));
      setFolders(newFolders)
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("data")) {
      localStorage.setItem("data", JSON.stringify(folders));
    }
  }, []);

  const PlaygroundFeatures = {
    folders,
    CreateNewPlayground,
    CreateNewFolder,
    deleteFolder,
    editFolderTitle,
    editFileTitle,
    deleteFile,
    createPlayground,
    getDefaultCode,
    getLanguage,
    updateLanguage,
    saveCode
  };

  return (
    <PlaygroundContext.Provider value={PlaygroundFeatures}>
      {children}
    </PlaygroundContext.Provider>
  );
};
