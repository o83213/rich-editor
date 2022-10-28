import { cx, css } from "@emotion/css";
interface ButtonProps {
  text: string;
  className?: string;
  onMouseDown?: (event: React.MouseEvent) => void;
}
const Button = ({ text, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cx(
        css`
          display: inline-block;
          text-align: center;
          vertical-align: center;
          cursor: pointer;
          line-height: 1.3;
          white-space: nowrap;
          height: 36px;
          font-size: 14px;
          border: 1px solid transparent;
          border-radius: 8px;
          font-weight: 500 !important;
          background: rgb(255, 72, 90);
          color: rgb(255, 255, 255);
        `,
        className
      )}
    >
      {text}
    </button>
  );
};
export default Button;
