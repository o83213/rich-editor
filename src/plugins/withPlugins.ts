import { Editor, Range, Element, Point } from "slate";
export const withPlugins = (editor: Editor) => {
  const {
    isInline,
    isVoid,
    deleteForward,
    deleteBackward,
    insertBreak,
    insertNode,
  } = editor;

  editor.isInline = (element) =>
    ["link", "button"].includes(element.type) || isInline(element);
  editor.isVoid = (element) => {
    return ["image", "embed", "video", "horizontal"].includes(element.type)
      ? true
      : isVoid(element);
  };
  editor.deleteBackward = (unit) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          n.type === "table-cell",
      });

      if (cell) {
        const [, cellPath] = cell;
        const start = Editor.start(editor, cellPath);

        if (Point.equals(selection.anchor, start)) {
          return;
        }
      }
    }

    deleteBackward(unit);
  };

  editor.deleteForward = (unit) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          n.type === "table-cell",
      });

      if (cell) {
        const [, cellPath] = cell;
        const end = Editor.end(editor, cellPath);

        if (Point.equals(selection.anchor, end)) {
          return;
        }
      }
    }

    deleteForward(unit);
  };

  editor.insertBreak = () => {
    const { selection } = editor;

    if (selection) {
      const [table] = Editor.nodes(editor, {
        match: (n: any) => {
          return (
            !Editor.isEditor(n) && Element.isElement(n) && n.type === "table"
          );
        },
      });
      const [subTitle] = Editor.nodes(editor, {
        match: (n: any) => {
          return (
            !Editor.isEditor(n) &&
            Element.isElement(n) &&
            ["heading-one", "heading-two"].includes(n.type)
          );
        },
      });
      if (table) {
        return;
      }
      if (subTitle) {
        const newNode = {
          type: (subTitle[0] as any).type,
          children: [{ text: "" }],
          id: Math.random().toString(),
        };
        insertNode(newNode);
        return;
      }
    }

    insertBreak();
  };
  return editor;
};
