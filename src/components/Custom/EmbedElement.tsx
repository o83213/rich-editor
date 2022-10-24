import { Button, Icon } from "../BaseComponents";
import { Transforms } from "slate";
import { useSlateStatic, ReactEditor } from "slate-react";
import { css, cx } from "@emotion/css";
import "./instagram.css";
const EmbedElement = (props: any) => {
  const { attributes, children, element } = props;
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);
  const { url } = element;
  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
        className={css`
          position: relative;
        `}
      >
        <Button
          active
          onClick={() => Transforms.removeNodes(editor, { at: path })}
          className={css`
            display: "inline";
            position: absolute;
            top: 0.5em;
            left: 0.5em;
            background-color: white;
          `}
        >
          <Icon>delete</Icon>
        </Button>
        <blockquote
          className={cx("instagram-media", "ig")}
          data-instgrm-captioned
          data-instgrm-permalink={`https://www.instagram.com/${url}/?utm_source=ig_embed&amp;utm_campaign=loading`}
          data-instgrm-version="14"
        ></blockquote>
      </div>
    </div>
  );
};

export default EmbedElement;
