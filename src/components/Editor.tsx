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
import { withHistory } from "slate-history";
import { css } from "@emotion/css";

import { defaultValue } from "../data/defaultValue";
import { withPlugins } from "../plugins/withPlugins";
import CustomElement from "./Custom/CustomElement";
import CustomLeaf from "./Custom/CustomLeaf";
import AnchorList from "./Anchor/AnchorList";
import NavigationWrapper from "./Navigation/NavigationWrapper";
import Title from "./Title/Title";
import Toolbar1 from "./Toolbars/Toolbar1";
import Toolbar2 from "./Toolbars/Toolbar2";
import HoveringToolbar from "./Toolbars/HoveringToolbar";

interface EditorProps {
  onSaveContent: (content: Descendant[]) => void;
  DefaultContent?: Descendant[];
}

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

const LionEditor = (props: EditorProps) => {
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

  const [slateValue, setSlateValue] = useState<Descendant[]>(
    props.DefaultContent ? props.DefaultContent : []
  );

  const [anchorList, setAnchorList] = useState<AnchorData[]>(() => {
    const anchor = localStorage.getItem("anchor");
    if (anchor) {
      return JSON.parse(anchor);
    }
    return [];
  });

  // store the content after state change
  useEffect(() => {
    let timer = setTimeout(() => {
      props.onSaveContent(slateValue);
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [slateValue]);

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
    setAnchorList(nodeWithId);
    const anchor = JSON.stringify(nodeWithId);
    localStorage.setItem("anchor", anchor);
  };
  console.log(slateValue);
  return (
    <Slate
      editor={editor}
      // value={initialValue}
      value={props.DefaultContent ? props.DefaultContent : []}
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
        {/* <NavigationWrapper /> */}
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
          />
          <HoveringToolbar />
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
