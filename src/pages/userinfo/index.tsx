import React from "react";
import { UserInfoDropdown } from "./dropdown";
import {subpaths} from '../../constants/paths/index'
import {useHistory} from 'react-router-dom'
import styles from "./style.module.scss";

interface UserInfoInterface {
  isLogged: boolean;
  userinfo: {
    profile: string;
    name: string;
    isdropdownOpened: boolean;
  };
  dispatch:any,
}

export const UserInfo: React.FC<UserInfoInterface> = (
  props
): React.ReactElement => {
  
  const history = useHistory()
  const { userinfo ,isLogged,dispatch} = props;
  const {profile, isdropdownOpened} = userinfo;
  return isLogged ? (
    <div className={styles.userinfo}>
      <img src={profile} onClick={()=>dispatch.loginInfo.update_dropdown_status(!isdropdownOpened)} />
      <UserInfoDropdown
        {...{ userinfo, isOpened: isdropdownOpened, dispatch }}
      />
    </div>
  ) : (
    <div className={styles.loginbtncontainer}>
      <button onClick={()=>{history.push(subpaths.login);dispatch.Route.updateCurrentRoute(subpaths.login)}}>Login</button>
    </div>
  );
};
