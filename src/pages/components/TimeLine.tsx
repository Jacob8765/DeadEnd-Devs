import Image from "next/image";
import React from "react";
import { api } from "../../utils/api";
import Post from "./Post";

const TimeLine = () => {
  return (
    <div className="rounded-l-md ml-auto flex w-3/4 flex-col bg-slate-600 text-center">
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
          <p className="mb-7 text-white">{post.text}</p>
          <div className="flex justify-evenly break-words">
            <p className="max-w-[50ch] text-white">{post.leftBlock}</p>
            <p className="max-w-[50ch] text-blue-400">{post.rightBlock}</p>
          </div>

          <p>Post made by {post.author.name}</p>
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
