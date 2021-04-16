import axios from "axios";
import { SERVER_PATH } from "../config/index";

export const UpdateGistOnGit = async (
  gistId: string,
  status: boolean,
  description: string,
  files: object
): Promise<any> => {
  try {
    const accessToken = sessionStorage.getItem("access-token");
    const data = {
      gistId,
      status,
      description,
      files,
    };
    const URL = SERVER_PATH + '/update/gist'
    const updatedGist = await axios
      .post(URL, data, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((res) => res.data)
      .catch((e) => new Error(e));
      return updatedGist
  } catch (e) {
    return e;
  }
};
