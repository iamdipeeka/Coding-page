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
        language: "cpp",
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
        language: "Python",
        code: `cout<<"hello";`,
      },
    ],
  },
];

const defaultCode = {
  ["cpp"]: `#include <iostream>
            using namespace std;
 

             int main()
             {
              cout << "Hello World";
              return 0;
              }`,
  ["java"]: `public class Main {
    public static void main(String[] args) {
    System.out.println("Hello World");
      }
    }`,
  ["javascript"]: `console.log("hello world")`,
  ["python"]: `print('Hello, world!')`,
};

export const PlaygroundProvider = ({ children }) => {
  const [folders, setFolders] = useState(()=>{
    const localData = localStorage.getItem("data");
    try{
      return localData?JSON.parse(localData):initialData
    } catch(error){
      return initialData
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
            code: defaultCode[language],
            language
          },
        ],
      },
    ];
    localStorage.setItem("data", JSON.stringify(newFolders));
    setFolders(newFolders);
  };

  const CreateNewFolder=(folderName)=>{
       const newFolder={
        id:v4(),
        title:folderName,
        files:[]
       }

       const allFolders=[...folders,newFolder]
       folders.push(newFolder)
       localStorage.setItem('data',JSON.stringify(allFolders))
       setFolders(allFolders)
  }

  useEffect(() => {
   if (!localStorage.getItem("data")){
    localStorage.setItem("data", JSON.stringify(newFolders));
   }
  }, []);

  const PlaygroundFeatures = {
    folders,
    CreateNewPlayground,
    CreateNewFolder,

  };

  return (
    <PlaygroundContext.Provider value={PlaygroundFeatures}>
      {children}
    </PlaygroundContext.Provider>
  );
};
