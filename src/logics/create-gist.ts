import axios from "axios";

export const CrateGistOnGit = async (
  status: boolean,
  description: string,
  files: object
): Promise<any> => {
  const accessToken = sessionStorage.getItem("access-token");
  const body = { description, status, files };
  const newData = await axios
    .post("http://localhost:8080/gitnotes/create/gist", body, {
      headers: { authorization: accessToken },
    })
    .then((res) => res.data)
    .catch((e) => console.log("error during creating new gist ", e));
  return newData;
};
