import axios from "axios";

export const ForkAGist = async (gistId: string) => {
  const token = sessionStorage.getItem("access-token");
  const response = await axios
    .post(`http://localhost:8080/gitnotes/fork/gist?gistId=${gistId}`, "", {
      method: "POST",
      headers: { Authorization: token },
    })
    .then((resp) => resp.data)
    .catch((e) => console.log("error during fork a gist ", e));
  console.log("fork response ", response);
  debugger;
  return response;
};
