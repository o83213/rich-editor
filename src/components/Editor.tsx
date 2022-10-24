import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Editable, withReact, Slate } from "slate-react";
import {
  createEditor,
  Element as SlateElement,
  Text as SlateText,
  Descendant,
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
const RichTextExample = () => {
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
  const [anchorList, setAnchorList] = useState<{ name: string; id: string }[]>(
    () => {
      const anchor = localStorage.getItem("anchor");
      if (anchor) {
        return JSON.parse(anchor);
      }
      return [];
    }
  );
  const addAnchorHandler = (name: string, anchorId: string) => {
    setAnchorList((prev) => [...prev, { name, id: anchorId }]);
  };
  const removeAnchorHandler = (anchorId: string) => {
    setAnchorList((prev) =>
      prev.filter((anchorData) => anchorData.id !== anchorId)
    );
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
          const anchor = JSON.stringify(anchorList);
          localStorage.setItem("content", content);
          localStorage.setItem("anchor", anchor);
          setSlateValue(value);
        }
      }}
    >
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="delete" icon="format_strikethrough" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <StateButton
          format="color"
          icon="format_color_text"
          defaultState="black"
        />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" />
      </Toolbar>
      <Toolbar>
        <BlockButton format="link" icon="link" />
        <BlockButton format="link" icon="link_off" />
        <BlockButton
          format="anchor"
          icon="anchor"
          callback={[addAnchorHandler, removeAnchorHandler]}
        />
        <BlockButton format="image" icon="image" />
        <BlockButton format="video" icon="video_library" />
        <BlockButton format="embed" icon="html" />
        <BlockButton format="table" icon="table_chart" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
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
      <button
        onClick={() => {
          console.log(slateValue);
          const htmlString = slateValue
            .map((node) => {
              const serializedNodeString = serialize(node);
              return serializedNodeString;
            })
            .join("");
          console.log(htmlString);
          // parse back to json
          const document = new DOMParser().parseFromString(
            htmlString,
            "text/html"
          );
          const jsonData = deserialize(document.body);
        }}
      >
        serialize content
      </button>
      <button
        onClick={() => {
          const newId = prompt("New id?");
          if (newId) addAnchorHandler("test", newId);
        }}
      >
        add Anchor
      </button>
      <AnchorList listData={anchorList} />
    </Slate>
  );
};

export default RichTextExample;
