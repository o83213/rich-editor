import { Editor, Transforms, Element, Text } from "slate";
export const insertTable = (
  editor: Editor,
  row: number = 2,
  column: number = 3
) => {
  const table: Element = { type: "table", children: [] };
  for (let r = 0; r < row; r++) {
    const tableRow: Element = {
      type: "table-row",
      children: [],
    };
    for (let c = 0; c < column; c++) {
      const tableCell: Element = { type: "table-cell", children: [] };
      const text: Text = { text: "" };
      if (c !== 0 && r === 0) {
        text.text = `Column-${c}`;
      } else if (c === 0 && r !== 0) {
        text.text = `Row-${r}`;
      }
      tableCell.children.push(text);
      tableRow.children.push(tableCell);
    }
    table.children.push(tableRow);
  }
  Transforms.insertNodes(editor, table);
};
