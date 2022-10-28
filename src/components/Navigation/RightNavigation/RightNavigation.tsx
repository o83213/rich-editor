import { css, cx } from "@emotion/css";
import Button from "./Button";

const saveDraftScript = (contnet: string) => {
  console.log(contnet);
  console.log("draft save!");
};
const publishHandler = (contnet: string) => {
  console.log(contnet);
  console.log("article publish!");
};

const RightNavigation = () => {
  const onStoreDraft = (callback: (content: string) => void) => {
    const content = localStorage.getItem("content");
    if (content) {
      callback(content);
    }
  };

  const onPublish = (callback: (content: string) => void) => {
    const content = localStorage.getItem("content");
    if (content) {
      callback(content);
    }
  };

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
      <Button
        text="準備發佈"
        onMouseDown={() => {
          onPublish(publishHandler);
        }}
      />
      <Button
        text="儲存草稿"
        className={css`
          background: transparent;
          color: rgb(20, 20, 19);
          border: 1px solid rgb(83, 81, 80);
        `}
        onMouseDown={() => {
          onStoreDraft(saveDraftScript);
        }}
      />
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
