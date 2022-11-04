import React, { useMemo } from "react";
import LionEditor from "./components/Editor";
import NavigationWrapper from "./components/Navigation/NavigationWrapper";
import { defaultValue } from "./data/defaultValue";
const App = () => {
  const saveContent = (content: any) => {
    console.log(content);
  };

  const initialValue = useMemo(() => {
    const localStorageContent = localStorage.getItem("content");
    const data = localStorageContent
      ? JSON.parse(localStorageContent)
      : defaultValue;
    return data;
  }, []);

  return (
    <div>
      <NavigationWrapper />
      <LionEditor onSaveContent={saveContent} DefaultContent={initialValue} />
    </div>
  );
};

export default App;
