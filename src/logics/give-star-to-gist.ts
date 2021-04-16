export const GiveStarToGist = async (gistId: string) => {
  const token  = sessionStorage.getItem('access-token');
  return await fetch(`https://api.github.com/gists/${gistId}/star`, {
    method: "PUT",
    headers: {
      "Content-Length":"0",
      "Authorization":'Bearer ' + token
    },
  })
    .then((res) => res.json())
    .then((resp) => resp)
    .catch((e) => new Error(e));
};
