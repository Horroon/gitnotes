import axios from "axios";
import { store } from "../models/index";
export const GetGitHubUser = async (token: string): Promise<any> => {
  const user = await axios
    .get("http://localhost:8080/gitnotes/git/user/info", {
      headers: {
        Authorization: token,
      },
    })
    .then((resp) => {
      if (resp.data?.user?.login) {
        const logininfo = {
          isLogged: true,
          userinfo: {
            profile: resp.data?.user?.avatar_url,
            name: resp.data?.user?.name,
            username: resp.data?.user?.login,
            isdropdownOpened: false,
          },
        };
        store.dispatch.loginInfo.login({ ...logininfo });
        sessionStorage.setItem("username", resp.data?.user?.login);
      }
      return resp.data.user;
    })
    .catch((e) => console.log("error during fetching user"));
  return user;
};
