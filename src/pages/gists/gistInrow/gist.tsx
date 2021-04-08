import moment from "moment";
import React from "react";
import {paginationStateFace} from '../../../constants/models.interfaces/pagination';
import {DateFormatter, TimeFormatter} from '../../../utilities/dateformatter';
import styles from "./style.module.scss";
  

  interface ListFace{
    paginationStateFace:paginationStateFace,
    gists:any[]
  }
export const GistInRows: React.FC<ListFace> = (props): React.ReactElement => {
  const {paginationStateFace:{limit},gists} = props
  const recordToShow = gists.slice(limit.from,limit.to)
  return (
    <div className={styles.gistrowcontainer}>
      <table className={`${styles.table} table`}>
        <thead className={styles.tablehead}>
          <tr>
            <th scope="col" className={styles.thtag}>
              <input type="checkbox" />
            </th>
            <th scope="col" className={styles.thtag}></th>
            {[
              "Name",
              "Date",
              "Time",
              "Description(s) Name",
              "Notebook(s) Name",
            ].map((tagname) => (
              <th scope="col" className={styles.thtag}>
                {tagname}
              </th>
            ))}
            <th scope="col" className={styles.thtag}>
              {" "}
            </th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {recordToShow.map((gist) => {
            return(
            <tr>
              <th scope="row" className={styles.thtag}>
                <input type="checkbox" />
              </th>
              <th scope="row" className={styles.thimg}>
                <img
                  className={"profile"}
                  src={gist.owner.avatar_url}
                />
              </th>
              <td className={styles.thimg}>{gist.owner.login}</td>

              <td className={styles.thimg}>{moment(gist.created_at).format('ll')}</td>
              <td className={styles.thimg}>{moment(gist.created_at).format('hh:mm:ss a') }</td>
              <td className={`${styles.thimg} td-description` }>{gist.description}</td>

              <td className={styles.thimg}>Note book</td>
              <td className={styles.thimg}>
                <div className={styles.iconcontainer}>
                  <div>
                    <i className="fa fa-star-o" />
                  </div>
                  <div>
                    <i className="fa fa-code-fork" />{" "}
                  </div>
                </div>
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
};
