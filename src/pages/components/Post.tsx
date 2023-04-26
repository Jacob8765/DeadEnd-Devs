import React, { useState, useRef } from "react";
import { z } from "zod";
import { api } from "../../utils/api";
import Editor from "@monaco-editor/react";
import LoadingSpinner from "./LoadingSpinner";

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
    .min(1),
  editorBoxTwo: z.string(),
});

const Post = () => {
  const defaultCode = "// write your code here";
  const secondBlockOptionalCode = ". (this code block is optional)";
  const [description, setDescription] = useState("");
  const validDescriptionLength =
    description.length <= 280 && description.length >= 10;
  const lengthOfDescription = description.length;
  const [editorOneValue, setEditorOneValue] = useState(defaultCode);
  const [editorTwoValue, setEditorTwoValue] = useState(
    defaultCode + secondBlockOptionalCode
  );
  const [descriptionFocused, setDescriptionFocused] = useState(false);
  const editorRefOne = useRef<undefined | string>(undefined);
  const editorRefTwo = useRef<undefined | string>(undefined);

  const createPost = api.post.createPost.useMutation();

  console.log(createPost.status);

  const handleEditorOneDidMount = (editor: {
    getValue: () => string | undefined;
  }) => {
    editorRefOne.current = editor.getValue();
  };

  const handleEditorTwoDidMount = (editor: {
    getValue: () => string | undefined;
  }) => {
    editorRefTwo.current = editor.getValue();
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

    console.log(editorBoxOne, editorBoxTwo);

    try {
      console.log(editorBoxOne, editorBoxTwo);
      codeSchema.parse({ description, editorBoxOne, editorBoxTwo });
    } catch (e) {
      console.log(e);
      return;
    }

    createPost.mutate({ description, editorBoxOne, editorBoxTwo });

    setDescription("");
    setEditorOneValue(defaultCode);
    setEditorTwoValue(defaultCode + secondBlockOptionalCode);
    editorRefTwo.current = "";
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
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
            className={`mt-4 h-[6rem] w-[41vw] resize-none rounded-md outline-none ${
              descriptionFocused ? "border-4" : ""
            } ${
              description.length >= 10 && description.length <= 280
                ? "border-green-300"
                : "border-red-500"
            }`}
            value={description}
            onFocus={() => setDescriptionFocused(true)}
            onBlur={() => setDescriptionFocused(false)}
            // onChange has descriptionFocused func instead of setDescription because onChange needs to call two functions
            onChange={(e) => handleDescriptionChange(e)}
          />
          <p
            className={`${
              validDescriptionLength ? "text-green-300" : "text-red-500"
            }`}
          >
            {lengthOfDescription}
          </p>
          <div className="mt-6 flex justify-center gap-5">
            <Editor
              height="35vh"
              width="35vw"
              onMount={handleEditorOneDidMount}
              onChange={handleEditorOneWillUpdate}
              defaultLanguage="javascript"
              value={editorOneValue}
              loading={<LoadingSpinner />}
            />
            <Editor
              height="35vh"
              width="35vw"
              onChange={handleEditorTwoWillUpdate}
              defaultLanguage="javascript"
              onMount={handleEditorTwoDidMount}
              value={editorTwoValue}
              loading={<LoadingSpinner />}
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
