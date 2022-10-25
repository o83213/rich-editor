import { css } from "@emotion/css";
const Title = () => {
  return (
    <textarea
      placeholder="請輸入標題"
      className={css`
        height: 59px;
        position: relative;
        width: 100%;
        max-width: 740px;
        margin: 40px auto 50px;
        color: rgb(20, 20, 19);
        font-size: 42px;
        line-height: 1.3em;
        font-weight: bold;
        border: none;
        outline: none;
        resize: none;
        overflow: hidden;
        background: transparent;
        display: block;
      `}
    ></textarea>
  );
};
export default Title;
