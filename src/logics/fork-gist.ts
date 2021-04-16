import axios from "axios";
import { SERVER_PATH } from "../config/index";

export const ForkAGist = async (gistId: string) => {
  const token = sessionStorage.getItem("access-token");
  const URL = SERVER_PATH + `/fork/gist?gistId=${gistId}`;
  const response = await axios
    .post(URL, "", {
      method: "POST",
      headers: { Authorization: token },
    })
    .then((resp) => resp.data)
    .catch((e) => console.log("error during fork a gist ", e));
  return response;
};
