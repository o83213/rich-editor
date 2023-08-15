import { cx, css } from "@emotion/css";
import MarkButton from "../Button/MarkButton";
import BlockButton from "../Button/BlockButton";
import HorizontalLine from "./HorizontalLine";
interface ToolbarProps {
  callback?: Function[];
}

const Toolbar2 = (props: ToolbarProps) => {
  const { callback } = props;
  return (
    <div
      className={css`
        top: 279px;
        transform: translateX(calc(((100vw - 740px) / 2) - 150px));
        border: 1px solid rgb(221, 217, 216);
        background: rgb(255, 255, 255);
        box-shadow: rgb(0 0 0 / 8%) 0px 2px 6px 0px;
        border-radius: 6px;
        z-index: 10;
        position: fixed;
        width: 40px;
        height: 250px;
        padding: 13px 0px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 6px;
        -webkit-box-align: center;
        align-items: center;
        .tag {
          transform: translate(-120%, -100%);
        }
      `}
    >
      <BlockButton
        className={css`
          transform: scaleX(-1);
        `}
        format="sub-title"
        icon="format_size"
        description="副標題"
        callback={callback}
      />
      <BlockButton format="quote" icon="format_quote" description="引言" />
      <BlockButton format="code" icon="code" description="程式碼" />
      <HorizontalLine />
      <BlockButton
        format="center"
        icon="format_align_center"
        description="邊更對齊"
      />
      <BlockButton
        format="numbered-list"
        icon="format_list_numbered"
        description="項目符號"
      />
      <BlockButton
        format="bulleted-list"
        icon="format_list_bulleted"
        description="數字項目符號"
      />
    </div>
  );
};
export default Toolbar2;
