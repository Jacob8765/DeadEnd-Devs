import React from "react";
import { useRouter } from "next/router";
import { type TimelineOptions } from "../../utils/timelineOptions";
import TimeLineFeed from "../components/TimeLineFeed";

const User = () => {
  const router = useRouter();
  const { id } = router.query;

  // important to check for id here, otherwise error will be thrown
  if (!id) return null;

  const options: TimelineOptions = {
    sort: "desc",
    limit: 5,
    filters: {
      author: {
        is: {
          id: id as string,
        },
      },
    },
  };

  return (
    <div>
      <h1>User: {id}</h1>
      <TimeLineFeed options={options} />
    </div>
  );
};

export default User;
