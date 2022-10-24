import { Editor, Range, Element, Transforms } from "slate";
import { isBlockActive } from "./isBlockActive";
export const addAnchor = (
  editor: Editor,
  id: string,
  addToList: Function,
  removeFromList: Function
) => {
  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  if (!selection) return false;
  const anchorId = isBlockActive(editor, "anchor");
  console.log("anchorId", anchorId);
  if (anchorId) {
    removeFromList(anchorId);
    Transforms.setNodes(
      editor,
      { id: undefined },
      {
        at: Editor.unhangRange(editor, selection),
        match: (n, path) => {
          const matching = path.length === 1;
          if (matching) {
            console.log(n);
          }
          return !Editor.isEditor(n) && path.length === 1;
        },
      }
    );
    return false;
  } else {
    Transforms.setNodes(
      editor,
      { id: id },
      {
        at: Editor.unhangRange(editor, selection),
        match: (n, path) => {
          const matching = path.length === 1;
          if (matching) {
            console.log(n);
            addToList((n as any).type + ": " + id, id);
          }
          return !Editor.isEditor(n) && path.length === 1;
        },
      }
    );
  }
};
