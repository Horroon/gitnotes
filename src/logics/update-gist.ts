import axios from "axios";

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
    const updatedGist = await axios
      .post(`http://localhost:8080/gitnotes/update/gist`, data, {
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
