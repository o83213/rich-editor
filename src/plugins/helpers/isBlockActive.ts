import { Editor, Element } from "slate";

export const isBlockActive = (
  editor: Editor,
  format: string,
  blockType = "type"
) => {
  const { selection } = editor;
  if (!selection) return false;

  if (format === "sub-title") {
    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) => {
          return (
            !Editor.isEditor(n) &&
            Element.isElement(n) &&
            ["heading-one", "heading-two"].includes((n as any)[blockType])
          );
        },
      })
    );
    return !!match;
  } else {
    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) => {
          if (blockType === "align") {
            return false;
          }

          return (
            !Editor.isEditor(n) &&
            Element.isElement(n) &&
            (n as any)[blockType] === format
          );
        },
      })
    );
    return !!match;
  }
};
