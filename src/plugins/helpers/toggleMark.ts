import { Editor } from "slate";
import { isMarkActive } from "./isMarkActive";
export const toggleMark = (editor: Editor, format: string, value?: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    if (value) {
      Editor.removeMark(editor, format);
      Editor.addMark(editor, format, value);
    } else {
      Editor.addMark(editor, format, true);
    }
  }
};
