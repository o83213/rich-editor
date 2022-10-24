export const isUrl = (text: string) => {
  const isHttp = text.slice(0, 4) === "http";
  const isHttps = text.slice(0, 5) === "https";
  return isHttp || isHttps;
};
