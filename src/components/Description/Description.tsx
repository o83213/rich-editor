import { css, cx } from "@emotion/css";
const Description = ({ description }: { description: string }) => {
  return (
    <div
      className={cx(
        "tag",
        css`
          display: none;
          position: absolute;
          top: 50%;
          left: 50%;
          padding: 6px;
          white-space: nowrap;
          font-size: 20px;
          background-color: #000;
          border-radius: 9px;
          transform: translate(-50%, -50px);
          color: #fff;
          text-align: center;
        `
      )}
    >
      {description}
    </div>
  );
};

export default Description;
