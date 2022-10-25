import React, { useRef } from "react";
import LionEditor from "./components/Editor";
import { css } from "@emotion/css";
const App = () => {
  return (
    // <div
    //   className={css`
    //     border: 0.1rem solid black;
    //     background: rgb(255, 255, 255);
    //     max-width: 42em;
    //     margin: 20px auto;
    //     padding: 20px;
    //     padding-top: 0px;
    //     `}
    // >
    // </div>
    <LionEditor />
  );
};

export default App;
