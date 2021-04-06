import React from "react";
import styles from "./style.module.scss";
const img =
  "http://www.goodmorningimagesdownload.com/wp-content/uploads/2019/12/Profile-Picture-4.jpg";
  
export const GistInRows: React.FC = (): React.ReactElement => {
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
          {[
            {
              img: img,
              name: "Mark",
              date: "March,21,2021",
              time: "12:00pm",
              description: "describe me",
              notebook: "Note book",
            },
            {
              img: img,
              name: "Mark",
              date: "March,21,2021",
              time: "12:00pm",
              description: "describe me",
              notebook: "Note book",
            },
            {
              img: img,
              name: "Mark",
              date: "March,21,2021",
              time: "12:00pm",
              description: "describe me",
              notebook: "Note book",
            },
            {
              img: img,
              name: "Mark",
              date: "March,21,2021",
              time: "12:00pm",
              description: "describe me",
              notebook: "Note book",
            },
            {
              img: img,
              name: "Mark",
              date: "March,21,2021",
              time: "12:00pm",
              description: "describe me",
              notebook: "Note book",
            },
          ].map((gist) => (
            <tr>
              <th scope="row" className={styles.thtag}>
                <input type="checkbox" />
              </th>
              <th scope="row" className={styles.thimg}>
                <img
                  className={"profile"}
                  src={
                    "http://www.goodmorningimagesdownload.com/wp-content/uploads/2019/12/Profile-Picture-4.jpg"
                  }
                />
              </th>
              <td className={styles.thimg}>{gist.name}</td>

              <td className={styles.thimg}>{gist.date}</td>
              <td className={styles.thimg}>{gist.time}</td>
              <td className={styles.thimg}>{gist.description}</td>

              <td className={styles.thimg}>{gist.notebook}</td>
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
