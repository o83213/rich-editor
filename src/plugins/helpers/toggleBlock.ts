import { Editor, Element, Transforms } from "slate";
import { isBlockActive } from "./isBlockActive";
import { wrapLink } from "./wrapLink";
import { unwrapLink } from "./unwrapLink";
import { insertImage } from "./insertImage";
import { insertIframe } from "./insertIframe";
import { insertVideo } from "./insertVideo";
import { insertTable } from "./insertTable";
import { insertHorizontal } from "./insertHorizontal";
import { addAnchor } from "../helpers/insertAnchor";

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
export const toggleBlock = async (
  editor: Editor,
  format: string,
  url: string = "https://www.google.com.tw/",
  callback?: Function[],
  row?: number,
  column?: number
) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: any;
  console.log(format);
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else if (format === "link") {
    if (editor.selection) {
      wrapLink(editor, url);
    }
  } else if (format === "link_off") {
    if (isBlockActive(editor, "link")) {
      unwrapLink(editor);
    }
  } else if (format === "image") {
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "file";
    hiddenInput.click();
    hiddenInput.addEventListener("change", async () => {
      const curFile = hiddenInput.files!;
      const ImageFile = curFile[0];
      const imageUrl = URL.createObjectURL(ImageFile);
      insertImage(editor, imageUrl);
    });
  } else if (format === "horizontal") {
    insertHorizontal(editor);
  } else if (format === "video") {
    insertVideo(editor, url);
  } else if (format === "embed") {
    insertIframe(editor, url);
  } else if (format === "table") {
    insertTable(editor, row, column);
  } else if (format === "sub-title") {
    console.log("add new subTitle");
    const isHeadingOneActive = isBlockActive(
      editor,
      "heading-one",
      TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
    );
    const isHeadingTwoActive = isBlockActive(
      editor,
      "heading-two",
      TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
    );
    if (!isHeadingOneActive && !isHeadingTwoActive) {
      const newId = Math.random().toString();
      addAnchor({
        anchorData: { editor, id: newId, type: "heading-one" },
        anchorOperations: {
          addToList: callback![0],
          removeFromList: callback![1],
        },
      });
      newProperties = {
        type: "heading-one",
        id: newId,
      };
    } else if (isHeadingOneActive && !isHeadingTwoActive) {
      const newId = Math.random().toString();
      addAnchor({
        anchorData: { editor, id: newId, type: "heading-two" },
        anchorOperations: {
          addToList: callback![0],
          removeFromList: callback![1],
        },
      });
      newProperties = {
        type: "heading-two",
        id: newId,
      };
    } else {
      addAnchor({
        anchorData: { editor, id: "", type: "" },
        anchorOperations: {
          addToList: callback![0],
          removeFromList: callback![1],
        },
      });
      newProperties = {
        type: "paragraph",
        id: null,
      };
    }
  } else {
    let format_type = format as Element["type"];
    console.log(format_type);
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format_type,
      id: null,
    };
    console.log(newProperties);
  }
  Transforms.setNodes<Element>(editor, newProperties);

  if (!isActive && isList) {
    const block = {
      type: format,
      children: [],
    } as Element;
    Transforms.wrapNodes(editor, block);
  }
};
