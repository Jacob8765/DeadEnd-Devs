import React from "react";
import MarkdownTextarea from "./MarkdownTextarea";
import { PostContent } from "../../utils/postContent";

const PostContent = (content: { postContent: PostContent }) => {
  const { post } = content.postContent;
  return (
    <>
      <p className="mx-auto mb-7 max-w-[60ch] break-words text-white">
        {post.description}
      </p>
      <div className="m-4 flex justify-evenly break-words">
        <MarkdownTextarea className="max-w-[45vw]">
          {post.leftBlock}
        </MarkdownTextarea>
        {post.rightBlock && (
          <MarkdownTextarea className="max-w-[45vw]">
            {post.rightBlock}
          </MarkdownTextarea>
        )}
      </div>
    </>
  );
};

export default PostContent;
