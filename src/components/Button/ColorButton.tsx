import React, { useState, useEffect } from "react";
import { useSlate } from "slate-react";
import { css } from "@emotion/css";
import { Button, Icon } from "../BaseComponents";
import { toggleMark } from "../../plugins/helpers/toggleMark";
import ColorPalte from "./ColorPlate";

const StateButton = (props: any) => {
  const { format, icon, defaultState } = props;
  const [color, setColor] = useState<string>();
  const [isChange, setIsChange] = useState(false);
  useEffect(() => {
    setColor(defaultState);
  }, [defaultState]);
  const editor = useSlate();
  const changeColorHandler = (newColor: string) => {
    setColor(newColor);
  };
  return (
    <div
      className={css`
        position: relative;
      `}
    >
      <Button
        buttonColor={color}
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, format, color);
        }}
      >
        <Icon>{icon}</Icon>
      </Button>
      <Button
        className={css`
          position: absolute;
          top: 0px;
          right: -5px;
          display: inline-block;
        `}
        onMouseDown={(event) => {
          event.preventDefault();
          setIsChange((prev) => !prev);
        }}
      >
        <Icon
          className={css`
            font-size: 14px;
            vertical-align: top;
          `}
        >
          {"arrow_drop_down"}
        </Icon>
        {isChange && <ColorPalte cb={changeColorHandler} />}
      </Button>
    </div>
  );
};

export default StateButton;
