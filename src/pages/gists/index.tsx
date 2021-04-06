import React from "react";
import { GistInRows } from "./gistInrow/gist";
import {GridList} from "./gistIngrid/gridlist";
import styles from './style.module.scss';

export const Gists: React.FC = (): React.ReactElement => {
  return (
    <div className={styles.gitscontainer}>
      <div className={styles.gridbuttoncontainer}>
        <i className="fa fa-th-large selected" /> <span>|</span> <i className="fa fa-list-ul" />
      </div>
      <div className={styles.datacontainer}>
          <div className={styles.list}>
              <GridList />
          </div>
          <div className={styles.paginationcontainer}>
             <div className={styles.parentpagination}>
                 <div className={styles.nextbtncontainer}>
                     <button type="button" className="btn btn-success nextbtn">Next Page <i className="fa fa-arrow-right" /></button>
                 </div>
                 <div className={styles.btnpaginatedcontainer}>
                        page <button className="btn btn-sm btn-outline-success">1</button> of 14 <button className="btn btn-success btn-sm"><i className="fa fa-angle-left" onClick={()=>alert('left icon')} /> | <i className="fa fa-angle-right" onClick={()=>alert('right icon')} /></button>
                 </div>
             </div>
          </div>
      </div>
    </div>
  );
};
