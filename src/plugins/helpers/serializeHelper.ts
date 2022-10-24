import { Descendant, Text, Element } from "slate";
import escapeHtml from "escape-html";
import { jsx } from "slate-hyperscript";
import { convertRgb2Hex } from "../../util/convertRgb2Hex";
export const serialize = (node: Descendant) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    let htmlString = `<span>${string}</span>`;
    if (node.color) {
      htmlString = `<span style="color: ${node.color}">${htmlString}</span>`;
    }
    if (node.bold) {
      htmlString = `<strong>${htmlString}</strong>`;
    }
    if (node.code) {
      htmlString = `<code>${htmlString}</code>`;
    }
    if (node.italic) {
      htmlString = `<em>${htmlString}</em>`;
    }
    if (node.underline) {
      htmlString = `<u>${htmlString}</u>`;
    }
    if (node.delete) {
      htmlString = `<del>${htmlString}</del>`;
    }
    return htmlString;
  }
  const children: string = node.children.map((n) => serialize(n)).join("");
  let align = "";
  if ("align" in node) {
    align = node.align ? ` style="text-align: ${node.align}"` : "";
  }
  switch (node.type) {
    case "heading-one":
      return `<h1${align}>${children}</h1$>`;
    case "heading-two":
      return `<h2${align}>${children}</h2$>`;
    case "quote":
      return `<q${align} style="
        border-left: 2px solid #ddd;
        display: block;
        margin-left: 0;
        margin-right: 0;
        padding-left: 10px;
        color: #aaa;
        font-style: italic;
      ">${children}</q>`;
    case "link":
      return `<a href="${escapeHtml(
        node.url
      )}" target="_blank">${children}</a>`;
    case "embed":
      return `<blockquote
      class="instagram-media"
      data-instgrm-captioned
      data-instgrm-permalink="https://www.instagram.com/${escapeHtml(
        node.url
      )}/?utm_source=ig_embed&amp;utm_campaign=loading"
      data-instgrm-version="14"
      style="
        border: 0;
        border-radius: 3px;
        box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5),
          0 1px 10px 0 rgba(0, 0, 0, 0.15);
        margin: 1px;
        max-width: 540px;
        min-width: 326px;
        padding: 0;
        width: 99.375%;
      "
    >${children}</blockquote>`;
    case "image":
      return `<image src="${escapeHtml(node.url)}" alt=""/>`;
    case "table":
      return `<table style="border-collapse: collapse;">${children}</table>`;
    case "table-row":
      return `<tr>${children}</tr>`;
    case "table-cell":
      return `<td style="padding: 10px;
            border: 2px solid #ddd;">${children}</td>`;
    case "video":
      return `<iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/${node.url}"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>`;
    case "paragraph":
      return `<p${align}>${children}</p>`;
    case "list-item":
      return `<li${align}>${children}</li>`;
    case "numbered-list":
      return `<ol${align}>${children}</ol>`;
    case "bulleted-list":
      return `<ul${align}>${children}</ul>`;
    default:
      return `<p>${children}</p>`;
  }
};

// deserialize function
export const deserialize: any = (
  el: HTMLElement,
  markAttributes: Omit<Text, "text"> = {}
) => {
  const ElementType = 1;
  const TextType = 3;
  if (el.nodeType === TextType) {
    return jsx("text", markAttributes, el.textContent);
  } else if (el.nodeType !== ElementType) {
    return null;
  }
  const nodeAttributes = { ...markAttributes };

  // define attributes for text nodes
  switch (el.nodeName) {
    case "STRONG":
      nodeAttributes.bold = true;
      break;
    case "EM":
      nodeAttributes.italic = true;
      break;
    case "CODE":
      nodeAttributes.code = true;
      break;
    case "DEL":
      nodeAttributes.delete = true;
      break;
    case "U":
      nodeAttributes.underline = true;
      break;
    case "SPAN":
      if (el.style.color !== "") {
        nodeAttributes.color = convertRgb2Hex(el.style.color);
      }
  }
  const children: Descendant[] | null = Array.from(el.childNodes)
    .map((node) => deserialize(node, nodeAttributes))
    .flat();
  if (children.length === 0) {
    children.push(jsx("text", nodeAttributes, ""));
  }
  // define attributes for element nodes
  let elementAttribute: any = {};
  if (el.style["textAlign"] !== "") {
    switch (el.style["textAlign"]) {
      case "center":
        elementAttribute.align = "center";
        break;
      case "left":
        elementAttribute.align = "left";
        break;
      case "right":
        elementAttribute.align = "right";
        break;
      case "justify":
        elementAttribute.align = "justify";
        break;
    }
  }
  //
  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "BR":
      return "\n";
    case "Q":
      elementAttribute = { ...elementAttribute, type: "quote" };
      return jsx("element", elementAttribute, children);
    case "P":
      elementAttribute = { ...elementAttribute, type: "paragraph" };
      return jsx("element", elementAttribute, children);
    case "LI":
      elementAttribute = { ...elementAttribute, type: "list-item" };
      return jsx("element", elementAttribute, children);
    case "OL":
      elementAttribute = { ...elementAttribute, type: "numbered-list" };
      return jsx("element", elementAttribute, children);
    case "UL":
      elementAttribute = { ...elementAttribute, type: "bulleted-list" };
      return jsx("element", elementAttribute, children);
    case "A":
      return jsx(
        "element",
        { type: "link", url: el.getAttribute("href") },
        children
      );
    case "IMG":
      return jsx(
        "element",
        { type: "image", url: el.getAttribute("src") },
        children
      );
    default:
      return children;
  }
};
