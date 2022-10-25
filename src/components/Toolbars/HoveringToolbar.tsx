import React, { useRef, useEffect } from "react";
import { Range, Editor } from "slate";
import { useSlate, useFocused } from "slate-react";
import { Menu } from "../BaseComponents";
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
    console.log("Hovering");
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
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
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
      <MarkButton format="bold" icon="format_bold" />
      <MarkButton format="italic" icon="format_italic" />
      <MarkButton format="delete" icon="format_strikethrough" />
      <MarkButton format="underline" icon="format_underlined" />
      <div
        className={css`
          height: 85%;
          border-left: 1px solid rgb(242, 241, 240);
        `}
      ></div>
      <BlockButton format="symbol" icon="data_array" />
      <BlockButton format="link" icon="link" />
    </Menu>
  );
};

export default HoveringToolbar;
