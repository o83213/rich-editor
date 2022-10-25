import { css } from "@emotion/css";
import LeftNavigation from "./LeftNavigation/LeftNavigation";
import RightNavigation from "./RightNavigation/RightNavigation";
const MainNavigation = () => {
  return (
    <div
      className={css`
        position: relative;
        height: 56px;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
      `}
    >
      <LeftNavigation />
      <RightNavigation />
    </div>
  );
};
export default MainNavigation;
