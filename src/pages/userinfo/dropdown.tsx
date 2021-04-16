import React from "react";
import { Link } from "react-router-dom";
import { SignoutCurrentUser } from "../../utilities/signout";
import { subpaths } from "../../constants/paths";
import styles from "./style.module.scss";
import { gistscope } from "../../constants/models.interfaces/gists";

interface UserInfoDropdownFace {
  isOpened: boolean;
  userinfo: {
    profile: string;
    name: string;
    isdropdownOpened: boolean;
  },
  dispatch:any
}

export const UserInfoDropdown: React.FC<UserInfoDropdownFace> = (
  props
): React.ReactElement => {
  const {
    userinfo: { name },
    isOpened,
    dispatch,
  } = props;
  const ChangeScope = () => {
    dispatch.gistslist.change_gists_scope(gistscope.user);
  };
  return isOpened ? (
    <div className={styles.userdropdown}>
      <div className="triangle"></div>
      <div className={styles.username}>
        <p>signed in as</p>
        <p>{name}</p>
      </div>
      <div className={styles.usergist}>
        <Link to={subpaths.publicgists} onClick={ChangeScope}>
          <p>Your gists</p>
        </Link>
        <Link to={subpaths.creategist}>
          <p>Create gist</p>
        </Link>
        <p>Starred gists</p>
        <p>Help</p>
      </div>
      <div className={styles.gitsignout}>
        <Link to={subpaths.gistprofile}>
          <p>Your GitHub profile</p>
        </Link>
        <p onClick={SignoutCurrentUser}>sign out</p>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
