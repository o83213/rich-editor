import React, { Ref, forwardRef, PropsWithChildren } from "react";
import { cx, css } from "@emotion/css";
interface BaseProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}
interface ButtonProps extends BaseProps {
  active?: boolean;
  reversed?: boolean;
  buttonColor?: string;
  onMouseDown?: (event: React.MouseEvent) => void;
}
type OrNull<T> = T | null;
export const Button = ({
  className,
  active,
  reversed,
  buttonColor,
  ...props
}: ButtonProps) => {
  return (
    <span
      {...props}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${buttonColor
            ? buttonColor
            : reversed
            ? active
              ? "white"
              : "#aaa"
            : active
            ? "black"
            : "#ccc"};
        `
      )}
    />
  );
};

export const Icon = ({ className, ...props }: BaseProps) => {
  return (
    <span
      {...props}
      className={cx(
        "material-icons",
        className,
        css`
          font-size: 28px;
          color: rgb(122, 117, 116);
          vertical-align: text-bottom;
        `
      )}
    />
  );
};

export const Menu = React.forwardRef(
  ({ className, ...props }: any, ref: any) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cx(
          className,
          css`
            & > * {
              display: inline-block;
            }

            & > * + * {
              margin-left: 15px;
            }
          `
        )}
      />
    );
  }
);

export const Toolbar = ({ className, ...props }: BaseProps) => {
  return (
    <Menu
      {...props}
      className={cx(
        className,
        css`
          position: relative;
          padding: 8px;
          margin: 0px -20px;
          border-bottom: 2px solid #eee;
        `
      )}
    />
  );
};
