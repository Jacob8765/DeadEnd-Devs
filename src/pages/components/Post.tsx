import React, { useState, useRef } from "react";
import { z } from "zod";
import { api } from "../../utils/api";
import Editor from "@monaco-editor/react";

// requirements for the post:
export const codeSchema = z.object({
  description: z
    .string({
      required_error: "Code is required",
    })
    .min(10)
    .max(280),
  editorBoxOne: z
    .string({
      required_error: "Code is required",
    })
    .min(10),
  editorBoxTwo: z
    .string({
      required_error: "Markdown is required",
    })
    .optional(),
});

const Post = () => {
  const defaultCode = `// write your code here`;
  const [description, setDescription] = useState("");
  const [editorOneValue, setEditorOneValue] = useState(defaultCode);
  const [editorTwoValue, setEditorTwoValue] = useState(defaultCode);
  const editorRefOne = useRef<undefined | string>(undefined);
  const editorRefTwo = useRef<undefined | string>(undefined);

  const createPost = api.post.createPost.useMutation();

  const handleEditorOneDidMount = (editor: string) => {
    editorRefOne.current = editor;
  };

  const handleEditorTwoDidMount = (editor: string) => {
    editorRefTwo.current = editor;
  };

  const handleEditorOneWillUpdate = (editor: string | undefined) => {
    editorRefOne.current = editor;
    setEditorOneValue(editor as string);
  };

  const handleEditorTwoWillUpdate = (editor: string | undefined) => {
    editorRefTwo.current = editor;
    setEditorTwoValue(editor as string);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // editors will be mounted before the submit button is clicked
    const editorBoxOne = editorRefOne.current as string;
    const editorBoxTwo = editorRefTwo.current as string;

    try {
      codeSchema.parse({ description, editorBoxOne, editorBoxTwo });
    } catch (e) {
      return;
    }

    createPost.mutate({ description, editorBoxOne, editorBoxTwo });

    setDescription("");
    setEditorOneValue("// write your code here");
    setEditorTwoValue("// write your code here");
    editorRefTwo.current = "";
  };

  return (
    <>
      {createPost.error && (
        // <p className="text-red-500">{createPost.error.message}</p>
        <p>Oops! There was an error! Refresh and try again.</p>
      )}
      <div className="m-4 mb-12">
        <form onSubmit={handleSubmit}>
          <textarea
            rows={3}
            placeholder="Enter the description here..."
            className="w-[41vw] h-[6rem] mt-4 resize-none rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mt-6 flex justify-center gap-5">
            <Editor
              height="35vh"
              width="35vw"
              onMount={handleEditorOneDidMount}
              onChange={handleEditorOneWillUpdate}
              defaultLanguage="javascript"
              value={editorOneValue}
            />
            <Editor
              height="35vh"
              width="35vw"
              onChange={handleEditorTwoWillUpdate}
              defaultLanguage="javascript"
              onMount={handleEditorTwoDidMount}
              value={editorTwoValue}
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
