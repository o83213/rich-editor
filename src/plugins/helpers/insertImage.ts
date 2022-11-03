import { Editor, Transforms, Element } from "slate";
export const insertImage = (editor: Editor, url: string) => {
  const text = { text: "" };
  const image: Element = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, {
    type: "paragraph",
    children: [{ text: "" }],
  });
};
