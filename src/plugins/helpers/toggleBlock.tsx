import { Editor, Element, Transforms } from "slate";
import { isBlockActive } from "./isBlockActive";
import { wrapLink } from "./wrapLink";
import { unwrapLink } from "./unwrapLink";
import { insertImage } from "./insertImage";
import { insertIframe } from "./insertIframe";
import { insertVideo } from "./insertVideo";
import { insertTable } from "./insertTable";
import { insertHorizontal } from "./insertHorizontal";
import { insertUnsplash } from "./insertUnsplash";
import UnsplashModal from "../../util/UnsplashModal";
import { addAnchor } from "../helpers/insertAnchor";

const LIST_TYPES = ["numbered-list", "bulleted-list"];
// const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
const TEXT_ALIGN_TYPES = ["center", "right"];
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
  if (TEXT_ALIGN_TYPES.includes(format)) {
    const { selection } = editor;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection!),
        match: (n) => {
          return (
            !Editor.isEditor(n) &&
            Element.isElement(n) &&
            TEXT_ALIGN_TYPES.includes((n as any)["align"])
          );
        },
      })
    );

    let newAlign;

    if (!match) {
      newAlign = TEXT_ALIGN_TYPES[0];
    } else {
      const oldAlign = (match[0] as any).align;

      let oldAlignIdx = TEXT_ALIGN_TYPES.findIndex((el) => el === oldAlign);

      newAlign =
        oldAlignIdx + 1 !== TEXT_ALIGN_TYPES.length
          ? TEXT_ALIGN_TYPES[oldAlignIdx + 1]
          : undefined;
    }
    newProperties = {
      align: newAlign,
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
    const fileReader = new FileReader();
    hiddenInput.type = "file";

    hiddenInput.addEventListener("change", async () => {
      const curFile = hiddenInput.files!;
      const ImageFile = curFile[0];
      fileReader.readAsDataURL(ImageFile);
    });

    fileReader.addEventListener("load", (event) => {
      const base64DataUrl = event.target?.result as string;
      insertImage(editor, base64DataUrl);
    });

    hiddenInput.click();
  } else if (format === "horizontal") {
    insertHorizontal(editor);
  } else if (format === "unsplash") {
    // insertUnsplash(editor, url);
  } else if (format === "video") {
    insertVideo(editor, url);
  } else if (format === "embed") {
    insertIframe(editor, url);
  } else if (format === "table") {
    insertTable(editor, row, column);
  } else if (format === "sub-title") {
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
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format_type,
      id: null,
    };
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
