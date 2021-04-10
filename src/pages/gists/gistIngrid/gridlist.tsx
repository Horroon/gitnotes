import React from "react";
import moment from "moment";
import { paginationStateFace } from "../../../constants/models.interfaces/pagination";
import { GistUserFileComponent } from "./gistUserFile";
import styles from "./style.module.scss";
import { PrintFileInfo } from "../../../utilities/PrintFileInfo";
import InfiniteScroll from "react-infinite-scroller";
import FileContent from './gistUserFile';
import { Link } from "react-router-dom";
import { subpaths } from "../../../constants/paths";
import { SearchRecordById } from "../../../utilities/filterdatabyId";

interface GridListFace {
  hasmore: boolean;
  loadmoreItem: any;
  pagination:paginationStateFace,
  gists:any[],
  searchId:string,
}

export const GridList: React.FC<GridListFace> = (props): React.ReactElement => {
  const { hasmore, loadmoreItem, pagination:{showRecords} , gists, searchId} = props;
  const recordsOnScreen = searchId ? SearchRecordById(searchId, gists) : showRecords;
  return (
    <div className={styles.gridcontainer}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadmoreItem}
        hasMore={hasmore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        threshold={250}
      >
        <h4> {recordsOnScreen.length} gist{recordsOnScreen.length>1?'s':''}</h4>
        <div className="row ">
          {recordsOnScreen.map((card: any) => {
            const FileInfo = PrintFileInfo(card.files);
            return (
              <Link to={`${subpaths.singlegist}?id=${card.id}`} className={`${styles.card} col-lg-4 my-4`}>
                <div className={`${styles.card} card rounded-lg`}>
                  <div className="card-body">
                    <p className={styles.cardtext}>
                        <FileContent
                          fileUrl={FileInfo[0].fileUrl}
                        />
                    </p>
                    <div className={styles.persondinfo}>
                      <div className={styles.personpicontainer}>
                        <img src={card.owner.avatar_url} />
                      </div>
                      <div className={styles.desc}>
                        <a href="#" className="card-link">
                          <p>{card.owner.login} </p>/{" "}
                          <h5> {FileInfo[0].filename}</h5>
                        </a>
                        <p>{moment(card.created_at).fromNow()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};
