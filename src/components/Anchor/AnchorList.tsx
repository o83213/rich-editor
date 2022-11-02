import React, { useState } from "react";
import AnchorItem from "./AnchorItem";
import { cx, css } from "@emotion/css";
import { Button, Icon } from "../BaseComponents";
type Props = {
  children?: React.ReactNode;
  listData: { name: string; id: string; type: string; order: number }[];
};
const AnchorList = ({ listData }: Props) => {
  const [showAnchorList, setShowAnchorList] = useState(false);
  return (
    <div
      className={css`
        position: absolute;
        display: flex;
        flex-direction: column;
        left: 0px;
        top: 100px;
        width: 186px;
        border-radius: 0px 20px 20px 0px;
        transition: all 0.3s;
        cursor: default;
        opacity: 1;
        gap: 10px;
      `}
    >
      <div
        className={css`
          position: relative;
        `}
      >
        <ul
          className={css`
            opacity: ${showAnchorList ? 1 : 0};
            pointer-events: ${showAnchorList ? "auto" : "none"};
            visibility: ${showAnchorList ? "visible" : "hidden"};
            padding-inline-start: 0px;
            max-height: 200px;
            width: 160px;
            overflow-y: scroll;

            ::-webkit-scrollbar {
              width: 5px;
              height: 0px;
            }
            ::-webkit-scrollbar-track {
              background: #f1f1f1;
            }
            ::-webkit-scrollbar-thumb {
              background: rgba(0, 0, 0, 0.1);
            }
          `}
        >
          {listData
            .sort((a, b) => {
              return a.order - b.order;
            })
            .map((anchorData) => {
              const { name, id, type, order } = anchorData;
              return (
                <AnchorItem key={id} name={name} targetId={id} type={type} />
              );
            })}
        </ul>

        <Button
          className={css`
            position: absolute;
            top: 0%;
            left: 0;
            transform: translate(0, -150%);
            background-color: rgb(255, 255, 255);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 7px;
            border-radius: 9px;
            border: 1px solid rgba(0, 0, 0, 0.3);
            &:hover {
              background-color: rgb(242, 241, 240);
            }
          `}
          onMouseDown={() => {
            setShowAnchorList((prev) => !prev);
          }}
        >
          <Icon
            className={css`
              font-size: 20px;
            `}
          >
            {showAnchorList ? "arrow_back_ios_new" : "sort"}
          </Icon>
        </Button>
      </div>
    </div>
  );
};
export default AnchorList;
