import { css } from "@emotion/css";
type Props = {
  name: string;
  targetId: string;
  type: string;
};

const scrollToItem = (targetId: string) => {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const rect = targetElement.getBoundingClientRect();
    window.scrollTo({
      behavior: "smooth",
      top: rect.top + window.scrollY - 100,
      left: 0,
    });
  }
};

const AnchorItem = ({ targetId, name, type }: Props) => {
  return (
    <li
      // href={`#${targetId}`}
      className={css`
        border-radius: 9px;
        transition: all 0.3s;
        list-style: none;
        padding: 5px;
        padding-left: ${type === "heading-one" ? "5px" : "15px  "};
        text-decoration: none;
        font-size: 20px;
        line-height: 24px;
        font-weight: bold;
        cursor: pointer;
        color: ${type === "heading-one" ? "#000" : "rgb(83, 81, 80)"};
      `}
      onClick={() => {
        scrollToItem(targetId);
      }}
    >
      <div
        className={css`
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        `}
      >
        {name}
      </div>
    </li>
  );
};
export default AnchorItem;
