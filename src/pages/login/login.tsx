import React from "react";
import githubLogo from "../../assets/github.png";
import styles from "./style.module.scss";
import { gitHubProvider } from "../../config/authMethods";
import SocialMediaAuth from "../../service/auth";
import { Redirect } from "react-router-dom";

export const Login:React.FC<any> = (props):React.ReactElement => {
  const LoginMethod = () => SocialMediaAuth(gitHubProvider);
  const {isLogged} = props;
  return !isLogged ? (
    <div className={styles.logincontainer}>
      <div className={`${styles.card} card`}>
        <div className={styles.imgcontainer}>
          <img src={githubLogo} />
        </div>
        <div className={styles.loginButton}>
          <button className="btn btn-success btn-md" onClick={LoginMethod}>
            Login by GitHub
          </button>
        </div>
      </div>
    </div>
  ): <Redirect to="public/gists" />;
};
