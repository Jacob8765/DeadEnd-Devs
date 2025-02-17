import MarkdownTextarea from "./MarkdownTextarea";
import type { InfiniteQueryOutput } from "../types/InfiniteQueryOutput";

const PostContent = (postContent: { content: InfiniteQueryOutput }) => {
  const { leftBlock, rightBlock, text } = postContent.content;

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
