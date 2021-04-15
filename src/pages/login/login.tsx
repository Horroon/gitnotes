import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useToasts } from "react-toast-notifications";
import githubLogo from "../../assets/github.png";
import styles from "./style.module.scss";
import { gitHubProvider } from "../../config/authMethods";
import SocialMediaAuth from "../../service/auth";
import { Redirect } from "react-router-dom";
import { GetGitHubAccessToken } from "../../logics/get-gitHubAccessToken";
import { GetGitHubUser } from "../../logics/get-github-user";
import { client_secret, clientId } from "./constants";
import { store } from "../../models";
import { useHistory } from "react-router-dom";
import { subpaths } from "../../constants/paths";

export const Properties = {
  updatecode: "UPDATE_CODE",
  loder: "LOADER",
  error: "ERROR",
};
interface StateFace {
  code: string;
  loader: boolean;
  error: string;
}

interface ActionFace {
  type: string;
  payload: any;
}

const InitialState = {
  code: "",
  loader: false,
  error: "",
};
const reducer = (state: StateFace, action: ActionFace): StateFace => {
  switch (action.type) {
    case Properties.updatecode:
      return { ...state, code: action.payload };
    case Properties.error:
      return { ...state, error: action.payload };
    default:
      return { ...state };
  }
};

export const Login: React.FC<any> = (props): React.ReactElement => {
  const [state, setState] = useReducer(reducer, InitialState);
  const { addToast } = useToasts();
  const History = useHistory();

   const LoginMethod = () => SocialMediaAuth(gitHubProvider);

  const { isLogged } = props;

  const GetToken = async (code: string) => {
    const tokenstring = await GetGitHubAccessToken(
      code,
      clientId,
      client_secret
    );
    if (tokenstring.data?.login) {
      const token = tokenstring.data.login.split("&")[0].split("=")[1];
      if (token !== "bad_verification_code") {
        sessionStorage.setItem("access-token", token);
        const gituser = await GetGitHubUser(token);
        debugger
        if (gituser?.login) {
          History.push(subpaths.publicgists);
          addToast("You have successfully logged in", {
            appearance: "success",
          });
        } else {
          addToast("login failed", { appearance: "error" });
        }
        console.log("gituser response ", gituser);
      } else {
        addToast(token, { appearance: "error" });
      }
    }
    debugger;
  };

  useEffect(() => {
    console.log("url ", window.location.search);
    const code = window.location.search.split("code=")[1];
    if (code && code !== state.code) {
      GetToken(code);
    }
  }, [state.code]);

  console.log("state ", state);
  return !isLogged ? (
    <div className={styles.logincontainer}>
      <div className={`${styles.card} card`}>
        <div className={styles.imgcontainer}>
          <img src={githubLogo} />
        </div>
        <div className={styles.loginButton}>
          <button className="btn btn-success btn-md">
            <a
              href={`https://github.com/login/oauth/authorize?scope=gist&client_id=${clientId}&redirect_uri=http://localhost:3000/login`}
              onClick={() => {
                setState({ type: Properties.updatecode, payload: "" });
              }}
            >
              login
            </a>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="public/gists" />
  );
};
