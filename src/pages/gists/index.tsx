import React from "react";
import { GistInRows } from "./gistInrow/gist";
import {GridList} from "./gistIngrid/gridlist";
import styles from './style.module.scss';
import {store} from '../../models/index'
import {gistview,gistStateFace} from '../../constants/models.interfaces/gists';
import {paginationStateFace} from '../../constants/models.interfaces/pagination';


interface GistsComponentFace{
  gistState:gistStateFace,
  pagination:paginationStateFace
}
export const Gists: React.FC<GistsComponentFace> = (props): React.ReactElement => {
  const storeState  = store.getState()
  const { gistState:{view,gists}, pagination } = props
  const {total_pages, current_page, buttons:{next, back}, limit} = pagination;

  const NextPage = ()=>{
    if(next){
      const newpageIndex = current_page < total_pages ? parseInt(current_page) + 1 : current_page
      store.dispatch.pagination.goToNext({current_page: newpageIndex.toString()})
      current_page < total_pages && store.dispatch.pagination.update_limit({from: limit.to, to: limit.to + limit.pagesize})
      newpageIndex == total_pages && store.dispatch.pagination.update_button_status({back: true, next: false})
    }
  };

  const BackPage = ()=>{
    if(back){
      const newpageIndex = current_page > '1' ? parseInt(current_page) - 1 : current_page;
      store.dispatch.pagination.goToNext({current_page: newpageIndex.toString()});
      newpageIndex == '1' && store.dispatch.pagination.update_button_status({back:false, next: true});
      current_page > '1' && store.dispatch.pagination.update_limit({from: limit.from - limit.pagesize, to: limit.from})
    }
  }
  return (
    <div className={styles.gitscontainer}>
      <div className={styles.gridbuttoncontainer}>
        <i className={`${view === gistview.grid && 'selected'} fa fa-th-large`} onClick={()=>store.dispatch.gistslist.changegistview(gistview.grid)}/> <span>|</span> <i className = {`${view === gistview.row && 'selected'} fa fa-list-ul`} onClick={()=>store.dispatch.gistslist.changegistview(gistview.row)} />
      </div>
      <div className={styles.datacontainer}>
          <div className={styles.list}>
            {
              view === gistview.row ? <GistInRows {...{paginationStateFace:pagination, gists}} /> : <GridList {...{paginationStateFace:pagination, gists}}/>
            }
          </div>
          <div className={styles.paginationcontainer}>
             <div className={styles.parentpagination}>
                 <div className={styles.nextbtncontainer}>
                     <button type="button" className="btn btn-success nextbtn" disabled={!next} onClick={NextPage}>Next Page <i className="fa fa-arrow-right" /></button>
                 </div>
                 <div className={styles.btnpaginatedcontainer}>
                        page <button className="btn btn-sm btn-outline-success">{current_page}</button> of {total_pages} <button className="btn btn-success btn-sm"><i className="fa fa-angle-left" onClick={BackPage} /> | <i className="fa fa-angle-right" onClick={NextPage} /></button>
                 </div>
             </div>
          </div>
      </div>
    </div>
  );
};