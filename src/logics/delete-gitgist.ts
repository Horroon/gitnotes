import axios from "axios";

export const DeleteGistOnGit = async (gistId: string): Promise<any> => {
  const accessToken = sessionStorage.getItem("access-token");
    const DeletedGistResponse = await fetch(
      `https://api.github.com/gists/${gistId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    )
      .then((res) => res.json())
      .then((resp) => resp)
      .catch((e) => console.log("error during fetching user file ", e));
  return DeletedGistResponse;
};
