import { css } from "@emotion/css";
import ImageElement from "./ImageElement";
import EmbedElement from "./EmbedElement";
import VideoElement from "./VideoElement";
import TableElement from "./TableElement";
import HorizontalElement from "./HorizontalElement";
declare const instgrm: any;
const CustomElement = (props: any) => {
  const { attributes, children, element } = props;
  const style = { textAlign: element.align };
  switch (element.type) {
    case "quote":
      return (
        <q
          className={css`
            border-left: 2px solid #ddd;
            margin-left: 0;
            margin-right: 0;
            padding-left: 10px;
            color: #aaa;
            font-style: italic;
            display: block;
          `}
          style={style}
          {...attributes}
          {...element}
        >
          {children}
        </q>
      );
    case "code":
      return (
        <code
          className={css`
            background-color: #eee;
            padding: 3px;
            display: block;
          `}
          style={style}
          {...attributes}
          {...element}
        >
          {children}
        </code>
      );
    case "link":
      return (
        <a style={style} {...attributes} href={element.url} id={element.id}>
          {children}
        </a>
      );
    case "image":
      return <ImageElement {...{ ...props, element }} />;
    case "horizontal":
      return <HorizontalElement {...{ ...props, element }} />;
    case "anchor":
      return (
        <p {...attributes} {...element}>
          {children}
        </p>
      );
    case "video":
      return <VideoElement {...{ ...props, element }} />;
    case "embed":
      setTimeout(() => {
        instgrm.Embeds.process();
      }, 100);
      return <EmbedElement {...{ ...props, element }} />;
    case "sub-title":
      return (
        <h1 style={style} {...attributes} {...element}>
          {children}
        </h1>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes} {...element}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes} {...element}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes} {...element}>
          {children}
        </li>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes} {...element}>
          {children}
        </ul>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes} {...element}>
          {children}
        </ol>
      );
    case "table":
      return <TableElement {...{ ...props, element }} />;
    case "table-row":
      return <tr {...attributes}>{children}</tr>;
    case "table-cell":
      return <td {...attributes}>{children}</td>;
    default:
      return (
        <p
          className={css`
            margin: 0;
            padding: 0;
          `}
          style={style}
          {...attributes}
          {...element}
        >
          {children}
        </p>
      );
  }
};
export default CustomElement;
