import { geistSans } from "@/lib/fonts";
import Markdown from "markdown-to-jsx";
import React from "react";

const LegalMarkdown = ({ children }: { children: string }) => {
  return (
    <Markdown className="agent-response legal space-y-4" style={geistSans.style}>
      {children}
    </Markdown>
  );
};

export default LegalMarkdown;
