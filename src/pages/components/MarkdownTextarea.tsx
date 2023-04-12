import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  children: string;
}

const MarkdownTextarea = ({ children }: Props) => (
  <SyntaxHighlighter
    language="javascript"
    style={nord}
    showLineNumbers
    wrapLongLines
    wrapLines
  >
    {children}
  </SyntaxHighlighter>
);

export default MarkdownTextarea;
