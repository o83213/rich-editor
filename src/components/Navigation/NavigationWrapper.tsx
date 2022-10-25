import { css } from "@emotion/css";
import MainNavigation from "./MainNavigation";
const NavigationWrapper = () => {
  return (
    <div
      className={css`
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        background-color: rgb(255, 255, 255);
        box-shadow: rgb(0 0 0 / 16%) 0px 5px 11px 0px;
        z-index: 1;
        transition: all 0.2s ease-in 0s;
      `}
    >
      <MainNavigation />
    </div>
  );
};

export default NavigationWrapper;
