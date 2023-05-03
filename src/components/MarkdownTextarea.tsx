import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";
interface Props {
  children: string;
  className?: string;
}

const MarkdownTextarea = ({ children, className }: Props) => (
  <SyntaxHighlighter
    language={"tsx"}
    style={nord}
    showLineNumbers
    wrapLongLines
    wrapLines
    className={className}
  >
    {children}
  </SyntaxHighlighter>
);

export default MarkdownTextarea;
