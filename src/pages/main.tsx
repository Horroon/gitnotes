import React, { memo, useCallback, useEffect, useMemo } from "react";
import { Header } from "./header/index";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import { subpaths } from "../constants/paths/index";
import styles from "./style.module.scss";
import { Gists } from "./gists";
import { Login } from "./login/login";
import SingleGistPage from "./single-gist-page/gist";
import CreateGistPage from "./gists/creategist/index";
import GistProfilePage from "./gistprofile/index";
import { GetGitHubUser } from "../logics/get-github-user";
import { GetGistsUtility } from "../utilities/get-gist";
import { useToasts } from "react-toast-notifications";

const MainScreen: React.FC<any> = (props): React.ReactElement => {
  const {
    gistslist,
    pagination,
    loginInfo,
    Route: reduxroute,
    dispatch,
  } = props;
  const history = useHistory();
  const { addToast } = useToasts();

  const GetGists = useCallback(
    (isLogged: boolean, username: string) =>
      GetGistsUtility(isLogged, username, history, addToast, gistslist.scope),
    [loginInfo.isLogged, gistslist.scope]
  );

  const getGitUser = async (token: string) => {
    const loginresponse = await GetGitHubUser(token);
    if (loginresponse?.login) {
      GetGists(true, loginresponse.login);
    }
  };
  useEffect(() => {
    const token = sessionStorage.getItem("access-token");
    const username = sessionStorage.getItem("username") || "";
    if (token) {
      getGitUser(token);
    }
    if (!username) {
      GetGists(false, "");
    }
  }, [loginInfo.isLogged, gistslist.scope]);

  return (
    <Router>
      <div className={styles.mainscreencontainer}>
        <div className={styles.headercontainer}>
          <Header
            loginInfo={loginInfo}
            gistmodel={gistslist}
            dispatch={dispatch}
          />
        </div>
        <div className={`${styles.mainbody} container`}>
          <Route
            exact
            path="/"
            render={() => <Redirect to={subpaths.publicgists} />}
          />
          <Route exact path={subpaths.publicgists}>
            <Gists {...{ gistState: gistslist, pagination, dispatch }} />
          </Route>
          <Route
            exact
            path={subpaths.login}
            render={() => {
              if (loginInfo.isLogged) {
                return <Redirect to={subpaths.publicgists} />;
              }
            }}
          >
            <Login {...loginInfo} />
          </Route>
          <Route exact path={`${subpaths.singlegist}/`}>
            <SingleGistPage username={loginInfo.userinfo.username} />
          </Route>
          <Route exact path={subpaths.creategist}>
            <CreateGistPage {...loginInfo} />
          </Route>

          <Route exact path={`${subpaths.editgist}/`}>
            <CreateGistPage {...loginInfo} />
          </Route>

          <Route exact path={subpaths.gistprofile}>
            <GistProfilePage />
          </Route>
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = (state: any) => state;

export default connect(mapStateToProps)(MainScreen);
