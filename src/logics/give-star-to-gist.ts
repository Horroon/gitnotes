export const GiveStarToGist = async (gistId: string) => {
  return await fetch(`https://api.github.com/gists/${gistId}/star`, {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github.v3+json",
      "Access-Control-Expose-Headers": "Cotent-Length",
    },
  })
    .then((res) => res.json())
    .then((resp) => resp)
    .catch((e) => new Error(e));
};
