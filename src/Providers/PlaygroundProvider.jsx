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

export const PlaygroundProvider = ({ children }) => {
  const [folders, setFolders] = useState(initialData);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(folders));
  }, []);

  return (
    <PlaygroundContext.Provider value={folders}>
      {children}
    </PlaygroundContext.Provider>
  );
};
