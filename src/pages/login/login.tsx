import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useToasts } from "react-toast-notifications";
import githubLogo from "../../assets/github.png";
import styles from "./style.module.scss";
import { Redirect } from "react-router-dom";
import { GetGitHubAccessToken } from "../../logics/get-gitHubAccessToken";
import { GetGitHubUser } from "../../logics/get-github-user";
import { GetID } from "../../logics/get-clientIdFrom-server";
import { store } from "../../models";
import { useHistory } from "react-router-dom";
import { subpaths } from "../../constants/paths";

export const Properties = {
  updatecode: "UPDATE_CODE",
  loder: "LOADER",
  error: "ERROR",
  clientId:"CLIENT_ID"
};
interface StateFace {
  code: string;
  loader: boolean;
  error: string;
  clientId: string;
  isButtonDisabled:boolean,
}

interface ActionFace {
  type: string;
  payload: any;
}

const InitialState = {
  code: "",
  loader: false,
  error: "",
  clientId: "",
  isButtonDisabled:true,
};
const reducer = (state: StateFace, action: ActionFace): StateFace => {
  switch (action.type) {
    case Properties.updatecode:
      return { ...state, code: action.payload };
    case Properties.error:
      return { ...state, error: action.payload };
    case Properties.clientId:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};

export const Login: React.FC<any> = (props): React.ReactElement => {
  const [state, setState] = useReducer(reducer, InitialState);
  const { addToast } = useToasts();
  const History = useHistory();

  const { isLogged } = props;

  const GetToken = async (code: string) => {
    const tokenstring = await GetGitHubAccessToken(code);
    if (tokenstring.data?.login) {
      const token = tokenstring.data.login.split("&")[0].split("=")[1];
      if (token !== "bad_verification_code") {
        sessionStorage.setItem("access-token", token);
        const gituser = await GetGitHubUser(token);
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
  };

  const GetClientId = async () => {
    const id = await GetID();
    if (typeof(id) === 'string') {
      setState({type: Properties.clientId, payload: {isButtonDisabled: false, clientId: id}})
    }
  };

  useEffect(() => {
    console.log("url ", window.location.search);
    const code = window.location.search.split("code=")[1];
    if (code && code !== state.code) {
      GetToken(code);
    }
  }, [state.code]);

  useEffect(() => {GetClientId()},[]);

  console.log("state ", state);
  return !isLogged ? (
    <div className={styles.logincontainer}>
      <div className={`${styles.card} card`}>
        <div className={styles.imgcontainer}>
          <img src={githubLogo} />
        </div>
        <div className={styles.loginButton}>
          <button className="btn btn-success btn-md" disabled={state.isButtonDisabled} onClick={()=>{
            if(!state.isButtonDisabled){
              window.location.href = `https://github.com/login/oauth/authorize?scope=gist&client_id=${state.clientId}&redirect_uri=http://localhost:3000/login`
            }
            !state.isButtonDisabled && setState({ type: Properties.updatecode, payload: "" });
          }}>
              login
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="public/gists" />
  );
};
