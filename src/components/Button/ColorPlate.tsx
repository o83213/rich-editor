import React, { useMemo } from "react";
import { css } from "@emotion/css";
interface BlockProps {
  color: string;
  cb: (args: any) => void;
}
const colorArray = [
  "#000",
  "#c92a2a",
  "#9775fa",
  "#364fc7",
  "#4dabf7",
  "#38d9a9",
  "#69db7c",
  "#ffd43b",
  "#ffa94d",
];
const ColorPalte = (props: any) => {
  const ColorBlocksArray = useMemo(() => {
    return colorArray.map((blockColor) => (
      <ColorBlock key={blockColor} color={blockColor} cb={props.cb} />
    ));
  }, []);
  return (
    <div
      className={css`
        position: absolute;
        box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
        top: 0;
        left: 0;
        display: grid;
        z-index: 10;
        grid-template-columns: repeat(3, 1fr);
        overflow: hidden;
        transform: translate(10%, 30%);
      `}
    >
      {ColorBlocksArray}
    </div>
  );
};
const ColorBlock = ({ color, cb }: BlockProps) => {
  return (
    <div
      className={css`
        width: 30px;
        height: 30px;
        background-color: ${color};
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
          box-shadow: inset 0 0 2px 3px #fff;
        }
      `}
      onMouseDown={() => {
        cb(color);
      }}
    ></div>
  );
};
export default ColorPalte;
