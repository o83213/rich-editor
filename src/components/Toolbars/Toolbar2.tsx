import React, { useState } from "react";
import { css, cx } from "@emotion/css";
import BlockButton from "../Button/BlockButton";
import VerticalLine from "./VerticalLine";
const Toolbar2 = (props: {
  setIsUnsplash: any;
  isUnsplash: boolean;
  selectUnsplashImage: string;
}) => {
  const { setIsUnsplash, isUnsplash, selectUnsplashImage } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={css`
        position: fixed;
        left: calc(((100vw - 740px) / 2) - 100px + 38px + 18px);
        top: 279px;
        transition: top 0.1s ease-in-out 0s;
        border-radius: 6px;
        height: 38px;
        display: flex;
        z-index: 1;
      `}
    >
      <div
        className={css`
          width: 38px;
          height: 100%;
          border-radius: 6px;
          background: rgb(246, 246, 246);
          color: rgb(162, 156, 155);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        `}
        onClick={() => {
          setIsActive((prev) => !prev);
        }}
      >
        <span
          className={cx(
            "material-icons",
            css`
              font-size: 28px;
            `
          )}
        >
          add
        </span>
      </div>
      {isActive && (
        <div
          className={css`
            border: 1px solid rgb(221, 217, 216);
            background: rgb(255, 255, 255);
            box-shadow: rgb(0 0 0 / 8%) 0px 2px 6px 0px;
            border-radius: 4px;
            transition: opacity 0.75s;
            /* color: rgb(162, 156, 155); */
            height: 38px;
            display: flex;
            align-items: center;
            gap: 12px;
          `}
        >
          <VerticalLine />
          <BlockButton format="image" icon="image" description="上傳圖片" />
          <BlockButton
            format="unsplash"
            icon="image_search"
            description="圖庫"
            setIsUnsplash={setIsUnsplash}
            isUnsplash={isUnsplash}
            selectUnsplashImage={selectUnsplashImage}
          />
          <BlockButton format="video" icon="html" description="嵌入網站" />
          <BlockButton
            format="horizontal"
            icon="horizontal_rule"
            description="分隔線"
          />
        </div>
      )}
    </div>
  );
};
export default Toolbar2;
