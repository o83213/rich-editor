import { css, cx } from "@emotion/css";
import MarkButton from "../Button/MarkButton";
import BlockButton from "../Button/BlockButton";
const Toolbar3 = () => {
  return (
    <div
      className={css`
        position: absolute;
        left: 200px;
        top: 200px;
        transition: top 0.1s ease-in-out 0s;
        border: 0.1rem solid red;
        border-radius: 6px;
        height: 38px;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        background: rgb(246, 246, 246);
        color: rgb(162, 156, 155);
        z-index: 1;
      `}
    >
      <div
        className={css`
          background: rgb(255, 255, 255);
          color: rgb(162, 156, 155);
          height: 38px;
          display: flex;
          align-items: center;
          gap: 12px;
        `}
      >
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="delete" icon="format_strikethrough" />
        <MarkButton format="underline" icon="format_underlined" />
        <div
          className={css`
            height: 85%;
            border-left: 1px solid rgb(242, 241, 240);
          `}
        ></div>
        <BlockButton format="symbol" icon="data_array" />
        <BlockButton format="link" icon="link" />
      </div>
    </div>
  );
};
export default Toolbar3;
