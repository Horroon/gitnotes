import React from "react";
import styles from './style.module.scss';

interface UserInfoInterface {
  isLoggedIn: boolean;
  img: string;
}

export const UserInfo: React.FC<UserInfoInterface> = (
  props
): React.ReactElement => {
    const {img,isLoggedIn} = props
  return isLoggedIn ? (
    <div className={styles.userinfo}>
      <img src={img} />
    </div>
  ) : (
    <div className={styles.loginbtncontainer}>
      <button>login</button>
    </div>
  );
};
