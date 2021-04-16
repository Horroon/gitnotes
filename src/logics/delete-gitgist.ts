import axios from "axios";
import { SERVER_PATH } from "../config/index";

export const DeleteGistOnGit = async (gistId: string): Promise<any> => {
  const accessToken = sessionStorage.getItem("access-token");
  const URL = SERVER_PATH + `/delete/gist?gistId=${gistId}`;
  const DeletedGistResponse = await axios
    .post(URL, "", {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((res) => res.data)
    .catch((e) => console.log(e));
  return DeletedGistResponse;
};
