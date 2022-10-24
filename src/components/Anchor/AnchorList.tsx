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
        position: fixed;
        display: flex;
        flex-direction: column;
        gap: 20px;
        top: 0;
        left: 0;
        border: 0.1rem solid black;
        width: 10rem;
        padding: 1rem; ;
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
