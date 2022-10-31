import React, { useMemo, useState } from "react";
import AnchorItem from "./AnchorItem";
type Props = {
  children?: React.ReactNode;
  listData: { name: string; id: string; type: string; order: number }[];
};
import { css } from "@emotion/css";
const AnchorList = ({ listData }: Props) => {
  return (
    <div
      className={css`
        position: absolute;
        top: 40px;
        width: 186px;
        border-radius: 0px 20px 20px 0px;
        background: rgb(255, 255, 255);
        transition: left 0.3s linear 0s;
        cursor: default;
        left: 0px;
        opacity: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      Anchor Lists:
      {listData
        .sort((a, b) => {
          // const { name, id, type, order } = anchorData;
          // console.log("name", name);
          // console.log("id", id);
          // console.log("type", type);
          // console.log("order", order);
          return a.order - b.order;
        })
        .map((anchorData) => {
          const { name, id, type, order } = anchorData;
          return <AnchorItem key={id} name={name} targetId={id} type={type} />;
          // return <div>{name}</div>;
        })}
    </div>
  );
};
export default AnchorList;
