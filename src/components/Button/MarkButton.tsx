import { useSlate } from "slate-react";
import { Button, Icon } from "../BaseComponents";
import { isMarkActive } from "../../plugins/helpers/isMarkActive";
import { toggleMark } from "../../plugins/helpers/toggleMark";
interface ButtonProps {
  format: string;
  icon: string;
}
const MarkButton = ({ format, icon }: ButtonProps) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={() => {
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};
export default MarkButton;
