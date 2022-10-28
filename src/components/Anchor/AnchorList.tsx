import React, { useMemo, useState } from "react";
import AnchorItem from "./AnchorItem";
type Props = {
  children?: React.ReactNode;
  listData: { name: string; id: string }[];
};
import { css } from "@emotion/css";
const AnchorList = ({ listData }: Props) => {
  return (
    <div
      className={css`
        position: absolute;
        top: 40px;
        width: 186px;
        background: rgb(255, 255, 255);
        transition: left 0.3s linear 0s;
        cursor: default;
        border-radius: 0px 20px 20px 0px;
        left: 0px;
        opacity: 1;
        visibility: visible;
      `}
    >
      Anchor Lists:
      {listData.map((anchorData) => {
        const { name, id } = anchorData;
        console.log("name", name);
        console.log("id", id);
        return <AnchorItem key={id} name={name} targetId={id} />;
      })}
    </div>
  );
};
export default AnchorList;
