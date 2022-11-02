import { useSlate } from "slate-react";
import { css, cx } from "@emotion/css";

import { Button, Icon } from "../BaseComponents";
import { isBlockActive } from "../../plugins/helpers/isBlockActive";
import { toggleBlock } from "../../plugins/helpers/toggleBlock";
import { unwrapLink } from "../../plugins/helpers/unwrapLink";
import { isUrl } from "../../util/isUrl";
import Description from "../Description/Description";

const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

interface ButtonProps {
  format: string;
  icon: string;
  callback?: Function[];
  className?: string;
  description: string;
}

const BlockButton = ({
  format,
  icon,
  callback,
  description,
  className,
}: ButtonProps) => {
  const editor = useSlate();

  return (
    <Button
      className={css`
        position: relative;
        &:hover {
          .tag {
            display: block;
          }
        }
      `}
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={(event: React.MouseEvent) => {
        event.preventDefault();

        if (icon === "link_off") {
          if (isBlockActive(editor, "link")) {
            return unwrapLink(editor);
          }
        }

        if (format === "link") {
          const url = window.prompt("Enter the URL of the link:");
          if (!url || !isUrl(url)) {
            alert("Not a valid input!");
            return;
          }
          return toggleBlock(editor, format, url);
        }

        if (format === "video") {
          const url = window.prompt("Enter the URL of the image:");
          if (!url) {
            alert("Not a valid input!");
            return;
          }
          return toggleBlock(editor, format, url);
        }

        if (format === "sub-title") {
          return toggleBlock(editor, format, "", callback);
        }

        if (format === "embed") {
          const url = window.prompt("Enter the URL of the Instagram post:");
          if (!url) {
            alert("Not a valid input!");
            return;
          }
          return toggleBlock(editor, format, url);
        }
        toggleBlock(editor, format);
      }}
    >
      <Description description={description} />
      <Icon className={className}>{icon}</Icon>
    </Button>
  );
};
export default BlockButton;
