import React, { useState } from "react";
import { z } from "zod";
import { api } from "../../utils/api";
// import useMarkdownText from "./hooks/useMarkdownText";

// Markdown Library needed

// Requirements for the post:
export const codeSchema = z.object({
  code: z
    .string({
      required_error: "Code is required",
    })
    .min(10)
    .max(280),
  markdownOne: z.string({
    required_error: "Markdown is required",
  }),
  markdownTwo: z.string({
    required_error: "Markdown is required",
  }),
});

const Post = () => {
  const [code, setCode] = useState("");
  const [markdownOne, setMarkdownOne] = useState("");
  const [markdownTwo, setMarkdownTwo] = useState("");

  const createPost = api.post.createPost.useMutation();

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(code);
    console.log(markdownOne);
    console.log(markdownTwo);

    if (code.length < 1) return "too short";
    if (code.length > 280) return "too long";

    try {
      codeSchema.parse({ code, markdownOne, markdownTwo });
    } catch (e) {
      return
    }

    createPost.mutate({ code, markdownOne, markdownTwo })
    setCode("")
  };

  return (
    <>
      {createPost.error && (
        <p className="text-red-500">{createPost.error.message}</p>
      )}
      <div className="m-4">
        <form onSubmit={handleSubmit}>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} />
          <div className="flex">
            <textarea onChange={e => setMarkdownOne(e.target.value)} />
            <textarea onChange={e => setMarkdownTwo(e.target.value)} />
          </div>
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
