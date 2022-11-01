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
          display: block;
          cursor: pointer;
          color: ${buttonColor
            ? buttonColor
            : reversed
            ? active
              ? "rgb(255, 72, 90)"
              : "#000"
            : active
            ? "rgb(255, 72, 90)"
            : "#000"};
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
        css`
          font-size: 28px;
          vertical-align: text-bottom;
        `,
        className
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
