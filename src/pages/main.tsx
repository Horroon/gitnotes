import React from "react";
import { Header } from "./header/index";
import  {Gists}  from "./gists/index";
import {connect} from 'react-redux'
import styles from "./style.module.scss";

const MainScreen: React.FC<any> = (props): React.ReactElement => {
  const {gistslist,pagination} = props
  console.log(props)
  return (
    <div className={styles.mainscreencontainer}>
      <div className={styles.headercontainer}>
        <Header />
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