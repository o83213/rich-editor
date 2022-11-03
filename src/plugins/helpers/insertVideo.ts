import { Editor, Transforms, Element } from "slate";
export const insertVideo = (editor: Editor, url: string) => {
  const videoName = url.split("?v=")[1].split("&")[0];
  const text = { text: "" };
  const video: Element = {
    type: "video",
    url: videoName,
    children: [text],
  };
  Transforms.insertNodes(editor, video);
};
