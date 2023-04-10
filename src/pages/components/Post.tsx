import React, { useState } from "react";
import { z } from "zod";
import { api } from "../../utils/api";
import Editor from "@monaco-editor/react";

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

    if (code.length < 1) return "too short";
    if (code.length > 280) return "too long";

    try {
      codeSchema.parse({ code, markdownOne, markdownTwo });
    } catch (e) {
      return;
    }

    createPost.mutate({ code, markdownOne, markdownTwo });
    setCode("");
  };

  return (
    <>
      {createPost.error && (
        <p className="text-red-500">{createPost.error.message}</p>
      )}
      <div className="m-4 mb-12">
        <form onSubmit={handleSubmit}>
          <textarea
            rows={3}
            placeholder="Enter the description here..."
            className="w-[30ch] resize-none rounded-md"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="flex gap-5 justify-center mt-6">
            <Editor
              height="35vh"
              width="35vw"
              defaultLanguage="javascript"
              defaultValue="// write your code here"
            />
            <Editor
              height="35vh"
              width="35vw"
              defaultLanguage="javascript"
              defaultValue="// write your code here"
            />
          </div>
          <br />
          <button
            type="submit"
            className="rounded border-b-4 border-blue-700 bg-blue-500 py-2 px-4 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Post;
