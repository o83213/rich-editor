import { Descendant } from "slate";
export const defaultValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
/*
[
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  { type: "quote", children: [{ text: "This is a quote" }] },
  {
    type: "table",
    children: [
      {
        type: "table-row",
        children: [
          {
            type: "table-cell",
            children: [{ text: "" }],
          },
          {
            type: "table-cell",
            children: [{ text: "Human", bold: true }],
          },
          {
            type: "table-cell",
            children: [{ text: "Dog", bold: true }],
          },
          {
            type: "table-cell",
            children: [{ text: "Cat", bold: true }],
          },
        ],
      },
      {
        type: "table-row",
        children: [
          {
            type: "table-cell",
            children: [{ text: "# of Feet", bold: true }],
          },
          {
            type: "table-cell",
            children: [{ text: "2" }],
          },
          {
            type: "table-cell",
            children: [{ text: "4" }],
          },
          {
            type: "table-cell",
            children: [{ text: "4" }],
          },
        ],
      },
      {
        type: "table-row",
        children: [
          {
            type: "table-cell",
            children: [{ text: "# of Lives", bold: true }],
          },
          {
            type: "table-cell",
            children: [{ text: "1" }],
          },
          {
            type: "table-cell",
            children: [{ text: "1" }],
          },
          {
            type: "table-cell",
            children: [{ text: "9" }],
          },
        ],
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
];
*/
