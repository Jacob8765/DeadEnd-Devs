import React from "react";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = api.user.getPostsFromUser.useQuery(id as string);

  return <div>
    
  </div>;
};

export default User;
