import React from "react";
import { GistInRows } from "./gistInrow/gist";
import { GridList } from "./gistIngrid/gridlist";
import styles from "./style.module.scss";
import {
  gistview,
  gistStateFace,
} from "../../constants/models.interfaces/gists";
import { paginationStateFace } from "../../constants/models.interfaces/pagination";
import { PaginationContainer } from "./paginationcontainer/index";

interface GistsComponentFace {
  gistState: gistStateFace;
  pagination: paginationStateFace;
  dispatch:any,
}
export const Gists: React.FC<GistsComponentFace> = (
  props
): React.ReactElement => {
  const {
    gistState: { view, gists,searchgistId },
    pagination,
    dispatch,
  } = props;
  const {
    total_pages,
    current_page,
    buttons: { next, back },
    limit,
  } = pagination;
  
  const loadmoreItem = () => {
    if (current_page < total_pages) {
      let curpage =
        current_page < total_pages ? current_page + 1 : current_page;
      let newgistis = gists.slice(0, curpage * limit.pagesize);
      setTimeout(() => {
        dispatch.pagination.update_show_records(newgistis)
        dispatch.pagination.update_current_page({
          current_page: curpage,
        });
        
        current_page < total_pages &&
        dispatch.pagination.update_limit({
          from: limit.to,
          to: limit.to + limit.pagesize,
          hasmore: true,
        });

        current_page + 1 < total_pages && dispatch.pagination.update_button_status({
          back: true,
          next: true,
        });
      }, 1000);
    } else {
      dispatch.pagination.update_hasmore_gist(false);
      dispatch.pagination.update_current_page({
        current_page: total_pages,
      });
      dispatch.pagination.update_button_status({back: true, next: false})
    }
  };

  const NextPage = () => {
    if (next) {
      const newpageIndex =
        current_page < total_pages ? current_page + 1 : current_page;
      dispatch.pagination.goToNext({ current_page: newpageIndex });
      current_page < total_pages &&
      dispatch.pagination.update_limit({
          from: limit.to,
          to: limit.to + limit.pagesize,
          hasmore: true,
        });
      newpageIndex == total_pages &&
      dispatch.pagination.update_button_status({
          back: true,
          next: false,
        });
    }
  };

  const BackPage = () => {
    if (back) {
      const newpageIndex = current_page > 1 ? current_page - 1 : current_page;
      dispatch.pagination.goToNext({ current_page: newpageIndex });
      
      newpageIndex == 1 &&
        dispatch.pagination.update_button_status({
          back: false,
          next: true,
        });

      newpageIndex === total_pages && dispatch.pagination.update_button_status({
        back: false,
        next: false,
      });

      newpageIndex < total_pages && dispatch.pagination.update_button_status({
        next: true,
        back: newpageIndex > 1 ? true : false
      })
      current_page > 1 &&
        dispatch.pagination.update_limit({
          from: limit.from - limit.pagesize,
          to: limit.from,
          hasmore: false,
        });
    }
  };

  return (
    <div className={styles.gitscontainer}>
      <div className={styles.gridbuttoncontainer}>
        <i
          className={`${view === gistview.grid && "selected"} fa fa-th-large`}
          onClick={() => dispatch.gistslist.changegistview(gistview.grid)}
        />{" "}
        <span>|</span>{" "}
        <i
          className={`${view === gistview.row && "selected"} fa fa-list-ul`}
          onClick={() => dispatch.gistslist.changegistview(gistview.row)}
        />
      </div>
      <div className={styles.datacontainer}>
        <div className={styles.list}>
          {view === gistview.row
            ? gists.length && (
                <GistInRows {...{ paginationStateFace: pagination, gists, searchgistId }} />
              )
            : gists.length && (
                <GridList
                  pagination={pagination}
                  {...{ hasmore: limit.hasmore ,searchgistId, gists, searchId: searchgistId}}
                  loadmoreItem={loadmoreItem}
                />
              )}
        </div>
        <div className={styles.paginationcontainer}>
          <PaginationContainer
            next={next}
            BackPage={BackPage}
            NextPage={NextPage}
            styles={styles}
            isToShowPagination={view === gistview.row && !searchgistId}
            current_page={current_page}
            total_pages={total_pages}
          />
        </div>
      </div>
    </div>
  );
};
