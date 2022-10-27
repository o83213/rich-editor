import React, { useRef, useEffect } from "react";
import { Range, Editor, Transforms, Location, Point } from "slate";
import { useSlate, useFocused } from "slate-react";
import { Menu, Button, Icon } from "../BaseComponents";
import { css, cx } from "@emotion/css";
import MarkButton from "../Button/MarkButton";
import BlockButton from "../Button/BlockButton";
const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement | null>();
  const editor = useSlate();
  const inFocus = useFocused();
  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;
    if (!el) {
      return;
    }
    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection()!;
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - 1.2 * el.offsetHeight}px`;
    el.style.left = `${rect.left + window.pageXOffset + rect.width / 2}px`;
  });

  return (
    <Menu
      ref={ref}
      className={css`
        padding: 8px 7px 6px;
        position: absolute;
        z-index: 1;
        top: -10000px;
        left: -10000px;
        margin-top: -6px;
        opacity: 0;
        border: 1px solid rgb(221, 217, 216);
        background: rgb(255, 255, 255);
        box-shadow: rgb(0 0 0 / 8%) 0px 2px 6px 0px;
        border-radius: 4px;
        transition: opacity 0.75s;
      `}
      onMouseDown={(e: any) => {
        // prevent toolbar from taking focus away from editor
        e.preventDefault();
      }}
    >
      <MarkButton format="bold" icon="format_bold" description="粗體" />
      <MarkButton format="italic" icon="format_italic" description="斜體" />
      <MarkButton
        format="delete"
        icon="format_strikethrough"
        description="刪除線"
      />
      <MarkButton
        format="underline"
        icon="format_underlined"
        description="底線"
      />
      <div
        className={css`
          height: 85%;
          border-left: 1px solid rgb(242, 241, 240);
        `}
      ></div>
      <Button
        onMouseDown={() => {
          const { selection } = editor;
          const { anchor, focus } = selection as any;
          let firstPoint: Point = anchor;
          let secondPoint: Point = focus;

          if (anchor.path[1] > focus.path[1]) {
            firstPoint = focus;
            secondPoint = anchor;
          } else if (anchor.offset > focus.offset) {
            firstPoint = focus;
            secondPoint = anchor;
          }

          Transforms.insertText(editor, "[", {
            at: firstPoint,
          });
          Transforms.insertText(editor, "]", {
            at: { ...secondPoint, offset: secondPoint.offset + 1 },
          });
        }}
      >
        <Icon>{"data_array"}</Icon>
      </Button>
      <BlockButton format="link" icon="link" description="建立連結" />
    </Menu>
  );
};

export default HoveringToolbar;
