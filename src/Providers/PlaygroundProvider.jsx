import { createContext, useContext, useState, useEffect } from "react";
import { v4 } from "uuid";

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
  const [folders, setFolders] = useState(initialData);

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
          },
        ],
      },
    ];
    localStorage.setItem("data", JSON.stringify(newFolders));
    setFolders(newFolders);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(folders));
  }, []);

  const PlaygroundFeatures = {
    folders,
    CreateNewPlayground,
  };

  return (
    <PlaygroundContext.Provider value={PlaygroundFeatures}>
      {children}
    </PlaygroundContext.Provider>
  );
};
