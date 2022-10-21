import React from "react";

// 引入元件
import EditorComponent from "../Editor/Editor-component";

import { STYBody } from "./style";

// react icons引用
import { AiOutlinePlus } from "react-icons/ai";
import { FaHeading } from "react-icons/fa";
import { RiDoubleQuotesL } from "react-icons/ri";
import { BsCodeSlash } from "react-icons/bs";
import { RiListUnordered } from "react-icons/ri";
import { RiListOrdered } from "react-icons/ri";

const MainComponent = () => {
  return (
    <STYBody>
      <textarea
        name="title"
        id="title"
        placeholder="請輸入標題"
        spellCheck="false"
        maxLength={60}
        style={{ height: "59px" }}
      ></textarea>
      <div className="hoverToolBarOutside">
        <div className="hoverToolBarInside">
          <AiOutlinePlus />
        </div>
      </div>
      <div className="sideToolBarOutside">
        <div className="sideToolBarInside">
          <div>
            <FaHeading />
          </div>
          <div>
            <RiDoubleQuotesL />
          </div>
          <div>
            <BsCodeSlash />
          </div>
          <div>
            <RiListUnordered />
          </div>
          <div>
            <RiListOrdered />
          </div>
        </div>
      </div>
      <div className="editorFirst">
        <div className="editorSecond">
          <EditorComponent />
        </div>
      </div>
    </STYBody>
  );
};

export default MainComponent;
