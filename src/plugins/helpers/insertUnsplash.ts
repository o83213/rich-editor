import { Editor, Transforms, Element } from "slate";
export const insertUnsplash = (editor: Editor, url: string) => {
  const text = { text: "" };
  const unsplash: Element = { type: "unsplash", url, children: [text] };
  Transforms.insertNodes(editor, unsplash);
  Transforms.insertNodes(editor, {
    type: "paragraph",
    children: [{ text: "" }],
  });
};
