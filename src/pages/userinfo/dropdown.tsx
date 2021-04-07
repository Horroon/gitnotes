import React from "react";
import styles from "./style.module.scss";

interface UserInfoDropdownFace{
    isOpened:boolean,
    userinfo: {
        profile: string;
        name: string;
        isdropdownOpened: boolean;
      };
};

export const UserInfoDropdown: React.FC<UserInfoDropdownFace> = (props): React.ReactElement => {
    const {userinfo:{name}, isOpened} = props
  return isOpened ? (
      <div className={styles.userdropdown}>
        <div className="triangle"></div>
        <div className={styles.username}>
          <p>signed in as</p>
          <p>{name}</p>
        </div>
        <div className={styles.usergist}>
          <p>Your gists</p>
          <p>Starred gists</p>
          <p>Help</p>
        </div>
        <div className={styles.gitsignout}>
          <p>Your GitHub profile</p>
          <p>sign out</p>
        </div>
      </div>
  ):<div></div>;
};
