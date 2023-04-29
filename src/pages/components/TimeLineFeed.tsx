import React from "react";
import { api } from "../../utils/api";
import LoadingSpinner from "./LoadingSpinner";
import {
  timelineOptions,
  type TimelineOptions,
} from "../../utils/timelineOptions";
import CreatedByUser from "./CreatedByUser";
import PostContent from "./PostContent";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

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

  const lastElementRef = useIntersectionObserver(() => {
    void fetchNextPage();
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    api.infinitePost.infinitePost.useInfiniteQuery(
      { options },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  return (
    <div className="rounded-l-md bg-slate-600 text-center">
      {data ? (
        data?.pages.map((page, i) =>
          page.items.map((post, j) => (
            <div
              key={post.id}
              ref={
                i == data.pages.length - 1 && j == page.items.length - 3
                  ? lastElementRef
                  : null
              }
              className="max-w-[w-full]"
            >
              <PostContent content={post} />
              <p>Post made by:</p>
              <CreatedByUser
                userInfo={{
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
