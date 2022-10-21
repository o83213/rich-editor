import React from "react";
import { STYBody, PublishBTN, DraftBTN } from "./style";

// react icons引用
import { BsThreeDots } from "react-icons/bs";

// 圖片前面網址
import { HEADERIMAGE_URL } from "../../config/urls";

const HeaderComponent = () => {
  return (
    <STYBody>
      <header>
        <div className="headerWrapper">
          <div className="headerLeft">
            <div className="logo"></div>
            <div className="seperateLine"></div>
            <div className="draft">草稿</div>
            <div className="dontWorry">請放心，內容已自動儲存</div>
          </div>
          <div>
            <div className="headerRight">
              <PublishBTN>準備發佈</PublishBTN>
              <DraftBTN>儲存草稿</DraftBTN>
              <div>
                <BsThreeDots className="dots" />
              </div>
              <div className="avatar">
                <img src={`${HEADERIMAGE_URL}/haaland.jpg`} alt="haaland" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </STYBody>
  );
};

export default HeaderComponent;
