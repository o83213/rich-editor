import { cx, css } from "@emotion/css";
import MarkButton from "../Button/MarkButton";
import BlockButton from "../Button/BlockButton";
const Toolbar1 = () => {
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
      <BlockButton format="sub-title" icon="format_size" />
      <BlockButton format="quote" icon="format_quote" />
      <BlockButton format="code" icon="code" />
      <div
        className={css`
          width: 85%;
          border-top: 1px solid rgb(242, 241, 240);
          margin: 6px 0px;
        `}
      ></div>
      <BlockButton format="center" icon="format_align_center" />
      <BlockButton format="numbered-list" icon="format_list_numbered" />
      <BlockButton format="bulleted-list" icon="format_list_bulleted" />
      <div
        className={css`
          width: 85%;
          border-top: 1px solid rgb(242, 241, 240);
          margin: 6px 0px;
        `}
      ></div>
      <BlockButton format="light_mode" icon="light_mode" />
    </div>
  );
};
export default Toolbar1;
