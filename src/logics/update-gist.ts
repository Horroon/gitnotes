
export const UpdateGistOnGit = async (gistId:string,status:boolean,description:string, files:object): Promise<any> => {

    const accessToken = sessionStorage.getItem("access-token");
    const updateGist = await fetch(`https://api.github.com/gists/${gistId}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({description,public:status,files}),
    })
      .then((res) => res.json())
      .then((resp) => resp)
      .catch((e) => console.log("error during fetching user file ", e));
      debugger
    return updateGist;
  };
  