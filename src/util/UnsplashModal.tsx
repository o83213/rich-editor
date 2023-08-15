import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import { Icon } from "../components/BaseComponents";

interface UnsplashModalType {
  unsplashData: any;
  setIsUnsplash: (unsplashData: any) => void;
  isUnsplash: boolean;
  pageNum: number;
  setPageNum: (pageNum: number) => void;
  setUnsplashSearchValue: (unsplashSearchValue: string) => void;
  setSelectUnsplashImage: (
    newUnsplashImage: { id: string; imageUrl: string }[]
  ) => void;
  selectUnsplashImage: { id: string; imageUrl: string }[];
}

const UnsplashModal = (props: UnsplashModalType) => {
  const {
    unsplashData,
    setIsUnsplash,
    isUnsplash,
    pageNum,
    setPageNum,
    setUnsplashSearchValue,
    setSelectUnsplashImage,
    selectUnsplashImage,
  } = props;
  const unsplashArr = unsplashData?.results;
  const [unsplashPos, setUnsplashPos] = useState<number>(0);
  console.log("unsplashArr", unsplashArr);
  useEffect(() => {
    setUnsplashPos(window.scrollY);
  }, [window.scrollY]);

  const handleNextPage = () => {
    if (pageNum === unsplashData.total_pages) {
      setPageNum(1);
    } else {
      setPageNum(pageNum + 1);
    }
  };
  const handlePrevPage = () => {
    if (pageNum === 1) {
      setPageNum(unsplashData.total_pages);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  return (
    <div
      className={css`
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 54%;
        left: 50%;
        transform: translate(-50%, ${unsplashPos}px);
        pointer-events: auto;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 20px;
        outline: 0;
        z-index: 2;
        box-shadow: 8px 8px 2px 1px rgba(86, 86, 86, 0.2);
      `}
    >
      <div
        className={css`
          position: relative;
          flex: 1 1 auto;
          min-height: 150px;
          overflow-y: auto;
          scroll-behavior: smooth;
          background-color: rgb(255, 255, 255);
          padding: 24px 60px;
          border-radius: 20px;
        `}
      >
        <div
          className={css`
            padding: 10px 18px;
            overflow-y: hidden;
          `}
        >
          <h2
            className={css`
              font-size: 18px;
              color: rgb(20, 20, 19);
              display: flex;
              -webkit-box-align: center;
              align-items: center;
              -webkit-box-pack: justify;
              justify-content: space-between;
              gap: 40px;
            `}
          >
            搜尋免費圖庫
            <button
              onClick={() => {
                setIsUnsplash?.(!isUnsplash);
              }}
              className={css`
                display: flex;
                -webkit-box-pack: center;
                justify-content: center;
                -webkit-box-align: center;
                align-items: center;
                font-weight: 600;
                text-align: center;
                vertical-align: middle;
                cursor: pointer;
                user-select: none;
                outline: 0px;
                word-break: keep-all;
                line-break: anywhere;
                transition: color 0.15s ease-in-out 0s,
                  background-color 0.15s ease-in-out 0s,
                  border-color 0.15s ease-in-out 0s,
                  box-shadow 0.15s ease-in-out 0s;
                width: 36px;
                height: 36px;
                border: 1px solid transparent;
                border-radius: 8px;
                padding: 12px 10px;
                background: transparent;
                font-size: 18px;
                color: rgb(20, 20, 19);
              `}
            >
              X
            </button>
          </h2>
        </div>
        <div
          className={css`
            margin: 24px 0px;
            display: flex;
            padding: 0px 0px 4px;
            border-bottom: 1px solid rgb(242, 241, 240);
          `}
        >
          <button
            className={css`
              border-top: none;
              border-right: none;
              border-left: none;
              border-image: initial;
              margin-right: 20px;
              color: rgb(122, 117, 116);
              font-size: 14px;
              background: none;
              padding: 0px 0px 4px;
              border-bottom: 4px solid rgb(255, 72, 90);
              margin-bottom: -4px;
              cursor: pointer;
              :before {
                display: inline-block;
                content: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcuNSA2Ljc1VjBoOXY2Ljc1aC05em05IDMuNzVIMjRWMjRIMFYxMC41aDcuNXY2Ljc1aDlWMTAuNXoiLz48L3N2Zz4=);
                height: 16px;
                width: 16px;
                margin-right: 6px;
                transform: translateY(2px);
              }
            `}
          >
            Unsplash
          </button>
        </div>
        {/* 搜尋bar */}
        <div
          className={css`
            position: relative;
          `}
        >
          <input
            type="text"
            placeholder="建議以英文搜尋效果最佳"
            className={css`
              width: 100%;
              height: 34px;
              outline: none;
              border-radius: 3px;
              border: 1px solid rgb(162, 156, 155);
              overflow: visible;
            `}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setUnsplashSearchValue(e.currentTarget.value);
              }
            }}
          />
        </div>
        <div
          className={css`
            margin-top: 12px;
            display: flex;
            -webkit-box-pack: justify;
            justify-content: space-between;
            -webkit-box-align: center;
            align-items: center;
          `}
        >
          <span
            className={css`
              font-size: 16px;
              color: rgb(180, 180, 180);
            `}
          >
            總共搜尋到 {unsplashData.total} 張
          </span>
          <div
            className={css`
              display: flex;
            `}
          >
            <Icon
              className={css`
                cursor: pointer;
              `}
              onClick={() => {
                handlePrevPage();
              }}
            >
              chevron_left
            </Icon>
            <Icon
              className={css`
                cursor: pointer;
              `}
              onClick={() => {
                handleNextPage();
              }}
            >
              chevron_right
            </Icon>
          </div>
        </div>
        {/* 主要圖片位置 */}
        <div
          className={css`
            margin-top: 12px;
            overflow-y: auto;
            height: 60vh;
            width: 100%;
          `}
        >
          <div
            className={css`
              width: 100%;
              column-count: 4;
              column-gap: 1px;
              column-fill: auto;
              transition: height 480ms ease-out 0s;
            `}
          >
            {unsplashArr?.map((item: any) => {
              console.log("item", item);
              return (
                <>
                  <div
                    key={item.id}
                    className={css`
                      width: 140px;
                      /* padding: 5px 0; */
                      word-wrap: break-word;
                      -webkit-column-break-inside: avoid;
                      opacity: 1;
                      transition: opacity 480ms
                          cubic-bezier(0.165, 0.84, 0.44, 1) 0s,
                        transform 480ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s;
                      cursor: pointer;
                    `}
                  >
                    <img
                      src={item.urls.regular}
                      alt=""
                      className={css`
                        max-width: 100%;
                        min-height: 100%;
                        object-fit: cover;
                        opacity: 1;
                        &:hover {
                          opacity: 0.8;
                        }
                      `}
                      onClick={(e) => {
                        console.log("unsplashData in modal", unsplashData);
                        console.log("e.currentTarget.src", e.currentTarget.src);
                        setIsUnsplash?.(false);
                        console.log("selectUnsplashImage", selectUnsplashImage);
                        if (
                          selectUnsplashImage.findIndex(
                            (item: any) => item === e.currentTarget.src
                          ) === -1
                        ) {
                          const newSelectUnsplashImage = [
                            ...selectUnsplashImage,
                            e.currentTarget.src,
                          ];
                          // setSelectUnsplashImage([...selectUnsplashImage]);
                        }
                      }}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <hr />
        <span>
          Unsplash線上免費圖庫，專門提供「無著作權（CC0）」的高解析度圖片，使用者可任意運用在任何地方，無須付費，個人專案或商業使用皆可自由選擇
          Unsplash
          所提供的免費圖片。使用時，方格子將會預設標註原作者名稱與出處。
        </span>
      </div>
    </div>
  );
};

export default UnsplashModal;
