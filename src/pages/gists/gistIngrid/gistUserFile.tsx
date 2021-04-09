import React, { useState, useEffect } from "react";

import { GetGistUserFile } from "../../../logics/get-gistuser-file";

export const GistUserFileComponent: React.FC<{ fileUrl: string }> = (props) => {
  const { fileUrl } = props;
  const [content, setContent] = useState<any>();

  const GetUserFile: any = async (url: string) => {
    const response = await GetGistUserFile(url);
    setContent(response);
  };

  useEffect(() => {
    GetUserFile(fileUrl);
  }, []);
  return content ? <code>{content}</code>: <p>loading...</p>;
};

export default GistUserFileComponent