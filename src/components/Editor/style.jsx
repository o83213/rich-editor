import styled from "styled-components";

export const STYBody = styled.div`
  position: relative;

  .editorAreaOutside {
    background-color: transparent;
    border-left: 0.1px solid transparent;
    position: relative;
    /* z-index: 1; */

    .editorAreaInside {
      /* border: 2px solid blue; */
      z-index: -1;
      display: flex;
      justify-content: flex-start;
      border-radius: 2px;
      background: #fff;
      flex-wrap: wrap;
      min-height: 600px;
      overflow: scroll;

      .editorLine {
        line-height: 2em;
        min-height: 1.7em;
        letter-spacing: 0.04em;
        font-size: 20px;
        word-break: break-word;
        max-width: 740px;
        margin: 0 calc(((100vw - 740px) / 2));

        input {
          width: 740px;
          min-height: 2em;
          font-size: 20px;
          outline: none;
          border: none;
        }
      }
    }
  }
`;
