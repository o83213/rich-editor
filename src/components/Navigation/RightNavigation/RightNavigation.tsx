import { css, cx } from "@emotion/css";

type ButtonProps = {
  text: string;
};
const Button = (props: ButtonProps) => {
  return (
    <button
      className={css`
        display: inline-block;
        text-align: center;
        vertical-align: center;
        cursor: pointer;
        line-height: 1.3;
        white-space: nowrap;
        height: 36px;
        font-size: 14px;
        border: 1px solid transparent;
        border-radius: 8px;
        font-weight: 500 !important;
      `}
    >
      {props.text}
    </button>
  );
};

const RightNavigation = () => {
  return (
    <div
      className={css`
        position: relative;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: end;
        justify-content: flex-end;
        margin-right: 15px;
        float: right;
        width: auto;
        gap: 15px;
      `}
    >
      <button
        className={css`
          display: inline-block;
          text-align: center;
          vertical-align: center;
          cursor: pointer;
          line-height: 1.3;
          white-space: nowrap;
          height: 36px;
          font-size: 14px;
          border: 1px solid transparent;
          border-radius: 8px;
          font-weight: 500 !important;
          background: rgb(255, 72, 90);
          color: rgb(255, 255, 255);
        `}
      >
        準備發佈
      </button>
      <button
        className={css`
          display: inline-block;
          text-align: center;
          vertical-align: center;
          cursor: pointer;
          line-height: 1.3;
          white-space: nowrap;
          height: 36px;
          font-size: 14px;
          border: 1px solid rgb(83, 81, 80);
          border-radius: 8px;
          font-weight: 500 !important;
          background: transparent;
          color: rgb(20, 20, 19);
        `}
      >
        儲存草稿
      </button>
      <div>...</div>
      <span
        className={cx(
          "material-icons",
          css`
            font-size: 30px;
            vertical-align: text-bottom;
            cursor: pointer;
          `
        )}
      >
        account_circle
      </span>
    </div>
  );
};
export default RightNavigation;
