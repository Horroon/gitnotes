import axios from "axios";
import { SERVER_PATH } from "../config/index";

export const CrateGistOnGit = async (
  status: boolean,
  description: string,
  files: object
): Promise<any> => {
  const accessToken = sessionStorage.getItem("access-token");
  const body = { description, status, files };
  const URL = SERVER_PATH + "/create/gist";
  const newData = await axios
    .post(URL, body, {
      headers: { authorization: accessToken },
    })
    .then((res) => res.data)
    .catch((e) => console.log("error during creating new gist ", e));
  return newData;
};
