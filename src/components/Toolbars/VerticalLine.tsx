import { css } from "@emotion/css";
const VerticalLine = () => {
  return (
    <span
      className={css`
        height: 90%;
        margin-left: 20px;
        border-left: 1.5px solid #ccc;
      `}
    ></span>
  );
};

export default VerticalLine;
