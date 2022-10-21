import React from "react";

// 元件
import HeaderComponent from "./components/Header/Header-component";
import MainComponent from "./components/Main/Main-component";

// style
import { STYBody } from "./style/global";

function App() {
  return (
    <STYBody>
      <HeaderComponent />
      <MainComponent />
    </STYBody>
  );
}

export default App;
