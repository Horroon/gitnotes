import React from "react";
import { Search } from "../search/index";
import logo from "../../assets/emumba-logo.png";
import { UserInfo } from "../userinfo/index";
import {loginInfoFace} from '../../constants/models.interfaces/login';

import styles from "./style.module.scss";

export const Header: React.FC<loginInfoFace> = (props): React.ReactElement => {
    const {isLogged, userinfo} = props
  return (
    <nav className={styles.header}>
      <div className={styles.headingcontainer}>
        <img src={logo} />
      </div>
      <div className={styles.searchcontainer}>
        <Search />
        <div>
          <UserInfo
            {...{
              isLogged: isLogged,
              userinfo: userinfo,
            }}
          />
        </div>
      </div>
    </nav>
  );
};
