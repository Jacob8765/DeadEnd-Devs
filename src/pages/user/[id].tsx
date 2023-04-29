import React from "react";
import { useRouter } from "next/router";
import { TimelineOptions } from "../../utils/timelineOptions";
import TimeLine from "../components/TimeLine";

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) return null;

  const options: TimelineOptions = {
    sort: "asc",
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
      <TimeLine options={options} />
    </div>
  );
};

export default User;
