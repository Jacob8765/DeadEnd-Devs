import Image from "next/image";
import React from "react";
import { api } from "../../utils/api";
import Post from "./Post";
import MarkdownTextarea from "./MarkdownTextarea";

const TimeLine = () => (
  <div className="ml-auto flex w-full flex-col rounded-l-md bg-slate-600 text-center">
    <Post />
    <TimeLineFeed />
  </div>
);

function TimeLineFeed() {
  const timeLinePost = api.user.getFeed.useQuery();
  return (
    <div>
      {timeLinePost.data?.map((post) => (
        <div key={post.id} className="max-w-[w-full]">
          <p className="mx-auto mb-7 max-w-[60ch] break-words text-white">
            {post.text}
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
          <p>Post made by:</p>
          <div className="mb-24  mt-6 inline-flex gap-5 rounded-md border border-white">
            <span className="my-auto ml-4 text-white">
              {post.author.name ?? "a user"}
            </span>
            {post.author.image && post.author.name && (
              <Image
                className="relative overflow-hidden rounded-md"
                src={`${post.author.image}`}
                alt={`${post.author.name}'s profile pic!`}
                width={55}
                height={55}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TimeLine;
