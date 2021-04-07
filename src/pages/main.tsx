import React,{useEffect} from "react";
import { Header } from "./header/index";
import  {Gists}  from "./gists/index";
import {connect} from 'react-redux'
import {GetPublicGist} from '../logics/get-public-gists';
import styles from "./style.module.scss";
import { store } from "../models";

const MainScreen: React.FC<any> = (props): React.ReactElement => {
  const {gistslist,pagination, loginInfo} = props
  console.log(loginInfo)
  const GetGists = async()=>{
    const gists = await GetPublicGist();
    if(gists){
      const totalPages = Math.ceil(gists.length / pagination.limit.pagesize);
      store.dispatch.gistslist.update_gist(gists);
      store.dispatch.pagination.update_total_pages({total_pages: totalPages.toString()})
    }

  }
  useEffect(()=>{
    GetGists()
    },[])
  return (
    <div className={styles.mainscreencontainer}>
      <div className={styles.headercontainer}>
        <Header {...loginInfo} />
      </div>
      <div className={`${styles.mainbody} container`}>
        {
           <Gists {...{gistState: gistslist, pagination}} />
        }
      </div>
    </div>
  );
};


const mapStateToProps = ((state:any) => state);

export default connect(mapStateToProps)(MainScreen)