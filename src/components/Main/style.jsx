import styled from "styled-components";

export const STYBody = styled.main`
  border: 2px solid green;
  margin-top: 100px;
  width: 100%;
  min-height: 800px;
  position: relative;

  textarea {
    width: 100%;
    max-width: 740px;
    margin: 40px auto 50px;
    color: rgb(20, 20, 19);
    font-size: 42px;
    line-height: 1.3em;
    font-weight: bold;
    border: none;
    /* border: 2px solid black; */
    resize: none;
    background: transparent;
    display: block;
    overflow: hidden;
  }

  .hoverToolBarOutside {
    position: absolute;
    left: calc(((100vw - 740px) / 2) - 100px + 38px + 10px);
    top: 150px;
    transition: top 0.1s ease-in-out 0s;
    border-radius: 6px;
    width: 38px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(246, 246, 246);
    color: rgb(162, 156, 155);
    z-index: 2;

    .hoverToolBarInside {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 5px;
      cursor: pointer;
      color: #7a7574;
      /* z-index: -1; */
    }
  }

  .sideToolBarOutside {
    width: 0px;
    height: 0px;
    position: fixed;
    top: 254px;
    transform: translateX(calc(((100vw - 740px) / 2) - 100px));
    z-index: 10;

    .sideToolBarInside {
      border: 1px solid rgb(221, 217, 216);
      background: rgb(255, 255, 255);
      box-shadow: rgb(0 0 0 / 8%) 0px 2px 6px 0px;
      border-radius: 6px;
      z-index: 10;
      position: sticky;
      width: 40px;
      height: 241px;
      padding: 13px 0px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      div {
        /* background-color: red; */
        font-size: 24px;
        cursor: pointer;
        border-radius: 4px;
        padding: 6px;

        &:hover {
          background-color: rgb(221, 217, 216);
        }
      }
    }
  }

  .editorSecond {
    height: 100%;
  }
`;
