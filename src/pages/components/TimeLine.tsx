import Image from "next/image";
import React from "react";
import { api } from "../../utils/api";
import Post from "./Post";
import MarkdownTextarea from "./MarkdownTextarea";

const TimeLine = () => {
  return (
    <div className="ml-auto flex w-3/4 flex-col rounded-l-md bg-slate-600 text-center">
      <Post />
      <TimeLineFeed />
    </div>
  );
};

function TimeLineFeed() {
  const timeLinePost = api.user.getFeed.useQuery();
  return (
    <div>
      {timeLinePost.data?.map((post) => (
        <div key={post.id}>
          <p className="mx-auto mb-7 max-w-[60ch] break-words text-white">
            {post.text}
          </p>
          <div className="flex justify-evenly break-words">
            <MarkdownTextarea>
              {post.leftBlock}
            </MarkdownTextarea>
            <MarkdownTextarea>
              {post.rightBlock}
            </MarkdownTextarea>
          </div>

          <p>Post made by {post.author.name ?? "a deadend dev user"}</p>
          {post.author.image && post.author.name && (
            <Image
              src={`${post.author.image}`}
              alt={`${post.author.name}'s profile pic!`}
              width={48}
              height={48}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default TimeLine;
