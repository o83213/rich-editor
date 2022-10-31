import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Editable, withReact, Slate } from "slate-react";
import {
  createEditor,
  Element as SlateElement,
  Text as SlateText,
  Descendant,
  Editor,
  Node,
} from "slate";
import { isHotkey } from "is-hotkey";
import { withHistory } from "slate-history";

import { Toolbar } from "./BaseComponents";
import { defaultValue } from "../data/defaultValue";
import { toggleMark } from "../plugins/helpers/toggleMark";
import { withPlugins } from "../plugins/withPlugins";
import CustomElement from "./Custom/CustomElement";
import CustomLeaf from "./Custom/CustomLeaf";

import BlockButton from "./Button/BlockButton";
import MarkButton from "./Button/MarkButton";
import StateButton from "./Button/ColorButton";
import { serialize, deserialize } from "../plugins/helpers/serializeHelper";
import AnchorList from "./Anchor/AnchorList";
import NavigationWrapper from "./Navigation/NavigationWrapper";
import Title from "./Title/Title";
import { css, cx } from "@emotion/css";
import Toolbar1 from "./Toolbars/Toolbar1";
import Toolbar2 from "./Toolbars/Toolbar2";
import HoveringToolbar from "./Toolbars/HoveringToolbar";
interface HotKeyType {
  [key: string]: string;
}
const HOTKEYS: HotKeyType = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

interface ElementProps {
  attributes: any;
  children: React.ReactNode;
  element: SlateElement;
}

interface LeafProps {
  attributes: any;
  children: React.ReactNode;
  leaf: SlateText;
}

interface AnchorData {
  name: string;
  id: string;
  type: string;
  order: number;
}
const LionEditor = () => {
  const renderElement = useCallback(
    (props: ElementProps) => <CustomElement {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: LeafProps) => <CustomLeaf {...props} />,
    []
  );
  const editor = useMemo(() => {
    return withPlugins(withHistory(withReact(createEditor())));
  }, []);
  const initialValue = useMemo(() => {
    const localStorageContent = localStorage.getItem("content");
    const data = localStorageContent
      ? JSON.parse(localStorageContent)
      : defaultValue;
    return data;
  }, []);
  const [slateValue, setSlateValue] = useState<Descendant[]>([]);
  useEffect(() => {
    setSlateValue(initialValue);
  }, [initialValue]);
  const [anchorList, setAnchorList] = useState<AnchorData[]>(() => {
    const anchor = localStorage.getItem("anchor");
    if (anchor) {
      return JSON.parse(anchor);
    }
    return [];
  });
  const addAnchorHandler = (data: AnchorData) => {
    console.log(data);
    setAnchorList((prev) => [...prev, data]);
    console.log("anchorList:", anchorList);
  };
  const removeAnchorHandler = (anchorId: string) => {
    console.log(anchorId);
    setAnchorList((prev) =>
      prev.filter((anchorData) => anchorData.id !== anchorId)
    );
    console.log("anchorList:", anchorList);
  };
  const updateAnchorList = (editor: Editor) => {
    const topNodes = editor.children;
    const nodeWithId = topNodes
      .filter((node) => {
        return "id" in node;
      })
      .map((node: any, idx) => {
        const name = Node.string(node);
        return {
          id: node.id,
          order: idx,
          name,
          type: node.type,
        };
      });
    console.log(nodeWithId);
    setAnchorList(nodeWithId);
    const anchor = JSON.stringify(nodeWithId);
    localStorage.setItem("anchor", anchor);
  };
  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => op.type !== "set_selection"
        );
        if (isAstChange) {
          const content = JSON.stringify(value);
          updateAnchorList(editor);
          localStorage.setItem("content", content);
          setSlateValue(value);
        }
      }}
    >
      <div
        className={css`
          position: relative;
          z-index: 0;
          margin: 0px auto;
          padding-top: 100px;
        `}
      >
        <NavigationWrapper />
        <div className="container2">
          <Title />
          <Toolbar1 callback={[addAnchorHandler, removeAnchorHandler]} />
          <Toolbar2 />
          <div
            className={css`
              width: 100%;
              max-width: 740px;
              margin: 0 auto;
            `}
          >
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              placeholder="開始寫作吧!"
              spellCheck
              autoFocus
              onKeyDown={(event) => {
                for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey, event)) {
                    event.preventDefault();
                    const mark = HOTKEYS[hotkey];
                    toggleMark(editor, mark);
                  }
                }
              }}
            />
            <HoveringToolbar />
          </div>
        </div>
      </div>
      <div
        className={css`
          position: fixed;
          top: 20%;
          left: 16px;
          transform: translateY(-50%);
          z-index: 11;
        `}
      >
        <AnchorList listData={anchorList} />
      </div>
    </Slate>
  );
};

export default LionEditor;
