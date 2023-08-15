import { cx, css } from "@emotion/css";
import MarkButton from "../Button/MarkButton";
import BlockButton from "../Button/BlockButton";
import HorizontalLine from "./HorizontalLine";
import StateButton from "../Button/ColorButton";
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
        height: 250px;
        padding: 13px 0px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 6px;
        -webkit-box-align: center;
        align-items: center;
        .tag {
          transform: translate(20%, -100%);
        }
      `}
    >
      <MarkButton format="bold" icon="format_bold" description="粗體" />
      <MarkButton format="italic" icon="format_italic" description="斜體" />
      <MarkButton
        format="delete"
        icon="format_strikethrough"
        description="刪除線"
      />
      <MarkButton
        format="underline"
        icon="format_underlined"
        description="底線"
      />
      <StateButton
        format="color"
        icon="format_color_text"
        defaultState="black"
      />
      <HorizontalLine />
      <BlockButton format="link" icon="link" description="加入連結" />
      <BlockButton format="link" icon="link_off" description="移除連結" />
    </div>
  );
};
export default Toolbar1;
