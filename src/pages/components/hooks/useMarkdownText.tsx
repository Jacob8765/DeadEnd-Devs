import { useState } from "react";

const useMarkdownText = () => {
  const [values, setValues] = useState({});

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return [values, onChange];
};

export default useMarkdownText;
