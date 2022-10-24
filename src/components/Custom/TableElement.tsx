import {
  useSlateStatic,
  ReactEditor,
  useSelected,
  useFocused,
} from "slate-react";
import { css } from "@emotion/css";
import { Transforms } from "slate";
import { Button, Icon } from "../BaseComponents";
const TableElement = (props: any) => {
  const { attributes, children, element } = props;
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();
  const path = ReactEditor.findPath(editor, element);
  return (
    <div
      className={css`
        position: relative;
      `}
    >
      <Button
        active
        onClick={() => Transforms.removeNodes(editor, { at: path })}
        className={css`
          display: ${selected && focused ? "inline" : "none"};
          position: absolute;
          top: 0.5em;
          left: 0.5em;
          background-color: white;
        `}
      >
        <Icon>delete</Icon>
      </Button>
      <table
        className={css`
          border-collapse: collapse;
          tr td {
            padding: 10px;
            border: 2px solid #ddd;
          }
        `}
        id={element.id}
      >
        <tbody {...attributes}>{children}</tbody>
      </table>
    </div>
  );
};
export default TableElement;
