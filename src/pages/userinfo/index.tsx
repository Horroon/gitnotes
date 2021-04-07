import React from "react";
import { UserInfoDropdown } from "./dropdown";
import {store} from '../../models/index'
import styles from "./style.module.scss";

interface UserInfoInterface {
  isLogged: boolean;
  userinfo: {
    profile: string;
    name: string;
    isdropdownOpened: boolean;
  };
}

export const UserInfo: React.FC<UserInfoInterface> = (
  props
): React.ReactElement => {
  const { userinfo ,isLogged} = props;
  const {profile, isdropdownOpened} = userinfo
  return isLogged ? (
    <div className={styles.userinfo}>
      <img src={profile} onClick={()=>store.dispatch.loginInfo.update_dropdown_status(!isdropdownOpened)} />
      <UserInfoDropdown
        {...{ userinfo, isOpened: isdropdownOpened }}
      />
    </div>
  ) : (
    <div className={styles.loginbtncontainer}>
      <button>login</button>
    </div>
  );
};
