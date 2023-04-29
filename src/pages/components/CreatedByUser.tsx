import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CreatedByUser } from "../../utils/createdByUser";

const CreatedByUser = (credentials: { post: CreatedByUser }) => {
  const { authorID } = credentials.post;
  const { name, image } = credentials.post.author;
  return (
    <Link href={`/user/${authorID}`}>
      <div className="mb-24  mt-6 inline-flex gap-5 rounded-md border border-white">
        <span className="my-auto ml-4 text-white">{name ?? "a user"}</span>
        {image && name && (
          <Image
            className="relative overflow-hidden rounded-md"
            src={`${image}`}
            alt={`${name}'s profile pic!`}
            width={55}
            height={55}
          />
        )}
      </div>
    </Link>
  );
};

export default CreatedByUser;
