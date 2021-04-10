import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import {SingleGistCard} from './single-gist-card';
import {connect} from "react-redux";
import {GetAuthenticatedUserGists} from "../../logics/get-authenticated-user-gists";
import { useHistory } from "react-router";
import { subpaths } from "../../constants/paths";

const dummyurl =  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

const GistProfilePage = (props:any) => {
    const {userinfo:{profile,name,username}} = props;
    const [gists, setgists]= useState([]);
    const History = useHistory();

    const GetUserGists = async(uname:string)=>{
        const response = await GetAuthenticatedUserGists(uname);
        setgists(response)
        console.log('user response ', response)
    }

    useEffect(()=>{
        if(profile && username){
             GetUserGists(username)
        }else {
            History.push(subpaths.publicgists)
        }
    },[]);

  return (
    <div className={styles.gistprofilecontainer}>
      <div className={`row my-5 ${styles.prow}`}>
        <div className={`col col-lg-3 col-sm-12 text-center ${styles.profilecol}`}>
          <div>
            <img
              src={profile}
            />
          </div>
          <div>
            <h5>{name}</h5>
          </div>
          <div>
            <a href={`https://github.com/${username}`} className="btn btn-light btn-lg btn-block" target="_blank">
              View GitHub Profile
            </a>
          </div>
        </div>
        <div className={`col col-lg-9 col-sm-12 ${styles.gistsection}`}>
            {
                gists.length>0 ? gists.map(gist=><SingleGistCard {...{gist,name}} />) : <div>{name} has no gist</div>
            }
            
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ((store:any)=>store.loginInfo);
export default connect(mapStateToProps)(GistProfilePage) ;
