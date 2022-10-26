import { useSlate } from "slate-react";
import { Button, Icon } from "../BaseComponents";
import { isMarkActive } from "../../plugins/helpers/isMarkActive";
import { toggleMark } from "../../plugins/helpers/toggleMark";
import { cx, css } from "@emotion/css";
interface ButtonProps {
  format: string;
  icon: string;
  description: string;
}
const MarkButton = ({ format, icon, description }: ButtonProps) => {
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
      active={isMarkActive(editor, format)}
      onMouseDown={() => {
        toggleMark(editor, format);
      }}
    >
      <div
        className={cx(
          "tag",
          css`
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            /* width: 80px; */
            padding: 6px;
            white-space: nowrap;
            font-size: 20px;
            background-color: #000;
            border-radius: 9px;
            transform: translate(-50%, -50px);
            color: #fff;
            text-align: center;
          `
        )}
      >
        {description}
      </div>
      <Icon>{icon}</Icon>
    </Button>
  );
};
export default MarkButton;
