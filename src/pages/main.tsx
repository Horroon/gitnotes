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
import { GetPublicGist } from "../logics/get-public-gists";
import { GetAuthenticatedUserGists } from "../logics/get-authenticated-user-gists";
import styles from "./style.module.scss";
import { store } from "../models";
import { Gists } from "./gists";
import { Login } from "./login/login";
import SingleGistPage from "./single-gist-page/gist";
import CreateGistPage from "./gists/creategist/index";
import GistProfilePage from "./gistprofile/index";


const MainScreen: React.FC<any> = (props): React.ReactElement => {
  const { gistslist, pagination, loginInfo, Route: reduxroute } = props;
  const history = useHistory();
  const GetGists = async () => {
    const username = sessionStorage.getItem('username');
    const gists = loginInfo.isLogged && username ? await GetAuthenticatedUserGists(username) : await GetPublicGist();
    if (gists) {
      const totalPages = Math.ceil(gists.length / pagination.limit.pagesize);
      store.dispatch.gistslist.update_gist(gists);
      store.dispatch.pagination.update_total_pages({
        total_pages: totalPages,
      });
      store.dispatch.pagination.update_button_status({back: false, next: totalPages > 1 ? true : false})
      store.dispatch.pagination.update_show_records(gists.slice(0, 10))
      store.dispatch.Route.updateCurrentRoute(subpaths.publicgists);
      history.push(subpaths.publicgists);
    }
  };
  useEffect(() => {
    GetGists();
  }, [loginInfo.isLogged]);

  return (
    <Router>
      <div className={styles.mainscreencontainer}>
        <div className={styles.headercontainer}>
          <Header {...loginInfo} />
        </div>
        <div className={`${styles.mainbody} container`}>
          <Route
            path="/"
            render={() => <Redirect to={subpaths.publicgists} />}
          />
          <Route exact path={subpaths.publicgists}>
            <Gists {...{ gistState: gistslist, pagination }} />
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
          <Route
            exact
            path={`${subpaths.singlegist}/`}
            >
            <SingleGistPage />
          </Route>
          <Route 
            exact
            path={subpaths.creategist} 
          >
            <CreateGistPage />
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
