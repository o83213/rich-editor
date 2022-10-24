import { Editor, Transforms, Element } from "slate";
export const insertIframe = (editor: Editor, url: string) => {
  const urlAfterCom = url.split(".com/")[1].split("/");
  const postName = urlAfterCom.reduce((prev, cur, curIdx) => {
    if (curIdx > 1) {
      return prev;
    }
    return prev + "/" + cur;
  });
  const text = { text: "" };
  const embed: Element = { type: "embed", url: postName, children: [text] };
  Transforms.insertNodes(editor, embed);
};
