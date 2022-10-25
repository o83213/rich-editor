import { cx, css } from "@emotion/css";
const iconUrl = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjkiIGhlaWdodD0iMjQiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJNMCAwaDI5djI0SDB6Ii8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PG1hc2sgaWQ9ImIiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2EiLz48L21hc2s+PHBhdGggZmlsbD0iI0ZGNDg1QSIgZD0iTTI1IDIwLjIyN2gtNi4xMTRhMS40OCAxLjQ4IDAgMDEtMS40ODQtMS40NjZ2LTQuMTg5aDYuMTEzYy44MTcgMCAxLjQ4NS42NiAxLjQ4NSAxLjQ2N3Y0LjE4OHptLTguOTkzLTYuOTI2SDYuMTljLTEuMzEyIDAtMi4zODUtMS4xMjItMi4zODUtMi40OTRWMy42ODVoOS44MThjMS4zMSAwIDIuMzg0IDEuMTIyIDIuMzg0IDIuNDk0djcuMTIyek0yMy4wNDcgMEgwdjE4LjA3NEMwIDIxLjMzNCAyLjY3OCAyNCA1Ljk1MiAyNEgyOVY1LjkyNkMyOSAyLjY2NyAyNi4zMjIgMCAyMy4wNDggMHoiIG1hc2s9InVybCgjYikiLz48L2c+PC9zdmc+`;
const LeftNavigation = () => {
  return (
    <div
      className={css`
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: start;
        justify-content: flex-start;
        margin-left: 14px;
        cursor: default;
      `}
    >
      <div
        className={cx(
          "material-icons",
          css`
            position: relative;
            width: 30px;
            height: 24px;
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            background-image: url(${iconUrl});
            background-size: contain;
            background-position: center center;
            background-repeat: no-repeat;
            filter: grayscale(100%);
            cursor: pointer;
            margin-right: 15px;
          `
        )}
      ></div>
      <div
        className={css`
          width: 1px;
          height: 30px;
          background: rgb(242, 241, 240);
        `}
      ></div>
      <div
        className={css`
          width: 46px;
          height: 22px;
          border-radius: 2px;
          padding: 5px 10px;
          display: flex;
          -webkit-box-pack: center;
          justify-content: center;
          -webkit-box-align: center;
          align-items: center;
          white-space: nowrap;
          font-size: 14px;
          background: rgb(246, 246, 246);
          color: rgb(122, 117, 116);
          margin-left: 15px;
        `}
      >
        草稿
      </div>
      <span
        className={css`
          font-size: 14px;
          line-height: 16px;
          width: auto;
          min-width: 50px;
          margin-left: 15px;
          color: rgb(162, 156, 155);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          word-break: break-all;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        `}
      >
        請放心，內容已自動儲存
      </span>
    </div>
  );
};
export default LeftNavigation;
