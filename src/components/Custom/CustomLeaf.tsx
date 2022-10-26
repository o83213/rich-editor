import { css } from "@emotion/css";
import { Text as SlateText } from "slate";
interface LeafProps {
  attributes: any;
  children: React.ReactNode;
  leaf: SlateText;
}
const CustomLeaf = ({ attributes, children, leaf }: LeafProps) => {
  if (leaf.color) {
    children = <span style={{ color: leaf.color }}>{children}</span>;
  }
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  // if (leaf.code) {
  //   children = (
  //     <code
  //       className={css`
  //         background-color: #eee;
  //         padding: 3px;
  //       `}
  //     >
  //       {children}
  //     </code>
  //   );
  // }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.delete) {
    children = <del>{children}</del>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return <span {...attributes}>{children}</span>;
};
export default CustomLeaf;
