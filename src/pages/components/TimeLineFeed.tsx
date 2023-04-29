import React, { useEffect, useRef, useState, useCallback } from "react";
import { api } from "../../utils/api";
import MarkdownTextarea from "./MarkdownTextarea";
import LoadingSpinner from "./LoadingSpinner";
import {
  timelineOptions,
  type TimelineOptions,
} from "../../utils/timelineOptions";
import CreatedByUser from "./CreatedByUser";
import PostContent from "./PostContent";

const TimeLineFeed = (props: { options: TimelineOptions }) => {
  const parsedResult = timelineOptions.safeParse(props.options);
  if (!parsedResult.success) {
    console.log(parsedResult.error.message);
    throw new Error(
      "Invalid options passed to TimeLineFeed",
      parsedResult.error
    );
  }

  const options = parsedResult.data;

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
      console.log("disconnecting observer");
      observer.current?.disconnect();
    }

    observer.current?.observe(node as Element);
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    api.infinitePost.infinitePost.useInfiniteQuery(
      { options },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  useEffect(() => {
    if (shouldQueryPosts && hasNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, shouldQueryPosts]);

  return (
    <div className="rounded-l-md bg-slate-600 text-center">
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
              <PostContent
                postContent={{
                  post: {
                    description: post.text,
                    leftBlock: post.leftBlock,
                    rightBlock: post.rightBlock,
                  },
                }}
              />
              <p>Post made by:</p>
              <CreatedByUser
                post={{
                  author: { name: post.author.name, image: post.author.image },
                  authorID: post.authorID,
                }}
              />
            </div>
          ))
        )
      ) : (
        <LoadingSpinner />
      )}
      {isFetchingNextPage ? (
        <LoadingSpinner />
      ) : !hasNextPage ? (
        <p className="text-white">No more posts. Come back tomorrow!</p>
      ) : null}
    </div>
  );
};

export default TimeLineFeed;
