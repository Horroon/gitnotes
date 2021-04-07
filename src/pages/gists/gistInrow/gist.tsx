import React from "react";
import {paginationStateFace} from '../../../constants/models.interfaces/pagination'
import styles from "./style.module.scss";
const img =
  "http://www.goodmorningimagesdownload.com/wp-content/uploads/2019/12/Profile-Picture-4.jpg";
  

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
          {recordToShow.map((gist) => (
            <tr id={gist.toString()}>
              <th scope="row" className={styles.thtag}>
                <input type="checkbox" />
              </th>
              <th scope="row" className={styles.thimg}>
                <img
                  className={"profile"}
                  src={img}
                />
              </th>
              <td className={styles.thimg}>Mark - {gist}</td>

              <td className={styles.thimg}>March,21,2021</td>
              <td className={styles.thimg}>12:00pm</td>
              <td className={styles.thimg}>describe me</td>

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
          ))}
        </tbody>
      </table>
    </div>
  );
};
