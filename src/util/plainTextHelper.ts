import { Node } from "slate";
export const plainTextHelper = {
  serialize(value: any) {
    return value.map((n: any) => Node.string(n)).join("\n");
  },
  deserialize(string: string) {
    return string.split("\n").map((line) => {
      return {
        children: [{ text: line }],
      };
    });
  },
};
