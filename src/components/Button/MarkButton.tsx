import { useSlate } from "slate-react";
import { Button, Icon } from "../BaseComponents";
import { isMarkActive } from "../../plugins/helpers/isMarkActive";
import { toggleMark } from "../../plugins/helpers/toggleMark";
import { cx, css } from "@emotion/css";
import Description from "../Description/Description";
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
      <Description description={description} />
      <Icon>{icon}</Icon>
    </Button>
  );
};
export default MarkButton;
