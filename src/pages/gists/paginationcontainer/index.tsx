import React from "react";

export const PaginationContainer: React.FC<{isToShowPagination: boolean,styles:any, next:boolean, NextPage:any, current_page:number, total_pages:number, BackPage:any}> = ({isToShowPagination, next, NextPage, styles, current_page, total_pages,BackPage}) => {
  return isToShowPagination ? (
    <div className={styles.parentpagination}>
      <div className={styles.nextbtncontainer}>
        <button
          type="button"
          className="btn btn-success nextbtn"
          disabled={!next}
          onClick={NextPage}
        >
          Next Page <i className="fa fa-arrow-right" />
        </button>
      </div>
      <div className={styles.btnpaginatedcontainer}>
        page{" "}
        <button className="btn btn-sm btn-outline-success">
          {current_page}
        </button>{" "}
        of {total_pages}{" "}
        <button className="btn btn-success btn-sm">
          <i className="fa fa-angle-left" onClick={BackPage} /> |{" "}
          <i className="fa fa-angle-right" onClick={NextPage} />
        </button>
      </div>
    </div>
  ):null
};
