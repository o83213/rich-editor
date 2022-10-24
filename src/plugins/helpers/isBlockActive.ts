import { Editor, Element } from "slate";
export const isBlockActive = (
  editor: Editor,
  format: string,
  blockType = "type"
) => {
  const { selection } = editor;
  if (!selection) return false;
  if (format === "anchor") {
    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n, path) => {
          return !Editor.isEditor(n) && path.length === 1;
        },
      })
    );
    const id = (match[0] as any).id;
    return !!match && id;
  } else {
    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) => {
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
