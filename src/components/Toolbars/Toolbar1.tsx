import { cx, css } from "@emotion/css";
import MarkButton from "../Button/MarkButton";
import BlockButton from "../Button/BlockButton";
import { Button, Icon } from "../BaseComponents";
interface ToolbarProps {
  callback?: Function[];
}
const Toolbar1 = (props: ToolbarProps) => {
  const { callback } = props;
  return (
    <div
      className={css`
        top: 279px;
        transform: translateX(calc(((100vw - 740px) / 2) - 100px));
        border: 1px solid rgb(221, 217, 216);
        background: rgb(255, 255, 255);
        box-shadow: rgb(0 0 0 / 8%) 0px 2px 6px 0px;
        border-radius: 6px;
        z-index: 10;
        position: fixed;
        width: 40px;
        height: 241px;
        padding: 13px 0px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        -webkit-box-align: center;
        align-items: center;
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
      <div
        className={css`
          width: 85%;
          border-top: 1px solid rgb(242, 241, 240);
          margin: 6px 0px;
        `}
      ></div>
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
      <div
        className={css`
          width: 85%;
          border-top: 1px solid rgb(242, 241, 240);
          margin: 6px 0px;
        `}
      ></div>
      <BlockButton format="light_mode" icon="light_mode" description="關燈" />
    </div>
  );
};
export default Toolbar1;
