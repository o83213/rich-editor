import React, { useState, useRef } from "react";
import { STYBody } from "./style";

const initialValue = [
  {
    type: "title",
    children: [{ text: "在此輸入標題" }],
  },
  {
    type: "paragraph",
    children: [{ text: "開始寫作吧!" }],
  },
];

const EditorComponent = () => {
  // contents: 整個編輯器裡所有內容
  const [contents, setContents] = useState([
    {
      type: "paragraph",
      children: [{ text: "開始寫作吧!" }],
    },
  ]);
  // curLine: 目前在哪一行
  const [curLine, setCurLine] = useState(null);
  // curInput: 目前該行的文字內容
  const [curInput, setCurInput] = useState("");

  const inputRef = useRef();

  const textEvents = {
    onClick: (e) => {
      const index = Number(e.target.dataset.lineindex);
      setCurLine(index);
      setCurInput(contents[index].children[0].text);
    },
  };

  const inputEvents = {
    onChange: (e) => {
      setCurInput(e.target.value);
    },

    // 點畫面旁邊時觸發
    onBlur: (e) => {
      const index = Number(e.target.dataset.lineindex);
      const updatedContent = [...contents];
      updatedContent[index].children[0].text = curInput;
      setContents(updatedContent);
      setCurLine(null);
    },

    onKeyDown: (e) => {
      const index = Number(e.target.dataset.lineindex);
      let updatedContent = [...contents];
      switch (e.key) {
        case "Enter":
          //   const updatedContent = [
          //     ...contents,
          //     {
          //       type: "paragraph",
          //       children: [{ text: "" }],
          //     },
          //   ];
          updatedContent.push({
            type: "paragraph",
            children: [{ text: "" }],
          });
          updatedContent[index].children[0].text = curInput;
          setCurInput("");
          setContents(updatedContent);
          setCurLine((curLine) => curLine + 1);
          break;

        case "Backspace":
          curInput === "" && updatedContent.pop();
          setContents(updatedContent);
          break;
        default:
          break;
      }
      //   if (e.key === "Enter") {
      //     const index = Number(e.target.dataset.lineindex);
      //     const updatedContent = [
      //       ...contents,
      //       {
      //         type: "paragraph",
      //         children: [{ text: "" }],
      //       },
      //       {
      //         type: "paragraph",
      //         children: [{ text: "" }],
      //       },
      //     ];
      //     updatedContent[index].children[0].text = curInput;
      //     setCurInput("");
      //     setContents(updatedContent);
      //     setCurLine((curLine) => curLine + 1);
      //   }
    },
  };
  console.log("curInput", curInput);
  return (
    <STYBody>
      <div className="editorAreaOutside">
        <div className="editorAreaInside" spellCheck="false">
          <div>
            {contents.map((v, i) => {
              return (
                <div key={i} className="editorLine">
                  <div>
                    <div className="inputSTY" ref={inputRef}>
                      {i === curLine ? (
                        <input
                          type="text"
                          value={curInput}
                          data-lineindex={i}
                          {...inputEvents}
                          autoFocus
                        />
                      ) : (
                        <span data-lineindex={i} {...textEvents}>
                          {v.children[0].text}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </STYBody>
  );
};

export default EditorComponent;
