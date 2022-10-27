import {
  Text,
  createEditor,
  Node,
  Element,
  Editor,
  Descendant,
  BaseEditor,
} from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type QuoteElement = {
  type: "quote";
  align?: string;
  id?: string;
  children: Descendant[];
};
export type CodeElement = {
  type: "code";
  align?: string;
  id?: string;
  children: Descendant[];
};

export type HorizontalElement = {
  type: "horizontal";
  align?: string;
  id?: string;
  children: Descendant[];
};

export type NumberedListElement = {
  type: "numbered-list";
  align?: string;
  id?: string;
  children: Descendant[];
};
export type BulletedListElement = {
  type: "bulleted-list";
  align?: string;
  id?: string;
  children: Descendant[];
};

export type HeadingElement = {
  type: "heading-one";
  align?: string;
  id?: string;
  children: Descendant[];
};

export type HeadingTwoElement = {
  type: "heading-two";
  align?: string;
  id?: string;
  children: Descendant[];
};
export type ListItemElement = {
  type: "list-item";
  id?: string;
  children: Descendant[];
};

export type ImageElement = {
  type: "image";
  url: string;
  id?: string;
  children: EmptyText[];
};
export type VideoElement = {
  type: "video";
  url: string;
  id?: string;
  children: EmptyText[];
};
export type LinkElement = {
  type: "link";
  url: string;
  id?: string;
  children: Descendant[];
};
export type EmbedElement = {
  type: "embed";
  url: string;
  id?: string;
  children: Descendant[];
};
export type AnchorElement = {
  type: "anchor";
  id: string;
  id?: string;
  children: Descendant[];
};
export type ParagraphElement = {
  type: "paragraph";
  align?: string;
  id?: string;
  children: Descendant[];
};

export type TableElement = { type: "table"; id?: string; children: TableRow[] };

export type TableRowElement = {
  type: "table-row";
  id?: string;
  children: TableCell[];
};

export type TableCellElement = {
  type: "table-cell";
  id?: string;
  children: CustomText[];
};

export type TitleElement = {
  type: "title";
  id?: string;
  children: Descendant[];
};

type CustomElement =
  | QuoteElement
  | CodeElement
  | BulletedListElement
  | NumberedListElement
  | ListItemElement
  | HeadingElement
  | HeadingTwoElement
  | ImageElement
  | LinkElement
  | VideoElement
  | ParagraphElement
  | TableElement
  | TableRowElement
  | TableCellElement
  | TitleElement
  | EmbedElement
  | HorizontalElement
  | AnchorElement;

export interface CustomText {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  delete?: boolean;
  color?: string;
  text: string;
}

export interface EmptyText {
  text: string;
}

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText & EmptyText;
  }
}

declare module "*.png";
