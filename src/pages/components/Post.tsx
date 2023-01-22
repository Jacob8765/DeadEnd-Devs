import React, { useState } from "react";
import { z } from "zod";
import { api } from "../../utils/api";

// Markdown Library needed

// Requirements for the post:
export const codeSchema = z.object({
  code: z
    .string({
      required_error: "Code is required",
    })
    .min(10)
    .max(280),
});

const Post = () => {
  const [code, setCode] = useState("");
  const createPost = api.post.createPost.useMutation();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (code.length < 10) return "too short";

    try {
      codeSchema.parse({ code });
    } catch (e) {
      return
    }

    createPost.mutate({ code })
    setCode("")
  };

  return (
    <>
      {createPost.error && <p className="text-red-500">{createPost.error.message}</p>}
      <div>
        <form onSubmit={handleSubmit}>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} />
          <br />
          <button type="submit" className="text-white">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Post;
