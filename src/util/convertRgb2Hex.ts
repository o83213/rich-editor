export const convertRgb2Hex = (rgbString: string) => {
  const newText = rgbString.split("(")[1].split(")")[0].split(",");
  const newText16 = newText.map((rgbValue) => {
    const hexValue = parseInt(rgbValue).toString(16);
    return hexValue.length === 1 ? "0" + hexValue : hexValue;
  });
  const rgbHex = "#" + newText16.join("");
  return rgbHex;
};
