import axios from "axios";

export const DeleteGistOnGit = async (gistId: string): Promise<any> => {
  const accessToken = sessionStorage.getItem("access-token");
  const DeletedGistResponse = await axios
    .post(`http://localhost:8080/gitnotes/delete/gist?gistId=${gistId}`, "", {
      headers: {
        Authorization: accessToken,
      },
    })
    .then((res) => res.data)
    .catch((e) => console.log(e));
  return DeletedGistResponse;
};
