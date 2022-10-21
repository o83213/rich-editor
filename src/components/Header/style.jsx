import styled from "styled-components";
import { ButtonSTY } from "../../style/global";

export const STYBody = styled.div`
  header {
    border: 2px solid orange;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: rgb(0 0 0 / 16%) 0px 5px 11px 0px;
    z-index: 8;
    transition: all 0.4s;
    background-color: white;

    .headerWrapper {
      display: flex;
      justify-content: space-between;
      position: relative;
      height: 56px;
      align-items: center;

      .headerLeft {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 14px;

        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 24px;
          position: relative;
          background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjkiIGhlaWdodD0iMjQiPjxkZWZzPjxwYXRoIGlkPSJhIiBkPSJNMCAwaDI5djI0SDB6Ii8+PC9kZWZzPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PG1hc2sgaWQ9ImIiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2EiLz48L21hc2s+PHBhdGggZmlsbD0iI0ZGNDg1QSIgZD0iTTI1IDIwLjIyN2gtNi4xMTRhMS40OCAxLjQ4IDAgMDEtMS40ODQtMS40NjZ2LTQuMTg5aDYuMTEzYy44MTcgMCAxLjQ4NS42NiAxLjQ4NSAxLjQ2N3Y0LjE4OHptLTguOTkzLTYuOTI2SDYuMTljLTEuMzEyIDAtMi4zODUtMS4xMjItMi4zODUtMi40OTRWMy42ODVoOS44MThjMS4zMSAwIDIuMzg0IDEuMTIyIDIuMzg0IDIuNDk0djcuMTIyek0yMy4wNDcgMEgwdjE4LjA3NEMwIDIxLjMzNCAyLjY3OCAyNCA1Ljk1MiAyNEgyOVY1LjkyNkMyOSAyLjY2NyAyNi4zMjIgMCAyMy4wNDggMHoiIG1hc2s9InVybCgjYikiLz48L2c+PC9zdmc+");
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;
          filter: grayscale(100%);
          cursor: pointer;
          margin-right: 15px;
        }
        .seperateLine {
          width: 1px;
          height: 30px;
          background-color: rgb(207, 207, 207);
        }
        .draft {
          width: 46px;
          height: 22px;
          border-radius: 2px;
          padding: 5px 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          white-space: nowrap;
          font-size: 14px;
          background-color: rgb(246, 246, 246);
          color: rgb(122, 117, 116);
          margin-left: 15px;
        }
        .dontWorry {
          font-size: 14px;
          line-height: 16px;
          width: auto;
          min-width: 50px;
          margin-left: 15px;
          color: rgb(162, 156, 155);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
        }
      }
      .headerRight {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-right: 15px;
        gap: 15px;

        .dots {
          position: relative;
          width: 30px;
          height: 30px;
          border-radius: 3px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          cursor: pointer;
          color: rgb(162, 156, 155);
          font-size: 20px;
        }
        .avatar {
          width: 30px;
          height: 30px;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        }
      }
    }
  }
`;

export const PublishBTN = styled(ButtonSTY)`
  background-color: rgb(255, 72, 90);
  color: white;
  &:hover {
    background-color: rgb(204, 58, 72);
  }
`;

export const DraftBTN = styled(ButtonSTY)`
  color: rgb(20, 20, 19);
  background-color: white;
  border: 1px solid rgb(83, 81, 80);
  &:hover {
    background-color: rgb(242, 241, 240);
  }
`;
