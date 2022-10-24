import { css } from "@emotion/css";
type Props = {
  name: string;
  targetId: string;
};

const AnchorItem = ({ targetId, name }: Props) => {
  return (
    <a
      href={`#${targetId}`}
      className={css`
        border-radius: 9px;
        transition: all 0.3s;
        padding: 5px;
        text-decoration: none;
        color: #000;
        font-size: 16px;
        font-weight: bold;
        &:hover {
          background-color: #22b8cf;
          color: #fff;
        }
      `}
    >
      <div>{name}</div>
    </a>
  );
};
export default AnchorItem;
