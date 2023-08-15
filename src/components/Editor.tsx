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
import Toolbar3 from "./Toolbars/Toolbar3";
import UnsplashModal from "../util/UnsplashModal";
import { insertUnsplash } from "../plugins/helpers/insertUnsplash";
interface HotKeyType {
  [key: string]: string;
}
const HOTKEYS: HotKeyType = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

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

  // TODO: unsplash區塊 start-----------------------------------
  const [pageNum, setPageNum] = useState<number>(1);
  const [unsplashSearchValue, setUnsplashSearchValue] = useState<string>("");
  const [selectUnsplashImage, setSelectUnsplashImage] = useState<
    { id: string; imageUrl: string }[]
  >([]);
  const [isUnsplash, setIsUnsplash] = useState<boolean>(false);
  const [unsplashData, setunsplashData] = useState<any>([]);

  // 抓取圖庫照片api
  const unsplashApi = `https://api.unsplash.com/search/photos?query=${unsplashSearchValue}&per_page=20&page=${pageNum}&client_id=9X0tz1aIDBowBtwGmgk5Q7xzSJqAwWiISn9NTLfN-mg`;
  //
  console.log("selectUnsplashImage: ", selectUnsplashImage);
  //
  async function getNewImage() {
    return fetch(unsplashApi)
      .then((res) => res.json())
      .then((data) => {
        // console.log("✨data", data);
        setunsplashData(data);
      });
  }

  // 打api取得unsplash資料
  useEffect(() => {
    getNewImage();
  }, [isUnsplash, pageNum, unsplashSearchValue]);

  useEffect(() => {
    // console.log("selectUnsplashImage", selectUnsplashImage);
  }, [selectUnsplashImage]);
  // unsplash區塊 end-----------------------------------------------

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
        <Title />
        <Toolbar1 />
        <Toolbar2 callback={[addAnchorHandler, removeAnchorHandler]} />
        <Toolbar3 setIsUnsplash={setIsUnsplash} isUnsplash={isUnsplash} />
        {isUnsplash && (
          <UnsplashModal
            unsplashData={unsplashData}
            setIsUnsplash={setIsUnsplash}
            isUnsplash={isUnsplash}
            pageNum={pageNum}
            setPageNum={setPageNum}
            setUnsplashSearchValue={setUnsplashSearchValue}
            setSelectUnsplashImage={setSelectUnsplashImage}
            selectUnsplashImage={selectUnsplashImage}
          />
        )}
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
