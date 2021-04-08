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
import styles from "./style.module.scss";
import { store } from "../models";
import { Gists } from "./gists";
import { Login } from "./login/login";

const MainScreen: React.FC<any> = (props): React.ReactElement => {
  const { gistslist, pagination, loginInfo, Route: reduxroute } = props;
  const history = useHistory();
  console.log(reduxroute);
  const GetGists = async () => {
    const gists = await GetPublicGist();
    if (gists) {
      const totalPages = Math.ceil(gists.length / pagination.limit.pagesize);
      store.dispatch.gistslist.update_gist(gists);
      store.dispatch.pagination.update_total_pages({
        total_pages: totalPages.toString(),
      });
      store.dispatch.Route.updateCurrentRoute(subpaths.publicgists);
      history.push(subpaths.publicgists);
    }
  };
  useEffect(() => {
    GetGists();
  }, []);
  console.log("redux route ", reduxroute);

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
          <Route path={subpaths.publicgists}>
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
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = (state: any) => state;

export default connect(mapStateToProps)(MainScreen);
