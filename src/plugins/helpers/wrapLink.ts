import { Editor, Range, Element, Transforms } from "slate";
import { isBlockActive } from "./isBlockActive";
import { unwrapLink } from "./unwrapLink";
export const wrapLink = (editor: Editor, url: string) => {
  if (isBlockActive(editor, "link")) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: Element = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};
