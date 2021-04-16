import React, { useState } from "react";
import {Search} from "../search/index";
import logo from "../../assets/emumba-logo.png";
import { UserInfo } from "../userinfo/index";
import { loginInfoFace } from "../../constants/models.interfaces/login";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { subpaths } from "../../constants/paths";
import { gistscope, gistStateFace } from "../../constants/models.interfaces/gists";

interface HeaderFace{
  loginInfo:loginInfoFace,
  gistmodel:gistStateFace,
  dispatch:any,
}
export const Header: React.FC<HeaderFace> = (props): React.ReactElement => {
  const { loginInfo:{ isLogged, userinfo}, gistmodel:{searchgistId},dispatch } = props;

  console.log('props in header ', props)
  const searchOnChangeHandler = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    dispatch.gistslist.update_gist_search_id(value)
  };

  const SearchIconClickHandler = ()=>{
  }
console.log('search ', searchgistId)
  return (
    <nav className={styles.header}>
      <div className={styles.headingcontainer}>
        <Link to={subpaths.publicgists} onClick={()=>dispatch.gistslist.change_gists_scope(gistscope.public)}>
          <img src={logo} />
        </Link>
      </div>
      <div className={styles.searchcontainer}>
        <Search value={searchgistId} onChange={searchOnChangeHandler} clickToSearchIcon={SearchIconClickHandler} />
        <div>
          <UserInfo
            {...{
              isLogged: isLogged,
              userinfo: userinfo,
              dispatch,
            }}
          />
        </div>
      </div>
    </nav>
  );
};
