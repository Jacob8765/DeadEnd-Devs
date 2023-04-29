import React from "react";
import MarkdownTextarea from "./MarkdownTextarea";
import type { BlockPost } from "@prisma/client";

const PostContent = (postContent: { content: BlockPost }) => {
  const { text, leftBlock, rightBlock } = postContent.content;
  return (
    <>
      <p className="mx-auto mb-7 max-w-[60ch] break-words text-white">{text}</p>
      <div className="m-4 flex justify-evenly break-words">
        <MarkdownTextarea className="max-w-[45vw]">
          {leftBlock}
        </MarkdownTextarea>
        {rightBlock && (
          <MarkdownTextarea className="max-w-[45vw]">
            {rightBlock}
          </MarkdownTextarea>
        )}
      </div>
    </>
  );
};

export default PostContent;
