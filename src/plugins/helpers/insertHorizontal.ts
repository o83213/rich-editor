import { Editor, Transforms, Element } from "slate";
export const insertHorizontal = (editor: Editor) => {
  const text = { text: "" };
  const horizontal: Element = { type: "horizontal", children: [text] };
  Transforms.insertNodes(editor, horizontal);
};
