import { isUrl } from "./isUrl";
const imageExtensions = ["jpg", "jpeg", "png"];
export const isImageUrl = (url: string) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop()!;
  return imageExtensions.includes(ext);
};
