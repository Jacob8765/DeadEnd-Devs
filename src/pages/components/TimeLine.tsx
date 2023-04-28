import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { api } from "../../utils/api";
import Post from "./Post";
import MarkdownTextarea from "./MarkdownTextarea";
import LoadingSpinner from "./LoadingSpinner";

const TimeLine = () => (
  <div className="ml-auto flex w-full flex-col rounded-l-md bg-slate-600 text-center">
    <Post />
    <TimeLineFeed />
  </div>
);

function TimeLineFeed() {
  const observer = useRef<IntersectionObserver | null>(null);
  const [shouldQueryPosts, setShouldQueryPosts] = useState(false);

  // grabs the last element in the current list of posts
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (!node) return null;

    if (!observer.current) {
      observer.current = new IntersectionObserver(
        ([entry]) => {
          entry && setShouldQueryPosts(entry.isIntersecting);
        },
        { threshold: 0 }
      );
    } else {
      observer.current?.disconnect();
    }

    observer.current?.observe(node as Element);
  }, []);

  const { data, fetchNextPage } =
    api.infinitePost.infinitePost.useInfiniteQuery(
      {
        limit: 5,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  useEffect(() => {
    if (shouldQueryPosts) {
      void fetchNextPage();
    }
  }, [fetchNextPage, shouldQueryPosts]);

  return (
    <div>
      {data ? (
        data?.pages.map((page, i) =>
          page.items.map((post, j) => (
            <div
              key={post.id}
              ref={
                i == data.pages.length - 1 && j == page.items.length - 1
                  ? lastElementRef
                  : null
              }
              className="max-w-[w-full]"
            >
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
          ))
        )
      ) : (
        <LoadingSpinner />
      )}
      {shouldQueryPosts &&
      data &&
      data.pages[data.pages.length - 1]?.nextCursor ? (
        <LoadingSpinner />
      ) : (
        <p className="text-white">No more posts. Come back tomorrow!</p>
      )}
    </div>
  );
}

export default TimeLine;
