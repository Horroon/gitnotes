export const GiveStarToGist = async (gistId: string) => {
  const token  = sessionStorage.getItem('access-token');
  return await fetch(`https://api.github.com/gists/${gistId}/star`, {
    method: "PUT",
    headers: {
      "Content-Length":"0",
      "Authorization":'token ' + token,
      "accept": "application/vnd.github.v3+json",
      "gist_id":gistId
    },
  })
    .then((res) => res.json())
    .then((resp) => resp)
    .catch((e) => new Error(e));
};
